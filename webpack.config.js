const path = require('path')
const webpack = require('webpack')
const { parseSync } = require('env-file-parser')

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// webpack config for additional (non-app) bundles
// for the main app configuration, see 'next.config.js'
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Load env
let envPath = './.env'
if (process.env.APP_ENV === 'production') envPath += '.prod'
if (process.env.APP_ENV === 'staging') envPath += '.staging'
const env = parseSync(envPath)

// FLEXHIRE_API_ROOT_URL is useful to override the address of the backend
if (process.env.FLEXHIRE_API_ROOT_URL) env.API_ROOT_URL = process.env.FLEXHIRE_API_ROOT_URL
// BACKEND_API_ROOT_URL is useful to use a different address to talk to the API when server side rendering
if (process.env.BACKEND_API_ROOT_URL) env.BACKEND_API_ROOT_URL = process.env.BACKEND_API_ROOT_URL

module.exports = [{
  // job embed script
  mode: 'production',
  entry: './app/embeds/jobs.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, 'app'),
        ],
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: 'tsconfig.json',
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['node_modules', 'app'],
  },
  output: {
    path: path.resolve(__dirname, '.next/static/scripts'),
    filename: 'embed-jobs.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
    }),
  ],
  devtool: 'inline-source-map',
}]
