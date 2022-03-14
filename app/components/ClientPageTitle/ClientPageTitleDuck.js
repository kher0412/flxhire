import update from 'immutability-helper'

export const GET_MANAGERS = 'flexhire/client-page-title/GET_MANAGERS'
export const SET_MANAGER_COUNT = 'flexhire/client-page-title/SET_MANAGER_COUNT'

const initialState = {
  teamManagerCount: null,
}

export default function reducer(state = initialState, action) {
  const p = action.payload
  switch (action.type) {
    case SET_MANAGER_COUNT:
      return update(state, { teamManagerCount: { $set: p.teamManagerCount }})
    default:
      return state
  }
}
