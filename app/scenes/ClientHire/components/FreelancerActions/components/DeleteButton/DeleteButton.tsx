import { useCallback } from 'react'
import { graphql, useFragment } from 'react-relay'
import { ConfirmButton } from 'components'
import { DeleteButton_Mutation } from '__generated__/DeleteButton_Mutation.graphql'
import { DeleteButton_Contract$key } from '__generated__/DeleteButton_Contract.graphql'
import { Delete } from '@material-ui/icons'
import { useQuickCommit } from 'hooks'

interface IDeleteButtonProps {
  contract: DeleteButton_Contract$key
  connectionId?: string
}

const DeleteButton = ({ contract: contractProp, connectionId }: IDeleteButtonProps) => {
  const contract = useFragment(graphql`
    fragment DeleteButton_Contract on Contract {
      id
      status
      freelancerFirstName
    }
  `, contractProp)

  const { execute: commit, loading: isInFlight } = useQuickCommit<DeleteButton_Mutation>(graphql`
    mutation DeleteButton_Mutation($input: DeleteContractInput!, $connections: [ID!]!) {
      deleteContract(input: $input) {
        contract {
          id @deleteEdge(connections: $connections)
          status
        }
      }
    }
  `)

  const destroy = useCallback(async () => {
    await commit({
      input: {
        contractId: contract.id,
      },
      connections: connectionId ? [connectionId] : [],
    })
  }, [commit, contract?.id])

  const deletable = ['interview_rejected', 'offer_rejected', 'rejected'].includes(contract?.status)

  if (!deletable) return null

  const title = `Remove ${contract.freelancerFirstName}`
  const message = `Are you sure? ${contract.freelancerFirstName} will be permanently removed from your Hire pipeline.`
  const label = 'Delete'

  return (
    <ConfirmButton
      dialogTitle={title}
      dialogMessage={message}
      data-cy="delete"
      onClick={destroy}
      disabled={isInFlight}
    >
      <Delete /> {label}
    </ConfirmButton>
  )
}

export default DeleteButton
