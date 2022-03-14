import React from 'react'
import { Card } from '@material-ui/core'
import { Link } from 'components'
import { Add } from '@material-ui/icons'
import styles from './ViewAllButton.module.css'

export interface IViewAllButtonProps {
  href: string
  as?: string
  label?: React.ReactNode
  'data-cy'?: string
}

export interface IViewAllButtonState {
}

export default class ViewAllButton extends React.PureComponent<IViewAllButtonProps, IViewAllButtonState> {
  public render() {
    const { href, as, label = 'View All' } = this.props

    return (
      <Link href={href} as={as} className={styles.link}>
        <Card raised className={styles.container} data-cy={this.props['data-cy']}>
          <Add /> {label}
        </Card>
      </Link>
    )
  }
}
