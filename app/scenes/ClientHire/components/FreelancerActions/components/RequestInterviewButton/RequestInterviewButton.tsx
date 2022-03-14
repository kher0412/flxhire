import React, { useState } from 'react'
import { IContractStatus, IJob } from 'types'
import { useOnMount } from 'hooks'
import InterviewsIcon from 'components/Icons/InterviewsIcon'
import dynamic from 'services/dynamic'
import { Button } from 'components/themed'
import { graphql, useFragment } from 'react-relay'
import { isPastInterview } from 'services/contract'
import { canRequestInterview } from 'services/freelancer'
import { jobActionsDisabled } from 'services/job'
import { RequestInterviewButton_Contract$key } from '__generated__/RequestInterviewButton_Contract.graphql'
import { RequestInterviewButton_Freelancer$key } from '__generated__/RequestInterviewButton_Freelancer.graphql'
import { RequestInterviewButton_Job$key } from '__generated__/RequestInterviewButton_Job.graphql'

const InterviewDialog = dynamic(() => import(/* webpackChunkName: "InterviewDialog" */'components/InterviewDialog'), { ssr: false }) as any

interface IRequestInterviewButtonProps {
  contract: RequestInterviewButton_Contract$key
  freelancer: RequestInterviewButton_Freelancer$key
  job: RequestInterviewButton_Job$key
  autoOpenAction?: string
  connectionId?: string
}

const RequestInterviewButton = (props: IRequestInterviewButtonProps) => {
  const { contract: contractProp, job: jobProp, freelancer: freelancerProp, autoOpenAction, connectionId } = props
  const job = useFragment(graphql`
    fragment RequestInterviewButton_Job on Job {
      rawId
      status
    }
  `, jobProp)
  const freelancer = useFragment(graphql`
    fragment RequestInterviewButton_Freelancer on User {
      rawId
      firstName
      timezoneOffset
      avatarUrl
    }
  `, freelancerProp)
  const contract = useFragment(graphql`
    fragment RequestInterviewButton_Contract on Contract {
      id
      status
      interviewDate
      interviewDate1
      interviewDate2
      interviewDate3
      calendlyUrl
      managedOffPlatform
    }
  `, contractProp)
  const [dialogOpen, setDialogOpen] = useState(false)

  const interviewRequested = contract?.status === 'pending'
  const interviewRejected = contract?.status === 'interview_rejected'
  const interviewAccepted = contract?.status === 'interview_accepted'
  const interviewIsPast = isPastInterview({ status: contract?.status as IContractStatus, interview_date: contract?.interviewDate as string })
  const shouldRemoveFromList = !interviewRequested && !interviewAccepted && !interviewRejected && !interviewIsPast

  let label = 'Request Interview'

  if (interviewRequested || interviewAccepted) {
    label = 'Reschedule'
  }

  if (interviewRejected || interviewIsPast) {
    label = 'Re-Interview'
  }

  const requestable = canRequestInterview({ status: contract?.status as IContractStatus })

  useOnMount(() => {
    if (autoOpenAction === 'interview' && requestable) setDialogOpen(true)
  })

  if (!requestable) return null

  return (
    <React.Fragment>
      {dialogOpen && (
        <InterviewDialog
          open
          onClose={() => setDialogOpen(false)}
          onSuccess={() => {
            setDialogOpen(false)
          }}
          jobId={job?.rawId}
          contractId={contract?.id}
          freelancer={{
            id: freelancer?.rawId,
            first_name: freelancer?.firstName,
            timezone_offset: freelancer?.timezoneOffset,
            avatar_url: freelancer?.avatarUrl,
          }}
          contract={{
            job_id: job?.rawId,
            interview_date: contract?.interviewDate,
            interview_date_1: contract?.interviewDate1,
            interview_date_2: contract?.interviewDate2,
            interview_date_3: contract?.interviewDate3,
            status: contract?.status,
            calendly_url: contract?.calendlyUrl,
            managed_off_platform: contract?.managedOffPlatform,
          }}
          connectionId={shouldRemoveFromList ? connectionId : null}
        />
      )}

      <Button
        color="primary"
        disabled={jobActionsDisabled({ status: (job?.status) as IJob['status'] })}
        onClick={() => setDialogOpen(true)}
        data-cy="request-interview"
      >
        <InterviewsIcon width={24} height={24} />
        {label}
      </Button>
    </React.Fragment>
  )
}

export default RequestInterviewButton
