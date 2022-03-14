module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": "tsconfig.json",
    "tsconfigRootDir": __dirname
  },
  rules: {
     indent: 'off',
     'max-len': 'off',
  },
}
