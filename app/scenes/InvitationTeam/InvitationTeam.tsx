import React from 'react'
import { Stepper, Step, StepButton, Collapse } from '@material-ui/core'
import { Page, PageHeader, PageHeaderTitle, PageHeaderDescription, PageHeaderBreadcrumbs, PageBody, PageSidebar, PageContent, PageLoadingIndicator } from 'components/Layouts/V3'
import { Box } from 'components/themed'
import { ContainerProps } from './InvitationTeamContainer'
import InvitationEditorMain from './components/InvitationEditorMain'
import { IInvitationFormFields } from './components/InvitationEditorMain/components/InvitationForm/InvitationFormContainer'

interface IInvitationTeamState {
  formData: IInvitationFormFields
  contractId: number
  freelancerId: number
  currentStep: number
  accountSetupMode: boolean
  offerMode: boolean
  submitting: boolean
}

const breadcrumbsProps = [
  { id: 1, name: 'Manage', href: '/client/manage' },
  { id: 2, name: 'Team Invitation', href: '/client/invitation_team' },
]

class InvitationTeam extends React.Component<ContainerProps, IInvitationTeamState> {
  state = {
    formData: null,
    contractId: undefined,
    freelancerId: undefined,
    currentStep: 0,
    accountSetupMode: false,
    offerMode: false,
    submitting: false,
  }

  componentDidMount() {
    const { router, setAvoidBillingSetupDialog, getCurrentUser } = this.props
    const contractId = parseInt(router.query.contract as string || '', 10)
    const freelancerId = parseInt(router.query.member as string || '', 10)

    setAvoidBillingSetupDialog(true)
    getCurrentUser()

    if (contractId) {
      this.setState({
        offerMode: true,
        contractId: contractId,
      })
    }

    if (freelancerId) {
      this.setState({
        offerMode: true,
        freelancerId: freelancerId,
      })
    }
  }

  componentWillUnmount() {
    this.props.setAvoidBillingSetupDialog(false)
  }

  render() {
    const { requestBackgroundCheck } = this.props
    const { currentStep, offerMode, formData, accountSetupMode, submitting } = this.state

    return (
      <Page>
        <PageHeader>
          <PageHeaderTitle>Team Invitation</PageHeaderTitle>
          <PageHeaderDescription>Invite someone to join your team</PageHeaderDescription>
          <PageHeaderBreadcrumbs breadcrumbs={breadcrumbsProps} />
        </PageHeader>

        <PageBody>
          <PageSidebar sticky>
            <Box variant="compact">
              <Stepper
                activeStep={currentStep}
                nonLinear
                orientation="vertical"
              >
                <Step completed={currentStep > 0}>
                  <StepButton onClick={() => this.handleStepChange(0)}>
                    Offer Details
                  </StepButton>
                </Step>

                <Step>
                  <StepButton disabled>
                    Review &amp; Send
                  </StepButton>
                </Step>
              </Stepper>
            </Box>
          </PageSidebar>

          <PageContent maxWidth="lg">
            <Collapse in={submitting}>
              <PageLoadingIndicator />
            </Collapse>

            <Collapse in={!submitting}>
              <InvitationEditorMain
                // TODO: clean up these props
                // these props should be replaced with own state/stuff:
                accountSetupMode={accountSetupMode}
                onAccountSetupCancel={this.handleAccountSetupCancel}
                onAccountSetupContinue={this.handleAccountSetupContinue}
                // these props should be replaced with fragments/containers:
                reviewData={formData}
                // these props are OK for now:
                currentStep={currentStep}
                contractId={this.state.contractId}
                freelancerId={this.state.freelancerId}
                offerMode={offerMode}
                requestBackgroundCheck={requestBackgroundCheck}
                onStepChange={this.handleStepChange}
                onContinue={this.handleContinue}
                onSubmit={this.handleReviewStepSubmit}
              />
            </Collapse>
          </PageContent>
        </PageBody>
      </Page>
    )
  }

  handleContinue = (formData: IInvitationFormFields) => {
    // main form submit (passing validation at this stage)
    const { currentUser } = this.props
    const { offerMode } = this.state

    const firm = currentUser?.firm
    const needsPaymentMethod = !firm?.payment_method && !firm?.allow_no_payment_method
    const needsBillingPlan = !firm?.billing_plan && !firm?.legacy_billing
    const needsAccountSetup = !offerMode && Boolean(needsPaymentMethod || needsBillingPlan)

    this.setState({
      formData: formData,
      accountSetupMode: needsAccountSetup,
      currentStep: needsAccountSetup ? 0 : 1,
    })
  }

  handleAccountSetupContinue = () => {
    this.setState({
      currentStep: 1,
    })
  }

  handleReviewStepSubmit = async (formDataAfterReview: IInvitationFormFields) => {
    const { submitForm } = this.props
    const { formData, offerMode } = this.state

    this.setState({
      submitting: true,
    })

    try {
      await submitForm({
        ...formData,
        ...formDataAfterReview,
        accept_payment: false,
      }, offerMode)

      // leave the page in the submitting state, because it's being redirected anyways
      this.setState({
        accountSetupMode: false,
      })
    } catch (err) {
      this.setState({
        submitting: false,
      })
    }
  }

  handleAccountSetupCancel = () => {
    this.setState({
      accountSetupMode: false,
    })
  }

  handleStepChange = (currentStep: number) => {
    this.setState({
      currentStep: currentStep,
    })
  }
}

export default InvitationTeam
