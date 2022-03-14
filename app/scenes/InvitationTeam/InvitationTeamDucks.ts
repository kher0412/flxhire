import update from 'immutability-helper'
import { IAPIError, IClient, IContractForClient, IJob } from 'types'

export const SET_JOBS = 'flexhire/client/invitation/SET_JOBS'
export const SET_MANAGERS = 'flexhire/client/invitation/SET_MANAGERS'
export const SET_INVITATIONS = 'flexhire/client/invitation/SET_INVITATIONS'
export const GET_INVITATIONS = 'flexhire/client/invitation/GET_INVITATIONS'
export const REVOKE_INVITATION = 'flexhire/client/invitation/REVOKE_INVITATION'

export const ROWS_PER_PAGE = 25

const initialState = {
  jobs: [] as IJob[],
  jobsReceived: false,
  managers: [] as IClient[],
  managersReceived: false,
  invitations: [] as IContractForClient[],
  invitationsBeingRevoked: [] as IContractForClient[],
  serverError: null as IAPIError,
  sendingInvitation: false,
  pagination: {
    page: 0,
    rowsPerPage: ROWS_PER_PAGE,
    count: 0,
  },
}

export default function reducer(state = initialState, action) {
  const p = action.payload

  switch (action.type) {
    case SET_JOBS:
      return update(state, {
        jobs: { $set: p.jobs },
        jobsReceived: { $set: true },
      })
    case SET_MANAGERS:
      return update(state, {
        managers: { $set: p.clients },
        managersReceived: { $set: true },
      })
    case SET_INVITATIONS:
      return update(state, {
        invitations: { $set: p.invitations },
        invitationsBeingRevoked: { $set: [] },
        pagination: {
          count: { $set: p.count || initialState.pagination.count },
          page: { $set: p.page || 0 },
          rowsPerPage: { $set: p.rowsPerPage },
        },
      })
    case REVOKE_INVITATION:
      return update(state, {
        invitationsBeingRevoked: { $set: [...state.invitationsBeingRevoked, p.invitation.id] },
      })
    default:
      return state
  }
}
