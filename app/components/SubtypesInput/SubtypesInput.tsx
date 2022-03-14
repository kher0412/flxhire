import React from 'react'
import { DialogTitle, DialogContent, DialogActions, Collapse, List, ListItem, ListItemIcon, Checkbox, ListItemText, IconButton, Grid } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { AutoCompleteChipInput, Button } from 'components/themed'
import { IAutoCompleteChipInputProps } from 'components/themed/AutoCompleteChipInput/AutoCompleteChipInput'
import { LibraryAdd } from '@material-ui/icons'

export interface ISubtypesInputProps extends IAutoCompleteChipInputProps<{ id: number, group_index?: number }> {
  freelancerTypeId?: number
  hintText?: React.ReactNode
}

export interface ISubtypesInputState {
  isDialogOpen: boolean
  isBrowseMode: boolean
  isBrowseModeLoaded: boolean
}

export default class SubtypesInput extends React.PureComponent<ISubtypesInputProps, ISubtypesInputState> {
  state: ISubtypesInputState = {
    isDialogOpen: false,
    isBrowseMode: false,
    isBrowseModeLoaded: false, // for lazy rendering
  }

  render() {
    const { input, hintText, ...restProps } = this.props

    return (
      <React.Fragment>
        <AutoCompleteChipInput
          suggestionsFormat={{ text: 'name', value: 'id' }}
          input={input}
          fullWidth
          {...restProps}
          helperText={hintText}
          endAdornment={(
            <IconButton onClick={this.handleOutsideInputClick} edge="end">
              <LibraryAdd />
            </IconButton>
          )}
        />

        {this.renderDialog()}
      </React.Fragment>
    )
  }

  renderDialog() {
    const { input, suggestions = [], ...restProps } = this.props
    const { isDialogOpen, isBrowseMode, isBrowseModeLoaded } = this.state

    if (!isDialogOpen) {
      return null
    }

    return (
      <ResponsiveDialog open onClose={this.handleDialogClose} maxWidth="md">
        <div style={{ width: 800 }} />

        <DialogTitle>
          Specializations
        </DialogTitle>

        <DialogContent>
          <Collapse in={!isBrowseMode}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div data-cy="required-subtypes-input">
                  <AutoCompleteChipInput
                    input={input}
                    suggestions={suggestions}
                    suggestionsFormat={{ text: 'name', value: 'id' }}
                    label="subtypes"
                    autoFocus
                    fullWidth
                    {...restProps}
                  />
                </div>
              </Grid>

              <Grid item xs={12}>
                <Button onClick={this.handleBrowseModeClick}>
                  Browse All Specializations
                </Button>
              </Grid>
            </Grid>
          </Collapse>

          <Collapse in={isBrowseMode}>
            {isBrowseModeLoaded && (
              // this is a heavy list, only lazy-render it when browse mode opens for the first time
              <List dense>
                {suggestions.sort((a, b) => a.name.localeCompare(b.name)).map(suggestion => (
                  <ListItem key={suggestion.id} button onClick={() => this.handleBrowseItemClick(suggestion)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={input.value.some(subtype => subtype.id === suggestion.id)}
                        tabIndex={-1}
                        disableRipple
                        color="primary"
                      />
                    </ListItemIcon>

                    <ListItemText primary={suggestion.name} />
                  </ListItem>
                ))}
              </List>
            )}
          </Collapse>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleDialogClose} data-cy="subtypes-dialog-close">
            {isBrowseMode ? 'Done' : 'Ok'}
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleOutsideInputClick = () => {
    this.setState({
      isDialogOpen: true,
    })
  }

  handleDialogClose = () => {
    if (this.state.isBrowseMode) {
      this.setState({
        isBrowseMode: false,
      })
    } else {
      this.setState({
        isDialogOpen: false,
        isBrowseModeLoaded: false,
      })
    }
  }

  handleBrowseModeClick = () => {
    this.setState({
      isBrowseMode: true,
      isBrowseModeLoaded: true,
    })
  }

  handleBrowseItemClick = (suggestion: ISubtypesInputProps['input']['value'][number]) => {
    const { input, suggestions = [] } = this.props
    let selectedSubtypes = input?.value || []

    if (selectedSubtypes.some(subtype => subtype.id === suggestion.id)) {
      // toggle off
      selectedSubtypes = selectedSubtypes.filter(subtype => subtype.id !== suggestion.id)
    } else {
      // toggle on
      selectedSubtypes = selectedSubtypes.concat([suggestions.find(subtype => subtype.id === suggestion.id)])
    }

    this.handleChange(selectedSubtypes)
  }

  handleChange = (value: ISubtypesInputProps['input']['value']) => {
    this.props.input.onChange(value)
  }
}
