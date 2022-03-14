import { connect, ConnectedProps } from 'react-redux'
import { toggleDesktopDrawer, toggleMobileDrawer } from 'components/Layout/LayoutDucks'
import DrawerLink from './DrawerLink'

const mapDispatchToProps = dispatch => ({
  closeDrawer: () => {
    dispatch(toggleMobileDrawer({ mobile: false }))
  },
})

const connector = connect(null, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(DrawerLink)
