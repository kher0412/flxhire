import React from 'react'
import Link from 'components/Link'
import { Button, Badge, Card } from '@material-ui/core'
import { classList } from 'services/styles'
import styles from './NavLink.module.css'

interface INavLinkProps extends React.ComponentProps<typeof Button> {
  label: string
  href?: string
  to?: string
  as?: string
  onClick?: () => void
  badgeContent?: any
  badgeProps?: any
}

export interface INavLinkState {
  isOpen: boolean
  originReferenceWrapper: HTMLDivElement
}

const navLinkInstances = new Set<NavLink>()
let globalOriginResetTimeoutHandle = 0

export default class NavLink extends React.PureComponent<INavLinkProps, INavLinkState> {
  mouseLeaveTimeoutHandle: number

  mouseEnterTimeoutHandle: number

  wrapper: HTMLDivElement

  constructor(props: INavLinkProps) {
    super(props)

    this.mouseLeaveTimeoutHandle = 0
    this.mouseEnterTimeoutHandle = 0

    this.state = {
      isOpen: false,
      originReferenceWrapper: undefined,
    }
  }

  componentDidMount() {
    navLinkInstances.add(this)
  }

  componentWillUnmount() {
    window.clearTimeout(this.mouseLeaveTimeoutHandle)
    window.clearTimeout(this.mouseEnterTimeoutHandle)
    navLinkInstances.delete(this)
  }

  render() {
    const { label, href, to, as, onClick, badgeContent = 0, badgeProps = {}, ...other } = this.props

    const variant = badgeContent ? 'outlined' : undefined
    const isLink = Boolean(href || to)

    return (
      <Badge badgeContent={badgeContent} {...badgeProps} data-cy={badgeContent ? badgeProps['data-cy'] : undefined}>
        <div
          className={styles.wrapper}
          ref={this.acquireWrapperRef}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove}
        >
          <Button
            variant={variant}
            component={isLink ? Link : undefined}
            onClick={isLink ? undefined : onClick}
            href={isLink ? (href || to) : undefined}
            as={isLink ? as : undefined}
            className={styles.link}
            {...other}
          >
            {label}
          </Button>

          {this.renderPopover()}
        </div>
      </Badge>
    )
  }

  acquireWrapperRef = (wrapper: HTMLDivElement) => {
    this.wrapper = wrapper
  }

  renderPopover() {
    const { children } = this.props
    const { isOpen } = this.state
    const transform = (this.wrapper?.getBoundingClientRect().left - this.state.originReferenceWrapper?.getBoundingClientRect().left) || 0

    return (
      <div className={classList(styles.popoverWrapper, isOpen && styles.open)}>
        <div className={classList(styles.popoverArrow, isOpen && styles.open)} />

        <div
          className={styles.cardWrapper}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove}
          style={{ transform: `translateX(${-transform}px)` }}
        >
          <Card raised className={styles.card}>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div className={styles.popoverContent} onClick={this.handlePopoverClick}>
              {children}
            </div>
          </Card>
        </div>
      </div>
    )
  }

  handlePopoverClick = () => {
    window.clearTimeout(this.mouseLeaveTimeoutHandle)
    window.clearTimeout(this.mouseEnterTimeoutHandle)
    window.clearTimeout(globalOriginResetTimeoutHandle)

    this.setState({
      isOpen: false,
    })

    globalOriginResetTimeoutHandle = window.setTimeout(() => {
      for (let inst of Array.from(navLinkInstances)) {
        inst.setState({
          originReferenceWrapper: undefined,
        })
      }
    }, 1000)
  }

  handleMouseEnter = () => {
    window.clearTimeout(this.mouseEnterTimeoutHandle)
    window.clearTimeout(this.mouseLeaveTimeoutHandle)
  }

  handleMouseMove = () => {
    window.clearTimeout(this.mouseEnterTimeoutHandle)
    window.clearTimeout(this.mouseLeaveTimeoutHandle)

    this.mouseEnterTimeoutHandle = window.setTimeout(() => {
      if (this.props.children && this.wrapper) {
        window.clearTimeout(this.mouseLeaveTimeoutHandle)
        window.clearTimeout(globalOriginResetTimeoutHandle)

        this.setState({
          isOpen: true,
        })

        for (let inst of Array.from(navLinkInstances)) {
          inst.setState({
            originReferenceWrapper: this.wrapper,
          })
        }
      }
    }, 52)
  }

  handleMouseLeave = () => {
    window.clearTimeout(this.mouseLeaveTimeoutHandle)
    window.clearTimeout(this.mouseEnterTimeoutHandle)
    window.clearTimeout(globalOriginResetTimeoutHandle)

    this.mouseLeaveTimeoutHandle = window.setTimeout(() => {
      this.setState({
        isOpen: false,
      })
    }, 180)

    globalOriginResetTimeoutHandle = window.setTimeout(() => {
      for (let inst of Array.from(navLinkInstances)) {
        inst.setState({
          originReferenceWrapper: undefined,
        })
      }
    }, 1000)
  }
}
