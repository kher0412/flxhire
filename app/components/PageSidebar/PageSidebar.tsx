import React from 'react'
import ReactDOM from 'react-dom'
import { Badge, Drawer, IconButton } from '@material-ui/core'
import { classList } from 'services/styles'
import { MediaQuery } from 'components'
import { MoreHoriz } from '@material-ui/icons'
import PageContext from '../Page/context'
import styles from './PageSidebar.module.css'

export interface IPageSidebarProps {
  sticky?: boolean
  mobile?: 'button' | 'hidden'
  mobileIcon?: React.ReactNode
  hidden?: boolean | number
}

export interface IPageSidebarState {
  isDrawerOpen: boolean
}

export default class PageSidebar extends React.Component<IPageSidebarProps, IPageSidebarState> {
  static contextType = PageContext

  constructor(props: IPageSidebarProps) {
    super(props)

    this.state = {
      isDrawerOpen: false,
    }
  }

  componentDidMount() {
    this.forceUpdate()
  }

  render() {
    const { children, sticky, mobile, mobileIcon, hidden, ...restProps } = this.props

    let hiddenThreshold = 1200

    if (typeof hidden === 'number') {
      hiddenThreshold = hidden
    } else if (typeof hidden === 'boolean') {
      hiddenThreshold = hidden ? 100000 : 0
    }

    return (
      <MediaQuery maxWidth={hiddenThreshold}>
        {isMobile => (
          <React.Fragment>
            {isMobile && this.renderMobileMode()}

            {!isMobile && (
              <div className={styles.wrapper}>
                <div className={styles.container} {...restProps}>
                  <div className={classList(styles.content, sticky && styles.sticky)}>
                    <div>
                      {this.renderChildren(children)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        )}
      </MediaQuery>
    )
  }

  renderMobileMode() {
    const { mobile, mobileIcon = <MoreHoriz />, children } = this.props
    const { isDrawerOpen } = this.state
    const target = document.getElementById('mobile-sidebar-button-container')

    if (!target) {
      return null
    }

    switch (mobile) {
      case 'button':
        return ReactDOM.createPortal(
          (
            <React.Fragment>
              <Badge>
                <IconButton
                  className={styles.sandwich}
                  onClick={this.handleDrawerOpen}
                  data-cy="mobile-navigation"
                >
                  {mobileIcon}
                </IconButton>
              </Badge>

              <Drawer open={isDrawerOpen} onClose={this.handleDrawerClose} anchor="right">
                {this.renderChildren(children)}
              </Drawer>
            </React.Fragment>
          ),
          target,
        )

      default:
        // assume 'hidden'
        return null
    }
  }

  renderChildren(children: React.ReactNode) {
    if (typeof children === 'function') {
      return children({
        isDrawerOpen: this.state.isDrawerOpen,
        closeDrawer: this.handleDrawerClose,
      })
    }

    return children
  }

  handleDrawerOpen = () => {
    this.setState({
      isDrawerOpen: true,
    })
  }

  handleDrawerClose = () => {
    this.setState({
      isDrawerOpen: false,
    })
  }
}
