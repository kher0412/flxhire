import update from 'immutability-helper'
import { ICurrentUser, ActionWithPayload, IFlexhireConfiguration, IAPIError } from 'types'
import { createAction, ActionFunctionAny } from 'redux-actions'
import { setUserInfo } from 'services/analytics'
import { isPrerendering } from 'services/prerender'
import { Action } from 'redux'
import { omit } from 'lodash'
import { isGuest } from 'services/user'

export const PROVIDER_AUTH_START = 'flexhire/auth/PROVIDER_AUTH_START'
export const PROVIDER_AUTH_FAILED = 'flexhire/auth/PROVIDER_AUTH_FAILED'
export const TICK_TIMER = 'flexhire/auth/TICK_TIMER'
export const SET_CURRENT_USER = 'flexhire/auth/SET_CURRENT_USER'
export const GET_CURRENT_USER = 'flexhire/auth/GET_CURRENT_USER'
export const SET_CONFIGURATION = 'flexhire/auth/SET_CONFIGURATION'
export const SETUP_AUTH = 'flexhire/auth/SETUP_AUTH'
export const LOGOUT = 'flexhire/auth/LOGOUT'
export const LOGIN = 'flexhire/auth/LOGIN'
export const SET_LOGGED_OUT = 'flexhire/auth/SET_LOGGED_OUT'
export const GOTO_ADMIN = 'flexhire/auth/GOTO_ADMIN'
export const FORGOT_PASSWORD_FORM = 'flexhire/auth/FORGOT_PASSWORD_FORM'
export const CHANGE_PASSWORD_FORM = 'flexhire/auth/CHANGE_PASSWORD_FORM'
export const CHANGE_PASSWORD_FORM_FAILED = 'flexhire/auth/CHANGE_PASSWORD_FORM_FAILED'
export const SET_FIRM = 'flexhire/auth/SET_FIRM'

interface AuthState {
  currentUser: ICurrentUser
  status: IAuthStatus
  providerInProgress: IAuthProvider
  serverError: IAPIError
  changePasswordForm: {
    serverError?: IAPIError
  }
}

export type IAuthStatus = 'in_progress' | 'failed'

export type IAuthProvider = 'linkedin' | 'github'

export const initialState: AuthState = {
  status: null as IAuthStatus,
  providerInProgress: null as IAuthProvider,
  serverError: null,
  currentUser: {
    loading: true,
    roles: [],
    configuration: {
      loading: true,
    },
  },
  changePasswordForm: { serverError: undefined },
}

export const getCurrentUser: ActionFunctionAny<Action> = createAction(GET_CURRENT_USER)
export const setCurrentUser: ActionFunctionAny<ActionWithPayload<{ currentUser: ICurrentUser }>> = createAction(SET_CURRENT_USER)
export const setConfiguration: ActionFunctionAny<ActionWithPayload<IFlexhireConfiguration>> = createAction(SET_CONFIGURATION)

export default function reducer(state = initialState, action: ActionWithPayload<any>) {
  const p = action.payload
  switch (action.type) {
    case PROVIDER_AUTH_START:
      return update(state, { status: { $set: 'in_progress' }, providerInProgress: { $set: p.provider }, serverError: { $set: null } })
    case PROVIDER_AUTH_FAILED:
      return update(state, { status: { $set: 'failed' }, serverError: { $set: p.error } })
    case SET_CURRENT_USER:
      if (!p.currentUser) return state
      if (!isPrerendering()) setUserInfo(p.currentUser)
      if (p.keepRealUser) {
        return update(state, {
          currentUser: {
            $set: {
              real_user: state.currentUser?.real_user,
              ...omit(p.currentUser, 'real_user'),
            } as ICurrentUser,
          },
        })
      }
      return update(state, { currentUser: { $set: p.currentUser } })
    case SET_CONFIGURATION:
      return update(state, {
        currentUser: {
          configuration: { $set: p.configuration || state.currentUser.configuration },
        },
      })
    case SET_FIRM:
      if (p?.firm?.id !== state.currentUser?.firm?.id) return state
      return update(state, {
        currentUser: {
          firm: {
            $set: p.firm,
          },
        },
      })
    case CHANGE_PASSWORD_FORM:
      return update(state, { changePasswordForm: { serverError: { $set: undefined } } })
    case CHANGE_PASSWORD_FORM_FAILED:
      return update(state, { changePasswordForm: { serverError: { $set: p.error } } })
    // Note: LOGOUT and SET_LOGGED_OUT look the same, but have different saga effects.
    case SET_LOGGED_OUT:
    case LOGOUT: {
      if (isGuest(state.currentUser)) return state
      return update(state, { currentUser: { $set: initialState.currentUser } })
    }
    default:
      return state
  }
}
