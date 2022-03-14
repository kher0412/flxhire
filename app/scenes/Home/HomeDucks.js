import update from 'immutability-helper'

export const SET_TOP_FREELANCERS = 'flexhire/home/SET_TOP_FREELANCERS'

const initialState = {
  topFreelancers: [],
}

export default function homeReducer(state = initialState, action) {
  const p = action.payload
  switch (action.type) {
    case SET_TOP_FREELANCERS:
      return update(state, {
        topFreelancers: { $set: p.freelancers },
      })
    default:
      return state
  }
}
