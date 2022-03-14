import { connect, ConnectedProps } from 'react-redux'
import { reduxForm, formValueSelector, InjectedFormProps } from 'redux-form'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import ConfirmEmail from './ConfirmEmail'
import { CONFIRM_EMAIL_FORM, SEND_CONFIRMATION_EMAIL, CONFIRM_EMAIL_FORM_CLEAR_ERROR } from './ConfirmEmailDucks'

const validate = (values) => {
  const errors: any = {}
  if (!values.token) {
    errors.token = 'Enter the code you received via Email or click the link in it'
  }
  return errors
}

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
  serverError: state.confirmEmail.serverError,
  email: formValueSelector('confirmEmail')(state, 'email'),
  isSending: state.confirmEmail.isSending,
  isConfirming: state.confirmEmail.isConfirming,
})

const mapDispatchToProps = dispatch => ({
  sendConfirmationEmail: () => dispatch(createAction(SEND_CONFIRMATION_EMAIL)()),
  submitForm: formData => dispatch(createAction(CONFIRM_EMAIL_FORM)({ formData })),
  clearError: () => dispatch(createAction(CONFIRM_EMAIL_FORM_CLEAR_ERROR)()),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps & InjectedFormProps

export default withRouter(connector(reduxForm({
  form: 'confirmEmail',
  validate,
})(ConfirmEmail)) as any)
