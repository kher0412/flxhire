import React, { CSSProperties } from 'react'
import { Field } from 'redux-form'
import { isFunction, debounce } from 'lodash'
import {
  List, ListItem, ListItemText, ListItemIcon, Paper, Popover,
} from '@material-ui/core'
import { autocompleteLocation, LocationData } from 'services/location'
import { Explore, PinDrop, Error } from '@material-ui/icons'
import styles from './Address.module.css'
import LocationField from './LocationField'

const ENTER_KEY_CODE = 13

interface IAddressProps {
  onSelectLocation?: (event: any, suggestion: LocationData) => void
  onChange?: (event: any) => void
  editable?: boolean
  name?: string
  label?: string
  style?: CSSProperties
}

interface IAddressState {
  suggestions: LocationData[]
  changed: boolean
  loadingSuggestions: boolean
  locationSelected: boolean
}

class Address extends React.Component<IAddressProps, IAddressState> {
  constructor(props) {
    super(props)
    this.state = {
      suggestions: [],
      changed: false,
      loadingSuggestions: false,
      locationSelected: false,
    }
    this.updateSuggestions = debounce(this.updateSuggestions, 800)
  }

  anchorEl: any

  selectLocation = (event, suggestion: LocationData) => {
    const { onSelectLocation } = this.props
    if (onSelectLocation) {
      onSelectLocation(event, suggestion)
    }
    this.setState({ suggestions: [], locationSelected: true })
  }

  handleInputChange = (e) => {
    const { onChange } = this.props
    this.setState({ changed: true, locationSelected: false, loadingSuggestions: true }, () => {
      this.updateSuggestions(e.target.value)
      if (isFunction(onChange)) onChange(e)
    })
  }

  handleFocus = (e) => {
    if (e.target.value && this.state.suggestions.length === 0) {
      this.setState({ loadingSuggestions: true }, () => this.updateSuggestions(e.target.value))
    }
  }

  handleBlur = (e) => {
    if (this.state.locationSelected || !this.state.changed) {
      this.setState({ loadingSuggestions: false, suggestions: [] })
    }
  }

  handleInputKeyDown = (e) => {
    const { suggestions } = this.state
    if (e.which === ENTER_KEY_CODE && suggestions.length > 0) {
      this.selectLocation(e, suggestions[0])
    }
  }

  updateSuggestions = async (value) => {
    return new Promise((resolve) => {
      this.setState({ loadingSuggestions: true }, async () => {
        const suggestions = await autocompleteLocation(value)
        this.setState({ suggestions, loadingSuggestions: false }, () => resolve(suggestions))
      })
    })
  }

  renderSuggestions() {
    const { suggestions, changed, loadingSuggestions, locationSelected } = this.state
    if (loadingSuggestions) {
      return (
        <List dense>
          <ListItem data-cy="address-suggestion-loading" className={styles['list-item']}>
            <ListItemIcon>
              <Error />
            </ListItemIcon>
            <ListItemText
              primary="Searching..."
            />
          </ListItem>
        </List>
      )
    }
    if (suggestions.length > 0) {
      return (
        <List dense>
          {suggestions.map((suggestion, index) => (
            <ListItem
              key={suggestion.id}
              button
              onClick={e => this.selectLocation(e, suggestion)}
              data-cy={`address-suggestion-${index}`}
              className={styles['list-item']}
            >
              <ListItemIcon style={{ minWidth: 38 }}>
                <Explore />
              </ListItemIcon>
              <ListItemText primary={suggestion.placeName} secondary={index === 0 ? 'Best match, press ENTER to accept' : undefined} />
            </ListItem>
          ))}
        </List>
      )
    }
    if (changed && !locationSelected && !loadingSuggestions) {
      return (
        <List>
          <ListItem data-cy="address-suggestion-empty" className={styles['list-item']}>
            <ListItemIcon>
              <Error />
            </ListItemIcon>
            <ListItemText
              primary="Address not found"
              secondary="We could not locate the address you entered. Try using a more generic address"
            />
          </ListItem>
        </List>
      )
    }
    return null
  }

  handlePopoverClose = () => this.setState({ suggestions: [], locationSelected: false })

  render() {
    const { name = 'location', label = 'Address', editable, style } = this.props
    const { suggestions, loadingSuggestions } = this.state
    const resultsOpen = suggestions.length > 0 || loadingSuggestions
    return (
      <React.Fragment>
        <div className={styles.container} style={style} ref={el => this.anchorEl = el}>
          <Paper className={styles.paper}>
            <div className={styles.field}>
              <PinDrop className={styles.icon} />
              <Field
                name={name}
                placeholder={label}
                onChange={this.handleInputChange}
                onKeyDown={this.handleInputKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                data-cy={`address-${name}`}
                component={LocationField}
                className={styles.input}
                fullWidth
                disabled={!editable}
              />
            </div>
            {resultsOpen && this.renderSuggestions()}
          </Paper>
        </div>
      </React.Fragment>
    )
  }
}

export default Address
