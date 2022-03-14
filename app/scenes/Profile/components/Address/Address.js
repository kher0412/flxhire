import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { isFunction, debounce } from 'lodash'
import {
  List, ListItem, ListItemText, ListItemIcon,
} from '@material-ui/core'
import ExploreIcon from '@material-ui/icons/Explore'
import ErrorIcon from '@material-ui/icons/Error'
import { TextField } from 'components'
import { autocompleteLocation } from 'services/location'

const ENTER_KEY_CODE = 13

class Address extends React.Component {
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

  selectLocation = (event, suggestion) => {
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

  handleInputKeyDown = (e) => {
    const { suggestions } = this.state
    if (e.which === ENTER_KEY_CODE && suggestions.length > 0) {
      this.selectLocation(e, suggestions[0])
    }
  }

  updateSuggestions = async (value) => {
    const suggestions = await autocompleteLocation(value)
    this.setState({ suggestions, loadingSuggestions: false })
  }

  renderSuggestions() {
    const { suggestions, changed, loadingSuggestions, locationSelected } = this.state
    if (suggestions.length > 0) {
      return (
        <List>
          {suggestions.map((suggestion, index) => (
            <ListItem key={index} button onClick={e => this.selectLocation(e, suggestion)} data-cy={`address-suggestion-${index}`}>
              <ListItemIcon>
                <ExploreIcon />
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
          <ListItem data-cy="address-suggestion-empty">
            <ListItemIcon>
              <ErrorIcon />
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

  render() {
    const { name = 'location', label = 'Address' } = this.props

    return (
      <div>
        <Field
          name={name}
          label={label}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
          component={TextField}
          fullWidth
          data-cy={`address-${name}`}
        />

        {this.renderSuggestions()}
      </div>
    )
  }
}

Address.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onSelectLocation: PropTypes.func,
  onChange: PropTypes.func,
}

export default Address
