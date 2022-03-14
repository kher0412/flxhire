import { connect, ConnectedProps } from 'react-redux'
import { withRouter } from 'next/router'
import { browserHistory } from 'services/router'
import { createAction } from 'redux-actions'
import { trackError } from 'services/analytics'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { WithRouterProps } from 'next/dist/client/with-router'
import { commitMutation } from 'api/graphql'
import { graphql } from 'relay-runtime'
import { ExistingJobButtonsContainer_DeleteJobMutation } from '__generated__/ExistingJobButtonsContainer_DeleteJobMutation.graphql'
import ExistingJobButtons from './ExistingJobButtons'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteJob: async () => {
      try {
        const result = await commitMutation<ExistingJobButtonsContainer_DeleteJobMutation>({
          mutation: graphql`
          mutation ExistingJobButtonsContainer_DeleteJobMutation($input: DeleteJobInput!) {
            deleteJob(input: $input) {
              job {
                status
              }
            }
          }
        `,
          variables: {
            input: {
              slug: ownProps.router.query.id,
            },
          },
        })
        if (result?.deleteJob?.job?.status === 'closed') {
          dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Job closed' }))
          browserHistory.push('/client/jobs')
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

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(ExistingJobButtons as any))
