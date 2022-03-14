import React from 'react'
import { Card, Collapse, Grid } from '@material-ui/core'
import { ExternalLink, GridExpandable, MobileCompactStep } from 'components'
import { NextRouter } from 'next/router'
import { InfoMessage } from 'components/themed'
import { useOnMount } from 'hooks'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { IJob } from 'types'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { JobEditorMain_JobQuery } from '__generated__/JobEditorMain_JobQuery.graphql'
import CompanyForm from './components/CompanyForm'
import JobDetailsStep from './components/JobDetailsStep'
import JobSourcingStep from './components/JobSourcingStep'
import JobPreview from './components/JobPreview'
import JobScreeningStep from './components/JobScreeningStep'
import PlanSelectionForm from './components/PlanSelectionForm'
import PaymentForm from './components/PaymentForm'

type JobFields = 'slug' | 'firm_slug' | 'questions' | 'status' | 'project' | 'job_social_integrations' | 'candidates_to_notify' | 'referral_bounty' | 'job_integrations'
export type IJobData = JobEditorMain_JobQuery['response']['job'] & Pick<IJob, JobFields>

export interface IJobEditorMainProps {
  jobSlug: string
  firmSlug: string
  currentStep: number
  maxStep: number
  defaultFreelancerTypeId: number // TODO: check if these 2 can be cleaned up
  defaultFreelancerSubtypeId: number
  requireAccountSetup: boolean
  router: NextRouter // TODO: useRouter instead
  onStepChange: (stepIndex: number) => void
  onMobileStepClose: () => void
  onPaymentMethodAdded: () => void
  onSetInitialStep: (jobData: IJobData) => void
}

function JobEditorMain(props: IJobEditorMainProps) {
  const {
    jobSlug,
    firmSlug,
    currentStep,
    maxStep,
    defaultFreelancerTypeId,
    defaultFreelancerSubtypeId,
    requireAccountSetup,
    router,
    onStepChange,
    onMobileStepClose,
    onPaymentMethodAdded,
    onSetInitialStep,
  } = props

  // Note: don't use this value directly, as changing between mobile/desktop view will clear the form
  // Whether it's mobile or desktop view has to be frozen on mount once.
  const mediaQueryIsSmallScreen = useMediaQuery('(max-width:1200px)')

  // TODO: there are some fields in this query which are used by being passed into PaymentForm, should be cleaned up together
  const queryResult = useLazyLoadQuery<JobEditorMain_JobQuery>(graphql`
    query JobEditorMain_JobQuery($jobSlug: String, $hasJob: Boolean!) {
      job(slug: $jobSlug) @include(if: $hasJob) {
        id
        slug
        status
        user {
          firm {
            slug
            name
            description
          }
        }
        ...JobDetailsStep_Job
        ...JobSourcingStep_Job
        ...JobScreeningStep_Job
        ...JobPreviewContainer_Job
      }
    }
  `, {
    jobSlug: jobSlug as string,
    hasJob: !!jobSlug,
  }, {
    fetchPolicy: 'store-and-network',
  })

  const job = queryResult?.job
  const [isSmallScreen, setSmallScreen] = React.useState(false)

  React.useEffect(() => {
    // TODO: this currently calls the step setup in AddJob
    // instead, it could be done here using an 'onSetMaxStep' function so that it's one less tangle
    onSetInitialStep(job as IJobData)

    if (mediaQueryIsSmallScreen) {
      setSmallScreen(true)
    }
  }, [])

  let reviewStep = (
    <JobPreview jobId={jobSlug} job={job} status={job?.status} />
  )

  if (requireAccountSetup) {
    // replace job preview on last step with plan selection
    // TODO: this decision should be done in its own component instead
    reviewStep = (
      <PlanSelectionForm jobId={jobSlug} />
    )
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {isSmallScreen && (
          <React.Fragment>
            <MobileCompactStep
              title="Introduce your company"
              open={currentStep === 0}
              stepIndex={1}
              onOpen={() => onStepChange(0)}
              onClose={onMobileStepClose}
              completed={maxStep > 0}
            >
              <CompanyForm onContinue={() => onStepChange(1)} />
            </MobileCompactStep>

            <MobileCompactStep
              title="Job details"
              open={currentStep === 1}
              stepIndex={2}
              onOpen={() => onStepChange(1)}
              onClose={onMobileStepClose}
              disabled={maxStep < 1} // allow navigating to the job details step manually at all times if the company step is completed
              completed={maxStep > 1}
            >
              <JobDetailsStep
                job={job}
                jobId={jobSlug}
                firmSlug={firmSlug}
                status={job?.status}
                onContinue={() => onStepChange(2)}
              />
            </MobileCompactStep>

            <MobileCompactStep
              title="Sourcing"
              open={currentStep === 2}
              stepIndex={3}
              onOpen={() => onStepChange(2)}
              onClose={onMobileStepClose}
              disabled={maxStep < 2}
              completed={maxStep > 2}
            >
              <JobSourcingStep
                job={job}
                onContinue={() => onStepChange(3)}
              />
            </MobileCompactStep>

            <MobileCompactStep
              title="Screening"
              open={currentStep === 3}
              stepIndex={4}
              onOpen={() => onStepChange(3)}
              onClose={onMobileStepClose}
              disabled={maxStep < 4}
              completed={maxStep > 3}
            >
              <JobScreeningStep
                jobFragmentRef={job}
                onContinue={() => onStepChange(4)}
              />
            </MobileCompactStep>

            <MobileCompactStep
              title={job?.status === 'opened' ? 'Update Publication' : 'Review & Publish'}
              open={currentStep === 4}
              stepIndex={5}
              onOpen={() => onStepChange(4)}
              onClose={onMobileStepClose}
              disabled={maxStep < 5}
              completed={maxStep > 4}
            >
              {reviewStep}
            </MobileCompactStep>
          </React.Fragment>
        )}

        {!isSmallScreen && (
          <React.Fragment>
            <Collapse in={currentStep === 0} mountOnEnter unmountOnExit>
              <CompanyForm onContinue={() => onStepChange(1)} />
            </Collapse>

            <Collapse in={currentStep === 1} mountOnEnter unmountOnExit>
              <JobDetailsStep
                job={job}
                jobId={jobSlug}
                firmSlug={firmSlug}
                status={job?.status}
                onContinue={() => onStepChange(2)}
              />
            </Collapse>

            <Collapse in={currentStep === 2} mountOnEnter unmountOnExit>
              <JobSourcingStep
                job={job}
                onContinue={() => onStepChange(3)}
              />
            </Collapse>

            <Collapse in={currentStep === 3} mountOnEnter unmountOnExit>
              <JobScreeningStep
                jobFragmentRef={job}
                onContinue={() => onStepChange(4)}
              />
            </Collapse>

            <Collapse in={currentStep === 4} mountOnEnter unmountOnExit>
              {reviewStep}
            </Collapse>
          </React.Fragment>
        )}
      </Grid>

      <GridExpandable item xs={12} expand={requireAccountSetup} unmountOnExit={false}>
        <PaymentForm
          jobId={jobSlug}
          job={job}
          show={currentStep === 4}
          onPaymentMethodAdded={onPaymentMethodAdded}
        />
      </GridExpandable>

      {(firmSlug && jobSlug && job?.status === 'opened') && (
        <Grid item xs={12}>
          <InfoMessage>
            Share your job with the world at <ExternalLink href={`flexhire.com/${firmSlug}/${jobSlug}`} />
          </InfoMessage>
        </Grid>
      )}
    </Grid>
  )
}

export default React.memo(JobEditorMain)
