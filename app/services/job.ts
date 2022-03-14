import { IFreelancer, IJob, IJobIntegrationType, IUserSkill, RateMode } from 'types'
import { getCode } from 'country-list'
import { uniq } from 'lodash'
import { formatAsCurrency } from './formatting'

// NOTE: keep in sync with backend values in rate_converter.rb and possibly other places
export const HOURS_PER_DAY = 8
export const HOURS_PER_MONTH = 8 * 22
export const HOURS_PER_YEAR = 8 * 22 * 12

export function isRateMatching(user: IFreelancer, job: IJob) : boolean {
  const maxRate = job.freelancer_rate
  if (!maxRate || !job.position_types?.includes('freelancer')) return true
  return user.profile.rate <= maxRate
}

export function hourlyRateToAnnualCompensation(hourlyRate: number) {
  return Math.round(hourlyRate * HOURS_PER_YEAR)
}

export function hourlyRateToMonthlyRate(hourlyRate: number) {
  return Math.round(hourlyRate * HOURS_PER_MONTH)
}

export function hourlyRateToDailyRate(hourlyRate: number) {
  return Math.round(hourlyRate * HOURS_PER_DAY)
}

export function annualCompensationToHourlyRate(annualCompensation: number) {
  return Math.round((annualCompensation / HOURS_PER_YEAR) * 100) / 100
}

export function isCompensationMatching(user: IFreelancer, job: IJob) : boolean {
  const max = hourlyRateToAnnualCompensation(job.freelancer_rate)
  return !(job.position_types?.includes('permanent') && max && user?.profile?.annual_compensation > max)
}

export function isTotalExperienceMatching(user: IFreelancer, job: IJob) : boolean {
  return !job.required_experience_years || job.required_experience_years <= user?.profile?.total_experience
}

export function isLocationMatching(user: IFreelancer, job: IJob) : boolean {
  const locationType = job.location_type

  if (locationType === 'specific_countries') {
    if (job.job_countries.length === 0 || !user.profile.country) return false

    const profileCountry = user.profile.country.toLowerCase()

    // TODO: the job is supposed to contain the list of country codes, but in some cases it seems that's not the case
    // Once fixed, the getCode condition part can be removed
    return job.job_countries.map(x => x.toLowerCase())
      .some(countryName => (
        countryName === profileCountry || getCode(countryName)?.toLowerCase() === profileCountry
      ))
  }
  if (locationType === 'job_timezone') {
    return Math.abs(job.timezone_value - user.timezone_offset) <= (job.timezone_range || 0)
  }
  if (locationType === 'full_address') {
    console.warn('Location match check is not supported for full_address location type')
    // TODO: this one is not feasible on the frontend. We should move the whole "profile matches job" to a backend API
  }
  return true
}

export function normalizeGroupIndexes<T extends { group_index?: number }>(items: T[]): T[] {
  /*
  we have an array like:
  [{ ..., group_index: 0 }, { ..., group_index: 0 }, { ..., group_index: 2 }]
  and this function transforms it to:
  [{ ..., group_index: 0 }, { ..., group_index: 0 }, { ..., group_index: 1 }]
  */
  const groups = uniq(items.map(s => s?.group_index || 0)).sort()
  return items.map(s => ({ ...s, group_index: groups.indexOf(s.group_index) }))
}

export interface IGroup<T> { index: number, items: T[] }

export function getGroupsByIndex<T extends { group_index?: number }>(items: T[]): IGroup<T>[] {
  if (!items || !items?.length) return []

  const groups: IGroup<T>[] = []

  normalizeGroupIndexes(items).sort((a, b) => (a.group_index || 0) - (b.group_index || 0)).forEach((jobSkill) => {
    const group = groups.find(g => g.index === (jobSkill.group_index || 0))
    const item = { group_index: 0, ...jobSkill }
    if (group) {
      group.items.push(item)
    } else {
      groups.push({ index: jobSkill.group_index || 0, items: [item] })
    }
  })

  // We sort groups by index then we rewrite the index so that it's progressive
  // and starts from zero. This is needed to avoid UI bugs on job editing.
  return groups.sort((a, b) => a.index - b.index).map((g, index) => ({
    ...g,
    index,
  }))
}

