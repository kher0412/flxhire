import { graphql, useFragment } from 'react-relay'
import { AdminButton_Contract$key } from '__generated__/AdminButton_Contract.graphql'
import { AdminButton_Freelancer$key } from '__generated__/AdminButton_Freelancer.graphql'
import { AdminButton_Job$key } from '__generated__/AdminButton_Job.graphql'
import AdminTools from '../AdminTools'

interface IAdminButtonProps {
  freelancer: AdminButton_Freelancer$key
  contract: AdminButton_Contract$key
  job: AdminButton_Job$key
}

const AdminButton = ({ freelancer: freelancerProp, contract: contractProp, job: jobProp }: IAdminButtonProps) => {
  const freelancer = useFragment(graphql`
    fragment AdminButton_Freelancer on User {
      ...AdminTools_Freelancer
    }
    `, freelancerProp)
  const contract = useFragment(graphql`
    fragment AdminButton_Contract on Contract {
      ...AdminTools_Contract
    }
  `, contractProp)
  const job = useFragment(graphql`
    fragment AdminButton_Job on Job {
      id
    }
  `, jobProp)
  return (
    <AdminTools
      freelancer={freelancer}
      contract={contract}
      jobId={job?.id}
    />
  )
}

export default AdminButton
