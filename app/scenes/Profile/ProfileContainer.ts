import { connect, ConnectedProps } from 'react-redux'
import { NextRouter, withRouter } from 'next/router'
import moment from 'moment'
import { trackError } from 'services/analytics'
import { reduxForm, hasSubmitFailed, getFormSyncErrors, InjectedFormProps, formValueSelector } from 'redux-form'
import { isUndefined, isNull, isEmpty, get } from 'lodash'
import { getAPIClient } from 'api'
import { refreshFreelancerSelf, IMPORT_RESUME } from 'scenes/FreelancerProfile/FreelancerProfileDucks'
import { WithRouterProps } from 'next/dist/client/with-router'
import { RootState } from 'reducers'
import { IFreelancer, ICurrentUser, IProfile, IContractForFreelancer } from 'types'
import { createAction } from 'redux-actions'
import { submitMyProfileForm } from './ProfileDucks'
import Profile from './Profile'
import { extractQueryParams } from 'services/router'

const MIN_TIMELINE_YEAR = 1900 // we consider years lower than this number invalid in the timeline

const validate = (values: Partial<IProfile & IFreelancer>, props) => {
  const URL_WITH_TLDS_PATTERN = /^(http(s?):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,24}\b([-a-zA-Z0-9@:%_+.~#?&//=]*))/
  const LINKEDIN_PATTERN = /^(http(s?):\/\/(\w{2}\.?|www\.?|)linkedin\.com\/in\/\w{1,})/
  const GITHUB_PATTERN = /^(http(s?):\/\/(github|www\.github)\.com\/\w{1})/
  const DRIBBBLE_PATTERN = /^(http(s?):\/\/(www\.?|)dribbble\.com\/\w{1})/

  const minHourlyRate = get(props, 'user.configuration.min_hourly_rate_usd', 1)
  const minAnnualComp = get(props, 'user.configuration.min_annual_compensation_usd', 10000)

  const errors: any = {}

  if (!values.first_name) { errors.first_name = 'Required' }
  if (!values.last_name) { errors.last_name = 'Last name required' }
  if (!values.avatar_url) { errors.avatar_url = 'Required' }
  if (!values.freelancer_type_id) { errors.freelancer_type_id = 'Required' }

  if (values.full_address) {
    if (!values.location_latitude && !values.location_longitude) {
      errors.full_address = 'Please choose a location from the list of suggestions'
    }
  } else {
    errors.full_address = 'Location is required'
  }

  if (values.open_to_opportunities === false) {
    return errors
  }

  // perform full profile validation

  let allUserSkillsError: any = {}
  let userSkillsError: string
  let skillsWithErrors = 0

  if (!values.user_skills || values.user_skills.length === 0) {
    userSkillsError = 'At least 1 skill required'
  } else {
    values.user_skills.forEach((userSkill, i) => {
      if (!userSkill.experience) {
        allUserSkillsError[i] = 'Please enter your years of experience for this skill'
        skillsWithErrors++
      }
    })
    if (skillsWithErrors > 0) {
      userSkillsError = `${skillsWithErrors} skills have errors`
      errors.user_skills = allUserSkillsError
      errors.user_skills._error = userSkillsError
    }
  }

  if (userSkillsError) {
    if (!errors.user_skills) errors.user_skills = {}
    errors.user_skills._error = userSkillsError
  }

  let timelineError

  if (values.timeline_entries) {
    if (values.timeline_entries.filter(e => e.entry_type === 'education').length === 0) {
      timelineError = 'At least 1 education required'
    }

    if (values.timeline_entries.filter(e => e.entry_type === 'work').length === 0) {
      timelineError = 'At least 1 position required'
    }

    if (values.timeline_entries.length === 0) {
      timelineError = 'At least 1 education and position required'
    }

    const allTimelineEntriesError = {}
    let entriesWithErrors = 0

    values.timeline_entries.forEach((entry, i) => {
      const entryErrors: any = {}

      if (!entry.place) {
        entryErrors.place = 'Required'
      } else if (entry.place.length > 128) {
        entryErrors.place = '128 characters max'
      }
      if (!entry.title) {
        entryErrors.title = 'Required'
      } else if (entry.title.length > 128) {
        entryErrors.title = '128 characters max'
      }

      const currentYear = moment().toObject().years
      if (!entry.date_start) entryErrors.date_start = 'Required'
      if (parseInt(entry.date_start, 10) < MIN_TIMELINE_YEAR) entryErrors.date_start = 'Enter a year'
      if (entry.date_end && parseInt(entry.date_end, 10) < MIN_TIMELINE_YEAR) entryErrors.date_end = 'Enter a year'
      if (entry.date_end && entry.date_start && parseInt(entry.date_end, 10) < parseInt(entry.date_start, 10)) {
        entryErrors.date_end = 'Must be after the start year'
      }
      if (parseInt(entry.date_start, 10) > currentYear) entryErrors.date_start = 'Cannot be in the future'
      if (entry.date_end && parseInt(entry.date_end, 10) > currentYear) entryErrors.date_end = 'Cannot be in the future'

      if (!entry.description) {
        entryErrors.description = 'Required'
      } else if (entry.description.length > 1500) {
        entryErrors.description = '1500 characters max'
      }

      if (Object.keys(entryErrors).length > 0) {
        allTimelineEntriesError[i] = entryErrors
        entriesWithErrors++
      }
    })
    errors.timeline_entries = allTimelineEntriesError
    errors.timeline_entries._error = timelineError || (entriesWithErrors > 0 ? `${entriesWithErrors} entries have errors` : undefined)
  } else {
    errors.timeline_entries = {
      _error: 'At least 1 entry required',
    }
  }

  if (!values.availability) { errors.availability = 'Availability Required' }
  if (values.availability_type && values.availability_type.length === 0) {
    errors.availability_type = 'Availability required'
  }
  if (isNull(values.total_experience) || isUndefined(values.total_experience)) {
    // Careful here, 0 is a valid value
    errors.total_experience = 'Experience Required'
  }

  if (isEmpty(values.job_types)) { errors.job_types = 'At least one job type is required' }
  if (!values.text_introduction) { errors.text_introduction = 'Required' }
  if (values.text_introduction && values.text_introduction.length > 1500) { errors.text_introduction = 'Must be less than 1500 characters' }
  if (values.url_linkedin && !values.url_linkedin.match(LINKEDIN_PATTERN)) {
    errors.url_linkedin = 'Please enter a URL in the format of "https://linkedin.com/in/yourprofile"'
  }
  if (values.url_github && !values.url_github.match(GITHUB_PATTERN)) {
    errors.url_github = 'Please enter a URL in the format of "https://github.com/yourprofile"'
  }
  if (values.url_blog && !values.url_blog.match(URL_WITH_TLDS_PATTERN)) {
    errors.url_blog = 'Please enter a URL in the format of "https://example.com"'
  }
  if ((values.url_dribbble && !values.url_dribbble.match(DRIBBBLE_PATTERN))) {
    errors.url_dribbble = 'Please enter a URL in the format of "https://dribbble.com/yourprofile"'
  }

  if (values.job_types && values.job_types.includes('freelance') && (!values.freelancer_rate || values.freelancer_rate < minHourlyRate)) {
    if (!values.freelancer_rate) {
      errors.freelancer_rate = 'Please enter your rate'
    } else {
      errors.freelancer_rate = `Your rate must be at least ${minHourlyRate}`
    }
  }

  if (values.job_types && values.job_types.includes('permanent') && (!values.annual_compensation || values.annual_compensation < minAnnualComp)) {
    if (!values.annual_compensation) {
      errors.annual_compensation = 'Please enter your minimum annual compensation'
    } else {
      errors.annual_compensation = `Your minimum annual compensation must be at least ${minAnnualComp}`
    }
  }
  /*
  // TODO: This validator does not work correctly and prevents submitting a profile for a freelancer type that has no subtypes
  if ((!values.freelancer_subtype_ids || values.freelancer_subtype_ids.length < 1) && props.freelancerSubtypes && props.freelancerSubtypes.length > 0) {
    errors.freelancer_subtype_ids = 'Required'
  }
  */

  return errors
}

function getInitialValues(freelancer: Partial<IFreelancer & ICurrentUser>, applyingToJob: boolean) {
  const profile = (freelancer?.profile || {}) as IProfile
  let { available_at } = profile

  if (available_at == null || isUndefined(available_at)) {
    available_at = moment().add(1000, 'hours').startOf('day').toDate().toString()
  } else {
    available_at = new Date(available_at).toString()
  }

  return {
    id: profile.id,
    first_name: freelancer.first_name,
    last_name: freelancer.last_name,
    city: profile.city,
    blog_posts: freelancer.blog_posts || [],
    video_id: freelancer?.video?.id,
    region: profile.region,
    country: profile.country,
    user_skills: freelancer.user_skills,
    full_address: profile.full_address,
    timeline_entries: freelancer.timeline_entries || [],
    answers: freelancer.answers,
    project_submissions: freelancer.project_submissions,
    managed_team_size: profile.managed_team_size,
    avatar_url: freelancer.avatar_url,
    status: freelancer.status,
    availability: profile.availability || 'available_now',
    visibility: profile.visibility || 'visibility_public',
    freelancer_rate: profile.rate === 0 ? undefined : profile.rate,
    annual_compensation: profile.annual_compensation,
    availability_type: profile.availability_type || [],
    job_types: profile.job_types || [],
    available_at,
    freelancer_type_id: profile.freelancer_type_id,
    freelancer_subtype_ids: profile.freelancer_subtype_ids || [],
    text_introduction: profile.text_introduction,
    total_experience: profile.total_experience,
    can_work_in_the_us: profile.can_work_in_the_us,
    location_latitude: profile.location_latitude,
    location_longitude: profile.location_longitude,
    location_bounds_0: profile.location_bounds_0,
    location_bounds_1: profile.location_bounds_1,
    location_bounds_2: profile.location_bounds_2,
    location_bounds_3: profile.location_bounds_3,
    url_resume: freelancer.resume?.url,
    url_blog: profile.url_blog,
    url_dribbble: profile.url_dribbble,
    url_github: profile.url_github,
    url_linkedin: profile.url_linkedin,
    open_to_opportunities: profile.open_to_opportunities || applyingToJob,
  }
}

const mapStateToProps = (state: RootState, { router }: WithRouterProps) => {
  const freelancerLoaded = state.freelancer?.id === state.auth.currentUser.id
  const freelancer: Partial<IFreelancer & ICurrentUser> = freelancerLoaded ? state.freelancer : state.auth.currentUser
  const applyingToJob = Boolean(extractQueryParams(router?.asPath)?.job)

  return {
    user: state.auth.currentUser,
    loading: !freelancerLoaded,
    serverError: state.profile.serverError,
    isSubmitting: state.profile.submitting,
    isAutosaving: state.profile.autosaving,
    resume: freelancer.resume,
    submitFailed: hasSubmitFailed('myProfileForm', state as any),
    errors: getFormSyncErrors('myProfileForm')(state),
    initialValues: getInitialValues(freelancer, applyingToJob),
    liteMode: !formValueSelector('myProfileForm')(state, 'open_to_opportunities'),
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitForm: (formData) => {
    formData.available_at = moment(formData.available_at).format('YYYY-MM-DD')
    dispatch(submitMyProfileForm(formData))
  },
  refresh: () => dispatch(refreshFreelancerSelf()),
  getSampleVideos: async () => {
    try {
      const freelancers = await getAPIClient().getTopFreelancers()
      return freelancers.filter(f => get(f, 'video.url')).map(f => ({ src: f.video.url }))
    } catch (error) {
      trackError(error)
    }
    return []
  },
  getJobApplications: async () => {
    try {
      return await getAPIClient().getContracts({ status: 'job_application_draft,job_application_invited,job_application_sent' }) as IContractForFreelancer[]
    } catch (error) {
      trackError(error)
    }
    return []
  },
  importResume: (resume) => {
    dispatch(createAction(IMPORT_RESUME)(resume))
  },
})

export const ProfileForm = Profile

export const FORM_NAME = 'myProfileForm'

const ProfileReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(ProfileForm)

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = WithRouterProps & ConnectedProps<typeof connector> & InjectedFormProps

export default withRouter(connector(ProfileReduxForm))
