import { connect, ConnectedProps } from 'react-redux'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { RootState } from 'reducers'
import { submitSignupForm } from 'scenes/Signup/SignupDucks'
import SignupTimesheets from './SignupTimesheets'

const mapStateToProps = (state: RootState) => ({
  loading: state.signup.signupForm.isSubmitting,
  error: state.signup.signupForm.serverError,
})

const mapDispatchToProps = dispatch => ({
  submitForm: (formData) => {
    dispatch(submitSignupForm(formData, 'client'))
  },
})

const validate = (values) => {
  const errors = {} as { [key: string]: string }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more'
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = 'Required'
  } else if (values.password_confirmation !== values.password) {
    errors.password_confirmation = 'Doesn\'t match password'
  }

  if (!values.terms_of_service) {
    errors.terms_of_service = 'Must be accepted'
  }

  // Validate company-only fields.
  if (!values.first_name) {
    errors.first_name = 'Required'
  }
  if (!values.last_name) {
    errors.last_name = 'Required'
  }

  if (!values.company_name) {
    errors.company_name = 'Required'
  }

  return errors
}

const SignupTimesheetsForm = reduxForm({
  form: 'SignupTimesheets',
  validate,
})(SignupTimesheets)

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export type SignupTimesheetsContainerProps = PropsFromRedux & InjectedFormProps

export default connect(mapStateToProps, mapDispatchToProps)(SignupTimesheetsForm)
