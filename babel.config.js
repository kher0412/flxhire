const path = require('path')

module.exports = {
  presets: [
    'next/babel',
  ],
  plugins: [
    'relay',
    // 'macros', // see: https://github.com/storybookjs/storybook/issues/7033#issuecomment-510885558
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-transform-react-jsx-source',
    ['module-resolver', {
      root: [path.join(__dirname, 'app')],
    }],
    'lodash',
    // 'add-react-displayname', // TODO: figure out why it was turned off, turn back on again (helps when debugging)
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        libraryDirectory: '', // NOTE: 'esm' can be set but our current webpack config does not work with it (same for icons)
        camel2DashComponentName: false,
      },
      'mui-core',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/icons',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'mui-icons',
    ],
    /*
    [
      'babel-plugin-import',
      {
        libraryName: 'react-admin',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'react-admin',
    ],
    */
    [
      'transform-imports', {
        // From: https://bitbucket.org/amctheatres/babel-transform-imports/src/master/
        // eslint-disable-next-line no-template-curly-in-string
        '^components$': {
          // eslint-disable-next-line no-template-curly-in-string
          transform: 'components/${member}',
          preventFullImport: false,
        },
        // eslint-disable-next-line no-template-curly-in-string
        '^components/themed$': {
          // eslint-disable-next-line no-template-curly-in-string
          transform: 'app/components/themed/${member}',
          preventFullImport: false,
        },
      },
    ],
  ],
}
