import React from 'react'
import { PageHeader } from 'components'
import styles from './Header.module.css'

export default class Header extends React.PureComponent {
  render() {
    const { children } = this.props

    return (
      <PageHeader>
        <div className={styles['header-area-content']}>
          {children}
        </div>
      </PageHeader>
    )
  }
}
