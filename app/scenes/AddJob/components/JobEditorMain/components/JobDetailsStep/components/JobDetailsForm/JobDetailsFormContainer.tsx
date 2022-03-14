import { connect, ConnectedProps } from 'react-redux'
import { reduxForm, InjectedFormProps } from 'redux-form'
import validate from 'components/JobPosting/validate'
import { RootState } from 'reducers'
import JobDetailsForm, { IJobDetailsFormProps, JobDetailsFormData } from './JobDetailsForm'

export const FORM_NAME = 'editJobDetailsForm'

const editJobDetailsForm = {
  form: FORM_NAME,
  validate,
  destroyOnUnmount: false,
  enableReinitialize: true,
}

const mapStateToProps = (state: RootState, ownProps: any) => {
  const currentUser = state.auth.currentUser
  const initialValues = ownProps.initialValues || {}

  return {
    currentUser, // NEEDED for job validator!
    isSavingJob: state.clientHire.isSavingJob,
    initialValues: {
      ...initialValues,
      user_id: initialValues.user_id || currentUser?.id,
    },
  }
}

const connector = connect<any, any, IJobDetailsFormProps>(mapStateToProps)

export type IJobDetailsFormContainerProps = ConnectedProps<typeof connector> & InjectedFormProps<any, IJobDetailsFormProps>

const JobDetailsFormContainer = connector(reduxForm<JobDetailsFormData, IJobDetailsFormProps>(editJobDetailsForm)(JobDetailsForm))

export default JobDetailsFormContainer
