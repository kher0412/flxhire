import update from 'immutability-helper'
import { ActionFunctionAny, createAction } from 'redux-actions'
import { getRefererInfo, getRefInfo } from 'services/tracking'
import { ActionWithPayload } from 'types'

export const SET_REFERER = 'flexhire/tracking/SET_REFERER'
export const SET_REF = 'flexhire/tracking/SET_REF'

export const setReferer: ActionFunctionAny<ActionWithPayload<{ referer: string }>> = createAction(SET_REFERER)
export const setRef: ActionFunctionAny<ActionWithPayload<{ ref: string }>> = createAction(SET_REF)

function getInitialState() {
  return {
    // "referer" comes from `document.referer` and is the page where the user was before reaching flexhire
    referer: getRefererInfo(),
    // "ref" comes from the `ref` query param and is used to mark a specific link and then recognize people from that link.
    ref: getRefInfo(),
  }
}

export default function TrackingReducer(state = getInitialState(), action) {
  switch (action.type) {
    case SET_REFERER:
      return update(state, {
        referer: { $set: action.payload.referer },
      })
    case SET_REF:
      return update(state, {
        ref: { $set: action.payload.ref },
      })
    default:
      return state
  }
}
