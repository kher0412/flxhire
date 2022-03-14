import React from 'react'
import { OpenInNew } from '@material-ui/icons'
import styles from './ExternalLink.module.css'

export interface IExternalLinkProps {
  href: string
  label?: React.ReactNode
  onMouseDown?: (e: React.MouseEvent) => any

  /** If set, open link earlier on mousedown. */
  mouseDown?: boolean

  /** If set, show a small icon indicating that the link is supposed to open in an external window. */
  showExternalIcon?: boolean

  style?: React.CSSProperties
}

export interface IExternalLinkState {}

export default class ExternalLink extends React.Component<IExternalLinkProps, IExternalLinkState> {
  render() {
    const { href, label, showExternalIcon, mouseDown, ...otherProps } = this.props

    return (
      <a
        href={this.makeExternal(href)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        onMouseDown={this.handleMouseDown}
        {...otherProps}
      >
        {label || href}

        {showExternalIcon && (
          <OpenInNew className={styles.icon} />
        )}
      </a>
    )
  }

  makeExternal(href: string): string {
    // This is supposed to be an external link.
    // To ensure it's always opened as an absolute external URL, make sure it begins with http(s).
    if (href && href.indexOf('http://') !== 0 && href.indexOf('https://') !== 0) {
      return `http://${href}`
    }

    return href
  }

  handleMouseDown = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    // emulate click for trusted mouseDown events
    if (e.isTrusted && this.props.mouseDown) {
      e.preventDefault()

      if (e.target && e.target instanceof HTMLAnchorElement) {
        e.target.click()
      }

      if (this.props.onMouseDown) {
        this.props.onMouseDown(e)
      }
    }
  }
}
