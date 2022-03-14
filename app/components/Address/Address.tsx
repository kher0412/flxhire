import React from 'react'
import { isFunction, debounce } from 'lodash'
import {
  List, ListItem, ListItemText, ListItemIcon,
} from '@material-ui/core'
import ExploreIcon from '@material-ui/icons/Explore'
import { TextField } from 'components/themed'
import { autocompleteLocation, LocationData } from 'services/location'
import { trackError } from 'services/analytics'

const ENTER_KEY_CODE = 13

interface IAddressProps {
  onSelectLocation?: (event: any, suggestion: LocationData) => void
  onBestSuggestedLocationChange?: (suggestion?: LocationData) => void
  onChange?: (value: string) => void
  name?: string
  label?: string
  value?: string
}

interface IAddressState {
  suggestions: LocationData[]
}

class Address extends React.Component<IAddressProps, IAddressState> {
  state = {
    suggestions: [] as LocationData[],
  }

  selectLocation = (event, suggestion) => {
    const { onSelectLocation, onChange } = this.props

    if (onSelectLocation) {
      onSelectLocation(event, suggestion)
    }

    if (onChange && suggestion) {
      onChange(suggestion.placeName)
    }

    this.setState({ suggestions: [] })
  }

  handleInputChange = (value) => {
    const { onChange } = this.props
    let _value = value

    if (typeof value === 'object') {
      _value = value.target.value
    }

    this.updateSuggestions(_value)
    if (isFunction(onChange)) onChange(_value)
  }

  handleInputKeyDown = (e) => {
    const { suggestions } = this.state

    if (e.which === ENTER_KEY_CODE && suggestions.length > 0) {
      this.selectLocation(e, suggestions[0])
    }
  }

  updateSuggestions = debounce(async (value) => {
    try {
      const newSuggestions = await autocompleteLocation(value)
      const { onBestSuggestedLocationChange } = this.props
      const { suggestions } = this.state

      if (onBestSuggestedLocationChange) {
        if (!!newSuggestions[0] !== !!suggestions[0]) {
          onBestSuggestedLocationChange()
        } else if (newSuggestions[0] && newSuggestions[0].placeName !== suggestions[0].placeName) {
          onBestSuggestedLocationChange(newSuggestions[0])
        }
      }

      this.setState({
        suggestions: newSuggestions,
      })
    } catch (error) {
      trackError(error)
    }
  }, 800)

  renderSuggestions() {
    const { suggestions } = this.state

    if (suggestions.length > 0) {
      return (
        <List>
          {suggestions.map((suggestion, index) => (
            <ListItem
              key={suggestion.id}
              button
              onClick={e => this.selectLocation(e, suggestion)}
              data-cy={`address-suggestion-${index}`}
            >
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText
                primary={suggestion.placeName}
                secondary={index === 0 ? 'Best match, press ENTER to accept' : undefined}
              />
            </ListItem>
          ))}
        </List>
      )
    }

    return null
  }

  render() {
    const { name = 'location', label = 'Address', value } = this.props
    return (
      <React.Fragment>
        <TextField
          label={label}
          fullWidth
          data-cy={`address-${name}`}
          onKeyDown={this.handleInputKeyDown}
          input={{ onChange: this.handleInputChange, value, name }}
          name={name}
        />
        {this.renderSuggestions()}
      </React.Fragment>
    )
  }
}

export default Address
