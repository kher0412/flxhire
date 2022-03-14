import React from 'react'
import PropTypes from 'prop-types'
import { FormHelperText } from '@material-ui/core'
import { isString } from 'lodash'

const defaultStyle = { width: '100%' }

class ValidatedField extends React.Component {
  render() {
    const { children, errorMessages, errorPropertyName, rootStyle, context, ...otherProps } = this.props
    const errorText = context ? context.state.errors[this.props.name] : errorMessages[this.props.name]
    return (
      <div style={{ ...defaultStyle, ...rootStyle}}>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            ...(errorPropertyName === false ? {} : {[errorPropertyName]: isString(errorText)}),
            ...otherProps,
          })
        )}
        {errorText && <FormHelperText error data-cy={`field-error-${this.props.name}`}>{errorText}</FormHelperText>}
      </div>
    )
  }
}

ValidatedField.defaultProps = {
  errorPropertyName: 'error',
}

ValidatedField.propTypes = {
  errorMessages: PropTypes.object,
  context: PropTypes.object,
  errorPropertyName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  rootStyle: PropTypes.object,
}

export default ValidatedField
