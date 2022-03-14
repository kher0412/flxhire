import { connect, ConnectedProps } from 'react-redux'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { createAction } from 'redux-actions'
import { extractQueryParams } from 'services/router'
import { withRouter } from 'next/router'
import { WithRouterProps } from 'next/dist/client/with-router'
import { RootState } from 'reducers'
import Login from './Login'
import { LOGIN_FORM, LOGIN_BY_TOKEN } from './LoginDucks'

const validate = (values) => {
  const errors: any = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) { errors.password = 'Required' }
  return errors
}

const mapStateToProps = (state: RootState) => ({
  serverError: state.login.serverError,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loginByToken: (token, email) => dispatch(createAction(LOGIN_BY_TOKEN)({ email, token })),
  submitForm: (reduxFormData) => {
    const query = extractQueryParams(ownProps.router.asPath)
    const url = query.url
    const formData = {
      referer: query.referer,
      job_slug: query.job,
      ...reduxFormData,
    }
    dispatch(createAction(LOGIN_FORM)({
      formData,
      url,
    }))
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)


const form = reduxForm({
  form: 'login',
  validate,
})

export type ContainerProps = ConnectedProps<typeof connector> & InjectedFormProps & WithRouterProps

export default withRouter(connector(form(Login)))
