import update from 'immutability-helper'
import { get } from 'lodash'

export const GET_SLOTS = 'flexhire/profile/schedule_interview/GET_SLOTS'
export const SET_SLOTS = 'flexhire/profile/schedule_interview/SET_SLOTS'
export const SET_CURRENT_SLOT = 'flexhire/profile/schedule_interview/SET_CURRENT_SLOT'

export const ROWS_PER_PAGE = 5

export function setSlots(response) {
  return {
    type: SET_SLOTS,
    payload: response
  }
}

export function getSlots() {
  return { type: GET_SLOTS }
}

export function setCurrentSlot(currentSlot) {
  return { 
    type: SET_CURRENT_SLOT,
    payload: { currentSlot }
  }
}

function getInitialState() {
  return {
    interviewSlotsReceived: true,
    interviewSlots: [],
    currentSlot: null,
    pagination: {
      count: 0,
      page: 0,
      rowsPerPage: ROWS_PER_PAGE
    }
  }
}

function first(obj) {
  if (Array.isArray(obj)){
    if(obj.length > 0) return obj[0]
    return null
  }
  return obj
}

export default function reducer(state = getInitialState(), action) {
  const p = action.payload
  switch (action.type) {
    case GET_SLOTS:
      return update(state, {
        interviewSlotsReceived: { $set: false }
      })
    case SET_SLOTS:
      const count = p.count || getInitialState().pagination.count
      return update(state, {
        interviewSlots: { $set: Object.values(p.body) },
        interviewSlotsReceived: { $set: true },
        pagination: {
          count: { $set: get(p, 'headers.totalCount', count) },
          page: { $set: get(p, 'params.page', 0) },
          rowsPerPage: { $set: get(p, 'params.per_page', ROWS_PER_PAGE) },
        }
      })
    case SET_CURRENT_SLOT:
      return update(state, {
        currentSlot: { $set: first(p.currentSlot) }
      })
    default:
      return state
  }
}

