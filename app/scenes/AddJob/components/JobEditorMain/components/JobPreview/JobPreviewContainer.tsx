import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import { JobStatus } from 'types'
import { graphql, useFragment } from 'react-relay/hooks'
import { commitMutation } from 'api/graphql'
import { JobPreviewContainer_UpdateJobDetailsMutation } from '__generated__/JobPreviewContainer_UpdateJobDetailsMutation.graphql'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { browserHistory } from 'services/router'
import { trackError } from 'services/analytics'
import { getErrorText } from 'services/error'
import JobPreview from './JobPreview'

const mapStateToProps = (state: RootState, ownProps) => {
  const currentUser = state.auth.currentUser

  return {
    isSavingJob: state.clientHire.isSavingJob,
    jobForPosting: {
      company_name: currentUser.firm?.name,
      company_description: currentUser.firm?.description,
      company_logo_url: currentUser.firm?.logo_url,
      company_website: currentUser.firm?.website,
      position_types: ['freelancer'],
      user_id: currentUser.id,
      ...(ownProps.job || {}),
    },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: async (jobId: any, status?: JobStatus) => {
      try {
        const mutationResponse = await commitMutation<JobPreviewContainer_UpdateJobDetailsMutation>({
          mutation: graphql`
            mutation JobPreviewContainer_UpdateJobDetailsMutation($input: UpdateJobDetailsInput!) {
              updateJobDetails(input: $input) {
                job {
                  slug
                  status
                }
              }
            }
          `,
          variables: {
            input: {
              slug: jobId ? `${jobId}` : undefined,
              status: status,
            },
          },
        })

        if (status === 'opened') {
          dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Job published' }))

          browserHistory.push('/client/hire', `/client/hire?job=${mutationResponse?.updateJobDetails?.job?.slug}&tab=potential`, { shallow: true })
        } else {
          dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Job saved' }))
        }
      } catch (error) {
        trackError(error)
        dispatch(createAction(TOGGLE_SNACKBAR)({ message: getErrorText(error) }))
      }
    },
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

const JobPreviewContainer = connector(JobPreview)

export default function JobPreviewWrapper(props) {
  const job = useFragment(graphql`
    fragment JobPreviewContainer_Job on Job {
      title
      description
      descriptionExperience
      descriptionResponsibilities
      user {
        rawId
      }
      freelancerType {
        name
        rawId
      }
      jobSubtypes {
        groupIndex
        freelancerSubtype {
          name
          rawId
        }
      }
      jobSkills {
        groupIndex
        required
        requiredYears
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
  const freelancerTypes = job?.freelancerType ? [{ id: job.freelancerType.rawId, name: job.freelancerType.name }] : []

  return (
    <JobPreviewContainer
      {...props}
      freelancerTypes={freelancerTypes}
      job={{
        title: job?.title,
        description: job?.description,
        description_experience: job?.descriptionExperience,
        description_responsibilities: job?.descriptionResponsibilities,
        freelancer_type_id: job?.freelancerType?.rawId,
        job_skills: job?.jobSkills?.map(s => ({ id: s.skill?.rawId, name: s.skill?.name, required: s.required, required_years: s.requiredYears, group_index: s.groupIndex })) || [],
        position_types: job?.positionTypes,
        client_rate: job?.clientRate,
        min_client_rate: job?.minClientRate,
        required_experience_years: job?.requiredExperienceYears,
        rate_mode: job?.rateMode,
        project_length_in_months: job?.projectLengthInMonths,
        freelancer_subtypes: job?.jobSubtypes?.map(t => ({ id: t.freelancerSubtype?.rawId, group_index: t.groupIndex, name: t.freelancerSubtype?.name })) || [],
        location_type: job?.locationType,
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
      }}
    />
  )
}
