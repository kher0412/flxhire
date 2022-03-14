const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const { parseSync } = require('env-file-parser')
const withOptimizedImages = require('next-optimized-images')
const withWorkbox = require('next-with-workbox')
const SentryPlugin = require('@sentry/webpack-plugin')
const RelayCompilerWebpackPlugin = require('relay-compiler-webpack-plugin')
const RelayCompilerLanguageTypescript = require('relay-compiler-language-typescript').default
const moment = require('moment')
const { omit } = require('lodash')
const relayConfig = require('./relay.config.js')

const isProduction = process.env.APP_ENV === 'production'
const isStaging = process.env.APP_ENV === 'staging'

const timestamp = moment().utc().format('YYYYMMDDHHmmss')

// NOTE: generateBuildId output MUST MATCH the sentry deployment ID indicated in buildspec.yml
const generateBuildId = () => {
  const codebuildId = process.env.CODEBUILD_RESOLVED_SOURCE_VERSION
  let envName = 'dev'
  let versionId = timestamp
  let source = 'local'
  if (codebuildId) source = 'codebuild'
  if (isProduction) envName = 'production'
  if (isStaging) envName = 'staging'

  const value = `${source}_${envName}_${versionId}`

  fs.writeFileSync(path.join(__dirname, '.buildId'), value)

  console.log(`BUILD ID: ${value}`)

  return value
}

// Load env
let envPath = './.env'
if (isStaging) envPath += '.staging'
if (isProduction) envPath += '.prod'
const env = parseSync(envPath)

// FLEXHIRE_API_ROOT_URL is useful to override the address of the backend
if (process.env.FLEXHIRE_API_ROOT_URL) env.API_ROOT_URL = process.env.FLEXHIRE_API_ROOT_URL
// BACKEND_API_ROOT_URL is useful to use a different address to talk to the API when server side rendering
if (process.env.BACKEND_API_ROOT_URL) env.BACKEND_API_ROOT_URL = process.env.BACKEND_API_ROOT_URL

const nextConfig = {
  env: omit(env, 'REGISTER_FRONTEND_VERSION_KEY'),
  compress: false, // gzip compression is handled by reverse proxy
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  generateBuildId,
  images: {
    // Next.js 11 supports static image imports with next/image.
    // This new feature relies on being able to process image imports.
    // This conflicts with next-optimized-images.
    disableStaticImages: true,
  },
  webpack: (config, { isServer, buildId }) => {
    // Fix absolute module paths
    config.resolve.modules = [
      path.resolve(__dirname, 'app'),
      'node_modules',
    ]

    // Fix url() in CSS files https://github.com/zeit/next-plugins/issues/273#issuecomment-430597241
    // We do not handle images because they are handled by next.js itself
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash].[ext]',
          outputPath: 'static',
          publicPath: '/_next/static',
        },
      },
    })

    config.plugins.push(
      new webpack.DefinePlugin({
        // Expose code release version
        'process.env.FRONTEND_BUILD_ID': JSON.stringify(generateBuildId()),
        // Expose key to signal frontend version, only to server
        'process.env.REGISTER_FRONTEND_VERSION_KEY': isServer ? JSON.stringify(process.env.REGISTER_FRONTEND_VERSION_KEY) : null,
      }),
    )

    if (['staging', 'production'].includes(env.FLEXHIRE_ENV) && process.env.SENTRY_AUTH_TOKEN) {
      config.plugins.push(
        new SentryPlugin({
          release: buildId,
          include: ['.next', 'app', 'pages'],
          urlPrefix: '~/_next',
          setCommits: {
            repo: 'flexhire/flexhire',
            commit: process.env.CODEBUILD_RESOLVED_SOURCE_VERSION,
            auto: false, // Auto does not work in AWS Codebuild
          },
        }),
      )
    }

    config.plugins.push(
      new RelayCompilerWebpackPlugin({
        languagePlugin: RelayCompilerLanguageTypescript,
        ...omit(relayConfig, 'customScalars', 'noFutureProofEnums'),
        // some options must be passed to "config" apparently for them to work with this plugin
        config: {
          customScalars: relayConfig.customScalars,
          noFutureProofEnums: relayConfig.noFutureProofEnums,
        },
      }),
    )

    // Make sentry use correct package on server vs client
    if (isServer) {
      config.resolve.alias['@sentry/browser'] = '@sentry/node'
    } else {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    // Dirty monkey patch to remove a Next.js image loader rule that conflicts with our static image handling plugin
    // TODO: handle our static images differently so we can remove this patch and use Next.js native Image handling.
    // NOTE: this monkey patch is only needed with NextJS 12, not 11
    // config.module.rules[2].oneOf.splice(-1, 1)

    return config
  },
}

module.exports = withOptimizedImages({
  optimizeImagesInDev: false,
  ...withWorkbox({
    workbox: {
      dest: '.',
      swDest: 'service-worker.js',
      swSrc: './app/serviceWorker/index.ts',
    },
    ...nextConfig,
  }),
})
