import { takeLatest, throttle, call, put, select } from 'redux-saga/effects'
import { SET_CURRENT_USER } from 'reducers/Auth'
import { createAction } from 'redux-actions'
import { showSnackbarMessage } from 'sagas/__helpers'
import { getAPIClient } from 'api'
import { browserHistory, extractQueryParams, getLocationWithSearch } from 'services/router'
import { isNumber } from 'services/numbers'
import { trackEvent, trackError } from 'services/analytics'
import { RootState } from 'reducers'
import { setFreelancer, IMPORT_RESUME, SET_EDITING_TIMELINE_ENTRY } from 'scenes/FreelancerProfile/FreelancerProfileDucks'
import { IFreelancer } from 'types'
import { change } from 'redux-form'
import {
  AUTOSAVE_STARTED,
  AUTOSAVE_ENDED,
  SUBMIT_MY_PROFILE_FORM,
  SUBMIT_MY_PROFILE_FORM_FAILED,
  SUBMIT_MY_PROFILE_FORM_SUCCESS,
} from './ProfileDucks'
import { FORM_NAME } from './ProfileContainer'

function getUserPayload(formData) {
  const payload: any = {
    profile_attributes: formData,
    phone: formData.phone,
    first_name: formData.first_name,
    last_name: formData.last_name,
    terms_of_service_approved: formData.terms_of_service_approved,
    avatar_url: formData.avatar_url,
    skills: formData.user_skills,
  }
  if (Array.isArray(formData.timeline_entries)) {
    // Do NOT send "[]" as a default if the parameter is missing, omit it instead
    payload.timeline_entries = formData.timeline_entries
  }
  return payload
}

export function* submitProfile(action) {
  try {
    let currentUser = yield select((state: RootState) => state.auth.currentUser)
    currentUser = yield call([getAPIClient(), 'updateUser'], currentUser.id, getUserPayload(action.formData))

    if (currentUser.status !== 'pending') {
      trackEvent('Member profile - My Profile')
      yield put(createAction(SET_CURRENT_USER)({ currentUser }))
      yield put(createAction(SUBMIT_MY_PROFILE_FORM_SUCCESS)())
    }

    const { formData } = action

    const jobApplications = yield call([getAPIClient(), 'getContracts'], {
      status: 'job_application_draft,job_application_invited,job_application_sent',
    })

    const hasOneJobApplication = jobApplications.length === 1
    const onlyJobApplicationIsDraft = hasOneJobApplication && jobApplications[0].status === 'job_application_draft'

    let jobSlugRedirect: string = null


    try {
      const pathJobSlug = extractQueryParams(getLocationWithSearch())?.job
      if (!isNumber(pathJobSlug)) jobSlugRedirect = pathJobSlug
    } catch (error) {
      trackError(error)
    }

    if (currentUser.status === 'pending') {
      currentUser = yield call([getAPIClient(), 'sendSubmitProfile']) // transition from pending to unverified
      yield put(createAction(SET_CURRENT_USER)({ currentUser }))
      yield put(createAction(SUBMIT_MY_PROFILE_FORM_SUCCESS)())
      const appliedToJobs = jobApplications.some(x => x.status === 'job_application_sent')

      if (appliedToJobs) {
        // Send the user to dashboard and tell them their job application is sent!
        yield showSnackbarMessage('Job application sent!')
        yield call(browserHistory.push, '/member/dashboard')
      } else if (onlyJobApplicationIsDraft) {
        // Send the user to the dialog to complete the job application
        yield call(browserHistory.push, '/[...slugs]', `/${jobApplications[0].firm_slug}/${jobApplications[0].job_slug}?applying=true`)
      } else {
        // Send the user to the dashboard and tell them the profile is public now
        if (formData.open_to_opportunities) {
          yield showSnackbarMessage('Your Profile is now Public!')
        } else {
          yield showSnackbarMessage('Profile created')
        }

        yield call(browserHistory.push, '/member/dashboard')
      }
    } else if (onlyJobApplicationIsDraft || jobSlugRedirect) {
      let firmSlug = jobApplications?.[0]?.firm_slug
      let jobSlug = jobApplications?.[0]?.job_slug
      if (jobSlugRedirect) {
        jobSlug = jobSlugRedirect
        const jobApplication = jobApplications.find(x => x.job_slug === jobSlug)
        firmSlug = jobApplication?.firm_slug || 'job'
      }
      // Send the user to the dialog to complete the job application
      yield call(browserHistory.push, '/[...slugs]', `/${firmSlug}/${jobSlug}?applying=true`)
    } else {
      yield call(browserHistory.push, '/[...slugs]', `/${currentUser.profile.slug}`)
    }
  } catch (err) {
    trackError(err)
    yield put(createAction(SUBMIT_MY_PROFILE_FORM_FAILED)({ error: err.response || err.message }))
    yield showSnackbarMessage(err.response || err.message)
  }
}

function* autosaveProfile() {
  const values = yield select((state: RootState) => state.form.myProfileForm.values)
  yield put(createAction(AUTOSAVE_STARTED)())
  const freelancer: IFreelancer = yield call([getAPIClient(), 'autosaveFreelancer'], getUserPayload(values))
  yield put(createAction(AUTOSAVE_ENDED)({ freelancer }))
  yield put(change('myProfileForm', 'timeline_entries', freelancer.timeline_entries))
}

function* checkAutosaveProfile(action) {
  try {
    const currentUser = yield select(state => state.auth.currentUser)
    const currentItemIndex = yield select((state: RootState) => state.freelancer.editingTimelineEntry.index)
    const isPending = currentUser?.status === 'pending'
    const isRightForm = action?.meta?.form === FORM_NAME
    const skip = action?.meta?.field === 'timeline_entries'
    if (isPending && isRightForm && currentItemIndex < 0 && !skip) {
      yield autosaveProfile()
    }
  } catch (err) {
    yield put(createAction(AUTOSAVE_ENDED)())
    console.log('Autosave error', err)
    // Uncomment the next line to enable tracking errors while autosaving
    // trackError(err)
  }
}

function* performImportResume(action) {
  try {
    const currentUser = yield select((state: RootState) => state.auth.currentUser)
    let freelancer: IFreelancer = yield call([getAPIClient(), 'parseResume'], currentUser.id, { url: action.payload.url })
    yield put(setFreelancer(freelancer))

    // Automatically poll until resume is processed
    while (['processing', 'processing_queued'].includes(freelancer.resume?.status)) {
      yield new Promise(resolve => setTimeout(resolve, 5000))
      freelancer = yield select((state: RootState) => state.freelancer)
      if (['processing', 'processing_queued'].includes(freelancer.resume?.status)) {
        try {
          freelancer = yield call([getAPIClient(), 'getFreelancer'], currentUser.id)
          yield put((setFreelancer(freelancer)))
        } catch (error) {
          trackError(error)
        }
      }
    }
  } catch (error) {
    trackError(error)
  }
}

function* watchSubmitMyProfile() {
  yield takeLatest(SUBMIT_MY_PROFILE_FORM, submitProfile)
  yield throttle(2000, ['@@redux-form/CHANGE', '@@redux-form/ARRAY_REMOVE', '@@redux-form/ARRAY_PUSH', SET_EDITING_TIMELINE_ENTRY], checkAutosaveProfile)
  yield takeLatest(IMPORT_RESUME, performImportResume)
}

export default watchSubmitMyProfile
