import { useFragment, graphql } from 'react-relay'
import { Application_Contract$key } from '__generated__/Application_Contract.graphql'
import { useCurrentUser } from 'hooks'
import Freelancer from './Freelancer'
import styles from '../Hire.module.css'
import { HireMembersFilters } from '../Hire'

interface IApplicationProps {
  contract: Application_Contract$key
  filteredOut?: boolean
  filterParams?: HireMembersFilters
  connectionId?: string
  hideJob?: boolean
  adminMode?: boolean
}

const Application = ({ contract: contractProp, filteredOut = false, filterParams, connectionId, hideJob, adminMode }: IApplicationProps) => {
  const contract = useFragment(graphql`
    fragment Application_Contract on Contract {
      ...Freelancer_Contract
      job {
        ...Freelancer_Job
      }
      freelancer {
        ...Freelancer_Freelancer
      }
      client {
        firm {
          slug
        }
      }
    }
  `, contractProp)
  const [user] = useCurrentUser()
  const showFirm = contract?.client?.firm?.slug !== user?.firm?.slug
  return (
    <div className={styles.item}>
      <Freelancer
        freelancer={contract.freelancer}
        contract={contract}
        job={contract.job}
        filteredOut={filteredOut}
        filterParams={filterParams}
        hideJob={hideJob}
        showFirm={showFirm}
        connectionId={connectionId}
        adminMode={adminMode}
      />
    </div>
  )
}

export default Application
