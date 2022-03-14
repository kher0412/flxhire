import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { trackError } from 'services/analytics'
import { connect } from 'react-redux'
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, Switch, TextField, FormControlLabel } from '@material-ui/core'
import { setFieldToEventValue } from 'services/stateManagement'
import { showNotification } from 'react-admin'
import { httpClient, getBaseURL } from 'admin/api'
import { acceptFreelancerAction, rejectFreelancerAction } from './ScreeningActions'

class ScreeningActionsButtons extends Component {
  state = {
    open: false,
    message: '',
    allowScreening: true,
  }

  changeMessage = setFieldToEventValue('message').bind(this)

  toggleAllowScreening = () => this.setState({ allowScreening: !this.state.allowScreening })

  onClose = () => this.setState({ open: false })

  openDialog = () => {
    const { record } = this.props
    this.setState({
      open: true,
      allowScreening: record.profile.allow_screening,
      message: record.profile.screening_feedback,
    })
  }

  handleAccept = async () => {
    const { record, showNotification } = this.props
    try {
      this.setState({ open: false })
      await httpClient(`${getBaseURL()}/freelancers/${record.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          accept: true,
        }),
      })
      showNotification('Member accepted')
    } catch (error) {
      trackError(error)
      showNotification(`Error: ${error}`, 'warning')
    }
  }

  handleReject = async () => {
    const { record, showNotification } = this.props
    const { message, allowScreening } = this.state
    try {
      this.setState({ open: false })
      await httpClient(`${getBaseURL()}/freelancers/${record.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          reject: true,
          profile: {
            screening_feedback: message,
            allow_screening: allowScreening,
          },
        }),
      })
      showNotification('Member rejected')
    } catch (error) {
      trackError(error)
      showNotification(`Error: ${error}`, 'warning')
    }
  }

  renderModal = () => {
    const { record } = this.props
    const {
      open,
      message,
      allowScreening,
    } = this.state
    return (
      <Dialog
        onClose={this.closeDialog}
        open={open}
      >
        <DialogTitle>
          Reject {(record && record.name) || 'Member'}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Rejection Reason or Feedback"
              value={message}
              onChange={this.changeMessage}
              fullWidth
              style={{ marginTop: '20px' }}
            />
            <FormControlLabel
              control={(
                <Switch
                  label="Allow Re-Applying"
                  checked={allowScreening}
                  onChange={this.toggleAllowScreening}
                />
              )}
              label="Allow Re-Applying"
              style={{ marginTop: '20px' }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={this.handleReject}
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    const { record } = this.props
    const showButtons = record && (record.status === 'interview' || record.status === 'applied')
    if (!showButtons) return null
    return (
      <React.Fragment>
        {this.renderModal()}
        <Button color="primary" onClick={this.handleAccept}>Accept</Button>
        <Button color="secondary" onClick={this.openDialog}>Reject</Button>
      </React.Fragment>
    )
  }
}

export default connect(null, { showNotification })(ScreeningActionsButtons)
