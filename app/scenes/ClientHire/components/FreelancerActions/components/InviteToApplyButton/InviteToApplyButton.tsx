import React from 'react'
import { IJob } from 'types'
import { ConfirmButton } from 'components'
import { Button } from 'components/themed'
import { useDispatchAction } from 'hooks'
import { createAction } from 'redux-actions'
import { SEND_NOTIFICATION } from 'scenes/ClientHire/HireDucks'
import { graphql, useFragment } from 'react-relay'
import { jobActionsDisabled } from 'services/job'
import { InviteToApplyButton_Contract$key } from '__generated__/InviteToApplyButton_Contract.graphql'
import { InviteToApplyButton_Freelancer$key } from '__generated__/InviteToApplyButton_Freelancer.graphql'
import { InviteToApplyButton_Job$key } from '__generated__/InviteToApplyButton_Job.graphql'
import { Send } from '@material-ui/icons'

interface IInviteToApplyButtonProps {
  contract: InviteToApplyButton_Contract$key
  freelancer: InviteToApplyButton_Freelancer$key
  job: InviteToApplyButton_Job$key
}

const InviteToApplyButton = ({ contract: contractProp, freelancer: freelancerProp, job: jobProp }: IInviteToApplyButtonProps) => {
  const freelancer = useFragment(graphql`
    fragment InviteToApplyButton_Freelancer on User {
      firstName
      rawId
    }
  `, freelancerProp)
  const contract = useFragment(graphql`
    fragment InviteToApplyButton_Contract on Contract {
      status
      jobOpportunitySentAt
    }
  `, contractProp)
  const job = useFragment(graphql`
    fragment InviteToApplyButton_Job on Job {
      rawId
      status
    }
  `, jobProp)
  const freelancerId = freelancer?.rawId
  const jobId = job?.rawId
  const notify = useDispatchAction(() => createAction(SEND_NOTIFICATION)({ jobId, freelancerId }), [jobId, freelancerId])

  const contractCompatible = !contract || ['job_application_invited', 'job_application_draft'].includes(contract.status)
  const showButton = jobId && contractCompatible
  const sent = contract?.status === 'job_application_invited' || contract?.jobOpportunitySentAt

  if (!showButton) return null

  return (
    <ConfirmButton
      component={Button}
      color="primary"
      disabled={sent || jobActionsDisabled({ status: job?.status as IJob['status'] })}
      onClick={notify}
      data-cy="send-invitation"
      dialogTitle="Notify about your job"
      dialogConfirmLabel="Send"
      dialogMessage={(
        <React.Fragment>
          To notify {freelancer.firstName} to apply to your job simply press send below.
          If {freelancer.firstName} is interested and applies you will be emailed and can easily request an interview as a next step.
        </React.Fragment>
          )}
    >
      {({ isSmallScreen }) => (
        <React.Fragment>
          <Send />
          {!isSmallScreen && (sent ? 'Notification Sent' : 'Notify about your job')}
          {isSmallScreen && (sent ? 'Notified' : 'Notify')}
        </React.Fragment>
      )}
    </ConfirmButton>
  )
}

export default InviteToApplyButton
