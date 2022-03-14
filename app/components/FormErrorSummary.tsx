import React from 'react'
import styles from './FormErrorSummary.module.css'

export interface IFormErrorSummaryProps {
  show?: boolean
  message?: React.ReactNode
  style?: React.CSSProperties
}

export default class FormErrorSummary extends React.PureComponent<IFormErrorSummaryProps, {}> {
  static defaultProps = {
    message: 'Please resolve errors in the form to continue',
  }

  render() {
    if (!this.props.show) {
      return false
    }

    return (
      <div className={styles.summary} data-cy="form-error-summary" style={this.props.style}>
        {this.props.message}
      </div>
    )
  }
}
