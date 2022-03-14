import { getAPIClient } from 'api'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { createAction } from 'redux-actions'
import { getCurrentUser } from 'reducers/Auth'
import { trackError } from 'services/analytics'
import { browserHistory } from 'services/router'
import ImportJob from './ImportJob'

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
})

const mapDispatchToProps = dispatch => ({
  getJobs: async (params) => {
    try {
      return await getAPIClient().listJobsForIntegration(params)
    } catch (error) {
      trackError(error)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Something went wrong' }))
    }
  },
  importJob: async (params) => {
    try {
      const job = await getAPIClient().createJobIntegration(params)
      browserHistory.push('/client/job/[id]', `/client/job/${job.slug || job.id}`)
      return true
    } catch (error) {
      trackError(error)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Something went wrong' }))
      return false
    }
  },
  updateFirm: async (params) => {
    try {
      await getAPIClient().updateFirm(params)
      dispatch(getCurrentUser())
      return true
    } catch (error) {
      trackError(error)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Something went wrong' }))
      return false
    }
  },
  testAPIKey: async (params) => {
    try {
      const response = await getAPIClient().testJobIntegrationAPIKey(params)
      if (!response.valid) dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'The API key is invalid' }))
      return response.valid
    } catch (error) {
      trackError(error)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Something went wrong' }))
      return false
    }
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(ImportJob)
