import { connect, ConnectedProps } from 'react-redux'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { CHANGE_PASSWORD_FORM } from 'reducers/Auth'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import ChangePassword from './ChangePassword'

const form = reduxForm({
  form: 'changePassword',
  validate(values: any) {
    const errors: any = {}
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
    return errors
  },
})

const mapStateToProps = (state: RootState) => {
  return {
    serverError: state.auth.changePasswordForm?.serverError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (formData) => { dispatch(createAction(CHANGE_PASSWORD_FORM)({ formData })) },
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = InjectedFormProps & ConnectedProps<typeof connector>

export default connector(form(ChangePassword))
