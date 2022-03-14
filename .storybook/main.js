const path = require('path')

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  
  core: {
    builder: "webpack5",
  },
  
  babel: async (options) => {
    const flexhireConfig = require('../babel.config.js')
    const config = {
      ...options,
      ...flexhireConfig
    }
    config.overrides[0].plugins = config.overrides[0].plugins.concat(flexhireConfig.plugins)
    return config
  },
  webpackFinal: async (config) => {
    config.resolve.modules.push(path.resolve(__dirname, '../app'))

    // CSS Configuration from https://github.com/storybookjs/storybook/issues/6055#issuecomment-521046352
    
    config.module.rules.find(
      rule => rule.test.toString() === '/\\.css$/',
    ).exclude = /\.module\.css$/
  
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    })

    return config
  }
}
