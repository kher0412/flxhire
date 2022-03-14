import { isUnsentJobApplication } from 'services/contract'
import { commitMutation } from 'api/graphql'
import { RejectDialog_RejectMutation } from '__generated__/RejectDialog_RejectMutation.graphql'
import { RejectDialog_SkipMutation } from '__generated__/RejectDialog_SkipMutation.graphql'
import { RejectDialog_Freelancer$key } from '__generated__/RejectDialog_Freelancer.graphql'
import { RejectDialog_Contract$key } from '__generated__/RejectDialog_Contract.graphql'
import { useFragment, graphql } from 'react-relay'
import { trackError, trackEvent } from 'services/analytics'
import { useErrorDisplayer, useSnackbar } from 'hooks'
import { IContractStatus } from 'types'
import { useSelector } from 'react-redux'
import { getFormValues } from 'redux-form'
import RejectDialogForm, { FORM_NAME } from './RejectDialogForm'

interface IRejectDialogProps {
  open: boolean
  onClose: () => void
  freelancer: RejectDialog_Freelancer$key
  contract: RejectDialog_Contract$key
  jobId: string
  connectionId?: string
}

const RejectDialog = ({ open, onClose, freelancer: freelancerProp, contract: contractProp, jobId, connectionId }: IRejectDialogProps) => {
  const showSnackbarMessage = useSnackbar()
  const freelancer = useFragment(graphql`
    fragment RejectDialog_Freelancer on User {
      id
      ...RejectDialogForm_Freelancer
    }
  `, freelancerProp)
  const contract = useFragment(graphql`
    fragment RejectDialog_Contract on Contract {
      id
      status
      ...RejectDialogForm_Contract
    }
  `, contractProp)
  const errorDisplayer = useErrorDisplayer()
  const formValues = useSelector(getFormValues(FORM_NAME))
  const onSubmit = async (formData) => {
    const hasContract = contract?.id && !isUnsentJobApplication({ status: contract?.status as IContractStatus })
    try {
      if (hasContract) {
        await commitMutation<RejectDialog_RejectMutation>({
          mutation: graphql`
          mutation RejectDialog_RejectMutation($input: RejectFreelancerInput!) {
            rejectFreelancer(input: $input) {
              contract {
                status
                lastInteractionAt
                clientRejectionReason
                clientRejectionComments
                clientRejectionMessage
              }
            }
          }
        `,
          variables: {
            input: {
              contractId: contract.id,
              clientRejectionReason: formData.client_rejection_reason,
              clientRejectionComments: formData.client_rejection_comments,
              clientRejectionMessage: formData.client_rejection_message,
            },
          },
        })

        trackEvent('Client Reject Member')
        showSnackbarMessage('Rejected successfully')
      } else {
        console.log('SKIP START')
        await commitMutation<RejectDialog_SkipMutation>({
          mutation: graphql`
          mutation RejectDialog_SkipMutation($input: SkipCandidateInput!, $connections: [ID!]!) {
            skipCandidate(input: $input) {
              candidate {
                id @deleteEdge(connections: $connections)
              }
            }
          }
        `,
          variables: {
            input: {
              freelancerId: freelancer.id,
              jobId: jobId,
              reason: formData.client_rejection_reason,
              comments: formData.client_rejection_comments,
            },
            connections: connectionId ? [connectionId] : [],
          },
        })

        trackEvent('Client Skip Member')
        showSnackbarMessage('Candidate skipped')
      }
      onClose()
    } catch (error) {
      errorDisplayer.displayError(error)
      trackError(error)
    }
  }

  return (
    <RejectDialogForm
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      freelancer={freelancer}
      contract={contract}
      formValues={formValues}
    />
  )
}

export default RejectDialog
