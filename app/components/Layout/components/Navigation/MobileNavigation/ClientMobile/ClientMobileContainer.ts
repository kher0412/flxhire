import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { createAction } from 'redux-actions'
import { LOGOUT, GOTO_ADMIN } from 'reducers/Auth'
import { setLayoutType as setLayoutTypeAction, TOGGLE_MOBILE_DRAWER } from 'components/Layout/LayoutDucks'
import ClientMobile from './ClientMobile'
import { getBadgeData } from '../../NavigationDucks'

const mapStateToProps = (state: RootState) => ({
  user: state.auth.currentUser,
  badgeData: state.navigation.badgeData,
  layoutType: state.layout.type,
})

const mapDispatchToProps = dispatch => ({
  getBadgeData: () => dispatch(getBadgeData()),
  setLayoutType: type => dispatch(setLayoutTypeAction({ type })),
  logout: () => {
    dispatch(createAction(LOGOUT)())
    dispatch(createAction(TOGGLE_MOBILE_DRAWER)({ mobile: false }))
  },
  goToAdmin: () => {
    dispatch(createAction(GOTO_ADMIN)())
    dispatch(createAction(TOGGLE_MOBILE_DRAWER)({ mobile: false }))
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(ClientMobile)
