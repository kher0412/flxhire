import update from 'immutability-helper'

export const SET_REFERENCES_COUNT_ERROR = 'flexhire/profile/references/SET_REFERENCES_COUNT_ERROR'

const initialState = {
  referencesCount: 0,
  referencesError: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_REFERENCES_COUNT_ERROR:
      return update(state, {referencesError: {$set: true}})
    default:
      return state
  }
}
