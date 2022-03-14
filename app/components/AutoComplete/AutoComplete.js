import React from 'react'
import PropTypes from 'prop-types'
import deburr from 'lodash/deburr'
import Downshift from 'downshift'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { getShortName } from 'services/form'
import styles from './AutoComplete.module.css'

class AutoComplete extends React.Component {
  static propTypes = {
    suggestions: PropTypes.array.isRequired,
    enforceSuggestionSelection: PropTypes.bool,
    input: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }

  state = { shownSuggestionsLength: 0 }

  render = () => {
    const {
      input,
      meta: { touched, error },
    } = this.props
    return (
      <div data-cy={`autocomplete-${getShortName(input.name)}`}>
        <Downshift
          onInputValueChange={(inputValue) => {
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
                InputProps={getInputProps(this.calculateInputProps(inputValue))}
                fullWidth
                label={this.props.label}
                error={touched && error}
                helperText={(touched && error && (<span className={styles['error-text']}>{error}</span>)) || this.props.helperText}
              />
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper square style={{ position: 'absolute', left: 0, top: '100%', zIndex: 10 }}>
                    {this.getSuggestions(inputValue).map((suggestion, index) => (
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
    if (this.state.shownSuggestionsLength === 0) {
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

  getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase()
    const inputLength = inputValue.length
    let count = 0

    if (inputLength === 0) {
      return []
    }
    const shownSuggestions = this.props.suggestions.filter((suggestion) => {
      const isShown = count < 5 && suggestion.toLowerCase().includes(inputValue)
      if (isShown) {
        ++count
      }
      return isShown
    })
    const shownSuggestionsLength = shownSuggestions.length
    if (shownSuggestionsLength != this.state.shownSuggestionsLength) { // Prevent infinite loop.
      this.setState({ shownSuggestionsLength })
    }
    return shownSuggestions
  }

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

export default AutoComplete
