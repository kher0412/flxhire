import React from 'react'
import ReactDOM from 'react-dom'
import ChipInput from 'material-ui-chip-input'
import { Popover, List, MenuItem, ListSubheader, ListItemText, InputAdornment, Collapse } from '@material-ui/core'
import { FormValueInput, FormValueMeta } from 'types'
import { getShortName } from 'services/form'
import { classList } from 'services/styles'
import styles from './AutoCompleteChipInput.module.css'

export interface IAutoCompleteChipInputProps<T> {
  suggestions?: any[]
  suggestionsFormat?: { value: string, text: string, hint?: string, label?: string }
  input?: FormValueInput<T[]>
  meta?: FormValueMeta
  unique?: boolean
  oneRecord?: boolean
  newChipKeyCodes?: number[]
  disabled?: boolean
  label?: React.ReactNode
  autoFocus?: boolean
  helperText?: React.ReactNode
  fullWidth?: boolean
  placeholder?: string
  newRecord?: any
  value?: T[]
  name?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  onFocus?: (e: React.FocusEvent<any>) => void
  onBlur?: () => void
  onChange?: (value: T[]) => void
}

export interface IAutoCompleteChipInputState {
  rawInputValue: string
  selectedSuggestionIndex: number
}

export default class AutoCompleteChipInput<T extends { [key: string]: any }> extends React.PureComponent<IAutoCompleteChipInputProps<T>, IAutoCompleteChipInputState> {
  static defaultProps = {
    suggestions: [],
    suggestionsFormat: { text: 'name', value: 'id', hint: 'hint' },
    unique: true,
    oneRecord: false,
    newRecord: false,
    newChipKeyCodes: [32, 13],
  }

  handleRequestAddCallTimestamp: number

  currentSuggestions: any[]

  chipInput: any

  chipInputDOMNode: HTMLElement

  blurTimeoutHandle: number

