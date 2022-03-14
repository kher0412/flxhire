import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { LOGOUT, GOTO_ADMIN } from 'reducers/Auth'
import { setLayoutType as setLayoutTypeAction, TOGGLE_MOBILE_DRAWER } from 'components/Layout/LayoutDucks'
import FreelancerMobile from './FreelancerMobile'

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(createAction(LOGOUT)())
    dispatch(createAction(TOGGLE_MOBILE_DRAWER)({ mobile: false }))
  },
  setLayoutType: type => dispatch(setLayoutTypeAction({ type })),
  goToAdmin: () => {
    dispatch(createAction(GOTO_ADMIN)())
    dispatch(createAction(TOGGLE_MOBILE_DRAWER)({ mobile: false }))
  },
})

const connector = connect(null, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(FreelancerMobile)
