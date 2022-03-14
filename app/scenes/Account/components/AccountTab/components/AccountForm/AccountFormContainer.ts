import { reduxForm, InjectedFormProps } from 'redux-form'
import AccountForm, { IAccountFormProps } from './AccountForm'

const form = {
  form: 'accountForm',
  validate: (values) => {
    const errors: any = {}
    if (!values.firstName) { errors.firstName = 'Required' }
    if (!values.lastName) { errors.lastName = 'Required' }
    if (!values.teamInvitationMessage) { errors.teamInvitationMessage = 'Required' }
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    if (values.password || values.currentPassword || values.confirmPassword) {
      if (values.password && values.password.length < 4) {
        errors.password = 'Must be 4 characters or more'
      }

      if (!values.currentPassword) {
        errors.currentPassword = 'Required'
      }

      if (values.password !== values.confirmPassword) {
        errors.password = 'new password and confirm password must be the same'
        errors.confirmPassword = 'new password and confirm password must be the same'
      }
    }
    return errors
  },
}

export type AccountFormContainerProps = InjectedFormProps<any, IAccountFormProps>

export default reduxForm<any, IAccountFormProps>(form)(AccountForm)
