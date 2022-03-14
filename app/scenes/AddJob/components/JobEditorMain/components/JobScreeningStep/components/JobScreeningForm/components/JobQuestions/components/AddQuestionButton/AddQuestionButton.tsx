import React from 'react'
import { Button, TextField } from 'components/themed'
import ResponsiveDialog from 'components/ResponsiveDialog'
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { IQuestionUpdateNode } from 'types'

export interface IAddQuestionButtonProps {
  onAdd?: (q: IQuestionUpdateNode) => void
  fullWidth?: boolean
}

export interface IAddQuestionButtonState {
  isOpen: boolean
  questionTitleInputValue: string
  maxDurationInputValue: number
}

export default class AddQuestionButton extends React.PureComponent<IAddQuestionButtonProps, IAddQuestionButtonState> {
  static defaultProps = {
    onAdd: () => undefined,
  }

  constructor(props: IAddQuestionButtonProps) {
    super(props)

    this.state = {
      isOpen: false,
      questionTitleInputValue: '',
      maxDurationInputValue: 1,
    }
  }

  render() {
    return (
      <React.Fragment>
        <Button
          color="secondary"
          onClick={this.handleOpen}
          data-cy="add-custom-question"
          style={{ marginBottom: 12 }}
          fullWidth={this.props.fullWidth}
        >
          <Add /> Create Custom Question
        </Button>

        {this.renderDialog()}
      </React.Fragment>
    )
  }

  renderDialog() {
    const { isOpen, questionTitleInputValue } = this.state

    if (!isOpen) {
      return null
    }

    return (
      <ResponsiveDialog maxWidth="md" open onClose={this.handleClose}>
        <DialogTitle>
          Add Custom Question
        </DialogTitle>

        <DialogContent>
          <DialogContentText style={{ color: '#96ADC6' }}>
            Ask a custom interview question.
            Applicants will post a video-recorded answer, allowing you to assess their tech and communication skills efficiently.
          </DialogContentText>

          <div style={{ marginBottom: 24, marginTop: 12 }}>
            <TextField
              fullWidth
              autoFocus
              label="Custom Question Title"
              data-cy="add-custom-question-input"
              value={questionTitleInputValue}
              onChange={this.handleQuestionTitleChange}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClose}>
            Cancel
          </Button>

          <Button color="secondary" onClick={this.handleAdd} data-cy="add-custom-question-done">
            Add
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleQuestionTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      questionTitleInputValue: e.target.value,
    })
  }

  handleOpen = () => {
    this.setState({
      isOpen: true,
    })
  }

  handleAdd = () => {
    this.props.onAdd({
      title: this.state.questionTitleInputValue,
      description: '',
      status: 'private',
      maxDuration: this.state.maxDurationInputValue,
    })

    this.setState({
      isOpen: false,
      questionTitleInputValue: '',
      maxDurationInputValue: 1,
    })
  }

  handleClose = () => {
    this.setState({
      isOpen: false,
    })
  }
}
