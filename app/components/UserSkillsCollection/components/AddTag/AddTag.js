import React from 'react'
import { IconButton, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button, Tooltip, Chip } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { AddCircle } from '@material-ui/icons'

export default class AddTag extends React.PureComponent {
  state = {
    isDialogOpen: false,
    tagInputText: '',
  }

  render() {
    const { disabled, compact } = this.props

    return (
      <React.Fragment>
        {compact && (
          <Tooltip title="Add custom tags">
            <IconButton
              onClick={this.handleOpenDialog}
              disabled={disabled}
              size="small"
              color="primary"
              style={{ marginRight: 6, color: '#0033cc' }}
              data-cy="add-tags"
            >
              <AddCircle />
            </IconButton>
          </Tooltip>
        )}

        {!compact && (
          <Tooltip title="Add custom tags">
            <Button
              onClick={this.handleOpenDialog}
              disabled={disabled}
              size="small"
              color="primary"
              variant="outlined"
              style={{ marginRight: 6, color: '#0033cc', borderColor: '#0033cc', borderRadius: 9999, paddingLeft: 4, paddingRight: 12 }}
              data-cy="add-tags"
            >
              <AddCircle style={{ marginRight: 6 }} /> tags
            </Button>
          </Tooltip>
        )}

        {this.renderDialog()}
      </React.Fragment>
    )
  }

  renderDialog() {
    const { availableTags = [] } = this.props
    const { isDialogOpen, tagInputText } = this.state

    if (!isDialogOpen) {
      return null
    }

    return (
      <ResponsiveDialog open onClose={this.handleDialogClose}>
        <DialogTitle>
          Add custom tag
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Add custom tags to your team members to customize filtering; you can separate multiple tags with a space{this.renderChooseExistingTagHint()}
          </DialogContentText>

          <div>
            {availableTags.map(tag => this.renderExistingTag(tag))}
          </div>

          <div style={availableTags.length > 0 ? { marginTop: 12 } : undefined}>
            <TextField
              autoFocus
              fullWidth
              label="Tag Freelancer"
              placeholder="Create a new custom tag..."
              value={tagInputText}
              onKeyDown={this.handleTagInputKeyDown}
              onChange={this.handleTagInputChange}
              InputProps={{ 'data-cy': 'add-tags-input' }}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleDialogClose}>
            Cancel
          </Button>

          <Button color="primary" onClick={this.handleAddClick} disabled={!tagInputText} data-cy="save-tags">
            Add
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  renderExistingTag(tag) {
    const { tags = [] } = this.props
    const { tagInputText } = this.state
    const isTagAlreadyAdded = tagInputText.includes(tag.name) || tags.some(_tag => tag.name === _tag.name)

    return (
      <Tooltip key={tag.id} title={`${tag.name} (custom tag)`}>
        <Chip
          onClick={() => this.handleTagClick(tag)}
          style={{ marginLeft: 2, marginRight: 4, background: isTagAlreadyAdded ? '#0033cc' : 'rgba(0, 0, 0, 0.3)' }}
          label={(
            <span style={isTagAlreadyAdded ? { color: 'white' } : undefined}>
              {tag.name}
            </span>
          )}
        />
      </Tooltip>
    )
  }

  renderChooseExistingTagHint() {
    const { availableTags = [] } = this.props

    if (availableTags.length > 0) {
      return ', or choose from one of the existing tags:'
    }

    return ':'
  }

  handleOpenDialog = () => {
    this.setState({
      isDialogOpen: true,
    })
  }

  handleTagClick = (tag) => {
    const { tagInputText } = this.state
    const isTagAlreadyAdded = tagInputText.includes(tag.name)

    if (isTagAlreadyAdded) {
      this.setState({
        tagInputText: tagInputText.replace(tag.name, '').replace(/\s+/g, ' ').trim(),
      })
    } else if (tagInputText.endsWith(' ')) {
      this.setState({
        tagInputText: (tagInputText + tag.name).replace(/\s+/g, ' ').trim(),
      })
    } else {
      this.setState({
        tagInputText: `${tagInputText} ${tag.name}`.replace(/\s+/g, ' ').trim(),
      })
    }
  }

  handleTagInputKeyDown = (e) => {
    const { tagInputText } = this.state

    if (tagInputText && e.which === 13) {
      this.handleAddClick()
    }
  }

  handleTagInputChange = (e) => {
    this.setState({
      tagInputText: e.target.value,
    })
  }

  handleAddClick = () => {
    const { onAddTag } = this.props
    const { tagInputText } = this.state

    if (onAddTag) {
      onAddTag(tagInputText.split(' ').map(name => ({ name })))
    }

    this.setState({
      isDialogOpen: false,
      tagInputText: '',
    })
  }

  handleDialogClose = () => {
    this.setState({
      isDialogOpen: false,
    })
  }
}
