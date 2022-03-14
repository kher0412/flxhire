import { connect, ConnectedProps } from 'react-redux'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { withRouter } from 'next/router'
import { extractQueryParams } from 'services/router'
import { RootState } from 'reducers'
import { IUserType } from 'types'
import { WithRouterProps } from 'next/dist/client/with-router'
import Signup from './Signup'
import { submitSignupForm, getJobData } from './SignupDucks'

const mapStateToProps = (state: RootState) => {
  const user = state.auth.currentUser
  return {
    configuration: user.configuration,
    job: state.signup.signupForm.job,
    serverError: state.signup.signupForm.serverError,
    isSubmitting: state.signup.signupForm.isSubmitting,
    loadingJob: state.signup.signupForm.loadingJob,
    initialValues: {
      email: user.email || user.unconfirmed_email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitForm: (formData, userType: IUserType, clientData?: any) => {
    const query = extractQueryParams(ownProps.router.asPath)
    const userData = Object.assign(formData, {
      job_slug: query.job,
      referer: query.referer,
    })

    dispatch(submitSignupForm(userData, userType, clientData))
  },
  getJobData: slug => dispatch(getJobData(slug)),
})

export const SignupForm = Signup

const validate = (values, ownProps: PropsFromRedux) => {
  const errors: any = {}

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

  if (!values.terms_of_service_approved) {
    errors.terms_of_service_approved = 'Must be accepted'
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

  // Validate job fields

  return errors
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

export type ContainerProps = PropsFromRedux & InjectedFormProps & WithRouterProps

const form = {
  form: 'Signup',
  validate,
}

export default withRouter(connector(reduxForm(form)(SignupForm as any)))
