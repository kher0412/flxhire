import { getAPIClient } from 'api'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { setCurrentUser } from 'reducers/Auth'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { createAction } from 'redux-actions'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { trackError } from 'services/analytics'
import ContactForm from './ContactForm'

const form = {
  form: 'chatContact',
  validate: (values) => {
    const errors: any = {}

    if (!values.email) errors._error = 'Email is required'
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    return errors
  },
  onSubmit: async (values, dispatch, ownProps) => {
    try {
      const user = await getAPIClient().updateUser(ownProps.user?.id, values)
      ownProps.setCurrentUser(user)
    } catch (error) {
      trackError(error)
      ownProps.showSnackbarMessage(error.response || error.message || 'Something went wrong')
    }
  },
}

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: currentUser => dispatch(setCurrentUser({ currentUser })),
  showSnackbarMessage: message => dispatch(createAction(TOGGLE_SNACKBAR)({ message })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & InjectedFormProps

export default connector(reduxForm(form)(ContactForm))
