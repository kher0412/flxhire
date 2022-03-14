import { connect, ConnectedProps } from 'react-redux'
import { FORGOT_PASSWORD_FORM } from 'reducers/Auth'
import { createAction } from 'redux-actions'
import { InjectedFormProps, reduxForm } from 'redux-form'
import ForgotPassword from './ForgotPassword'

const form = reduxForm({
  form: 'resetPassword',
  validate(values: any) {
    const errors: any = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    return errors
  },
})

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: formData => new Promise((resolve, reject) => {
      dispatch(createAction(FORGOT_PASSWORD_FORM)({ formData, resolve, reject }))
    }),
  }
}

const connector = connect(null, mapDispatchToProps)

export type ContainerProps = InjectedFormProps & ConnectedProps<typeof connector>

export default connector(form(ForgotPassword))
