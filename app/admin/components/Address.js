import React from 'react'
import { useInput } from 'ra-core' // eslint-disable-line import/no-extraneous-dependencies
import PropTypes from 'prop-types'
import { isFunction, debounce } from 'lodash'
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import ExploreIcon from '@material-ui/icons/Explore'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { autocompleteLocation } from 'services/location'

const ENTER_KEY_CODE = 13

class Address extends React.Component {
  state = {
    suggestions: [],
    value: '',
  }

  componentDidMount = () => {
    if (this.props.input) {
      this.setState({ value: this.props.input.value?.placeName })
    }
  }

  handleInputChange = (e) => {
    this.updateSuggestions(e.target.value)
    this.setState({ value: e.target.value })

    if (isFunction(this.props.onChange)) {
      this.props.onChange(e)
    }
  }

  handleInputKeyDown = (e) => {
    const { onSelectLocation } = this.props
    const { suggestions } = this.state
    if (e.which === ENTER_KEY_CODE && suggestions.length > 0) {
      if (onSelectLocation) {
        onSelectLocation(e, suggestions[0])
      }
      this.setState({ suggestions: [] })
    }
  }

  handleSuggestionClick = (e, value) => {
    const { onSelectLocation, input } = this.props
    this.setState({ suggestions: [] })

    if (isFunction(onSelectLocation)) {
      onSelectLocation(e, value)
    }

    this.setState({ value: value.placeName })

    if (isFunction(input?.onChange)) {
      input.onChange(value)
    }
  }

  updateSuggestions = debounce(async (value) => {
    const suggestions = await autocompleteLocation(value, this.props.types)
    this.setState({ suggestions })
  }, 800)

  renderSuggestions() {
    const { classes } = this.props
    const { suggestions } = this.state
    if (suggestions.length > 0) {
      return (
        <List className={classes.paper} style={{ zIndex: 3, boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          {suggestions.map((suggestion, index) => (
            <ListItem key={index} button onClick={e => this.handleSuggestionClick(e, suggestion)} data-cy={`address-suggestion-${index}`}>
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary={suggestion.placeName} secondary={index === 0 ? 'Best match, press ENTER to accept' : undefined} />
            </ListItem>
          ))}
        </List>
      )
    }
  }

  render() {
    const { name = 'location', label = 'Address' } = this.props

    return (
      <div>
        <TextField
          label={label}
          name={name}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
          value={this.state.value}
        />
        {this.renderSuggestions()}
      </div>
    )
  }
}

Address.propTypes = {
  types: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  onSelectLocation: PropTypes.func,
  onChange: PropTypes.func,
}

const styles = () => ({
  paper: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#fff',
  },
})

const AddressWrapper = props => (<Address input={useInput(props).input} {...props} />)

export default withStyles(styles)(AddressWrapper)
