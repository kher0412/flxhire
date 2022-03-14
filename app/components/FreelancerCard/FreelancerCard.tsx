import React from 'react'
import { Card } from '@material-ui/core'
import { IContractForClient } from 'types'
import { MediaQuery } from 'components'
import { Cancel } from '@material-ui/icons'
import styles from './FreelancerCard.module.css'

interface IFreelancerCardProps {
  children: React.ReactNode
  raised?: boolean
  flat?: boolean
  action?: React.ReactNode
  disabled?: boolean
  highlight?: boolean
  contract?: IContractForClient
  HighlightIcon?: any
  highlightColor?: string
  greyedOut?: boolean
  withStatus?: boolean
  statusAdditionalText?: boolean
}

export default class FreelancerCard extends React.PureComponent<IFreelancerCardProps> {
  render() {
    const { children, disabled, raised = true, flat, action, greyedOut } = this.props
    const containerClassName = `${styles.container} ${greyedOut ? styles['greyed-out'] : ''}`

    if (flat) {
      return (
        <div className={containerClassName}>
          {action && (
            <div className={styles.action}>
              {action}
            </div>
          )}

          <div className={styles.card} data-cy="freelancer-card">
            {this.renderHighlight()}

            <div className={styles.wrapper} style={disabled ? { opacity: 0.35, pointerEvents: 'none' } : undefined}>
              {children}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className={containerClassName}>
        {action && (
          <div className={styles.action}>
            {action}
          </div>
        )}

        <Card className={styles.card} data-cy="freelancer-card" raised={raised} style={{ marginBottom: 36 }}>
          {this.renderHighlight()}

          <div className={styles.wrapper} style={disabled ? { opacity: 0.35, pointerEvents: 'none' } : undefined}>
            {children}
          </div>
        </Card>
      </div>
    )
  }

  renderHighlight() {
    const { highlight, HighlightIcon = Cancel, highlightColor = '#ccc' } = this.props

    if (highlight) {
      return (
        <div>
          <div className={styles['highlight-line']} style={{ backgroundColor: highlightColor }} />
          <MediaQuery minWidth={1600}>
            <HighlightIcon className={styles['highlight-icon']} style={{ color: highlightColor }} />
          </MediaQuery>
        </div>
      )
    }

    return null
  }
}
