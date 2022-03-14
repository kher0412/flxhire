/* eslint-disable camelcase */
import React, { useCallback } from 'react'
import { ResponsiveDialog, Link } from 'components'
import {
  isRateMatching,
  isCompensationMatching,
  isTotalExperienceMatching,
  isSkillSetMatching,
  mismatchingSkills,
  isLocationMatching,
  isPositionTypeMatching,
  isPermJob,
  isFreelancerTypeMatching,
  profileNeedsManualUpdateToApplyToJob,
  isFreelancerSubtypeSetMatching,
  missingSubtypes,
  hourlyRateToAnnualCompensation,
} from 'services/job'
import { Button } from 'components/themed'
import { DialogContent, DialogContentText, DialogActions, DialogTitle, ListSubheader } from '@material-ui/core'
import { formatAsCurrency } from 'services/formatting'
import { IJob, IFreelancer } from 'types'
import { browserHistory } from 'services/router'
import { getCountryName } from 'services/location'
import { trackEvent } from 'services/analytics'
import { useTrackEventOnMount } from 'hooks'

interface IJobSpecConfirmationDialogProps {
  open: boolean
  user: IFreelancer
  job: IJob
  onClose: () => void
  onConfirm: () => void
}

const profileLinkProps = (job: IJob) => ({
  href: '/profile',
  as: `/profile?job=${job?.slug}`,
})

interface IMismatchProps {
  job: IJob
  user: IFreelancer
}

const IndustryMismatch = ({ user, job }: IMismatchProps) => {
  if (!isFreelancerTypeMatching(user, job)) {
    const jobFreelancerType: string = job.freelancer_type.name
    const profileFreelancerType: string = user.profile.freelancer_type || '(none)'
    return (
      <DialogContentText data-cy="industry-type-message">
        <strong>This job is a {jobFreelancerType} industry position</strong>,
        however your profile is set to the {profileFreelancerType} industry.
        To apply to this and other {jobFreelancerType} jobs,
        please <Link {...profileLinkProps(job)}>edit your profile</Link> and then send your application.
      </DialogContentText>
    )
  }

  return null
}

const SubtypesMismatch = ({ user, job }: IMismatchProps) => {
  if (!isFreelancerSubtypeSetMatching(user, job)) {
    if (job.freelancer_subtypes.length === 1) {
      return (
        <DialogContentText data-cy="freelancer-subtype-message">
          This job requires the <strong>{job.freelancer_subtypes[0].name}</strong> specialization, however your profile does not include it.
          If you actually do have this specialization,
          please <Link {...profileLinkProps(job)}>edit your profile</Link> and then send your application.
        </DialogContentText>
      )
    }

    const groups = missingSubtypes(user, job)

    return (
      <React.Fragment>
        <DialogContentText data-cy="freelancer-subtype-message">
          This job requires the one or more specializations that you don't have on your profile.
          If you actually do have these specializations,
          please <Link {...profileLinkProps(job)}>edit your profile</Link> and then send your application.
        </DialogContentText>
        <DialogContentText data-cy="freelancer-subtype-details">
          {groups.map((list, index) => (
            // We are forced to use index here as key. However the groups are normalized so it should be OK
            <React.Fragment>
              <ul key={index} data-cy={`skill-mismatch-group-${index}`}>
                {list.map(item => (
                  <li key={item.name} data-cy={`skill-mismatch-${item.name}`}>
                    <strong>{item.name}</strong> is required
                  </li>
                ))}
              </ul>
              {index < groups.length - 1 && <ListSubheader>Or Alternatively:</ListSubheader>}
            </React.Fragment>
          ))}
        </DialogContentText>
      </React.Fragment>
    )
  }

  return null
}

const BlockText = ({ needsManualUpdate }) => {
  if (needsManualUpdate) {
    return (
      <DialogContentText>
        <strong>
          Please review & update your profile to apply.
        </strong>
      </DialogContentText>
    )
  }

  return null
}

const RateConfirmation = ({ job, user }: IMismatchProps) => {
  useTrackEventOnMount('Job Rate Mismatch', !isRateMatching(user, job))
  if (!isRateMatching(user, job)) {
    return (
      <DialogContentText data-cy="rate-message">
        This job offers a maximum hourly rate of ${job?.freelancer_rate},
        which is currently below the rate on your profile of ${user?.profile?.rate}/hr.
        By submitting your application to this job, we will automatically adjust your rate to ${job?.freelancer_rate}/hr.
      </DialogContentText>
    )
  }

  return null
}

const CompensationConfirmation = ({ job, user }: IMismatchProps) => {
  useTrackEventOnMount('Job Compensation Mismatch', !isCompensationMatching(user, job))
  if (!isCompensationMatching(user, job)) {
    const max = formatAsCurrency(hourlyRateToAnnualCompensation(job?.freelancer_rate), { currency: 'USD' })
    return (
      <DialogContentText data-cy="compensation-message">
        This job offers an annual compensation of {max},
        which is currently below your annual compensation preference of {formatAsCurrency(user?.profile?.annual_compensation, { currency: 'USD' })}.
        Submitting your application will set your annual compensation to {max},
        and make you appear with {max} to the client for this job.
      </DialogContentText>
    )
  }

  return null
}

