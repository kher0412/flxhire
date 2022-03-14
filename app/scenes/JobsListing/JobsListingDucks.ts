
import update from 'immutability-helper'
import { IJob } from 'types'

export const GET_JOBS = 'flexhire/jobsListing/GET_JOBS'
export const SET_JOBS = 'flexhire/jobsListing/SET_JOBS'

const initialState = {
  id: null as number,
  jobsReceived: false,
  jobs: [] as IJob[],
}

export default function reducer(state = initialState, action) {
  const p = action.payload

  switch (action.type) {
    case GET_JOBS:
      // If the ID is the same, we are refreshing existing data, so do not do anything
      if (state.id === p) return state
      return update(state, {
        id: { $set: p },
        jobs: { $set: [] },
        jobsReceived: { $set: false },
      })

    case SET_JOBS:
      return update(state, {
        id: { $set: p.id || state.id },
        jobs: { $set: p.jobs },
        jobsReceived: { $set: true },
      })

    default:
      return state
  }
}
