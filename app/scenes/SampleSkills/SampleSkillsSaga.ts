import { getAPIClient } from 'api'
import { browserHistory } from 'services/router'
import { createAction } from 'redux-actions'
import { put, call, takeLatest } from 'redux-saga/effects'
import { GET_TOP_FREELANCERS, SET_TOP_FREELANCERS, GET_SKILL, SET_SKILL } from './SampleSkillsDucks'

export function* performGetTopFreelancers(action) {
  try {
    const slug = action.payload.slug
    const skill = yield call([getAPIClient(), 'getSkillBySlug'], slug)
    const freelancerTypeName = action.payload.freelancerTypeName
    const topFreelancers = yield call([getAPIClient(), 'getTopFreelancersBySkill'], skill.id, freelancerTypeName)

    yield put(createAction(SET_TOP_FREELANCERS)(topFreelancers))

    if (topFreelancers.length === 0) {
      browserHistory.push('/', null, { replace: true })
    }
  } catch (err) {
    console.error(err)
  }
}

export function* performGetSkill(action) {
  try {
    const slug = action.payload.slug
    const skill = yield call([getAPIClient(), 'getSkillBySlug'], slug)
    yield put(createAction(SET_SKILL)(skill))
  } catch (err) {
    console.error(err)
  }
}

function* watch() {
  yield takeLatest(GET_TOP_FREELANCERS, performGetTopFreelancers)
  yield takeLatest(GET_SKILL, performGetSkill)
}

export default watch
