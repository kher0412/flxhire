import React from 'react'
import { useFragment, graphql } from 'react-relay'
import { useSnackbar, useQuickCommit } from 'hooks'
import { browserHistory, getLocationPathname } from 'services/router'
import { useRouter } from 'next/router'
import { JobDetailsStep_SubmitMutation } from '__generated__/JobDetailsStep_SubmitMutation.graphql'
import { ensureInt } from 'services/numbers'
import JobDetailsForm from './components/JobDetailsForm'

interface IJobDetailsStep {
  job: any // TODO: types!
  jobId: string | number
  firmSlug: string
  status: string
  onContinue: () => void
}

export const JobDetailsStep = (props: IJobDetailsStep) => {
  const { onContinue, jobId, firmSlug, status } = props

  const showSnackbarMessage = useSnackbar()
  const router = useRouter()

  const job = useFragment(graphql`
    fragment JobDetailsStep_Job on Job {
      title
      description
      descriptionExperience
      descriptionResponsibilities
      user {
        rawId
        name
        firm {
          name
          description
          website
        }
      }
      status
      freelancerType {
        rawId
      }
      jobSubtypes {
        groupIndex
        freelancerSubtype {
          rawId
          name
        }
      }
      jobSkills {
        rawId
        requiredYears
        required
        groupIndex
        skill {
          rawId
          name
        }
      }
      positionTypes
      clientRate {
        currency {
          code
        }
        value
      }
      minClientRate {
        currency {
          code
        }
        value
      }
      requiredExperienceYears
      rateMode
      projectLengthInMonths
      numberOfHires
      locationType
      jobCountries
      jobTimezone
      timezoneValue
      timezoneRange
      fullAddress
      country
      region
      city
      locationLatitude
      locationLongitude
      defaultDistance
    }
  `, props.job)

  const { execute: commit } = useQuickCommit<JobDetailsStep_SubmitMutation>(graphql`
    mutation JobDetailsStep_SubmitMutation($input: UpdateJobDetailsInput!) {
      updateJobDetails(input: $input) {
        job {
          slug
          title
          description
          descriptionExperience
          descriptionResponsibilities
          user {
            id
            name
            firm {
              name
              description
              website
            }
          }
          positionTypes
          clientRate {
            currency {
              code
            }
            value
          }
          minClientRate {
            currency {
              code
            }
            value
          }
          requiredExperienceYears
          rateMode
          projectLengthInMonths
          numberOfHires
          locationType
          jobCountries
          jobTimezone
          timezoneValue
          timezoneRange
          fullAddress
          country
          region
          city
          locationLatitude
          locationLongitude
          defaultDistance
          jobSkills {
            rawId
            required
            requiredYears
            groupIndex
            skill {
              name
              rawId
            }
          }
          jobSubtypes {
            groupIndex
            freelancerSubtype {
              rawId
              name
            }
          }
          freelancerType {
            rawId
          }
        }
      }
    }
  `)

  const handleSubmit = React.useCallback(async (data: { formData: any, jobId: string | number, redirectStep: string }, shouldContinue: boolean) => {
    const formData = data.formData
    const mutationResponse = await commit({
      input: {
        slug: jobId ? `${jobId}` : undefined,
        title: formData.title,
        description: formData.description,
        descriptionExperience: formData.description_experience,
        descriptionResponsibilities: formData.description_responsibilities,
        userId: formData.user_id,
        positionTypes: formData.position_types,
        clientRate: { value: formData.client_rate || 0, currencyCode: 'USD' },
        minClientRate: { value: formData.min_client_rate || 0, currencyCode: 'USD' },
        requiredExperienceYears: formData.required_experience_years,
        rateMode: formData.rate_mode,
        projectLengthInMonths: formData.project_length_in_months,
        numberOfHires: formData.number_of_hires,
        locationType: formData.location_type,
        jobCountries: formData.job_countries,
        jobTimezone: formData.job_timezone,
        // For some reason, in some cases, timezoneRange gets sent as a string here
        timezoneValue: ensureInt(formData.timezone_value),
        timezoneRange: ensureInt(formData.timezone_range),
        fullAddress: formData.full_address,
        country: formData.country,
        region: formData.region,
        city: formData.city,
        locationLatitude: formData.location_latitude,
        locationLongitude: formData.location_longitude,
        defaultDistance: formData.default_distance,
        jobSkills: formData.job_skills?.map(s => ({ rawId: s.skill_id ? s.id : null, rawSkillId: s.skill_id ? s.skill_id : s.id, required: s.required, requiredYears: s.required_years, name: s.name, groupIndex: s.group_index })),
        freelancerType: { rawId: formData.freelancer_type_id },
        freelancerSubtypes: formData.freelancer_subtypes?.map(s => ({ rawId: s.id, groupIndex: s.group_index || 0 })),
      },
    })

    if (mutationResponse) {
      // update URL if needed
      const jobSlug = mutationResponse?.updateJobDetails?.job?.slug
      const currentPath = getLocationPathname(router)

      if (jobSlug) {
        let path = `/client/job/${jobSlug}`
        let pathBase = '/client/job/[id]'

        if (data.redirectStep) {
          path += `/${data.redirectStep}`
          pathBase += '/[step]'
        }

        if (path && currentPath && !currentPath.includes(path)) {
          browserHistory.push(pathBase, path, { replace: true, shallow: true }, router)
        }
      }

      showSnackbarMessage('Job saved')

      if (shouldContinue) {
        onContinue()
      }
    }
  }, [commit, onContinue, router])

  return (
    <JobDetailsForm
      jobId={jobId}
      firmSlug={firmSlug}
      status={job?.status || status}
      initialValues={{
        status: job?.status,
        title: job?.title,
        description: job?.description,
        description_experience: job?.descriptionExperience,
        description_responsibilities: job?.descriptionResponsibilities,
        freelancer_type_id: job?.freelancerType?.rawId,
        job_skills: job?.jobSkills?.map(s => ({ id: s.rawId, skill_id: s.skill?.rawId, name: s.skill?.name, required: s.required, group_index: s.groupIndex, required_years: s.requiredYears })) || [],
        position_types: job?.positionTypes,
        client_rate: job?.clientRate?.value,
        min_client_rate: job?.minClientRate?.value,
        required_experience_years: job?.requiredExperienceYears,
        rate_mode: job?.rateMode || 'hour',
        project_length_in_months: job?.projectLengthInMonths,
        freelancer_subtypes: job?.jobSubtypes?.map(t => ({ id: t.freelancerSubtype?.rawId, name: t.freelancerSubtype?.name, group_index: t.groupIndex })) || [],
        location_type: job?.locationType || 'anywhere',
        job_countries: job?.jobCountries,
        job_timezone: job?.jobTimezone,
        timezone_value: job?.timezoneValue,
        timezone_range: job?.timezoneRange,
        full_address: job?.fullAddress,
        country: job?.country,
        region: job?.region,
        city: job?.city,
        location_latitude: job?.locationLatitude,
        location_longitude: job?.locationLongitude,
        default_distance: job?.defaultDistance,
        number_of_hires: job?.numberOfHires,
        user_id: job?.user?.rawId,
        company_name: job?.user?.firm?.name,
        company_description: job?.user?.firm?.description,
        company_website: job?.user?.firm?.website,
      }}
      submitForm={handleSubmit}
    />
  )
}

export default JobDetailsStep
