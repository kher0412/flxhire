import { connect, ConnectedProps } from 'react-redux'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import PasswordSetup from './PasswordSetup'
import { SET_PASSWORD } from './PasswordSetupDucks'

const validate = (values) => {
  const errors: any = {}
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.password_confirmation) {
    errors.password_confirmation = 'Required'
  }
  if (values.password_confirmation !== values.password && !errors.password_confirmation) {
    errors.password_confirmation = 'Does not match password'
  }
  return errors
}

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
  serverError: state.passwordSetup.serverError,
  isSending: state.passwordSetup.isSending,
})

const mapDispatchToProps = dispatch => ({
  submitForm: formData => dispatch(createAction(SET_PASSWORD)({ formData })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps & InjectedFormProps

export default withRouter(connector(reduxForm({
  form: 'passwordSetup',
  validate,
})(PasswordSetup)) as any)
