import React from 'react'
import { Avatar, Card, CardHeader, Step, StepButton, StepConnector, StepContent, Stepper } from '@material-ui/core'
import { Box } from 'components/themed'
import { Page, PageHeader, PageHeaderTitle, PageHeaderDescription, PageHeaderBreadcrumbs, PageBody, PageSidebar, PageContent } from 'components/Layouts/V3'
import { browserHistory, getLocationPathname } from 'services/router'
import { Save } from '@material-ui/icons'
import { ContainerProps } from './AddJobContainer'
import styles from './AddJob.module.css'
import JobEditorMain from './components/JobEditorMain'
import { IJobData } from './components/JobEditorMain/JobEditorMain'

export interface IAddJobProps {
}

interface IAddJobState {
  currentStep: number
  maxStep: number
}

class AddJob extends React.Component<IAddJobProps & ContainerProps, IAddJobState> {
  state = {
    currentStep: 0,
    maxStep: 0,
  }

  getJobSlug() {
    let jobSlug = this.props.router.query.id as string

    if (jobSlug === 'add_job') {
      return undefined
    }

    return jobSlug
  }

  componentDidMount() {
    const { resetForm, setAvoidBillingSetupDialog } = this.props

    resetForm()
    setAvoidBillingSetupDialog(true)
  }

