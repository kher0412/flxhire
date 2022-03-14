import React, { HTMLAttributes } from 'react'
import { FormValueMeta } from 'types'
import styles from './FormErrorHint.module.css'

interface IFormErrorHintProps extends HTMLAttributes<HTMLDivElement> {
  message?: string
  inline?: boolean
  fieldMeta?: FormValueMeta
}

export default class FormErrorHint extends React.PureComponent<IFormErrorHintProps> {
  render() {
    const { inline, style: styleProp, fieldMeta, ...props } = this.props

    const message = this.getMessage()

    if (!message) {
      return null
    }

    const style = inline ? { display: 'inline-block', marginBottom: 0, ...styleProp } : styleProp

    return (
      <div className={styles.container} style={style} {...props}>
        {message}
      </div>
    )
  }

  getMessage() {
    const { message, fieldMeta } = this.props

    if (message) {
      return message
    }

    if (fieldMeta?.touched && fieldMeta?.error) {
      return fieldMeta.error
    }

    return null
  }
}
