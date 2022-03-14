import { MockEnvironment, MockPayloadGenerator } from 'relay-test-utils'

export type OperationResolver = { [key: string]: (context?: any) => any } | ((operation?: any) => { [key: string]: (context?: any) => any })

function tryResolveOp(env: MockEnvironment, op: any, resolver?: OperationResolver): boolean {
  try {
    switch (typeof resolver) {
      case 'object':
        env.mock.resolve(op, MockPayloadGenerator.generate(op, resolver))
        break

      case 'function':
        env.mock.resolve(op, MockPayloadGenerator.generate(op, resolver(op)))
        break

      default:
        env.mock.resolve(op, MockPayloadGenerator.generate(op))
        break
    }

    return true
  } catch (err) {
    return false
  }
}

export function resolveAllPendingOperations(env: MockEnvironment, resolver?: OperationResolver) {
  try {
    for (let op of env.mock.getAllOperations()) {
      tryResolveOp(env, op, resolver)
    }

    // also resolve most recent operation, it seems this is needed
    tryResolveOp(env, env.mock.getMostRecentOperation(), resolver)
  } catch (err) {
    // nothing...
  }
}

// TODO: this seems to freeze cypress in most cases, reason unknown
// fix and use
export function expectMostRecentOperation(env: MockEnvironment) {
  return {
    toDefineVariables: async (values: { [key: string]: any }) => {
      let attempts = 0

      do {
        attempts++

        try {
          for (let key of Object.keys(values)) {
            expect(env.mock.getMostRecentOperation()).to.nested.property(`request.variables.${key}`).equal(values[key])
          }
        } catch (err) {
          if (attempts < 30) {
            await new Promise(r => window.setTimeout(r, 100))
          } else {
            throw err
          }
        }
      // eslint-disable-next-line no-constant-condition
      } while (attempts < 30)
    },
  }
}

export function createMoney(amount: number, currencyCode: string = 'USD') {
  return {
    currency: {
      code: currencyCode,
    },
    value: amount,
  }
}
