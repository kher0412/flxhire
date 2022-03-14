import update from 'immutability-helper'

export const START_APPLICATION = 'flexhire/profile/review/START_APPLICATION'
export const CANCEL_APPLICATION = 'flexhire/profile/review/CANCEL_APPLICATION'
export const START_APPLICATION_SUCCESS = 'flexhire/profile/review/START_APPLICATION_SUCCESS'
export const START_APPLICATION_ERROR = 'flexhire/profile/review/START_APPLICATION_ERROR'

const initialState = {
  startApplicationError: null,
}

export function startApplication() {
  return {
    type: START_APPLICATION,
  }
}

export function cancelApplication() {
  return {
    type: CANCEL_APPLICATION,
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_APPLICATION_SUCCESS:
      return update(state, { startApplicationError: { $set: null } })
    case START_APPLICATION_ERROR:
      return update(state, { startApplicationError: { $set: action.payload.error } })
    default:
      return state
  }
}
