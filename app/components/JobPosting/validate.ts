import { isEmpty, get } from 'lodash'
import { FormErrors } from 'redux-form'
import { annualCompensationToHourlyRate, hourlyRateToAnnualCompensation, hourlyRateToMonthlyRate, hourlyRateToDailyRate, getGroupsByIndex } from 'services/job'
import { ICurrentUser } from 'types'

function getMinBudget(rateMode: string, minHourlyRate: number) {
  switch (rateMode) {
    case 'year':
      return `$${hourlyRateToAnnualCompensation(minHourlyRate)}/year`

    case 'month':
      return `$${hourlyRateToMonthlyRate(minHourlyRate)}/month`

    case 'week':
      return `$${hourlyRateToDailyRate(minHourlyRate)}/week`

    default:
      // assume 'hour'
      return `$${minHourlyRate}/hour`
  }
}

export default function validateJobPosting(values, props) : FormErrors {
  const errors : any = {}
  const currentUser: ICurrentUser = props?.currentUser
  const ALLOW_NO_RATE = currentUser?.configuration?.allow_jobs_with_no_rates || false
  const MIN_CLIENT_RATE = currentUser?.configuration?.jobs_min_client_rate_usd || 30
  const MIN_ANNUAL_COMP = currentUser?.configuration?.jobs_min_annual_compensation_usd || 30000

  if (!values.title) {
    errors.title = 'Title is required'
  } else if (values.title.length > 60) {
    errors.title = 'Title should be 60 characters max'
  }

  if (!values.description) {
    errors.description = 'Required'
  } else if (values.description.length < 100) {
    errors.description = 'Must be at least 100 characters'
  }

  if (!values.position_types || values.position_types.length === 0) {
    errors.position_types = 'Required'
  } else {
    if (values.position_types.includes('freelancer') && values.project_length_in_months === undefined) {
      errors.project_length_in_months = 'Required'
    }

    const mustHaveBudget = !ALLOW_NO_RATE

    // If position type is present (either freelance, perm or both), variable hour based min checks are used.
    // Because the widget affects both hourly and annual rates, these checks consider both the minimum hourly and annual configs.
    const minActualHourlyRate = Math.max(MIN_CLIENT_RATE, annualCompensationToHourlyRate(MIN_ANNUAL_COMP))

    if (mustHaveBudget && values.client_rate === null && values.client_rate < minActualHourlyRate) {
      errors.client_rate = `Your budget must be at least ${getMinBudget(values.rate_mode, minActualHourlyRate)} to post a job on Flexhire`
    } else if (values.client_rate && values.min_client_rate && parseFloat(values.client_rate) < parseFloat(values.min_client_rate)) {
      errors.client_rate = 'Max rate must be greater than or equal to minimum rate'
    }

    if (mustHaveBudget && (values.min_client_rate === null || values.min_client_rate < MIN_CLIENT_RATE)) {
      errors.min_client_rate = `Your budget must be at least ${getMinBudget(values.rate_mode, minActualHourlyRate)} to post a job on Flexhire`
    }
  }

  if (values.location_type) {
    if (values.location_type === 'full_address' && !values.full_address) {
      errors.full_address = 'Required'
    }

    if (values.location_type === 'job_timezone' && !values.job_timezone) {
      errors.job_timezone = 'Required'
    }

    if (values.location_type === 'specific_countries' && (values.job_countries || []).length < 1) {
      errors.job_countries = 'Required'
    }
  } else {
    errors.location_type = 'Required'
  }

  if (!values.freelancer_type_id) {
    errors.freelancer_type_id = 'Required'
  }

  if (getGroupsByIndex(values.job_skills?.filter(j => j.required)).filter(group => group?.items?.length > 3).length > 0) {
    errors.job_skills = 'At most 3 required skills is allowed per job'
  } else if (isEmpty(values.job_skills)) {
    errors.job_skills = 'At least 1 required or optional skill is required'
  }

  return errors
}
