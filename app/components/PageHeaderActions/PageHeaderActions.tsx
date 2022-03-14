import React from 'react'
import styles from './PageHeaderActions.module.css'

const WRAP_HEIGHT_THRESHOLD = 48

interface IPageHeaderActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  alternative?: boolean
}

interface IPageHeaderActionsState {
  wrap: boolean
}

export default class PageHeaderActions extends React.Component<IPageHeaderActionsProps, IPageHeaderActionsState> {
  container: any

  state = {
    wrap: false,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
    this.actualizeWrapState()
  }

  componentDidUpdate() {
    this.actualizeWrapState()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  render() {
    const { children, ...restProps } = this.props

    return (
      <div ref={div => this.container = div} className={this.getStyleName()} {...restProps}>
        {children}
      </div>
    )
  }

  handleWindowResize = () => this.forceUpdate()

  getStyleName() {
    const { alternative } = this.props
    const { wrap } = this.state

    const styleNameList = [styles.actions]

    if (!alternative) styleNameList.push(styles['actions-not-alternative'])
    if (wrap) styleNameList.push(styles.wrap)

    return styleNameList.join(' ')
  }

  actualizeWrapState() {
    if (this.container.getBoundingClientRect().height > WRAP_HEIGHT_THRESHOLD) {
      if (!this.state.wrap) {
        this.setState({
          wrap: true,
        })
      }
    } else if (this.state.wrap) {
      this.setState({
        wrap: false,
      })
    }
  }
}
