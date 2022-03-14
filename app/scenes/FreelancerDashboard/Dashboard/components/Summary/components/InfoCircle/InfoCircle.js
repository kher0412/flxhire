import React from 'react'
import PropTypes from 'prop-types'
import styles from './InfoCircle.module.css'

export default class InfoCircle extends React.PureComponent {
  static propTypes = {
    title: PropTypes.node,
    label: PropTypes.node,
  }

  render() {
    const { title, label } = this.props

    return (
      <div className={styles.container}>
        <div className={styles.circle}>
          <div className={styles['circle-content']}>
            {title}
          </div>
        </div>

        <div className={styles.label}>
          {label}
        </div>
      </div>
    )
  }
}
