import React, { useCallback, useEffect, useState } from 'react'
import { Card, Collapse, Step, StepButton, Stepper } from '@material-ui/core'
import {
  MediaQuery,
  PageHeader,
  PageBody,
  PageContent,
  PageSidebar,
  MobileCompactStep,
  PageBundlePlaceholder,
} from 'components'
import { IContractForFreelancer } from 'types'
import { getAPIClient } from 'api'
import { trackError, trackEvent } from 'services/analytics'
import { useRouter } from 'next/router'
import {
  getCodeTestRequests,
  getQuestionsRequests,
  hasCodeTestRequests,
  hasQuestionsRequests,
  hasScreening,
  hasVideoIntroRequests,
  isScreeningAccepted,
  isScreeningRejected,
} from 'services/contract'
import { browserHistory } from 'services/router'
import { useCurrentUser, useSnackbar } from 'hooks'
import AcceptRequestsForm from './components/AcceptRequestsForm'
import QuestionsForm from './components/QuestionsForm'
import CodeTestForm from './components/CodeTestForm'

const useContainer = () => {
  const router = useRouter()

  // Redux
  const toggleSnackbar = useSnackbar()
  const [user, refreshUser] = useCurrentUser()

  // Local State
  const [currentStep, setCurrentStep] = useState(0)
  // Showing the stepper is disabled when the video recorder is opened
  const [showStepper, setShowStepper] = useState(true)
  const [contract, setContract] = useState(null as IContractForFreelancer)
  const [error, setError] = useState(null as string)

  // Going to next step
  const goToQuestionsStep = useCallback(() => setCurrentStep(1), [])

  const goToCodeTestStep = useCallback(() => setCurrentStep(2), [])

  const goToNextStepContract = (contractData: IContractForFreelancer) => {
    if (currentStep < 0) setCurrentStep(0)
    const hasQuestions = hasQuestionsRequests(contractData) || hasVideoIntroRequests(contractData)
    const hasCodeTest = hasCodeTestRequests(contractData)
    if (currentStep === 0) {
      if (hasQuestions) {
        goToQuestionsStep()
      } else if (hasCodeTest) {
        goToCodeTestStep()
      }
    }
    if (currentStep === 1 && hasCodeTest) goToCodeTestStep()
  }
  const goToNextStep = useCallback(() => goToNextStepContract(contract), [contract])

  // Route change callbacks
  const goToDashboard = useCallback(() => browserHistory.push('/member/dashboard'), [])

  // Data Refresh callbacks
  const refresh = useCallback(async () => {
    try {
      const contractData = await getAPIClient().getContract(router.query.id as any) as IContractForFreelancer
      // Go to dashboard if there is no screening
      if (hasScreening(contractData)) {
        setContract(contractData)
        if (isScreeningAccepted(contractData) && currentStep === 0) {
          goToNextStepContract(contractData)
        } else {
          trackEvent('Job Screening Viewed')
        }
      } else {
        goToDashboard()
      }
    } catch (err) {
      trackError(err)
      setError(err.response || err.message)
    }
  }, [router.query.id, currentStep])

  const refreshAll = () => { refresh(); refreshUser() }

  // User Actions Callbacks
  const handleFinish = useCallback(() => {
    toggleSnackbar(`Thank you! ${contract.client.first_name} from ${contract.company_name} will be notified`)
    goToDashboard()
    trackEvent('Job Screening Completed')
  }, [contract?.client?.first_name, contract?.company_name])

  const accept = useCallback(async () => {
    try {
      await getAPIClient().acceptContractRequests(contract.id)
      refresh()
      trackEvent('Job Screening Accepted')
    } catch (err) {
      trackError(err)
      setError(err.response || err.message)
    }
  }, [contract?.id])

  const handleDelete = () => {
    refreshAll()
    toggleSnackbar('Answer deleted')
  }

  const handleSave = () => {
    refreshAll()
    toggleSnackbar('Answer saved')
  }

  // Mount logic
  useEffect(() => { if (!contract) refresh() })

  return {
    contract,
    error,
    accept,
    handleFinish,
    refreshAll,
    handleDelete,
    handleSave,
    currentStep,
    setCurrentStep,
    showStepper,
    setShowStepper,
    user,
    goToCodeTestStep,
    goToQuestionsStep,
    refresh,
    goToNextStep,
  }
}

