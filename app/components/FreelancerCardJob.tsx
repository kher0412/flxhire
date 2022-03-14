import { IContractForClient } from 'types'
import { browserHistory } from 'services/router'
import { capitalize } from 'lodash'
import { isJobApplication, isUnsentJobApplication } from 'services/contract'
import { graphql, useFragment } from 'react-relay'
import { FreelancerCardJob_Job$key } from '__generated__/FreelancerCardJob_Job.graphql'
import { FreelancerCardJob_Contract$key } from '__generated__/FreelancerCardJob_Contract.graphql'
import { Assessment } from '@material-ui/icons'
import { FreelancerCardInfoItem } from 'components'

const openJob = (slug: string, firmSlug: string = null) => {
  if (slug && firmSlug) {
    browserHistory.push(`/${firmSlug}/${slug}`)
  } else if (slug) {
    browserHistory.push(`/job/${slug}`)
  }
}

interface IFreelancerCardJobProps {
  contract: FreelancerCardJob_Contract$key
  job: FreelancerCardJob_Job$key
  showFirm?: boolean
}

const FreelancerCardJob = ({ contract: contractProp, job: jobProp, showFirm }: IFreelancerCardJobProps) => {
  const contract = useFragment(graphql`
    fragment FreelancerCardJob_Contract on Contract {
      status
    }
  `, contractProp)
  const job = useFragment(graphql`
    fragment FreelancerCardJob_Job on Job {
      status
      title
      slug
      user {
        firm {
          slug
          name
        }
      }
    }
  `, jobProp)
  const jobSlug = job?.slug
  const firmSlug = job?.user?.firm?.slug
  const jobStatus = job?.status
  const showStatus = jobStatus && jobStatus !== 'opened'
  const jobStatusText = showStatus ? `(${capitalize(jobStatus)})` : ''
  let jobTitle = job?.title
  let displayText = 'Position'
  let firmText = showFirm ? job?.user?.firm?.name : null

  const partialContract = { status: contract?.status as IContractForClient['status'] }
  if (isJobApplication(partialContract)) {
    displayText = 'Applied Position'
  } else if (isUnsentJobApplication(partialContract) || contract == null) {
    displayText = 'Candidate Position'
  }

  if (!jobTitle && !firmText) return null

  return (
    <FreelancerCardInfoItem
      icon={<Assessment />}
      data-cy="view-job-from-contract"
      primary={[firmText, jobTitle].filter(x => Boolean(x)).join(' - ')}
      secondary={`${displayText} ${jobStatusText}`.trim()}
      button
      onClick={() => openJob(jobSlug, firmSlug)}
    />
  )
}

export default FreelancerCardJob