export function missingSubtypes(user: { profile: { freelancer_subtype_ids: number[] } }, job: { freelancer_subtypes: { id: number, name: string, group_index: number }[]}): { id: number, name: string }[][] {
  if (!job.freelancer_subtypes) return []

  let freelancerSubtypeIdsSet = new Set(user.profile.freelancer_subtype_ids)
  let missingItems = job.freelancer_subtypes.filter(subtype => !freelancerSubtypeIdsSet.has(subtype.id))

  const jobGroupsCount = uniq(job?.freelancer_subtypes?.map(j => j.group_index || 0) || []).length
  const missingGroupsCount = uniq(missingItems.map(s => s.group_index || 0)).length

  // If at least one group is not missing, then that's ok
  if (jobGroupsCount > missingGroupsCount) return []

  const groups: { id: number, name: string }[][] = []

  missingItems.forEach((s) => {
    while (groups.length <= s.group_index || 0) groups.push([])
    groups[s.group_index || 0].push(s)
  })

  return groups
}

interface IMissingSkill {
  jobSkill: { required?: boolean, id: number, name: string, group_index?: number, required_years?: number }
  freelancerHasSkill: boolean
  experience?: number
  groupIndex: number
}

export function mismatchingSkills(user: { user_skills: Pick<IUserSkill, 'id' | 'experience'>[] }, job: { job_skills: IMissingSkill['jobSkill'][] }) : IMissingSkill[][] {
  const userSkillsMap = new Map<number, Pick<IUserSkill, 'experience'>>()

  for (const skill of user?.user_skills || []) {
    userSkillsMap.set(skill.id, skill)
  }

  const missingSkills: IMissingSkill[] = []

  for (const group of getGroupsByIndex(job?.job_skills?.filter(s => s.required))) {
    for (const skill of group.items) {
      if (!userSkillsMap.has(skill.id)) {
        // A required skill is missing
        missingSkills.push({
          jobSkill: skill,
          freelancerHasSkill: false,
          groupIndex: skill.group_index || 0,
        })
      }

      const experience = userSkillsMap.get(skill.id)?.experience

      if (skill.required_years && experience < skill.required_years) {
        // Insufficient experience for a required skill
        missingSkills.push({
          jobSkill: skill,
          freelancerHasSkill: true,
          experience,
          groupIndex: skill.group_index || 0,
        })
      }
    }
  }

  const jobGroupsCount = uniq(job?.job_skills?.map(j => j.group_index || 0) || []).length
  const missingGroupsCount = uniq(missingSkills.map(s => s.groupIndex)).length

  // If at least one group is not missing, then that's ok
  if (jobGroupsCount > missingGroupsCount) return []

  const groups: IMissingSkill[][] = []

  missingSkills.forEach((s) => {
    if (!groups[s.groupIndex]) groups.push([])
    groups[s.groupIndex].push(s)
  })

  return groups
}

export function isFreelancerTypeMatching(user: IFreelancer, job: IJob) : boolean {
  return !job.freelancer_type_id || job.freelancer_type_id === user.profile.freelancer_type_id
}

export function isFreelancerSubtypeSetMatching(user: IFreelancer, job: IJob): boolean {
  return missingSubtypes(user, job).length === 0
}

export function isSkillSetMatching(user: IFreelancer, job: IJob) : boolean {
  return mismatchingSkills(user, job).length === 0
}

export function isFreelanceJob(job: IJob) {
  return job.position_types.includes('freelancer')
}

export function isPermJob(job: IJob) {
  return job.position_types.includes('permanent')
}