const TotalExperienceMismatch = ({ job, user }: IMismatchProps) => {
  if (!isTotalExperienceMatching(user, job)) {
    return (
      <DialogContentText data-cy="total_experience-message">
        <strong>This job requires a total experience of {job.required_experience_years}+ year(s)</strong>,
        however
        {' '}
        <strong>your total experience {user.profile.total_experience ? (
          `is ${user.profile.total_experience} year(s)`
        ) : (
          'is missing from your profile'
        )}
        </strong>.
        {' '}
        If your total experience meets the expectations of the job,
        please <Link {...profileLinkProps(job)}>edit your profile</Link> and then send your application.
      </DialogContentText>
    )
  }

  return null
}

const PositionTypeMismatch = ({ job, user }: IMismatchProps) => {
  const jobPositionType = isPermJob(job) ? 'permanent' : 'freelance'
  const profilePositionType = user.profile.job_types[0] || '(unknown)'

  if (!isPositionTypeMatching(user, job)) {
    return (
      <DialogContentText data-cy="position-type-message">
        <strong>This job is a {jobPositionType} position</strong>,
        however your profile is set to accept {profilePositionType} work only.
        To apply to this and other {jobPositionType} jobs,
        please <Link {...profileLinkProps(job)}>edit your profile</Link> and then send your application.
      </DialogContentText>
    )
  }

  return null
}

const LocationMismatch = ({ job, user }: IMismatchProps) => {
  let jobLocation = 'as specified on the job posting'
  let yourLocation = 'as set on your profile'

  if (job.location_type === 'specific_countries') {
    if (job.job_countries.length > 1) {
      jobLocation = `within the following countries: ${job.job_countries.map(getCountryName).sort().join(', ')}`
    } else {
      jobLocation = `within ${getCountryName(job.job_countries[0])}`
    }
    if (user.profile.country) {
      yourLocation = `within the country of ${getCountryName(user.profile.country)}`
    } else {
      yourLocation = 'within an unknown country'
    }
  }

  if (job.location_type === 'job_timezone') {
    if (job.timezone_range > 0) {
      jobLocation = `within ${job.timezone_range} hours of the ${job.job_timezone} timezone`
    } else {
      jobLocation = `in the ${job.job_timezone} timezone`
    }
    if (user.timezone) {
      yourLocation = `within the timezone ${user.timezone}`
    } else {
      yourLocation = '(unknown timezone)'
    }
  }

  if (!isLocationMatching(user, job)) {
    return (
      <DialogContentText data-cy="location-message">
        <strong>This job requires candidates to be located {jobLocation}</strong>,
        however your location {yourLocation} does not match.
        If your location meets the requirements of the job,
        please <Link {...profileLinkProps(job)}>edit your profile</Link> and then send your application.
      </DialogContentText>
    )
  }

  return null
}

const SkillMismatch = ({ job, user }: IMismatchProps) => {
  if (!isSkillSetMatching(user, job)) {
    const groups = mismatchingSkills(user, job)
    return (
      <React.Fragment>
        <DialogContentText data-cy="skills-message">
          This job requires one or more skills, or years of experience with that skill, that you don't have on your profile.
          If you actually do have those skills and experience please
          {' '}
          <Link {...profileLinkProps(job)}>edit your profile</Link>
          {' '}
          and then send your application.
        </DialogContentText>
        <DialogContentText data-cy="skills-details">
          {groups.map((list, index) => (
            // We are forced to use index here as key. However the groups are normalized so it should be OK
            <React.Fragment>
              <ul key={index} data-cy={`skill-mismatch-group-${index}`}>
                {list.map(item => (
                  <li key={item.jobSkill.name} data-cy={`skill-mismatch-${item.jobSkill.name}`}>
                    <strong>{item.jobSkill.name}</strong> is required
                    {item.jobSkill.required_years ? ` with a minimum of ${item.jobSkill.required_years} years of experience` : ''}
                    {' '}
                    {item.freelancerHasSkill ? `but you only have ${item.experience} years.` : "but you don't list this skill"}
                  </li>
                ))}
              </ul>
              {index < groups.length - 1 && <ListSubheader>Or Alternatively:</ListSubheader>}
            </React.Fragment>
          ))}
        </DialogContentText>
      </React.Fragment>
    )
  }

  return null
}

const JobSpecConfirmationDialog = (props: IJobSpecConfirmationDialogProps) => {
  const { user, job, open, onClose, onConfirm } = props
  const needsManualUpdate = profileNeedsManualUpdateToApplyToJob(user, job)
  const goToProfile = useCallback(() => {
    browserHistory.push(profileLinkProps(job).href, profileLinkProps(job).as)
    trackEvent('Job Spec Confirmation Dialog Manual Profile Update')
  }, [job?.slug])

  return (
    <ResponsiveDialog
      open={open}
      onClose={onClose}
      data-cy="job-spec-confirmation-dialog"
    >
      <DialogTitle>
        Submit job application
      </DialogTitle>

      <DialogContent>
        <IndustryMismatch user={user} job={job} />
        <PositionTypeMismatch user={user} job={job} />
        <LocationMismatch user={user} job={job} />
        <TotalExperienceMismatch user={user} job={job} />
        <SubtypesMismatch user={user} job={job} />
        <SkillMismatch user={user} job={job} />
        <RateConfirmation user={user} job={job} />
        <CompensationConfirmation user={user} job={job} />
        <BlockText needsManualUpdate={needsManualUpdate} />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          data-cy="cancel"
        >
          Later
        </Button>

        <Button
          color="secondary"
          onClick={needsManualUpdate ? goToProfile : onConfirm}
          data-cy="confirm"
        >
          {needsManualUpdate ? 'Update Profile' : 'Confirm'}
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default JobSpecConfirmationDialog
