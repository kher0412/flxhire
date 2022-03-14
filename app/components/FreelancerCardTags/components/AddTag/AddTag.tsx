import React from 'react'
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Tooltip, Chip } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button, TextField } from 'components/themed'
import { Style } from '@material-ui/icons'
import type { IFreelancerCardTag } from '../../FreelancerCardTags'

export interface IAddTagProps {
  tags: IFreelancerCardTag[]
  availableTags: IFreelancerCardTag[]
  disabled?: boolean
  onSetTags?: (tags: IFreelancerCardTag[]) => any
}

export interface IAddTagState {
  isDialogOpen: boolean
  tagInputText: string
}

export default class AddTag extends React.PureComponent<IAddTagProps, IAddTagState> {
  constructor(props: IAddTagProps, context: any) {
    super(props, context)

    this.state = {
      isDialogOpen: false,
      tagInputText: props.tags.map(tag => tag.name).join(' '),
    }
  }

  componentWillReceiveProps(nextProps: IAddTagProps) {
    this.setState({
      tagInputText: nextProps.tags.map(tag => tag.name).join(' '),
    })
  }

  render() {
    const { disabled, tags = [] } = this.props

    return (
      <React.Fragment>
        <Button
          onClick={this.handleOpenDialog}
          disabled={disabled}
          color="secondary"
          data-cy="add-tags"
          responsive
          style={{ marginRight: 'auto' }}
        >
          <Style /> {tags.length > 0 ? `Teams (${tags.length})` : 'Teams'}
        </Button>

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
          Add to a team
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Create a new team or add this person to an existing team; you can separate multiple teams with a space{this.renderChooseExistingTagHint()}
          </DialogContentText>

          <div style={availableTags.length > 0 ? { margin: '18px 0' } : undefined}>
            {availableTags.map(tag => this.renderExistingTag(tag))}
          </div>

          <div style={{ marginTop: 24 }}>
            <TextField
              name="add-tags"
              autoFocus
              fullWidth
              label="Add to a team..."
              value={tagInputText}
              onKeyDown={this.handleTagInputKeyDown}
              onChange={this.handleTagInputChange}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleDialogClose}>
            Cancel
          </Button>

          <Button color="primary" onClick={this.handleSaveClick} disabled={!tagInputText} data-cy="save-tags">
            Save
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  renderExistingTag(tag: IFreelancerCardTag) {
    const { tagInputText } = this.state
    const isTagAlreadyAdded = tagInputText.split(' ').includes(tag.name)

    return (
      <Tooltip key={tag.id || tag.name} title={`${tag.name} (custom tag)`}>
        <Chip
          onClick={() => this.handleTagClick(tag)}
          style={{ marginLeft: 2, marginRight: 4, background: isTagAlreadyAdded ? '#2ECB80 ' : 'rgba(0, 0, 0, 0.26)' }}
          label={(
            <span style={isTagAlreadyAdded ? { color: 'white' } : undefined}>
              {tag.name}
            </span>
          )}
          data-cy={`freelancer-chip-tag-${tag.name}`}
          data-active={isTagAlreadyAdded}
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
      tagInputText: this.props.tags.map(tag => tag.name).join(' '),
    })
  }

  handleTagClick = (tag: IFreelancerCardTag) => {
    let { tagInputText = '' } = this.state
    let tagInputTags = tagInputText.split(' ') || []
    let isTagAlreadyAdded = tagInputTags.includes(tag.name)

    if (isTagAlreadyAdded) {
      // remove tag
      tagInputTags = tagInputTags.filter(_tag => _tag !== tag.name)

      this.setState({
        tagInputText: tagInputTags.join(' '),
      })
    } else {
      // add tag
      if (tagInputText.endsWith(' ')) {
        this.setState({
          tagInputText: (tagInputText + tag.name).replace(/\s+/g, ' ').trim(),
        })
      } else {
        this.setState({
          tagInputText: `${tagInputText} ${tag.name}`.replace(/\s+/g, ' ').trim(),
        })
      }
    }
  }

  handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    const { tagInputText } = this.state

    if (tagInputText && e.which === 13) {
      this.handleSaveClick()
    }
  }

  handleTagInputChange = (e: React.ChangeEvent) => {
    this.setState({
      tagInputText: (e.target as any).value,
    })
  }

  handleSaveClick = () => {
    const { onSetTags } = this.props
    const { tagInputText } = this.state

    if (onSetTags) {
      onSetTags(tagInputText.split(' ').map(name => ({ name })))
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
