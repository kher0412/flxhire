import React from 'react'
import { Collapse, FormHelperText } from '@material-ui/core'
import { classList } from 'services/styles'
import styles from './InputGroup.module.css'

export interface IInputGroupProps {
  label?: string
  error?: boolean
  helperText?: React.ReactNode
}

export interface IInputGroupState {
}

export default class InputGroup extends React.PureComponent<IInputGroupProps, IInputGroupState> {
  render() {
    const { helperText, error } = this.props
    const hasHelperText = !!helperText

    return (
      <div>
        <div className={classList(styles.container, error && styles.error)}>
          {this.props.children}
        </div>

        <Collapse in={hasHelperText} mountOnEnter unmountOnExit>
          <FormHelperText error={error} variant="outlined" style={hasHelperText ? undefined : { marginTop: 0 }}>
            {helperText || ''}{'\u00A0'}
          </FormHelperText>
        </Collapse>
      </div>
    )
  }
}
