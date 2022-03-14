import { useMemo } from 'react'
import { graphql, useFragment } from 'react-relay'
import { timezoneStringToValue, defaultTimezone } from 'services/timeKeeping'
import { HireHooks_JobDefaultFilters$key } from '__generated__/HireHooks_JobDefaultFilters.graphql'
import { hourlyRateToAnnualCompensation } from 'services/job'
import { HireMembersFilters, IHireTab } from './Hire'

export const useJobDefaultFilters = (jobKey: HireHooks_JobDefaultFilters$key, tab: IHireTab) => {
  const job = useFragment(graphql`
    fragment HireHooks_JobDefaultFilters on Job {
      id
      updatedAt
      jobTimezone
      positionTypes
      defaultDistance
      locationLatitude
      locationLongitude
      clientRate {
        currency {
          code
        }
        value
      }
      timezoneValue
      timezoneRange
      jobCountries
      locationType
      requiredExperienceYears
      jobSkills {
        required
        requiredYears
        groupIndex
        skill {
          rawId
          name
        }
      }
      jobSubtypes {
        groupIndex
        freelancerSubtype {
          rawId
          name
        }
      }
    }
  `, jobKey)

  // This action will also result in new results being loaded.
  const defaultFilters = useMemo(() => {
    // NOTE: timezone can be 0 but if it's 0 we should not override it with default.
    // We should only override with default if the timezoneStringToValue function returns undefined.
    // TODO: timezoneStringToValue(...) part can be removed?
    const timezone = job?.timezoneValue ?? timezoneStringToValue(job?.jobTimezone) ?? defaultTimezone

    let showBothFreelanceAndPermanent = !Array.isArray(job?.positionTypes) || job?.positionTypes?.length === 0
    if (job?.positionTypes?.includes('freelancer') && job?.positionTypes?.includes('permanent')) showBothFreelanceAndPermanent = true

    const showFreelancer = job?.positionTypes?.includes('freelancer')
    let positionTypes = showFreelancer ? 'freelancer' : 'permanent'
    if (showBothFreelanceAndPermanent) positionTypes = ''

    return {
      distanceMiles: job?.defaultDistance,
      distanceOriginLatitude: job?.locationLatitude,
      distanceOriginLongitude: job?.locationLongitude,
      maxAnnualCompensation: job?.clientRate ? hourlyRateToAnnualCompensation(job.clientRate.value) : undefined,
      maxClientRate: job?.clientRate ? Math.round(job.clientRate.value) : undefined,
      timezone: job ? timezone : null,
      timezoneRange: job?.timezoneRange || 0,
      countries: job?.jobCountries as any || [],
      positionTypes: positionTypes,
      maxUniversityRank: 0,
      university: '',
      locationType: job?.locationType || 'anywhere',
      canWorkInTheUs: false,
      verifiedOnly: tab === 'potential' ? true : false,
      managedTeams: false,
      managedTeamSizes: ['1-4', '5-10', '10-x'],
      missingProjectSubmission: false,
      hasProjectSubmission: false,
      hasAnswers: false,
      missingAnswers: false,
      hasVideoIntroduction: false,
      missingVideoIntroduction: false,
      contractStatus: undefined,
      experience: job?.requiredExperienceYears || 0,
      skills: job?.jobSkills?.filter(js => js.required)?.map(js => ({ id: js.skill.rawId, name: js.skill.name, requiredYears: js.requiredYears, groupIndex: js.groupIndex })) || [],
      freelancerSubtypes: job?.jobSubtypes?.map(js => ({ id: js.freelancerSubtype.rawId, name: js.freelancerSubtype.name, groupIndex: js.groupIndex })) || [],
      availableOnly: true,
    } as HireMembersFilters
  }, [job?.id, job?.updatedAt, tab])

  return defaultFilters
}
