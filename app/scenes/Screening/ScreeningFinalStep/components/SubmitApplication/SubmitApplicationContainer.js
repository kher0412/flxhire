import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { trackError } from 'services/analytics'
import { SET_CURRENT_USER } from 'reducers/Auth'
import { getAPIClient } from 'api'
import SubmitApplication from './SubmitApplication'

const mapDispatchToProps = (dispatch) => {
  return {
    getQuestions: async () => {
      try {
        return await getAPIClient().getScreeningQuestions()
      } catch (error) {
        trackError(error)
      }
      return []
    },
    getCurrentUser: async () => {
      try {
        const currentUser = await getAPIClient().getCurrentUser()
        dispatch(createAction(SET_CURRENT_USER)({ currentUser }))
      } catch (error) {
        trackError(error)
      }
    },
  }
}

export default connect(null, mapDispatchToProps)(SubmitApplication)
