import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { commitMutation } from 'api/graphql'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { trackError } from 'services/analytics'
import { graphql } from 'relay-runtime'
import { JobContainer_UpdateJobDetailsMutation } from '__generated__/JobContainer_UpdateJobDetailsMutation.graphql'
import { JobContainer_DeleteJobMutation } from '__generated__/JobContainer_DeleteJobMutation.graphql'
import Job from './Job'

const mapDispatchToProps = (dispatch) => {
  return {
    updateJob: async (slug: string, autoRenew: boolean) => {
      try {
        await commitMutation<JobContainer_UpdateJobDetailsMutation>({
          mutation: graphql`
          mutation JobContainer_UpdateJobDetailsMutation($input: UpdateJobDetailsInput!) {
            updateJobDetails(input: $input) {
              job {
                autoRenew
              }
            }
          }
        `,
          variables: {
            input: {
              slug,
              autoRenew,
            },
          },
        })
      } catch (error) {
        trackError(error)
      }
    },
    deleteJob: async (slug: string) => {
      try {
        const result = await commitMutation<JobContainer_DeleteJobMutation>({
          mutation: graphql`
          mutation JobContainer_DeleteJobMutation($input: DeleteJobInput!) {
            deleteJob(input: $input) {
              job {
                status
              }
            }
          }
        `,
          variables: {
            input: {
              slug,
            },
          },
        })
        if (result?.deleteJob?.job?.status === 'closed') {
          dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Job closed' }))
        } else {
          dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Could not close Job' }))
        }
      } catch (error) {
        trackError(error)
        dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Could not close Job' }))
      }
    },
  }
}

const connector = connect(null, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(Job)
