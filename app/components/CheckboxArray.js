import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { arrayPush, arrayRemove } from 'redux-form'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import ServerError from './ServerError'
import styles from './CheckboxArray.module.css'

class CheckboxArray extends React.Component {
  onCheck = (value) => {
    const { formAction, meta, input, onFieldChange } = this.props
    if (this.isChecked(value)) {
      formAction(arrayRemove(meta.form, input.name, input.value.indexOf(value)))
    } else {
      formAction(arrayPush(meta.form, input.name, value))
    }
    if (onFieldChange) {
      onFieldChange(value)
    }
  }

  isChecked = value => this.props.input.value.includes(value)

  render() {
    const { checkboxes, label, meta: { touched, error }, input: { name } } = this.props

    return (
      <div className={styles.checkboxes} className={styles.clearfix}>
        <ServerError error={touched && error} data-cy={`checkboxarray-error-${name}`} />
        {label && <FormLabel component="legend">{label}</FormLabel>}
        {checkboxes.map((checkbox, i) => (
          <FormControlLabel
            key={checkbox.value}
            control={(
              <Checkbox
                key={checkbox.value}
                className={styles.checkbox}
                color="primary"
                checked={this.isChecked(checkbox.value)}
                onChange={() => this.onCheck(checkbox.value)}
                data-cy={`checkboxarray-${name}-${i}`}
                inputProps={{ 'data-cy': `checkboxarray-input-${name}-${i}` }}
              />
            )}
            label={checkbox.label}
          />
        ))}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  formAction: (action) => { dispatch(action) },
})

CheckboxArray.propTypes = {
  label: PropTypes.string,
  onFieldChange: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(CheckboxArray)
