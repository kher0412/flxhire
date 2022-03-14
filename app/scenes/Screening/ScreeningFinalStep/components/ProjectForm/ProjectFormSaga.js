import { takeEvery, put } from 'redux-saga/effects'
import { getAPIClient } from 'api'
import { showSnackbarMessage } from 'sagas/__helpers'
import { trackError, trackEvent } from 'services/analytics'
import { SUBMIT_PROJECT_FORM, setProjects, submitProjectFormFailed } from './ProjectFormDucks'

function* submitProjectGenerator(action) {
  try {
    const { title, ...submission } = action.payload.formData
    const project = yield getAPIClient().sendProfileProjectForm({ title }, submission)
    trackEvent('Member profile - save project')
    yield put(setProjects([project]))
    yield showSnackbarMessage('Project Saved')
  } catch (err) {
    trackError(err)
    yield put(submitProjectFormFailed(err.response))
    yield showSnackbarMessage('Save Project failed')
  }
}

export function* watchSubmitProject() {
  yield takeEvery(SUBMIT_PROJECT_FORM, submitProjectGenerator)
}
