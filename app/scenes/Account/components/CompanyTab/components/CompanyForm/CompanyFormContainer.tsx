import { FormErrors } from 'types'
import { reduxForm } from 'redux-form'
import CompanyForm, { ICompanyFormProps } from './CompanyForm'

export interface FormValues {
  name: string
  website: string
  description: string
  logo_url: string
  alternative_background: boolean
}

export default reduxForm<FormValues, ICompanyFormProps>({
  form: 'companyForm',
  validate: (values) => {
    const errors: FormErrors<FormValues> = {}
    if (!values.name) { errors.name = 'Required' }
    return errors
  },
})(CompanyForm)
