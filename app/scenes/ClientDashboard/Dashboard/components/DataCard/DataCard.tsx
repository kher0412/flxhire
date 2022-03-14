import React from 'react'
import { Card } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { classList } from 'services/styles'
import { Link, ExternalLink } from 'components'
import { IAPIError } from 'types'
import { getErrorDescription, getErrorTitle } from 'services/error'
import { Error, InfoOutlined } from '@material-ui/icons'
import styles from './DataCard.module.css'

export interface IDataCardProps {
  title?: React.ReactNode
  text?: React.ReactNode
  icon?: React.ReactNode
  loading?: boolean
  highlighted?: boolean
  href?: string
  as?: string
  error?: IAPIError
  'data-cy'?: string
}

export default class DataCard extends React.Component<IDataCardProps> {
  public render() {
    const { href, as, error } = this.props

    if (error) {
      return this.renderContent()
    }

    if (href) {
      if (href.startsWith('http')) {
        // external URL support
        return (
          <ExternalLink
            href={href}
            label={this.renderContent()}
          />
        )
      }

      return (
        <Link href={href} as={as} className={styles.link}>
          {this.renderContent()}
        </Link>
      )
    }

    return this.renderContent()
  }

  private renderContent() {
    const { title, text, icon, href, highlighted, loading, error } = this.props

    return (
      <Card raised className={classList(styles.container, href && styles.clickable)} data-cy={this.props['data-cy']}>
        <div className={styles.wrapper}>
          {highlighted && (
            <Error className={styles.highlight} />
          )}

          <div className={styles.icon}>
            {loading && <Skeleton variant="circle" width={40} height={40} />}
            {!loading && error && <InfoOutlined /> }
            {!loading && !error && icon}
          </div>

          <div className={styles.content}>
            <div className={styles.title} title={typeof title === 'string' ? title : undefined}>
              {loading && <Skeleton variant="text" />}
              {!loading && error && getErrorTitle(error)}
              {!loading && !error && title}
            </div>

            <div className={styles.text} title={typeof text === 'string' ? text : undefined}>
              {loading && <Skeleton variant="text" />}
              {!loading && error && getErrorDescription(error)}
              {!loading && !error && text}
            </div>
          </div>
        </div>
      </Card>
    )
  }
}
