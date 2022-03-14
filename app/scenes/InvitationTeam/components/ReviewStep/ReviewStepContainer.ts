import { connect, ConnectedProps } from 'react-redux'
import { reduxForm, formValueSelector, InjectedFormProps, ConfigProps } from 'redux-form'
import { RootState } from 'reducers'
import { FormErrors } from 'types'
import ReviewStep, { IReviewStepProps } from './ReviewStep'

export interface IReviewStepFormFields {
  team_invitation_message: string
}

const form: ConfigProps<IReviewStepFormFields, IReviewStepProps> = {
  form: 'SendInvitationDialogForm',
  enableReinitialize: true, // needed in case invitation type/role is changed
  validate: (values) => {
    const errors: FormErrors<IReviewStepFormFields> = {}

    if (!values.team_invitation_message) { errors.team_invitation_message = 'Required' }

    return errors
  },
}

interface IReviewStepContainerProps {
  invitationType: 'individual' | 'manager' | 'admin'
}

const mapStateToProps = (state: RootState, { invitationType }: IReviewStepContainerProps) => ({
  currentUser: state.auth.currentUser,
  invitationMargin: state.auth.currentUser?.invite_margin,
  jobs: state.InvitationTeam.jobs,
  teamInvitationMessage: formValueSelector(form.form)(state, 'team_invitation_message'),
  initialValues: {
    team_invitation_message: invitationType === 'individual' ? state.auth.currentUser.team_invitation_message : state.auth.currentUser.manager_invitation_message,
  },
})

const connector = connect(mapStateToProps)

export type ReviewStepContainerProps = IReviewStepContainerProps & ConnectedProps<typeof connector> & InjectedFormProps<IReviewStepFormFields, IReviewStepProps>

export default connector(reduxForm<IReviewStepFormFields, IReviewStepProps>(form)(ReviewStep))
