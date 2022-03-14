import { ConfigProps, reduxForm, reset } from 'redux-form'
import ApproveDialog, { IApproveDialogProps } from './ApproveDialog'

export interface IApproveDialogFormValues {
  clientRatingScore: number
  clientRatingFeedbackStop: string
  clientRatingFeedbackStart: string
  clientRatingFeedbackContinue: string
}

const form: ConfigProps<IApproveDialogFormValues, IApproveDialogProps> = {
  form: 'approveTimesheet',
  enableReinitialize: true,
  initialValues: {
    clientRatingScore: 2,
  },
}

export default reduxForm(form)(ApproveDialog)
