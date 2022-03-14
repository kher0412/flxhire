import React, { CSSProperties } from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@material-ui/core'
import { ResponsiveDialog, StaffingAgreement } from 'components'
import { Button, InfoMessage } from 'components/themed'
import { IContractForClient, IFreelancer } from 'types'
import { detectTimezoneOffset } from 'services/timeKeeping'
import { canRescheduleInterview, isPastInterview, getDefaultInterviewDate } from 'services/contract'
import { formatAsShortDateTime } from 'services/formatting'
import { CheckCircle } from '@material-ui/icons'
import InterviewForm from './components/InterviewForm'
import { ContainerProps } from './InterviewDialogContainer'

const infoMessageStyle: CSSProperties = {
  marginBottom: 12,
}

// eslint-disable-next-line max-len
type ContractFields = 'interview_date' | 'interview_date_1' | 'interview_date_2' | 'interview_date_3' | 'status' | 'calendly_url' | 'managed_off_platform'

interface IInterviewDialogProps extends ContainerProps {
  open: boolean
  freelancer: Pick<IFreelancer, 'id' | 'first_name' | 'timezone_offset' | 'avatar_url'>
  contract?: Pick<IContractForClient, ContractFields>
  contractId: string
  onClose: () => void
  onSuccess?: () => void
  connectionId?: string
}

const InterviewDialog = (props: IInterviewDialogProps) => {
  const { open, freelancer, contract, onClose, onSuccess, user, submit, contractId, connectionId } = props
  const managedOffPlatform = contract?.managed_off_platform

  const isReschedule = canRescheduleInterview(contract)
  const isUnacceptedReschedule = isReschedule && contract.status === 'pending'
  const isAcceptedReschedule = isReschedule && contract.status === 'interview_accepted'
  const isReInterview = isPastInterview(contract)
  const calendlyUrl = contract?.calendly_url || user?.calendly_url
  const defaultSchedulingMethod = calendlyUrl && user?.configuration?.enable_calendly ? 'schedule_via_calendly' : 'schedule_via_flexhire'

  let interviewDate1 = null
  if (isUnacceptedReschedule) interviewDate1 = contract.interview_date_1
  if (isAcceptedReschedule) interviewDate1 = contract.interview_date
  if (!interviewDate1) interviewDate1 = getDefaultInterviewDate()

  return (
    <ResponsiveDialog open={open} onClose={onClose} data-cy="interview-dialog" scroll="body">
      <DialogTitle data-cy="dialog-title">
        {isReschedule && `Reschedule interview with ${freelancer.first_name}`}
        {isReInterview && `Request another interview to ${freelancer.first_name}`}
        {!isReInterview && !isReschedule && `Request an interview to ${freelancer.first_name}`}
      </DialogTitle>

      <DialogContent>
        {managedOffPlatform && (
        <InfoMessage data-cy="imported_applicant_message" style={infoMessageStyle}>
          This applicant has been imported from another platform
        </InfoMessage>
        )}
        {isUnacceptedReschedule && (
        <InfoMessage data-cy="unaccepted_reschedule_message" style={infoMessageStyle}>
          An interview request has already been sent to {freelancer.first_name} with the proposed interview times below.
          You will be notified if {freelancer.first_name} accepts or rejects your request.
          Use this form if you need to reschedule and we'll notify {freelancer.first_name} for you
        </InfoMessage>
        )}
        {isAcceptedReschedule && (
        <InfoMessage data-cy="accepted_reschedule_message" style={infoMessageStyle}>
          An interview is scheduled with {freelancer.first_name} at {formatAsShortDateTime(contract.interview_date)}.
          Use this form if you need to reschedule.
        </InfoMessage>
        )}

        <InterviewForm
          contractId={contractId}
          initialValues={{
            timezone_offset: detectTimezoneOffset(),
            client_id: user?.id,
            freelancer_id: freelancer?.id,
            calendly_url: calendlyUrl,
            interview_scheduling_method: defaultSchedulingMethod,
            interview_date_1: interviewDate1,
            interview_date_2: isUnacceptedReschedule ? contract.interview_date_2 : null,
            interview_date_3: isUnacceptedReschedule ? contract.interview_date_3 : null,
          }}
          isReschedule={isReschedule}
          onSuccess={onSuccess}
          freelancer={freelancer}
          connectionId={connectionId}
        />
      </DialogContent>

      <Divider style={{ margin: '18px 0' }} />

      <DialogContent>
        <StaffingAgreement />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button onClick={submit} color="primary" data-cy="submit">
          <CheckCircle />
          {isReschedule && 'Reschedule Interview'}
          {!isReschedule && 'Request Interview'}
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default InterviewDialog
