import React from 'react'
import { LoadingIcon } from 'components'
import { InjectedFormProps } from 'redux-form'
import { JobDetailsFields } from 'components/JobEditFormFields'
import { Button } from 'components/themed'
import { Save } from '@material-ui/icons'
import { FreelancerSubtypeAttributes, JobSkillAttributes } from '__generated__/JobDetailsStep_SubmitMutation.graphql'
import { JobPositionType, JobStatus, LocationType } from 'types'
import { RateMode } from '__generated__/RatePreviewText_ContractPreviewQuery.graphql'
import { IJobDetailsFormContainerProps } from './JobDetailsFormContainer'
import ExistingJobButtons from '../../../../../ExistingJobButtons'

export interface JobDetailsFormData {
  status: JobStatus
  title: string
  description: string
  description_experience: string
  description_responsibilities: string
  freelancer_type_id: number
  job_skills: JobSkillAttributes[]
  position_types: JobPositionType[]
  client_rate: number
  min_client_rate: number
  required_experience_years: number
  rate_mode: RateMode
  project_length_in_months: number
  freelancer_subtypes: FreelancerSubtypeAttributes[]
  location_type: LocationType
  job_countries: string[]
  job_timezone: string
  timezone_value: number
  timezone_range: number
  full_address: string
  country: string
  region: string
  city: string
  location_latitude: number
  location_longitude: number
  default_distance: number
  number_of_hires: number
  user_id: number
  company_name: string
  company_description: string
  company_website: string
}

export interface IJobDetailsFormProps {
  jobId: string | number
  firmSlug: string
  status: string
  submitForm: (data: { formData: JobDetailsFormData, jobId: string | number, redirectStep: string }, shouldContinue: boolean) => any
}

export const JobDetailsForm = (props: InjectedFormProps<JobDetailsFormData> & IJobDetailsFormProps & IJobDetailsFormContainerProps) => {
  const {
    jobId,
    firmSlug,
    status,
    handleSubmit,
    submitting,
    submitFailed,
    isSavingJob,
    submitForm,
  } = props

  const handleSaveClickSubmit = (formData) => {
    submitForm({ formData, jobId, redirectStep: undefined }, false)
  }

  const handleNextClickSubmit = async (formData) => {
    submitForm({ formData, jobId, redirectStep: 'sourcing' }, true)
  }

  const saveJob = handleSubmit(handleSaveClickSubmit)
  const published = jobId && status === 'opened'

  let saveLabel = 'Create Draft'

  if (jobId) saveLabel = status === 'draft' ? 'Update' : 'Save'

  return (
    <form
      onSubmit={handleSubmit(handleNextClickSubmit)}
      style={{
        maxWidth: '100%',
        opacity: isSavingJob ? 0.35 : undefined,
        pointerEvents: isSavingJob ? 'none' : undefined,
      }}
    >
      <JobDetailsFields
        submitFailed={submitFailed}
        secondaryAction={(
          <Button
            color="secondary"
            disabled={submitting || isSavingJob}
            onClick={saveJob}
            data-cy="save-changes"
            style={{ marginRight: 12, marginLeft: 'auto' }}
          >
            {isSavingJob ? <LoadingIcon /> : <Save />} {saveLabel}
          </Button>
        )}
        additionalActions={jobId && published && (
          <ExistingJobButtons jobId={jobId} firmSlug={firmSlug} status={status} />
        )}
      />
    </form>
  )
}

export default JobDetailsForm