export function isPositionTypeMatching(user: IFreelancer, job: IJob) : boolean {
  const bothFreelance = user.profile.job_types.includes('freelance') && isFreelanceJob(job)
  const bothPerm = user.profile.job_types.includes('permanent') && isPermJob(job)
  return bothFreelance || bothPerm || (isPermJob(job) && isFreelanceJob(job))
}

export function profileNeedsManualUpdateToApplyToJob(user: IFreelancer, job: IJob) : boolean {
  return (
    !isFreelancerTypeMatching(user, job) ||
    !isSkillSetMatching(user, job) ||
    !isTotalExperienceMatching(user, job) ||
    !isLocationMatching(user, job) ||
    !isPositionTypeMatching(user, job) ||
    !isFreelancerSubtypeSetMatching(user, job)
  )
}

export function isProfileMatching(user: IFreelancer, job: IJob) : boolean {
  return !profileNeedsManualUpdateToApplyToJob(user, job) && (
    isCompensationMatching(user, job) &&
    isRateMatching(user, job)
  )
}

export function getAnnualCompensationText(minAnnualCompensation: number, maxAnnualCompensation: number) : string {
  const min = Math.floor(minAnnualCompensation / 1000) || 0
  const max = Math.floor(maxAnnualCompensation / 1000) || 0

  if (min) {
    if (max) {
      if (min === max) return `$${min}k/year`
      return `$${min}k to $${max}k/year`
    }

    return `from $${min}k/year`
  }

  if (max) {
    return `$${max}k max/year`
  }

  return null
}

export function getJobTitleWithStatus(job: { status: IJob['status'], title: string }) {
  if (!job) return null

  let title = job.title
  if (job.status === 'closed' && !/ \(Closed\)$/.test(job.title)) title += ' (Closed)'
  if (job.status === 'draft' && !/ \(Draft\)$/.test(job.title)) title += ' (Draft)'
  return title
}

export function getComputedRate(hourlyRate: number, rateMode: RateMode, roundHourlyRate = false): number {
  if (!hourlyRate) return hourlyRate

  switch (rateMode) {
    case 'year':
      return hourlyRateToAnnualCompensation(hourlyRate)

    case 'month':
      return hourlyRateToMonthlyRate(hourlyRate)

    case 'day':
      return hourlyRateToDailyRate(hourlyRate)

    default:
      // assume 'hour'
      return roundHourlyRate ? Math.round(hourlyRate) : hourlyRate
  }
}

export function getRateText(minRate: number, maxRate: number, rateMode: RateMode, roundHourlyRate = true): string {
  const options = { roundToThousands: rateMode === 'year', currency: 'USD' }
  minRate = getComputedRate(minRate, rateMode, roundHourlyRate)
  maxRate = getComputedRate(maxRate, rateMode, roundHourlyRate)

  if (minRate) {
    if (minRate === maxRate) {
      return `${formatAsCurrency(minRate, options)}/${rateMode}`
    }

    if (maxRate) {
      return `${formatAsCurrency(minRate, options)} to ${formatAsCurrency(maxRate, options)}/${rateMode}`
    }

    return `from ${formatAsCurrency(minRate, options)}/${rateMode}`
  }

  if (maxRate) {
    return `up to ${formatAsCurrency(maxRate, options)}/${rateMode}`
  }

  return null
}

export function getIntegrationPriceText(activationFeeUsd: number, dailyFeeUsd: number) {
  let parts = []
  if (activationFeeUsd) parts.push(`${formatAsCurrency(activationFeeUsd, { currency: 'USD' })} activation fee`)
  if (dailyFeeUsd) parts.push(`${formatAsCurrency(dailyFeeUsd * 30, { currency: 'USD' })} for 30 days`)

  return parts.join(' plus ')
}

export function jobActionsDisabled(job: Pick<IJob, 'status'>) {
  // TODO: Add an exception here if job has greenhouse integration or candidate comes from greenhouse?
  return job?.status === 'draft'
}
