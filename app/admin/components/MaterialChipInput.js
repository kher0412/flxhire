import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChipInput from 'material-ui-chip-input'
import { Field } from 'react-final-form'
import map from 'lodash/map'
import isObject from 'lodash/isObject'
import { isInteger } from 'services/numbers'

export default class MaterialChipInput extends Component {
  static propTypes = {
    source: PropTypes.string,
    label: PropTypes.string,
    autoComplete: PropTypes.bool,
    creatable: PropTypes.bool,
    choices: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {
      controlledValue: this.initialValue(props.input.value || []),
    }
  }

  initialValue = (data) => {
    const { dataSourceConfig } = this.props
    if (data) {
      if (dataSourceConfig && (data.length && !isObject(data[0]))) {
        return map(data, i => ({ [dataSourceConfig.value]: i, [dataSourceConfig.text]: i }))
      }
      return data
    }
    return []
  }

  handleChange = input => (chips) => {
    input.onChange(chips)
  }

  renderChipInput = ({ label, input }) => (
    <ChipInput
      value={input.value || []}
      onChange={this.handleChange(input)}
      label={label}
    />
  )

  addChip = input => (chip) => {
    const { dataSourceConfig, creatable } = this.props
    if (isInteger(chip.id) || creatable) {
      const arrayValue = [...this.state.controlledValue, chip]
      this.setState({ controlledValue: arrayValue })
      const existingValue = map(input.value, item => (item[dataSourceConfig.value] ?
        item[dataSourceConfig.value] :
        item))
      input.onChange([...existingValue, chip[dataSourceConfig.value]])
    }
  }

  removeChip = input => (chipId) => {
    const { dataSourceConfig } = this.props
    const arrayValue = this.state.controlledValue.filter(item => item[dataSourceConfig.value] !== chipId)
    this.setState({ controlledValue: arrayValue })
    input.onChange(arrayValue.map(item => (item[dataSourceConfig.value] ? item[dataSourceConfig.value] : item)))
  }

  renderAutoCompleteChip = ({
    label, input, dataSource, dataSourceConfig, setFilter,
  }) => {
    const handleUpdate = value => setFilter(value)

    return (
      <ChipInput
        dataSourceConfig={dataSourceConfig}
        dataSource={dataSource}
        openOnFocus
        onRequestAdd={this.addChip(input)}
        onRequestDelete={this.removeChip(input)}
        onUpdateInput={handleUpdate}
        floatingLabelText={label}
        value={this.state.controlledValue}
      />
    )
  }

  render() {
    const {
      source, label, autoComplete, choices, ...other
    } = this.props
    const renderComponent = autoComplete ? this.renderAutoCompleteChip : this.renderChipInput

    return (
      <Field {...other} autoComplete label={label} name={source} dataSource={choices} component={renderComponent} />
    )
  }
}
