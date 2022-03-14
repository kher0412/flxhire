import { ConfigProps, InjectedFormProps, reduxForm } from 'redux-form'
import { FormErrors } from 'types'
import QueryDialog, { IQueryDialogProps } from './QueryDialog'

export interface IQueryDialogFormValues {
  clientComments: string
}

const form: ConfigProps<IQueryDialogFormValues, IQueryDialogProps> = {
  form: 'queryTimesheet',
  validate: (values) => {
    const errors: FormErrors<IQueryDialogFormValues> = {}
    if (!values.clientComments) { errors.clientComments = 'Required' }
    return errors
  },
}

export default reduxForm(form)(QueryDialog)
