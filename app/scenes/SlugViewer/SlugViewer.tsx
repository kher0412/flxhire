import React from 'react'
import { ErrorActionButton, PagePlaceholder, PageBundlePlaceholder } from 'components'
import FreelancerProfile from 'scenes/FreelancerProfile'
import JobsListing from 'scenes/JobsListing'
import Job from 'scenes/Job'
import { useSelector } from 'react-redux'
import { RootState } from 'reducers'
import { getErrorDescription, getErrorTitle } from 'services/error'
import { IFirm, IFreelancer, IJob } from 'types'

const isJob = (job: any): job is IJob => job?.is_job
const isFirm = (firm: any): firm is IFirm => firm?.is_firm
const isFreelancer = (freelancer: any): freelancer is IFreelancer => freelancer?.is_freelancer

const SlugViewer = ({ resource }: { resource: IJob | IFirm | IFreelancer }) => {
  const data = useSelector((state: RootState) => ({
    user: state.auth.currentUser,
    resource: state.slugViewer.resource,
    error: state.slugViewer.error,
    loading: state.slugViewer.loading,
    id: state.slugViewer.id,
    subid: state.slugViewer.subid,
    freelancer: state.freelancer,
  }))
  if (!data.loading) {
    if (data.error) {
      return (
        <PagePlaceholder
          flat
          title={getErrorTitle(data.error)}
          subtitle={getErrorDescription(data.error)}
          action={<ErrorActionButton error={data.error} />}
        />
      )
    }
    if (isFreelancer(resource)) {
      return <FreelancerProfile freelancer={data.freelancer?.freelancerId ? (data.freelancer as IFreelancer) : resource} />
    }
    if (isJob(resource)) {
      return <Job />
    }
    if (isFirm(resource)) {
      return <JobsListing firm={resource} />
    }
    return (
      <PagePlaceholder
        flat
        title="Invalid content"
      />
    )
  }
  return <PageBundlePlaceholder />
}

export default SlugViewer
