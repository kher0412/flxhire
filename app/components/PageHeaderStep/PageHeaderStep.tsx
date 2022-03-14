import React from 'react'
import { classList } from 'services/styles'
import styles from './PageHeaderStep.module.css'

export interface IPageHeaderStepProps extends React.HTMLProps<HTMLDivElement> {
  icon?: React.ReactNode
  badge?: string | number
  badgeTitle?: string
  active?: boolean
  light?: boolean
  'data-cy'?: string
}

export interface IPageHeaderStepState { }

export default class PageHeaderStep extends React.Component<IPageHeaderStepProps, IPageHeaderStepState> {
  public render() {
    const { icon, badge, badgeTitle, children, className, active, light, ...restProps } = this.props

    return (
      <React.Fragment>
        <div className={classList(styles.container, light && styles.light, className)} {...restProps}>
          <div style={active ? undefined : { opacity: light ? 1 : 0.7 }} className={styles.wrapper}>
            <div className={classList(styles.icon, active && styles.active)}>
              {this.renderBadge(badge, badgeTitle)}
              {icon}
            </div>

            <div className={styles.contentWrapper}>
              <div className={classList(styles.content, active && styles.active)}>
                {children}
              </div>
            </div>
          </div>
        </div>

        <div className={classList(styles.connector, light && styles.light)} />
      </React.Fragment>
    )
  }

  private renderBadge(badgeContent: number | string, badgeTitle: string) {
    if (!badgeContent) {
      return null
    }

    return (
      <div className={styles.badge} title={badgeTitle}>
        {badgeContent}
      </div>
    )
  }
}