const JobScreening = () => {
  const {
    contract,
    error,
    currentStep,
    accept,
    handleFinish,
    handleDelete,
    handleSave,
    setCurrentStep,
    showStepper,
    setShowStepper,
    user,
    goToCodeTestStep,
    goToQuestionsStep,
    refresh,
    goToNextStep,
  } = useContainer()

  if (!contract || error) return <PageBundlePlaceholder error={error} />

  const accepted = isScreeningAccepted(contract)
  const rejected = isScreeningRejected(contract)
  const questionsRequests = getQuestionsRequests(contract)
  const hasQuestions = questionsRequests.length > 0 || hasVideoIntroRequests(contract)
  const questionsAnswered = questionsRequests.filter(cr => cr.status === 'completed').length === questionsRequests.length
  const codeTestRequests = getCodeTestRequests(contract)
  const hasCodeTest = codeTestRequests.length > 0
  const projectSubmission = codeTestRequests?.[0]?.project_submission
  const codeTestCompleted = codeTestRequests?.[0]?.status === 'completed'

  return (
    <React.Fragment>
      <PageHeader compact />
      <PageBody>
        <PageSidebar sticky>
          {showStepper && (
            <Card raised style={{ padding: 24 }}>
              <Stepper
                activeStep={currentStep}
                nonLinear
                orientation="vertical"
              >
                <Step completed={accepted}>
                  <StepButton onClick={() => setCurrentStep(0)} data-cy="step-accept">
                    Pre-Interview Request
                  </StepButton>
                </Step>

                {hasQuestions && (
                  <Step completed={questionsAnswered}>
                    <StepButton onClick={() => setCurrentStep(1)} data-cy="step-questions">
                      Questions
                    </StepButton>
                  </Step>
                )}

                {hasCodeTest && (
                  <Step completed={codeTestCompleted}>
                    <StepButton onClick={() => setCurrentStep(2)} data-cy="step-code-test">
                      Code Test
                    </StepButton>
                  </Step>
                )}
              </Stepper>
            </Card>
          )}
        </PageSidebar>

        <PageContent maxWidth="lg">
          <Card raised style={{ overflow: 'visible' }}>
            <MediaQuery maxWidth={1200}>
              <MobileCompactStep
                title="Pre-Interview Request"
                open={currentStep === 0}
                stepIndex={1}
                onOpen={() => setCurrentStep(0)}
                onClose={() => setCurrentStep(-1)}
                completed={accepted}
              >
                <AcceptRequestsForm
                  contract={contract}
                  user={user}
                  goToQuestionsStep={hasQuestions ? goToQuestionsStep : null}
                  goToCodeTestStep={hasCodeTest ? goToCodeTestStep : null}
                  accepted={accepted}
                  rejected={rejected}
                  refresh={refresh}
                  accept={accept}
                  mobile
                />
              </MobileCompactStep>

              {hasQuestions && (
                <MobileCompactStep
                  title="Questions"
                  open={currentStep === 1}
                  stepIndex={2}
                  onOpen={() => setCurrentStep(1)}
                  onClose={() => setCurrentStep(-1)}
                  completed={questionsAnswered}
                >
                  <QuestionsForm
                    contract={contract}
                    handleContinue={hasCodeTest ? goToNextStep : null}
                    handleFinish={hasCodeTest ? null : handleFinish}
                    onAnswerSaved={handleSave}
                    onAnswerDeleted={handleDelete}
                    onRecorderOpen={() => setShowStepper(false)}
                    onRecorderClose={() => setShowStepper(true)}
                    mobile
                  />
                </MobileCompactStep>
              )}

              {hasCodeTest && (
                <MobileCompactStep
                  title="Code Test"
                  open={currentStep === 2}
                  stepIndex={hasQuestions ? 3 : 2}
                  onOpen={() => setCurrentStep(2)}
                  onClose={() => setCurrentStep(-1)}
                  completed={codeTestCompleted}
                >
                  <CodeTestForm
                    contract={contract}
                    initialValues={projectSubmission}
                    handleFinish={handleFinish}
                    onUpdate={refresh}
                    mobile
                  />
                </MobileCompactStep>
              )}
            </MediaQuery>

            <MediaQuery minWidth={1201}>
              <Collapse in={currentStep === 0} mountOnEnter unmountOnExit>
                <AcceptRequestsForm
                  contract={contract}
                  user={user}
                  goToQuestionsStep={hasQuestions ? goToQuestionsStep : null}
                  goToCodeTestStep={hasCodeTest ? goToCodeTestStep : null}
                  accepted={accepted}
                  rejected={rejected}
                  refresh={refresh}
                  accept={accept}
                />
              </Collapse>

              {hasQuestions && (
                <Collapse in={currentStep === 1} mountOnEnter unmountOnExit>
                  <QuestionsForm
                    contract={contract}
                    handleContinue={hasCodeTest ? goToNextStep : null}
                    handleFinish={hasCodeTest ? null : handleFinish}
                    onAnswerSaved={handleSave}
                    onAnswerDeleted={handleDelete}
                    onRecorderOpen={() => setShowStepper(false)}
                    onRecorderClose={() => setShowStepper(true)}
                  />
                </Collapse>
              )}

              {hasCodeTest && (
                <Collapse in={currentStep === 2} mountOnEnter unmountOnExit>
                  <CodeTestForm
                    contract={contract}
                    initialValues={projectSubmission}
                    handleFinish={handleFinish}
                    onUpdate={refresh}
                  />
                </Collapse>
              )}
            </MediaQuery>
          </Card>
        </PageContent>
      </PageBody>
    </React.Fragment>
  )
}

export default React.memo(JobScreening)
