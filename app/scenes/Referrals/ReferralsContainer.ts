import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { getAPIClient } from 'api'
import { RootState } from 'reducers'
import { getErrorText } from 'services/error'
import { trackError } from 'services/analytics'
import Referrals from './Referrals'

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
})

const mapDispatchToProps = dispatch => ({
  showSnackbarMessage: message => dispatch(createAction(TOGGLE_SNACKBAR)({ message })),
  send: async (email) => {
    try {
      await getAPIClient().inviteFriend(email)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Email sent' }))
    } catch (error) {
      trackError(error)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: getErrorText(error) }))
    }
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(Referrals)
