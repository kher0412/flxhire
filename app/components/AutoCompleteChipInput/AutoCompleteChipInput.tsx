import React, { CSSProperties, PureComponent, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import ChipInput from 'material-ui-chip-input'
import { filter, isArray } from 'lodash'
import { Popover, List, MenuItem, ListSubheader, ListItemText, Chip } from '@material-ui/core'
import { FormValueInput, FormValueMeta } from 'types'
import styles from './AutoCompleteChipInput.module.css'

export interface IAutoCompleteChipInputProps {
  suggestions?: any[]
  suggestionsFormat?: { text?: string, value?: string, hint?: string }
  input?: FormValueInput<any[]>
  meta?: FormValueMeta
  oneRecord?: boolean
  newRecord?: boolean
  unique?: boolean
  newChipKeyCodes?: number[]
  label?: string
  placeholder?: string
  fullWidth?: boolean
  inputProps?: any
  FormHelperTextProps?: any
  style?: CSSProperties
  icon?: ReactNode
}

export interface IAutoCompleteChipInputState {
  rawInputValue: string
  isFocused: boolean
  selectedSuggestionIndex: number
  chipWasAdded: boolean
}

export default class AutoCompleteChipInput extends PureComponent<IAutoCompleteChipInputProps, IAutoCompleteChipInputState> {
  static defaultProps = {
    input: {},
    meta: {},
    suggestions: [],
    suggestionsFormat: { text: 'name', value: 'id', hint: 'hint' },
    unique: true,
    oneRecord: false,
    newRecord: false,
    newChipKeyCodes: [32, 13],
  }

  handleRequestAddCallTimestamp: number

  blurTimeoutHandle: number

  currentSuggestions: any[]

  chipInput: any

  chipInputDOMNode: any

  constructor(props) {
    super(props)

    this.state = {
      rawInputValue: '',
      isFocused: false,
      selectedSuggestionIndex: 0,
      chipWasAdded: false,
    }

    this.handleRequestAddCallTimestamp = 0
    this.currentSuggestions = []
  }

  componentDidMount() {
    if (this.chipInput) {
      this.chipInputDOMNode = ReactDOM.findDOMNode(this.chipInput)
    }
  }

  render() {
    let {
      suggestions,
      suggestionsFormat,
      label,
      input: { value = [], name },
      meta: { touched, error },
      placeholder,
      fullWidth,
      inputProps,
      FormHelperTextProps,
      style,
    } = this.props

    let className = styles['chips-container']

    if (this.state.isFocused && this.state.chipWasAdded) {
      className += ` ${styles['chip-added']}`
    }

    if (fullWidth) {
      className += ` ${styles['full-width']}`
    }

    if (this.state.isFocused) {
      className += ` ${styles.focused}`
    }

    if (!value) value = []

    if (value.length === 0) {
      className += ` ${styles.empty}`
    }

    suggestions = suggestions.filter(suggestion => suggestion[suggestionsFormat.text].indexOf(this.state.rawInputValue) !== -1)

    // see https://www.npmjs.com/package/material-ui-chip-input/v/1.0.0-beta.6
    return (
      <div style={style} className={className} data-cy={`chipfield-${name}`}>
        <ChipInput
          ref={chipInput => this.chipInput = chipInput}
          allowDuplicates={false}
          newChipKeyCodes={this.props.newChipKeyCodes}
          dataSourceConfig={suggestionsFormat as any}
          dataSource={suggestions}
          onAdd={this.handleRequestAdd}
          onDelete={this.handleRequestDelete}
          onUpdateInput={this.handleUpdateInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          label={label}
          placeholder={placeholder}
          value={value}
          fullWidth={fullWidth}
          InputProps={{ inputProps: { 'data-cy': `chipfield-input-${name}`, ...inputProps } }}
          helperText={touched && error && (<span className={styles['error-text']}>{error}</span>)}
          FormHelperTextProps={{ 'data-cy': `chipfield-helper-${name}`, ...FormHelperTextProps }}
          chipRenderer={this.renderChip}
        />

        {this.renderAutoComplete()}
      </div>
    )
  }

  renderChip = ({ value, text, isFocused, isDisabled, handleClick, handleDelete, className }, key) => {
    const { icon } = this.props

    return (
      <Chip
        icon={icon as any}
        key={key}
        label={text}
        onDelete={handleDelete}
        onClick={handleClick}
        disabled={isDisabled}
        className={className}
      />
    )
  }

  renderAutoComplete() {
    const { suggestions, suggestionsFormat, unique, input: { value = [] } } = this.props
    const { rawInputValue, selectedSuggestionIndex } = this.state

    this.currentSuggestions = []

    if (suggestions.length === 0 || !rawInputValue) return null

    const chipInputDOMNode = this.chipInputDOMNode

    if (!chipInputDOMNode) return null

    let rawInputValueSimplified = rawInputValue.toLowerCase().replace(' ', '')

    let currentSuggestions = suggestions.filter((suggestion) => {
      let suggestionText = suggestion[suggestionsFormat.text]
      let suggestionValue = suggestion[suggestionsFormat.value]

      if (!suggestionText) return false // .filter

      if (unique) {
        if ((isArray(value) ? value : [value]).some(item => item[suggestionsFormat.value] === suggestionValue)) {
          return false // .filter
        }
      }

      if (suggestionText.toLowerCase().replace(' ', '').indexOf(rawInputValueSimplified) !== -1) {
        return true // .filter
      }

      return false // .filter
    })

    currentSuggestions.sort((a, b) => {
      let aText = a[suggestionsFormat.text].toLowerCase().replace(' ', '')
      let bText = b[suggestionsFormat.text].toLowerCase().replace(' ', '')

      if (aText === rawInputValueSimplified) return -1
      if (bText === rawInputValueSimplified) return 1

      return aText.indexOf(rawInputValueSimplified) - bText.indexOf(rawInputValueSimplified)
    })

    if (currentSuggestions.length > 5) {
      currentSuggestions = currentSuggestions.slice(0, 5)
    }

    this.currentSuggestions = currentSuggestions

    return (
      <Popover
        open
        anchorEl={chipInputDOMNode.lastChild.lastChild} // this is supposed to be the last rendered Chip
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={this.handleBlur}
        disableAutoFocus
        disableRestoreFocus
        disableEnforceFocus
      >
        <List>
          {currentSuggestions.map((suggestion, i) => (
            <MenuItem
              key={suggestion[suggestionsFormat.value]}
              onMouseDown={() => this.handleRequestAdd({ [suggestionsFormat.text]: suggestion[suggestionsFormat.text] })}
              onTouchStart={() => this.handleRequestAdd({ [suggestionsFormat.text]: suggestion[suggestionsFormat.text] })}
              selected={selectedSuggestionIndex === i}
            >
              <ListItemText
                primary={suggestion[suggestionsFormat.text]}
                secondary={suggestion[suggestionsFormat.hint || 'hint']}
              />
            </MenuItem>
          ))}

          {currentSuggestions.length === 0 && (
            <ListSubheader>
              No suggestions
            </ListSubheader>
          )}
        </List>
      </Popover>
    )
  }

  handleRequestAdd = (newObject) => {
    // Very fast invocation of this handler likely means an error from the user, block.
    // It also solves an issue with auto-complete commit overwriting the selected suggestion for some values.
    if (performance.now() - this.handleRequestAddCallTimestamp < 100) {
      return
    }

    this.handleRequestAddCallTimestamp = performance.now()

    let { suggestions, suggestionsFormat, input: { onChange, value = [] }, unique, oneRecord, newRecord } = this.props
    let newValueFound = false
    let newValue
    let newValueText

    this.setState({
      rawInputValue: '',
      selectedSuggestionIndex: 0,
    })

    // Search for exact match.
    for (const suggestion of suggestions) {
      let text = newObject[suggestionsFormat.text].toLowerCase()
      let suggestionText = suggestion[suggestionsFormat.text].toLowerCase()

      if (text === suggestionText) {
        newValue = suggestion[suggestionsFormat.value]
        newValueText = suggestion[suggestionsFormat.text]
        newValueFound = true
        break
      }
    }

    if (newRecord && !newValueFound) {
      newValue = newObject.name
      newValueText = newObject.name
      newValueFound = true
    }

    if (newValueFound && onChange) {
      let inputValue = isArray(value) ? value : [value]
      if (unique) {
        // Check for dupes.
        if (inputValue.some(item => item[suggestionsFormat.text] === newValueText)) return
      }

      inputValue = inputValue.slice()

      if (oneRecord) {
        inputValue = []
      }

      inputValue.push({
        [suggestionsFormat.text]: newValueText,
        [suggestionsFormat.value]: newValue,
      })

      this.setState({ chipWasAdded: true })

      // Sometimes some empty chips can get stuck, this clears them.
      // TODO: investigate why this happens and fix the core issue.
      inputValue = inputValue.filter(item => item[suggestionsFormat.text] && item[suggestionsFormat.value])

      onChange(inputValue)
    }
  }

  handleRequestDelete = (itemValue, index) => {
    let { input: { onChange, value = [] } } = this.props
    value = value.slice()
    value.splice(index, 1)
    onChange(value)

    ReactDOM.findDOMNode(this.chipInput).querySelector('input').focus()

    this.setState({
      rawInputValue: '',
      selectedSuggestionIndex: 0,
    })
  }

  handleUpdateInput = (e) => {
    this.setState({
      rawInputValue: e.target.value,
      selectedSuggestionIndex: 0,
    })
  }

  handleFocus = () => {
    this.setState({
      isFocused: true,
      selectedSuggestionIndex: 0,
    })

    window.clearTimeout(this.blurTimeoutHandle)
  }

  handleBlur = () => {
    this.setState({
      isFocused: false,
      rawInputValue: '',
      selectedSuggestionIndex: 0,
      chipWasAdded: false,
    })

    window.clearTimeout(this.blurTimeoutHandle)
    this.blurTimeoutHandle = window.setTimeout(() => {
      if (this.props.input?.onBlur) this.props.input.onBlur()
    }, 200)
  }

  handleKeyDown = (e) => {
    let { suggestionsFormat } = this.props
    let { selectedSuggestionIndex } = this.state

    if (filter(this.props.newChipKeyCodes, (i) => { return i === e.which }).length > 0) {
      if (this.currentSuggestions[selectedSuggestionIndex]) {
        this.handleRequestAdd({
          [suggestionsFormat.text]: this.currentSuggestions[selectedSuggestionIndex][suggestionsFormat.text],
        })
      }
    } else if (e.which === 27) { // esc
      this.setState({
        rawInputValue: '',
      })
    } else if (e.which === 40) { // down
      e.preventDefault() // prevents moving the cursor inside the input

      this.setState(state => ({
        selectedSuggestionIndex: Math.min(this.currentSuggestions.length - 1, state.selectedSuggestionIndex + 1),
      }))
    } else if (e.which === 38) { // up
      e.preventDefault() // prevents moving the cursor inside the input

      this.setState(state => ({
        selectedSuggestionIndex: Math.max(0, state.selectedSuggestionIndex - 1),
      }))
    }
  }
}
