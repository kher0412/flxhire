import { useState, useCallback } from 'react'
import dynamic from 'services/dynamic'
import { ResponsiveDialog, PagePlaceholder } from 'components'
import { isProfileMatching } from 'services/job'
import { getAPIClient } from 'api'
import { browserHistory } from 'services/router'
import { IFreelancer, IJob } from 'types'
import { isClient, isGuest, isMember } from 'services/user'
import { getErrorDescription, getErrorTitle } from 'services/error'
import { useAPIRead, useCurrentUser, useDispatchAction, useOnMount } from 'hooks'
import { isPrerendering } from 'services/prerender'
import { APPLY_FOR_JOB } from 'scenes/Job/JobDucks'
import { createAction } from 'redux-actions'
import { trackEvent } from 'services/analytics'

const JobSpecConfirmationDialog = dynamic(() => import(/* webpackChunkName: "JobSpecConfirmationDialog" */'./components/JobSpecConfirmationDialog')) as any
const FakeApplyDialog = dynamic(() => import(/* webpackChunkName: "FakeApplyDialog" */'./components/FakeApplyDialog')) as any

export interface IJobApplicationDialogProps {
  autoApply?: boolean
  open?: boolean
  job: IJob
  jobId: string | number
  apply: (jobId: string | number, status: null | 'job_application_draft' | 'job_application_sent') => any
  onClose: () => any
}

type ApplyStep = 'none' | 'confirmingJobSpec' | 'sent'

const useContainer = (props: IJobApplicationDialogProps) => {
  const { job, jobId, autoApply, open } = props
  const [user] = useCurrentUser()
  const [step, setStep] = useState('none' as ApplyStep)
  const [draftSent, setDraftSent] = useState(false)
  const apply = useDispatchAction((status: null | 'job_application_draft' | 'job_application_sent') => createAction(APPLY_FOR_JOB)({ jobId, status }), [jobId])
  const freelancer = useAPIRead(() => getAPIClient().getMember(user?.profile?.slug) as Promise<IFreelancer>, { preload: false })
  const sendDraftApplication = () => {
    if (!draftSent && jobId && isMember(user)) {
      if (job?.contract?.status !== 'job_application_draft') apply('job_application_draft')
      setDraftSent(true)
    }
  }

  const refresh = async () => {
    if (isMember(user)) await freelancer.refresh()
  }

  const confirmJobSpec = useCallback(() => {
    trackEvent('Job Spec Confirmed') // TODO: would be cool to detect if user accepted to lower their rate.
    setStep('sent')
    apply('job_application_sent')
  }, [])

  useOnMount(async () => {
    if (!isPrerendering()) await refresh()
  })

  if (!isPrerendering() && (autoApply || open)) {
    if (isGuest(user)) {
      browserHistory.push('/signup/[user_type]', `/signup/member?job=${jobId}`)
    } else if (isMember(user)) {
      sendDraftApplication()

      if (user?.status === 'pending' || !user?.profile?.open_to_opportunities) {
        browserHistory.push('/profile', `/profile?job=${jobId}`)
      } else if (freelancer.value) {
        if (!isProfileMatching(freelancer.value, job)) {
          if (step === 'none') {
            setStep('confirmingJobSpec')
            trackEvent('Job Spec Confirmation Dialog Opened')
          }
        } else if (step !== 'sent') {
          apply('job_application_sent')
          setStep('sent')
        }
      }
    }
  }

  return {
    user,
    step,
    error: freelancer.error,
    freelancer: freelancer.value,
    loading: freelancer.loading,
    confirmJobSpec,
  }
}

const JobApplicationDialog = (props) => {
  const { job, open, autoApply, onClose } = props
  const { user, step, loading, freelancer, error, confirmJobSpec } = useContainer(props)

  if (!open && !autoApply) return null

  if (error) {
    return (
      <ResponsiveDialog open>
        <PagePlaceholder
          title={getErrorTitle(error)}
          subtitle={getErrorDescription(error)}
        />
      </ResponsiveDialog>
    )
  }

  if (loading) {
    return (
      <ResponsiveDialog open>
        <PagePlaceholder
          title="Please Wait"
          subtitle="Preparing your Job Application..."
        />
      </ResponsiveDialog>
    )
  }

  if (isClient(user) && !isMember(user)) {
    return <FakeApplyDialog open close={onClose} />
  }

  if (step === 'confirmingJobSpec') {
    return (
      <JobSpecConfirmationDialog
        open
        onClose={onClose}
        onConfirm={confirmJobSpec}
        job={job}
        user={freelancer}
      />
    )
  }

  return null
}

export default JobApplicationDialog
