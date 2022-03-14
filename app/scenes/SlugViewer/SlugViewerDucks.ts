import update from 'immutability-helper'
import { IJob, IFirm, IFreelancer, IAPIError } from 'types'

export const SET_RESOURCE = 'flexhire/slugViewer/SET_RESOURCE'
export const SET_ERROR = 'flexhire/slugViewer/SET_ERROR'
export const SET_LOADING = 'flexhire/slugViewer/SET_LOADING'

interface SlugViewerState {
  id: string
  subid: string
  loading: boolean
  resource: IJob | IFirm | IFreelancer
  error: IAPIError
}

const initialState: SlugViewerState = {
  id: null,
  subid: null,
  loading: true,
  resource: null,
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return update(state, {
        id: { $set: action.payload.id },
        subid: { $set: action.payload.subid },
        // only set loading: true if we are loading a different resource and not refreshing this one
        // refreshing is used when hydrating to update any old cached data that has been changed
        loading: { $set: action.payload.id !== state.id || action.payload.subid !== state.subid },
      })

    case SET_ERROR:
      return update(state, {
        loading: { $set: false },
        error: { $set: action.payload },
        resource: { $set: null },
        id: { $set: null },
        subid: { $set: null },
      })

    case SET_RESOURCE:
      return update(state, {
        id: { $set: action.payload.id },
        subid: { $set: action.payload.subid },
        loading: { $set: false },
        error: { $set: null },
        resource: { $set: action.payload.resource },
      })

    default:
      return state
  }
}
