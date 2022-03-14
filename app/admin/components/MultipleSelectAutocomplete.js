import React, { Component } from 'react';
import Downshift from 'downshift'
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import deburr from 'lodash/deburr';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles'
import { find, remove } from 'lodash';

class MultipleSelectAutocomplete extends Component {
  state = {
    inputValue: '',
    selectedItem: [],
  };

  renderInput = inputProps => {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
          },
          ...InputProps,
        }}
        {...other}
      />
    );
  }

  handleChange = item => {
    let { selectedItem } = this.state;
    let object = find(this.props.choices, function(obj){ return obj.name === item })

    if (find(selectedItem, function(obj){ return obj.name === item }) === undefined) {
      selectedItem = [...selectedItem, object];
    }

    this.setState({
      inputValue: '',
      selectedItem,
    }, function(){
      this.props.input.onChange(this.state.selectedItem.map((i) => {return i.id}).toString());
    });
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };

  handleDelete = item_id => () => {
    const newSelectedItem = remove(this.state.selectedItem, function(item){ return item.id != item_id })
    this.setState({selectedItem: newSelectedItem}, function(){
      this.props.input.onChange(this.state.selectedItem.map((i) => {return i.id}).toString());
    });
  };

  getSuggestions = value => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 ? [] : this.props.choices.filter(skill => {
      const keep = count < 5 && skill.name.slice(0, inputLength).toLowerCase() === inputValue;
      if (keep) {
        count += 1;
      }
      return keep;
    })
  }

  renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
    const isHighlighted = highlightedIndex === index;
    const isSelected = find(selectedItem, function(obj){ return obj.id === suggestion.id }) !== undefined
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.id}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.name}
      </MenuItem>
    );
  }

  render(){
    const { classes } = this.props;
    const { inputValue, selectedItem } = this.state;
    return (
      <div >
        <Downshift
          inputValue={inputValue}
          onChange={this.handleChange}
          selectedItem={selectedItem}
        >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex
        }) => (
          <div className={classes.container}>
            {
              this.renderInput({
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  startAdornment: selectedItem.map(item => (
                    <Chip
                      key={item.id}
                      tabIndex={-1}
                      className={classes.chip}
                      label={item.name}
                      onDelete={this.handleDelete(item.id)}
                    />
                  )),
                  onChange: this.handleInputChange,
                  onKeyDown: this.handleKeyDown,
                  placeholder: 'Select multiple Skill',
                })
              })
            }
            {isOpen ? (
                <Paper className={classes.paper} square>
                  {
                    this.getSuggestions(inputValue).map((suggestion, index) =>
                      this.renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.name }),
                        highlightedIndex,
                        selectedItem,
                      })
                    )
                  }
                </Paper>
              )
              : null}
          </div>
        )}
      </Downshift>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing(2),
  },
});

export default withStyles(styles)(MultipleSelectAutocomplete)
