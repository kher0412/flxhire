const path = require('path')

module.exports = {
  extends: [
    'airbnb',
    'plugin:relay/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    project: 'tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  plugins: [
    '@typescript-eslint',
    'babel',
    'cypress',
    'relay',
  ],
  env: {
    browser: true,
    'cypress/globals': true
  },
  globals: {
    gapi: true,
    jest: true
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            modules: [
              path.resolve(__dirname, 'app'),
              'node_modules',
            ]
          }
        }
      }
    }
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    semi: ['warn', 'never'],
    'no-restricted-imports': [
      'warn',
      {
        paths: [
          // TODO: clean up all React imports and THEN re-enable this rule
          // {
          //   name: 'react',
          //   importNames: ['Suspense'],
          //   message: "please import from 'components' instead"
          // },
          // TODO: clean up all react-redux imports and THEN re-enable this rule
          // {
          //   name: 'react-redux',
          //   importNames: ['useSelector', 'useDispatch'],
          //   message: "please import from 'hooks' instead"
          // },
          {
            name: '@material-ui/core',
            importNames: ['useMediaQuery'],
            message: "import from 'hooks' instead"
          },
          {
            name: 'react-responsive',
            importNames: ['default'],
            message: "import from 'components' instead"
          },
          {
            name: 'react-relay',
            importNames: ['useMutation'],
            message: "import useQuickCommit from hooks instead of useMutation"
          }
        ]
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/sort-comp': 'off',
    'react/no-did-update-set-state': 'warn',
    'newline-per-chained-call': 'off',
    'max-len': ['warn', { code: 230 }],
    'react/prop-types': 'off',
    'arrow-parens': ['warn', 'as-needed', { requireForBlockBody: true }],
    'no-await-in-loop': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-member-accessibility': ['off', {
      'accessibility': 'explicit',
      'overrides': {
        'constructors': 'off'
      }
    }],
    'no-lonely-if': 'off',
    'react/destructuring-assignment': 'off',
    'no-multiple-empty-lines': 'warn',
    'prefer-const': 'off',
    'quotes': 'warn',
    'jsx-quotes': 'warn',
    'comma-dangle': 'warn',
    'react/no-unused-state': 'warn',
    'react/self-closing-comp': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'react/jsx-max-props-per-line': 'warn',
    'react/jsx-closing-bracket-location': 'warn',
    'no-trailing-spaces': 'warn',
    'no-else-return': 'warn',
    'require-yield': 'warn',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-no-comment-textnodes': 'warn',
    'react/jsx-closing-tag-location': 'warn',
    'space-in-parens': 'warn',
    'indent': 'warn',
    'react/jsx-indent': 'warn',
    'react/jsx-indent-props': 'warn',
    'react/jsx-props-no-multi-spaces': 'warn',
    'no-multi-spaces': 'warn',
    'camelcase': 'off',
    'no-console': 'off',
    'prefer-template': 'warn',
    'object-curly-newline': 'off',
    'react/jsx-wrap-multilines': 'warn',
    'no-empty': 'warn',
    'space-before-blocks': 'warn',
    'no-empty-pattern': 'warn',
    'padded-blocks': 'warn',
    'object-curly-spacing': 'warn',
    'func-names': 'off',
    'space-before-function-paren': 'warn',
    'implicit-arrow-linebreak': 'warn',
    'react/jsx-first-prop-new-line': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-fragments': ['warn', 'element'],
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'arrow-spacing': 'warn',
    'block-spacing': 'warn',
    'react/no-array-index-key': 'warn',
    'import/no-mutable-exports': 'warn',
    'react/jsx-tag-spacing': 'warn',
    'key-spacing': 'warn',
    'class-methods-use-this': 'off',
    'spaced-comment': 'warn',
    'space-infix-ops': 'warn',
    'no-plusplus': 'off',
    'function-paren-newline': 'warn',
    'react/prefer-stateless-function': 'off',
    'keyword-spacing': 'warn',
    'react/jsx-curly-spacing': 'warn',
    'import/prefer-default-export': 'off',
    'no-unneeded-ternary': 'off',
    'react/no-unused-prop-types': 'warn',
    'react/forbid-prop-types': ['warn', { 'forbid': ['any'] }],
    'react/require-default-props': 'off',
    'template-curly-spacing': 'warn',
    'no-useless-constructor': 'warn',
    'lines-between-class-members': 'warn',
    'no-restricted-syntax': [
      'error',
      {
        'selector': ':matches(ImportNamespaceSpecifier)',
        'message': 'Import/export only modules you need to avoid performance issues in development'
      },
      {
        'selector': 'WithStatement',
      }
    ],
    'operator-linebreak': ['warn', 'after'],
    'no-continue': 'off',
    'import/order': 'warn',
    'no-return-await': 'warn',
    'prefer-destructuring': 'off',
    'no-undef-init': 'warn',
    'new-cap': 'off',
    'eol-last': 'warn',
    'react/no-unescaped-entities': 'off',
    'no-confusing-arrow': 'off',
    'react/jsx-curly-brace-presence': 'warn',
    'react/no-find-dom-node': 'off',
    'no-return-assign': 'off',
    'object-shorthand': 'off',
    'no-underscore-dangle': 'off',
    'default-case': 'off',
    'no-param-reassign': 'off',
    'react/no-access-state-in-setstate': 'warn',
    'no-restricted-globals': 'warn',
    'jsx-a11y/media-has-caption': 'off',
    'brace-style': 'warn',
    'one-var': 'warn',
    'one-var-declaration-per-line': 'warn',
    'object-property-newline': 'warn',
    'comma-spacing': 'warn',
    'import/first': 'warn',
    'arrow-body-style': 'off',
    'no-mixed-operators': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'nonblock-statement-body-position': 'warn',
    'curly': 'warn',
    'no-restricted-properties': 'off',
    'consistent-return': 'warn',
    'global-require': 'warn',
    'no-nested-ternary': 'warn',
    'react/default-props-match-prop-types': 'off',
    'import/no-duplicates': 'warn',
    'import/no-unresolved': 'off', // tsc compatibility from js
    'react/button-has-type': 'off',
    'no-unreachable': 'warn',
    'eqeqeq': 'warn',
    'import/newline-after-import': 'warn',
    'no-unused-expressions': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'no-case-declarations': 'warn',
    'no-unused-vars': 'off',
    'react/jsx-no-duplicate-props': 'off',
    'quote-props': 'warn',
    'relay/generated-flow-types': 'off', // does not work with typescript types unfortunately
    'relay/graphql-syntax': 'off',
  },
  'overrides': [{
    'files': ['*.js'],
    'rules': {
      '@typescript-eslint/explicit-member-accessibility': 'off',
    },
  }],
}
