import React from 'react'
import { Button } from 'components/themed'
import { CardActions } from '@material-ui/core'
import InterviewsIcon from 'components/Icons/InterviewsIcon'
import OffersIcon from 'components/Icons/OffersIcon'
import FilterIcon from 'components/Icons/FilterIcon'
import { JobActions_Job$key } from '__generated__/JobActions_Job.graphql'
import { IHireTab } from 'scenes/ClientHire/Hire'
import { graphql, useFragment } from 'react-relay'
import { Assignment, VerifiedUser } from '@material-ui/icons'
import styles from '../Job.module.css'

interface IJobActionsProps {
  setTab: (tab: IHireTab) => void
  setSelectedJob: (slug: string) => void
  job: JobActions_Job$key
}

const labelWithInlineBadge = (label: string, badgeCount: number) => badgeCount > 0 ? `${label} (${badgeCount})` : label

const JobActions = ({ job: jobProp, setTab, setSelectedJob }: IJobActionsProps) => {
  const job = useFragment(graphql`
    fragment JobActions_Job on Job {
      slug
    }
  `, jobProp)

  const viewCandidates = () => {
    setSelectedJob(job?.slug)
    setTab('potential')
  }

  const viewApplicants = () => {
    setSelectedJob(job?.slug)
    setTab('applicants')
  }

  const viewScreening = () => {
    setSelectedJob(job?.slug)
    setTab('screening')
  }

  const viewInterviews = () => {
    setSelectedJob(job?.slug)
    setTab('interviews')
  }

  const viewOffers = () => {
    setSelectedJob(job?.slug)
    setTab('offers')
  }

  // TODO: load the counts

  return (
    <CardActions className={styles.actions}>
      <Button
        color="secondary"
        data-cy="view-candidates"
        onClick={viewCandidates}
        responsive
      >
        <VerifiedUser /> {labelWithInlineBadge('Candidates', 0)}
      </Button>

      <Button
        color="secondary"
        data-cy="view-applicants"
        onClick={viewApplicants}
        responsive
      >
        <Assignment /> {labelWithInlineBadge('Applicants', 0)}
      </Button>

      <Button
        color="primary"
        data-cy="view-screening"
        onClick={viewScreening}
        responsive
      >
        <FilterIcon width={24} height={24} /> {labelWithInlineBadge('Screening', 0)}
      </Button>

      <Button
        color="primary"
        data-cy="view-interviews"
        onClick={viewInterviews}
        responsive
      >
        <InterviewsIcon width={24} height={24} /> {labelWithInlineBadge('Interviews', 0)}
      </Button>

      <Button
        color="primary"
        data-cy="view-offers"
        onClick={viewOffers}
        responsive
      >
        <OffersIcon width={24} height={21} /> {labelWithInlineBadge('Offers', 0)}
      </Button>
    </CardActions>
  )
}

export default JobActions
