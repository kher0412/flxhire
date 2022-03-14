import React from 'react'
import styles from './HowItWorksItem.module.css'

export default class HowItWorksItem extends React.Component {
  render() {
    const { icon, title, children, ...restProps } = this.props

    return (
      <div className={styles.container} {...restProps}>
        <div className={styles.fancy}>
          <div className={styles.icon}>
            {icon}
          </div>
        </div>

        <div className={styles.title}>
          {title}
        </div>

        <div className={styles.content}>
          {children}
        </div>
      </div>
    )
  }
}
