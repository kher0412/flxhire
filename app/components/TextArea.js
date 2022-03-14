import React from 'react'
import { getShortName } from 'services/form'
import styles from './TextArea.module.css'

export default class TextArea extends React.Component {
  render() {
    let {
      labelStyle,
      label,
      input: { onChange, onBlur, value, name } = {},
      meta: { touched, error } = {},
      className,
      ...restProps
    } = this.props

    const isError = Boolean(touched && error)
    const baseClassName = isError ? styles['textarea-error'] : styles.textarea
    const labelStyleName = isError ? styles['label-error'] : styles.label
    const shortName = getShortName(name)

    return (
      <div className={styles.container}>
        <textarea
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          className={className ? `${baseClassName} ${className}` : baseClassName}
          data-cy={`textarea-${shortName || 'unnamed'}`}
          {...restProps}
        />

        {label && <div className={labelStyleName}>{label}</div>}

        {touched && error && (
          <div className={styles.error} data-cy={`textarea-helper-${shortName}`}>
            {error}
          </div>
        )}
      </div>
    )
  }
}
