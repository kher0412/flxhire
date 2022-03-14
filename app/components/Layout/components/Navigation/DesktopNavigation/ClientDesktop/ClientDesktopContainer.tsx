import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { createAction } from 'redux-actions'
import { LOGOUT } from 'reducers/Auth'
import ClientDesktop from './ClientDesktop'
import { getBadgeData } from '../../NavigationDucks'

const mapStateToProps = (state: RootState) => ({
  badgeData: state.navigation.badgeData,
  user: state.auth.currentUser,
})

const mapDispatchToProps = dispatch => ({
  getBadgeData: () => dispatch(getBadgeData()),
  logout: () => dispatch(createAction(LOGOUT)()),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(ClientDesktop)
