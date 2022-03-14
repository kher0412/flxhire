import React from 'react'
import { Card, Collapse } from '@material-ui/core'
import { MediaQuery, MobileCompactStep } from 'components'
import { Currency, JobStatus } from 'types'
import { useCurrentUser, useQueryParams } from 'hooks'
import { formatAsDate } from 'services/formatting'
import { useInvitationEditorMainQuery } from './InvitationEditorMainQuery'
import ReviewStep from '../ReviewStep'
import InvitationForm from './components/InvitationForm'
import InvitationAccountSetup from '../InvitationAccountSetup'
import { IInvitationFormFields } from './components/InvitationForm/InvitationFormContainer'

export interface IInvitationEditorMainProps {
  currentStep: number
  contractId: number // TODO: use graph ID
  freelancerId: number // TODO: use graph ID
  offerMode: boolean
  accountSetupMode: boolean
  requestBackgroundCheck: boolean
  reviewData: IInvitationFormFields // TODO: this has to go
  onStepChange: (step: number) => void
  onContinue: (formData: IInvitationFormFields) => void
  onAccountSetupCancel: () => void
  onAccountSetupContinue: () => void
  onSubmit: (formData: IInvitationFormFields) => void
}

function InvitationEditorMain(props: IInvitationEditorMainProps) {
  const {
    currentStep,
    contractId,
    freelancerId,
    offerMode,
    accountSetupMode,
    reviewData,
    requestBackgroundCheck,
    onStepChange,
    onContinue,
    onAccountSetupCancel,
    onAccountSetupContinue,
    onSubmit,
  } = props

  const [currentUser] = useCurrentUser()
  const invitationData = useInvitationEditorMainQuery(contractId, freelancerId)
  const query = useQueryParams()

  const contract = invitationData?.contract
  const freelancer = invitationData?.freelancer

  // TODO: these 2 are slightly incorrectly typed, fix
  const managers = invitationData?.currentUser?.firm?.users?.map(user => ({ id: user.id, name: user.name, self: user.self }))
  const jobs = invitationData?.currentUser?.firm?.jobs?.edges?.map(edge => edge.node as { title: string, status: JobStatus, id: string })

  const invitationType = reviewData?.recipients?.[0]?.invitation_type as 'individual' | 'manager' | 'admin'
  const allowMultipleManagers = currentUser.firm?.legacy_billing || currentUser.firm?.billing_plan?.allow_multiple_managers
  const isInvitingAdminButCant = invitationType === 'admin' && !currentUser.is_firm_admin
  const allowSettingManager = managers.length > 0 && currentUser.is_firm_admin
  const allowGivingManageAccess = invitationData?.currentUser?.managerContract?.allowManageAccess || false
  const currencies = currentUser?.configuration?.supported_currencies || [{ code: currentUser?.firm?.currency || 'USD' } as Currency]
  const backgroundCheckUnavailable = currentUser?.firm?.billing_plan && !currentUser.firm.billing_plan.allow_background_checks
  const managerForReview = managers.find(m => m.id === reviewData?.client_id)
  const freelancerName = props.reviewData?.recipients?.[0]?.first_name || 'name'

  const reviewStep = (
    <ReviewStep
      clientRate={{ value: reviewData?.client_rate || 0, currencyCode: reviewData?.currency ? reviewData?.currency : 'USD' }}
      rateMode={reviewData?.rate_mode}
      currency={reviewData?.currency}
      startDate={formatAsDate(reviewData?.start_date) as string}
      endDate={formatAsDate(reviewData?.end_date) as string}
      invoiceSchedule={reviewData?.invoice_schedule}
      invitationType={invitationType}
      manager={managerForReview ? { name: managerForReview.name, id: managerForReview.id?.toString() } : undefined}
      onSubmit={onSubmit}
      offerMode={offerMode}
      freelancerName={freelancerName}
    />
  )

  let offerDetailsDefaultValues: Partial<IInvitationFormFields>

  if (contract) {
    offerDetailsDefaultValues = {
      recipients: [
        {
          first_name: contract?.freelancer?.firstName,
          last_name: contract?.freelancer?.lastName,
          email: contract?.freelancer?.email,
          invitation_type: 'individual',
        },
      ],
      client_rate: contract?.clientRate?.value,
      currency: contract?.currency?.code,
      job_id: contract?.job?.id,
      client_id: contract?.client?.id || invitationData?.currentUser?.id,
      freelancer_id: contract?.freelancer?.id || freelancer?.id,
      payments_enabled: true,
    }
  } else if (freelancer) {
    offerDetailsDefaultValues = {
      recipients: [
        {
          first_name: freelancer.firstName,
          invitation_type: 'individual',
        },
      ],
      currency: invitationData?.currentUser?.firm?.currency?.code,
      client_id: invitationData?.currentUser?.id,
      freelancer_id: freelancer?.id,
      payments_enabled: true,
    }
  } else if (query.role && ['individual', 'manager', 'admin'].includes(query.role)) {
    offerDetailsDefaultValues = {
      recipients: [
        {
          invitation_type: query.role as 'individual' | 'manager' | 'admin',
        },
      ],
    }
  }

  // note: don't unmount the InvitationForm when the Collapse is closed, it will destroy the form
  const offerDetails = (
    <div>
      <Collapse in={!accountSetupMode}>
        <InvitationForm
          allowMultipleManagers={allowMultipleManagers}
          allowSettingManager={allowSettingManager}
          allowGivingManageAccess={allowGivingManageAccess}
          isInvitingAdminButCant={isInvitingAdminButCant}
          backgroundCheckUnavailable={backgroundCheckUnavailable}
          managers={managers}
          jobs={jobs}
          offerMode={offerMode}
          contractId={contract?.id}
          currencies={currencies}
          onSubmit={onContinue}
          defaultValues={offerDetailsDefaultValues}
        />
      </Collapse>

      <Collapse in={accountSetupMode} mountOnEnter unmountOnExit>
        <InvitationAccountSetup
          onBack={onAccountSetupCancel}
          onSubmit={onAccountSetupContinue}
          requireMultipleManagers={invitationType === 'manager' || invitationType === 'admin'}
          requireBackgroundChecks={requestBackgroundCheck}
        />
      </Collapse>
    </div>
  )

  return (
    <React.Fragment>
      <MediaQuery maxWidth={1200}>
        <MobileCompactStep
          title="Offer Details"
          open={currentStep === 0}
          stepIndex={0}
          onOpen={() => onStepChange(0)}
          completed={currentStep > 0}
        >
          {offerDetails}
        </MobileCompactStep>

        <MobileCompactStep
          title="Review & Send"
          open={currentStep === 1}
          stepIndex={1}
          onOpen={() => onStepChange(1)}
        >
          {reviewStep}
        </MobileCompactStep>
      </MediaQuery>

      <MediaQuery minWidth={1201}>
        <Collapse in={currentStep === 0}>
          {offerDetails}
        </Collapse>

        <Collapse in={currentStep === 1}>
          {reviewStep}
        </Collapse>
      </MediaQuery>
    </React.Fragment>
  )
}

export default React.memo(InvitationEditorMain)
