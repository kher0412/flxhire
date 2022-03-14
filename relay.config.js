const path = require('path')

module.exports = {
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  schema: path.resolve(__dirname, '../backend/schema.graphql'),
  src: path.resolve(__dirname),
  exclude: ['**/node_modules/**', '**/__generated__/**'],
  artifactDirectory: path.resolve(__dirname, './app/__generated__'),
  noFutureProofEnums: true,
  customScalars: {
    BigInt: 'String',
    DateTime: 'String',
    Date: 'String',
  },
}
