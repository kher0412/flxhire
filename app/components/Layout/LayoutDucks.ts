import update from 'immutability-helper'
import { SET_CURRENT_USER } from 'reducers/Auth'
import { createAction, ActionFunctionAny } from 'redux-actions'
import { isClient, isGuest, isMember } from 'services/user'
import { ActionWithPayload, ICurrentUser } from 'types'

export const TOGGLE_DESKTOP_DRAWER = 'flexhire/common/TOGGLE_DESKTOP_DRAWER'
export const TOGGLE_MOBILE_DRAWER = 'flexhire/common/TOGGLE_MOBILE_DRAWER'
export const SET_HEADER_VARIANT = 'flexhire/common/SET_HEADER_VARIANT'
export const SET_SIDEBAR_VARIANT = 'flexhire/common/SET_SIDEBAR_VARIANT'
export const SET_LAYOUT_TYPE = 'flexhire/common/SET_LAYOUT_TYPE'

export type HeaderVariant = 'default' | 'primary'
export type SidebarVariant = 'default' | 'primary'

export type LayoutType = 'guest' | 'client' | 'member'

const initialState = {
  drawer: { desktop: true, mobile: false },
  header: { variant: undefined as HeaderVariant },
  sidebar: { variant: 'primary' },
  type: 'guest' as LayoutType,
}

export const toggleDesktopDrawer: ActionFunctionAny<ActionWithPayload<{ desktop: boolean }>> = createAction(TOGGLE_DESKTOP_DRAWER)
export const toggleMobileDrawer: ActionFunctionAny<ActionWithPayload<{ mobile: boolean }>> = createAction(TOGGLE_MOBILE_DRAWER)
export const setHeaderVariant: ActionFunctionAny<ActionWithPayload<{ variant: HeaderVariant }>> = createAction(SET_HEADER_VARIANT)
export const setSidebarVariant: ActionFunctionAny<ActionWithPayload<{ variant: SidebarVariant }>> = createAction(SET_SIDEBAR_VARIANT)
export const setLayoutType: ActionFunctionAny<ActionWithPayload<{ type: LayoutType }>> = createAction(SET_LAYOUT_TYPE)

function adjustLayoutType(type: LayoutType, currentUser: ICurrentUser): LayoutType {
  if (!currentUser || isGuest(currentUser)) return 'guest'
  if (isClient(currentUser) && !isMember(currentUser)) return 'client'
  if (!isClient(currentUser) && isMember(currentUser)) return 'member'

  // User is both client and member
  if (!['client', 'member'].includes(type)) return 'client' // default layout to client
  return type
}

export default function reducer(state = initialState, action) {
  const p = action.payload
  switch (action.type) {
    case TOGGLE_DESKTOP_DRAWER:
      return update(state, {
        drawer: {
          desktop: { $set: p.desktop },
        },
      })
    case TOGGLE_MOBILE_DRAWER:
      return update(state, {
        drawer: {
          mobile: { $set: p.mobile },
        },
      })

    case SET_HEADER_VARIANT:
      return update(state, {
        header: {
          variant: { $set: p.variant },
        },
      })
    case SET_SIDEBAR_VARIANT:
      return update(state, {
        header: {
          variant: { $set: p.variant },
        },
      })
    case SET_LAYOUT_TYPE:
      return update(state, {
        type: {
          $set: action.payload.type,
        },
      })

    case SET_CURRENT_USER:
      return update(state, {
        type: {
          $set: adjustLayoutType(state.type, action.payload.currentUser),
        },
      })

    default:
      return state
  }
}