  componentDidUpdate() {
    const { router } = this.props
    const { currentStep } = this.state
    const jobSlug = this.getJobSlug()
    const signupMode = (router.query.mode === 'signup')

    if (((signupMode && currentStep > 1) || (!signupMode && currentStep > 0)) && jobSlug && router.query.step) {
      // sync current step on browser navigation
      const step = this.getStepIndexFromName(router.query.step as string)

      if (step && this.state.currentStep !== step) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState(state => ({
          currentStep: step,
          maxStep: Math.max(state.maxStep, step - 1),
        }))
      }
    }
  }

  componentWillUnmount() {
    this.props.setAvoidBillingSetupDialog(false)
  }

  setInitialStep = (job: IJobData) => {
    const currentStep = this.detectCurrentStep()
    const maxStep = this.detectMaxStep(job)

    this.setState({
      maxStep: Math.max(1, maxStep),
      currentStep: Math.min(Math.max(1, currentStep), maxStep),
    })
  }

  detectMaxStep(job: IJobData) {
    const { companyDataComplete } = this.props
    const jobSlug = this.getJobSlug()

    // figure out what the max and initial current steps should be, based on user+job data
    if (job?.status === 'opened') {
      // published job, consider it fully complete regardless of what's filled out
      return 5
    }

    if (jobSlug && job) {
      if (job.questions?.length > 0 || job.project) {
        // screening done
        return 4
      }

      if (
        job.job_social_integrations?.length > 0 ||
        job.candidates_to_notify?.length > 0 ||
        job.referral_bounty > 0 ||
        job.job_integrations?.length > 0
      ) {
        // sourcing done
        return 3
      }

      // details done
      return 2
    }

    if (companyDataComplete) {
      return 1
    }

    return 0
  }

  detectCurrentStep() {
    const { router, companyDataComplete } = this.props
    const stepParam = router.query.step as string

    if (stepParam) {
      switch (stepParam) {
        case 'job': return 1
        case 'sourcing': return 2
        case 'screening': return 3
        case 'review': return 4
      }
    } else {
      if (companyDataComplete) {
        return 1
      }
    }

    // TODO: if this happens we should redirect to the company form I guess
    return 0
  }

  render() {
    const { router, currentUser, jobDetailsUnsaved } = this.props
    const { currentStep, maxStep } = this.state

    let signupMode = (router.query.mode === 'signup')
    let stepperActiveStep = currentStep
    let desktopStepperMaxStep = 1
    let defaultFreelancerTypeId = router.query.freelancer_type ? parseInt(router.query.freelancer_type as string, 10) : undefined
    let defaultFreelancerSubtypeId = router.query.freelancer_type ? parseInt(router.query.freelancer_subtype as string, 10) : undefined

    const jobSlugParam = this.getJobSlug()
    const firmSlug = currentUser.firm?.slug

    if (signupMode) {
      stepperActiveStep++
      desktopStepperMaxStep++
    }

    return (
      <Page>
        {this.renderTitle()}

        <PageBody>
          <PageSidebar sticky>
            <Box>
              <Stepper
                activeStep={Math.min(desktopStepperMaxStep, stepperActiveStep)}
                nonLinear
                orientation="vertical"
              >
                {signupMode && (
                  // not an actual step, only an indicator of progress when creating the first job posting as part of the client onboarding flow
                  <Step completed>
                    <StepButton disabled>
                      Account Creation
                    </StepButton>
                  </Step>
                )}

                <Step completed={maxStep > 0}>
                  <StepButton onClick={() => this.handleStepperStepChange(0)}>
                    About Your Company
                  </StepButton>
                </Step>

                <Step completed={maxStep > 1}>
                  <StepButton onClick={() => this.handleStepperStepChange(1)} disabled={maxStep < 1} data-cy="job-details">
                    Post Your Job
                  </StepButton>

                  <StepContent>
                    <Stepper
                      nonLinear
                      activeStep={stepperActiveStep - (signupMode ? 2 : 1)}
                      orientation="vertical"
                      style={{ paddingLeft: 0, marginTop: -12 }}
                      connector={(
                        <StepConnector className={styles.subconnector} />
                      )}
                    >
                      <Step completed={maxStep > 1} className={styles.substep}>
                        <StepButton onClick={() => this.handleStepperStepChange(1)} disabled={maxStep < 1}>
                          Job Details
                        </StepButton>
                      </Step>

                      <Step completed={maxStep > 2} className={styles.substep}>
                        <StepButton onClick={() => this.handleStepperStepChange(2)} disabled={maxStep < 2} data-cy="sourcing">
                          Sourcing
                        </StepButton>
                      </Step>

                      <Step completed={maxStep > 3} className={styles.substep}>
                        <StepButton onClick={() => this.handleStepperStepChange(3)} disabled={maxStep < 3} data-cy="screening">
                          Screening
                        </StepButton>
                      </Step>

                      <Step completed={maxStep > 4} className={styles.substep}>
                        <StepButton onClick={() => this.handleStepperStepChange(4)} disabled={maxStep < 4} data-cy="reivew">
                          Review &amp; Publish
                        </StepButton>
                      </Step>
                    </Stepper>
                  </StepContent>
                </Step>
              </Stepper>
            </Box>

            {jobDetailsUnsaved && (
              <Box>
                <Card variant="elevation" elevation={0}>
                  <CardHeader
                    avatar={(
                      <Avatar>
                        <Save />
                      </Avatar>
                    )}
                    subheader="You have unsaved changes"
                  />
                </Card>
              </Box>
            )}
          </PageSidebar>

          <PageContent maxWidth={currentStep === 2 ? 'xl' : 'lg'}>
            <JobEditorMain
              jobSlug={jobSlugParam}
              currentStep={currentStep}
              defaultFreelancerSubtypeId={defaultFreelancerSubtypeId}
              defaultFreelancerTypeId={defaultFreelancerTypeId}
              firmSlug={firmSlug}
              maxStep={maxStep}
              onStepChange={this.handleStepChange}
              onMobileStepClose={this.handleMobileStepClose}
              requireAccountSetup={this.shouldRenderPlanSelection()}
              router={router}
              onPaymentMethodAdded={() => this.forceUpdate()}
              onSetInitialStep={this.setInitialStep}
            />
          </PageContent>
        </PageBody>
      </Page>
    )
  }

  renderTitle() {
    const jobSlug = this.getJobSlug()
    let title = 'Create job posting'

    if (jobSlug) {
      title = 'Edit job posting'
    }

    return (
      <PageHeader>
        <PageHeaderTitle>
          {title}
        </PageHeaderTitle>

        <PageHeaderDescription>
          Create your job, source applicants, setup pre-screening and publish
        </PageHeaderDescription>

        <PageHeaderBreadcrumbs
          breadcrumbs={[
            // note: it's a little cheap to display the job slug instead of its actual title, but it's difficult to do in the current architecture
            // it should be good enough for now (certainly better than incorrectly showing "new job")
            { id: 1, name: 'Jobs', href: '/client/hire?tab=jobs' },
            { id: 2, name: jobSlug || 'New Job', href: `/client/job/${jobSlug}` },
          ]}
        />
      </PageHeader>
    )
  }

  shouldRenderPlanSelection() {
    const { currentUser } = this.props

    if (!currentUser?.firm) return false
    if (currentUser?.firm?.legacy_billing) return false

    return !currentUser?.firm?.billing_plan || !currentUser?.firm?.payment_method
  }

  handleStepperStepChange = (newStep: number) => {
    this.setState(state => ({
      currentStep: newStep,
      maxStep: Math.max(state.maxStep, newStep),
    }))

    this.setRoute(newStep)
  }

  handleMobileStepClose = () => {
    this.setState({
      currentStep: -1,
    })
  }

  handleStepChange = (newStep) => {
    this.setState(state => ({
      currentStep: newStep,
      maxStep: Math.max(state.maxStep, newStep),
    }))

    this.setRoute(newStep)
  }

  setRoute(stepIndex: number) {
    const { router } = this.props
    const jobId = this.getJobSlug()
    const stepName = this.getStepNameFromIndex(stepIndex)

    if (jobId && stepName) {
      const path = `/client/job/${jobId}/${stepName}`

      if (getLocationPathname(router) !== path) {
        browserHistory.push('/client/job/[id]/[step]', path, { shallow: true })
      }
    }
  }

  getStepNameFromIndex(stepIndex: number) {
    switch (stepIndex) {
      case 1:
        return 'job'

      case 2:
        return 'sourcing'

      case 3:
        return 'screening'

      case 4:
        return 'review'
    }

    return undefined
  }

  getStepIndexFromName(stepName: string) {
    switch (stepName) {
      case 'job':
        return 1

      case 'sourcing':
        return 2

      case 'screening':
        return 3

      case 'review':
        return 4
    }

    return 0
  }
}

export default AddJob
