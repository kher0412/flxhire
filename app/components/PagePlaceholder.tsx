import React from 'react'
import { Card } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/InfoOutlined'
import styles from './PagePlaceholder.module.css'

interface IPagePlaceholderProps {
  name?: string
  title?: React.ReactNode | string
  subtitle?: React.ReactNode | string
  action?: React.ReactNode
  raised?: boolean
  flat?: boolean
  icon?: React.ReactNode
  style?: React.CSSProperties
}

class PagePlaceholder extends React.PureComponent<IPagePlaceholderProps> {
  render() {
    const { raised = true, flat, style } = this.props

    return (
      <Card
        className={styles.container}
        raised={!flat && raised}
        variant={flat ? 'outlined' : 'elevation'}
        elevation={flat ? 0 : undefined}
        style={style}
      >
        {this.renderContent()}
      </Card>
    )
  }

  renderContent() {
    const { name = 'page-placeholder' } = this.props

    return (
      <div className={styles.placeholder} data-cy={name}>
        {this.renderIcon()}
        {this.renderTitle()}
        {this.renderSubtitle()}
        {this.renderActionSeparator()}
        {this.renderAction()}
      </div>
    )
  }

  renderIcon() {
    const { title, subtitle, icon = <InfoIcon /> } = this.props

    if (title || subtitle) {
      return (
        <div className={styles.icon}>
          {icon}
        </div>
      )
    }

    return null
  }

  renderTitle() {
    const { title } = this.props

    if (title) {
      return (
        <div className={styles.title}>
          {title}
        </div>
      )
    }

    return null
  }

  renderSubtitle() {
    const { subtitle } = this.props

    if (subtitle) {
      return (
        <div className={styles.subtitle}>
          {subtitle}
        </div>
      )
    }

    return null
  }

  renderActionSeparator() {
    const { title, subtitle, action } = this.props

    if ((title || subtitle) && action) {
      return (
        <div className={styles['action-separator']} />
      )
    }

    return null
  }

  renderAction() {
    const { action } = this.props

    if (action) {
      return (
        <div className={styles.action}>
          {action}
        </div>
      )
    }
    return (
      <div className={styles['action-spacer']} />
    )
  }
}

export default PagePlaceholder
