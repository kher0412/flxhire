import React from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import { setFieldToEventValue } from 'services/stateManagement'
import { createAction } from 'redux-actions'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'

class SubmitQuestionDialog extends React.Component {
  state = {
    title: '',
    description: '',
  }

  render() {
    const { open } = this.props
    const { title, description } = this.state
    return (
      <ResponsiveDialog open={open} onClose={this.close}>
        <DialogTitle>Submit a Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Have a great and relevant interview question? <br />
            Submit it to help the world hire better!
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <TextField
            value={title}
            onChange={this.onChange('title')}
            placeholder="What's your question?"
            fullWidth
            autoFocus
            style={{ marginBottom: '20px' }}
            data-cy="textfield-title"
          />
          <TextField
            value={description}
            onChange={this.onChange('description')}
            placeholder="What should interviewers look for in answers?"
            fullWidth
            multiline
            rows={3}
            data-cy="textfield-description"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.close} data-cy="close-dialog">Close</Button>
          <Button
            color="primary"
            onClick={this.submit}
            disabled={!title || title.length < 10}
            data-cy="submit-dialog"
          >
            <AddIcon style={{ marginRight: '10px' }} /> Submit
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  close = () => {
    const { onClose } = this.props
    this.setState({
      title: '',
      description: '',
    }, onClose)
  }

  submit = async () => {
    const { showSnackbarMessage } = this.props
    const { title, description } = this.state
    try {
      await getAPIClient().createQuestion({ title, description })
      this.close()
      showSnackbarMessage('Question Submitted')
    } catch (error) {
      trackError(error)
      showSnackbarMessage('Could not submit Question')
    }
  }

  onChange = field => setFieldToEventValue(field).bind(this)
}

const mapDispatchToProps = dispatch => ({
  showSnackbarMessage: message => dispatch(createAction(TOGGLE_SNACKBAR)({ message })),
})

export default connect(null, mapDispatchToProps)(SubmitQuestionDialog)
