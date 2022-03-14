import { connect, ConnectedProps } from 'react-redux'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import { SUBMIT_COMPANY_FORM } from 'scenes/Account/AccountDucks'
import CompanyForm, { ICompanyFormProps } from './CompanyForm'

export const FORM_NAME = 'editCompanyForm'

const editCompanyForm = {
  form: FORM_NAME,
  destroyOnUnmount: false,
  enableReinitialize: true,
}

const mapStateToProps = (state: RootState) => {
  const currentUser = state.auth.currentUser

  return {
    initialValues: {
      ...(currentUser?.firm || {}),
      alternative_background: (currentUser?.firm?.background_theme === 'light'),
    },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: ({ formData }) => {
      dispatch(createAction(SUBMIT_COMPANY_FORM)({ formData }))
    },
  }
}

const connector = connect<any, any, ICompanyFormProps>(mapStateToProps, mapDispatchToProps)

export type CompanyFormContainerProps = ConnectedProps<typeof connector> & InjectedFormProps<any, ICompanyFormProps>

export default connector(reduxForm<any, ICompanyFormProps>(editCompanyForm)(CompanyForm as any)) // TODO: fix :|
