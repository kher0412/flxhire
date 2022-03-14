import { reduxForm, InjectedFormProps } from 'redux-form'
import validate from 'components/JobPosting/validate'
import JobSourcingForm from './JobSourcingForm'

export const FORM_NAME = 'editSourcingForm'

const editSourcingForm = {
  form: FORM_NAME,
  validate,
  destroyOnUnmount: false,
  enableReinitialize: true,
}

export type JobSourcingFormContainerProps = InjectedFormProps

const JobSourcingFormContainer = reduxForm(editSourcingForm)(JobSourcingForm)

export default JobSourcingFormContainer
