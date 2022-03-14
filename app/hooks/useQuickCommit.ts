import { useErrorDisplayer } from 'hooks'
// eslint-disable-next-line no-restricted-imports
import { useMutation } from 'react-relay'
import { MutationParameters, GraphQLTaggedNode, SelectorStoreUpdater } from 'relay-runtime'
import { trackError } from 'services/analytics'

export interface IQuickCommitExecutor<T extends MutationParameters> {
  execute: (
    variables: T['variables'],
    optimisticUpdater?: SelectorStoreUpdater<T['response']>
  ) => Promise<T['response']>
  loading: boolean
}

/**
 * React hook to handle graphql mutations easily.
 * Useful to handle mutation variables and errors.
 *
 * @param mutation The mutation to be executed.
 * @param optimisticUpdater This function is optional and if it is not provided, it doesn't have any effect.
 */
export function useQuickCommit<T extends MutationParameters>(mutation: GraphQLTaggedNode): IQuickCommitExecutor<T> {
  const errorDisplayer = useErrorDisplayer()
  const [commit, loading] = useMutation<T>(mutation)

  return {
    loading: loading,
    execute: async (
      variables: T['variables'],
      optimisticUpdater?: SelectorStoreUpdater<T['response']>,
    ) => {
      try {
        const mutationResponse = await new Promise<T['response']>((resolve) => {
          commit({
            variables: variables,
            onCompleted: (_data, errors) => {
              if (errorDisplayer.displayMutationErrors(errors)) {
                resolve(null)
              } else {
                resolve(_data)
              }
            },
            onError: (error) => {
              trackError(error)
              errorDisplayer.displayError(error)
              resolve(null)
            },
            optimisticUpdater,
          })
        })

        return mutationResponse
      } catch (err) {
        trackError(err)

        return null
      }
    },
  }
}