  constructor(props) {
    super(props)

    this.state = {
      rawInputValue: '',
      selectedSuggestionIndex: 0,
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
      input,
      meta = {} as FormValueMeta,
      value,
      placeholder,
      name,
      fullWidth,
      helperText,
      autoFocus,
      disabled,
      startAdornment,
      endAdornment,
    } = this.props

    const error = meta.touched ? meta.error : undefined
    const actualHelperText = error ?? helperText as string
    const shortName = getShortName(input ? input.name : name)

    value = (input ? input.value : value) || []
    suggestions = suggestions.filter(suggestion => suggestion[suggestionsFormat.text]?.indexOf(this.state.rawInputValue) !== -1)

    if (!Array.isArray(value)) {
      value = [value]
    }

    // see https://www.npmjs.com/package/material-ui-chip-input/v/1.0.0-beta.6
    return (
      <React.Fragment>
        <ChipInput
          className={classList(styles.container, startAdornment ? styles.withStartAdornment : undefined, endAdornment ? styles.withEndAdornment : undefined)}
          disabled={disabled}
          ref={chipInput => this.chipInput = chipInput}
          allowDuplicates={false}
          newChipKeyCodes={this.props.newChipKeyCodes}
          dataSourceConfig={{ ...suggestionsFormat, text: suggestionsFormat.label || suggestionsFormat.text }}
          dataSource={suggestions}
          onAdd={this.handleRequestAdd}
          onDelete={this.handleRequestDelete}
          onUpdateInput={this.handleUpdateInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          label={label}
          variant="outlined"
          margin="dense"
          placeholder={placeholder}
          value={value}
          fullWidth={fullWidth}
          error={!!error}
          helperText={(
            <Collapse in={!!actualHelperText} data-cy={shortName ? `chipfield-helper-${shortName}` : undefined}>
              {actualHelperText}{'\u00A0'}
            </Collapse>
          )}
          InputProps={{
            autoFocus: !disabled && autoFocus,
            inputProps: {
              'data-cy': shortName ? `chipfield-input-${shortName}` : undefined,
              autoFocus: autoFocus,
              disabled: disabled,
            },
            startAdornment: startAdornment && (
              <InputAdornment onClick={e => e.stopPropagation()} className={styles.startAdornment} position="start">
                {startAdornment}
              </InputAdornment>
            ),
            endAdornment: endAdornment && (
              <InputAdornment onClick={e => e.stopPropagation()} className={styles.endAdornment} position="end">
                {endAdornment}
              </InputAdornment>
            ),
          }}
          FormHelperTextProps={{
            style: actualHelperText ? { marginBottom: 0, marginTop: 6 } : { marginBottom: 0, marginTop: 0 }, // remove incorrect +4px spacing
            component: 'div', // default is 'p', this fixes invalid HTML by having the Collapse DIV in here
          } as any}
          data-cy={shortName ? `chipfield-${shortName}` : undefined}
        />

        {this.renderAutoComplete()}
      </React.Fragment>
    )
  }

  renderAutoComplete() {
    let { suggestions, suggestionsFormat, unique, input } = this.props
    let { rawInputValue, selectedSuggestionIndex } = this.state
    let value = (input ? input.value : this.props.value) || []

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
        if ((Array.isArray(value) ? value : [value]).some(item => item[suggestionsFormat.value] === suggestionValue)) {
          return false // .filter
        }
      }

      if (suggestionText.toLowerCase().replace(' ', '').indexOf(rawInputValueSimplified) !== -1) {
        return true // .filter
      }

      return false // .filter
    })

    currentSuggestions.sort((a, b) => {
      let aText = a[suggestionsFormat.text]?.toLowerCase().replace(' ', '')
      let bText = b[suggestionsFormat.text]?.toLowerCase().replace(' ', '')

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
        anchorEl={chipInputDOMNode.lastChild.lastChild as any} // this is supposed to be the last rendered Chip
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

    let { suggestions, suggestionsFormat, input, onChange, value, unique, oneRecord, newRecord } = this.props
    let newValueFound = false
    let newValue
    let newValueText

    value = (input ? input.value : value) || []
    onChange = input ? input.onChange : onChange

    if (!Array.isArray(value)) {
      value = [value]
    }

    this.setState({
      rawInputValue: '',
      selectedSuggestionIndex: 0,
    })

    // Search for exact match.
    for (const suggestion of suggestions) {
      let text = newObject[suggestionsFormat.text]?.toLowerCase()
      let suggestionText = suggestion[suggestionsFormat.text]?.toLowerCase()

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
      let inputValue = Array.isArray(value) ? value : [value]

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
      } as T)
      // Sometimes some empty chips can get stuck, this clears them.
      // TODO: investigate why this happens and fix the core issue.
      inputValue = inputValue.filter(item => item[suggestionsFormat.text] && item[suggestionsFormat.value])

      onChange(inputValue)
    }
  }

  handleRequestDelete = (itemValue: any, index: number) => {
    let { input, value, onChange } = this.props

    value = (input ? input.value : value) || []
    onChange = input ? input.onChange : onChange

    if (!Array.isArray(value)) {
      value = [value]
    }

    value = value.slice()
    value.splice(index, 1)
    onChange(value)

    ReactDOM.findDOMNode(this.chipInput).querySelector('input').focus()

    this.setState({
      rawInputValue: '',
      selectedSuggestionIndex: 0,
    })
  }

  handleUpdateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      rawInputValue: e.target.value,
      selectedSuggestionIndex: 0,
    })
  }

  handleFocus = (e: React.FocusEvent<any>) => {
    this.setState({
      selectedSuggestionIndex: 0,
    })

    window.clearTimeout(this.blurTimeoutHandle)

    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  handleBlur = () => {
    const { input, onBlur } = this.props
    const actualOnBlur = input ? input.onBlur : onBlur

    this.setState({
      rawInputValue: '',
      selectedSuggestionIndex: 0,
    })

    window.clearTimeout(this.blurTimeoutHandle)
    this.blurTimeoutHandle = window.setTimeout(() => {
      if (actualOnBlur) actualOnBlur()
    }, 200)
  }

  handleKeyDown = (e: React.KeyboardEvent) => {
    let { suggestionsFormat, newChipKeyCodes = [] } = this.props
    let { selectedSuggestionIndex } = this.state

    if (newChipKeyCodes.filter(i => i === e.which).length > 0) {
      if (this.currentSuggestions[selectedSuggestionIndex]) {
        this.handleRequestAdd({
          [suggestionsFormat.text]: this.currentSuggestions[selectedSuggestionIndex][suggestionsFormat.text],
        })

        window.setTimeout(() => {
          this.chipInputDOMNode.querySelector('input').focus()
        }, 0)
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
