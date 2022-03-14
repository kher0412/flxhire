/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */
import React from 'react'
import { classList } from 'services/styles'
import PageContext from './context'
import styles from './Page.module.css'

export interface IPageContext {
  sidebar?: any
  sidebarMode?: string
  sidebarOpen: boolean
  setSidebarOpenState: (isOpen: boolean) => void
}

export interface IPageProps extends React.HTMLProps<HTMLDivElement> {
  sidebarMode?: string
  sidebar?: any
  children: React.ReactNode
}

export interface IPageState extends React.HTMLProps<HTMLDivElement> {
  isSidebarDrawerOpen: boolean
}

class Page extends React.Component<IPageProps, IPageState> {
  state = {
    isSidebarDrawerOpen: false,
  }

  render() {
    const { sidebar, sidebarMode, children, className, style, ...restProps } = this.props
    const { isSidebarDrawerOpen } = this.state

    const context: IPageContext = {
      sidebar: sidebar,
      sidebarMode: sidebarMode,
      sidebarOpen: isSidebarDrawerOpen,
      setSidebarOpenState: this.handleSetSidebarOpenState,
    }

    return (
      <div
        className={classList(styles.container, className)}
        style={style}
        {...restProps}
      >
        <PageContext.Provider value={context}>
          {this.renderChildren(children, context)}
        </PageContext.Provider>
      </div>
    )
  }

  renderChildren(children, context) {
    if (typeof children === 'function') {
      return children(context)
    }

    return children
  }

  handleSetSidebarOpenState = (isOpen) => {
    this.setState({
      isSidebarDrawerOpen: isOpen,
    })
  }
}

// Wrapper class over the actual Page component for listening to window resize events.
// This is a workaround, as hooks seem to be bugged with SSR.
export default class extends React.Component<IPageProps, {}> {
  state = {
    sidebarMode: 'drawer',
  }

  componentDidMount() {
    window.addEventListener('resize', this.detectSidebarMode)
    this.detectSidebarMode()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.detectSidebarMode)
  }

  render() {
    const { sidebarMode } = this.state

    return (
      <Page
        sidebarMode={sidebarMode}
        {...this.props as any}
      />
    )
  }

  detectSidebarMode = () => {
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth <= 1200
    const isMediumScreen = typeof window !== 'undefined' && window.innerWidth <= 1600
    let sidebarMode = 'side'

    if (isSmallScreen) {
      sidebarMode = 'drawer'
    } else if (isMediumScreen) {
      sidebarMode = 'column'
    }

    this.setState({ sidebarMode })
  }
}
