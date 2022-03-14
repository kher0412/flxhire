import React from 'react'
import PageContext from '../Page/context'
import styles from './Header.module.css'
import { ContainerProps } from './HeaderContainer'

let currentHeaderIsCompact
let currentHeaderIsAlternative
let resetCurrentHeaderTypeTimeoutHandle = 0
let currentHeaderHeight = 0

interface IHeaderProps extends ContainerProps {
  alternative?: boolean
  contentStyle?: any
  compact?: boolean
  autoCompact?: boolean
  autoAlternative?: boolean
  className?: string
  wide?: boolean
  white?: boolean
}

interface IHeaderState {
  isAlternative: boolean
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  static contextType = PageContext

  backdrop: HTMLDivElement

  container: HTMLDivElement

  altBackdrop: HTMLDivElement

  constructor(props) {
    super(props)
    this.state = {
      isAlternative: props.alternative,
    }
  }

  componentDidMount() {
    window.clearTimeout(resetCurrentHeaderTypeTimeoutHandle)
    this.actualizeBackdrop()

    if (this.props.alternative) this.props.setVariant('default')
  }

  componentDidUpdate(prevProps) {
    if (this.props.alternative && !prevProps.alternative) {
      this.props.setVariant('default')
      this.setState({ isAlternative: this.props.alternative })
    } else if (!this.props.alternative && prevProps.alternative) {
      this.props.setVariant('primary')
    }

    this.actualizeBackdrop()
  }

  componentWillUnmount() {
    window.clearTimeout(resetCurrentHeaderTypeTimeoutHandle)
    resetCurrentHeaderTypeTimeoutHandle = window.setTimeout(() => {
      currentHeaderHeight = 0
    }, 1000)

    if (this.state.isAlternative) {
      this.props.setVariant('primary')
    }
  }

  render() {
    const { children, contentStyle, compact, autoCompact, alternative, autoAlternative, setVariant, className, wide, white, ...restProps } = this.props

    return (
      <div {...restProps} className={this.getStyleName()} ref={this.acquireContainerRef}>
        <div className={styles.backdrop} ref={this.acquireBackdropRef}>
          <div className={styles['alt-backdrop']} ref={this.acquireAltBackdropRef} />
        </div>

        <div className={styles['header-content']} style={contentStyle}>
          {children}
        </div>
      </div>
    )
  }

  acquireContainerRef = (div) => {
    this.container = div
  }

  acquireBackdropRef = (div) => {
    this.backdrop = div
  }

  acquireAltBackdropRef = (div) => {
    this.altBackdrop = div
  }

  getStyleName() {
    const { compact, autoCompact, alternative, white, autoAlternative, className, wide } = this.props
    const { sidebar, sidebarMode } = this.context || {}

    const styleNameList = [styles.header]

    if (compact || (autoCompact && currentHeaderIsCompact)) {
      styleNameList.push(styles.compact)
    }

    if (alternative || (autoAlternative && currentHeaderIsAlternative)) {
      styleNameList.push(styles.alternative)
    }

    if (className) {
      styleNameList.push(className)
    }

    if (white) {
      styleNameList.push(styles.white)
    }

    if (wide) {
      styleNameList.push(styles.wide)
    }

    if (sidebar) {
      if (sidebarMode === 'column') {
        styleNameList.push(styles.sidebarColumn)
      }
    }

    return styleNameList.join(' ')
  }

  actualizeBackdrop() {
    const { compact, alternative } = this.props
    const thisHeight = this.container.getBoundingClientRect().height

    if (this.backdrop.animate) {
      const shouldAnimateHeight = (currentHeaderHeight && thisHeight !== currentHeaderHeight)
      const shouldAnimateColor = (alternative !== currentHeaderIsAlternative && currentHeaderIsAlternative !== undefined)

      if (shouldAnimateHeight) {
        this.backdrop.animate(
          [
            // This essentially animates the height change, only instead by using a vertical scaling transition, which is much faster.
            { transform: `scale3d(1, ${thisHeight > 0 ? (currentHeaderHeight / thisHeight) || 0 : 0}, 1)` },
            { transform: 'scale3d(1, 1, 1)' },
          ],
          {
            duration: 600,
            easing: 'ease',
          },
        )
      }

      if (shouldAnimateColor) {
        this.altBackdrop.animate(
          [
            { opacity: currentHeaderIsAlternative ? 1 : 0 },
            { opacity: alternative ? 1 : 0 },
          ],
          {
            duration: 600,
            easing: 'ease',
          },
        )
      }
    }

    currentHeaderIsCompact = Boolean(compact)
    currentHeaderIsAlternative = Boolean(alternative)
    currentHeaderHeight = thisHeight
  }
}
