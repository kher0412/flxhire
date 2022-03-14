import React from 'react'
import { deburr, debounce } from 'lodash'
import { trackError } from 'services/analytics'
import Downshift from 'downshift'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { getShortName } from 'services/form'
import { FormValueInput, FormValueMeta } from 'types'
import styles from './AutoCompleteTextField.module.css'
import TextField from '../TextField'

interface IAutoCompleteTextFieldProps {
  getSuggestions: (search: string) => Promise<string[]>
  enforceSuggestionSelection?: boolean
  input: FormValueInput<string>
  meta: FormValueMeta
  label?: string
  helperText?: string
  InputProps?: any
}

interface IAutoCompleteTextFieldState {
  suggestions: string[]
}

export default class AutoCompleteTextField extends React.PureComponent<IAutoCompleteTextFieldProps, IAutoCompleteTextFieldState> {
  state = {
    suggestions: [],
  }

  render = () => {
    const {
      input,
      meta: { touched, error },
      label,
      helperText,
    } = this.props
    return (
      <div data-cy={`autocomplete-${getShortName(input.name)}`}>
        <Downshift
          onInputValueChange={(inputValue) => {
            this.updateSuggestions(inputValue)
            input.onChange(inputValue)
          }}
          selectedItem={this.props.enforceSuggestionSelection ? undefined : input.value}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            selectedItem,
          }) => (
            <div style={{ position: 'relative' }}>
              <TextField
                {...getInputProps(this.calculateInputProps(inputValue))}
                fullWidth
                label={label}
                error={touched && error}
                helperText={(touched && error && (<span className={styles['error-text']}>{error}</span>)) || helperText}
              />

              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper square style={{ position: 'absolute', left: 0, top: '100%', zIndex: 10 }}>
                    {this.state.suggestions.map((suggestion, index) => (
                      this.renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion }),
                        highlightedIndex,
                        selectedItem,
                      })
                    ))}
                  </Paper>
                ) : null}
              </div>
            </div>
          )}
        </Downshift>
      </div>
    )
  }

  calculateInputProps(inputValue) {
    const shortName = getShortName(this.props.input.name)
    if (this.state.suggestions.length === 0) {
      return {
        'data-cy': `autocomplete-input-${shortName}`,
        value: inputValue,
        ...this.props.InputProps,
      }
    }
    return {
      'data-cy': `autocomplete-input-${shortName}`,
      ...this.props.InputProps,
    }
  }

  updateSuggestions = debounce(async (value) => {
    const { getSuggestions } = this.props

    const inputValue = deburr(value.trim()).toLowerCase()
    const inputLength = inputValue.length

    if (inputLength === 0) {
      this.setState({ suggestions: [] })
    }

    try {
      const suggestions = (await getSuggestions(inputValue))
      this.setState({ suggestions })
    } catch (error) {
      trackError(error)
      this.setState({ suggestions: [] })
    }
  }, 500)

  renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index
    const isSelected = (selectedItem || '').indexOf(suggestion) > -1

    return (
      <MenuItem
        {...itemProps}
        key={suggestion}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
          fontSize: '13px',
        }}
        data-cy={suggestion}
      >
        {suggestion}
      </MenuItem>
    )
  }
}
