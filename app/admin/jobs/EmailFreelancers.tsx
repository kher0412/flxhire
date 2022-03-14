import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  List,
  ListItemText,
  ListItem,
} from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import { httpClient, getBaseURL } from 'admin/api'
import { showNotification as showNotificationAction } from 'react-admin'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'

interface IEmailFreelancersButtonProps extends ContainerProps {
  record: any
}

interface IEmailFreelancersButtonState {
  open: boolean
  loading: boolean
  loadingPreview: boolean
  recipientsData: any
}

class EmailFreelancersButton extends React.Component<IEmailFreelancersButtonProps, IEmailFreelancersButtonState> {
  state = {
    open: false,
    loading: false,
    loadingPreview: false,
    recipientsData: null,
  }

  refresh = async () => {
    if (this.props.record.id) {
      try {
        this.setState({ loadingPreview: true })
        const recipientsData = await getAPIClient().getJobOpportunityRecipients(this.props.record.id)
        this.setState({ recipientsData, loadingPreview: false })
      } catch (error) {
        trackError(error)
      }
    }
  }

  onClose = () => {
    this.setState({ open: false })
  }

  openModal = () => {
    this.setState({ open: true }, this.refresh)
  }

  send = async () => {
    const { record, showNotification } = this.props
    this.setState({ loading: true })
    try {
      await httpClient(`${getBaseURL()}/jobs/${record.id}/email_freelancers`, {
        method: 'POST',
        body: JSON.stringify({
          id: record.id,
        }),
      })
      this.setState({ loading: false, open: false })
      showNotification('Email delivery started')
    } catch (error) {
      console.log(error)
      showNotification(`Error: ${error.message || error}`)
    }
  }

  renderModal = () => {
    const { record } = this.props
    const {
      open,
      loading,
      loadingPreview,
      recipientsData,
    } = this.state
    return (
      <Dialog
        onClose={this.onClose}
        open={open}
      >
        <DialogTitle>
          Email Freelancers
          {' '}
          {record && record.title ? `for ${record.title}` : null}
        </DialogTitle>
        <DialogContent>
          {loadingPreview && (
            <DialogContentText>
              <b>{recipientsData ? 'Updating' : 'Loading'} Preview... This can take some time</b>
            </DialogContentText>
          )}
          {recipientsData && (
            <List>
              <ListItem>
                <ListItemText primary={recipientsData?.potential_referrers_count || 'N/A'} secondary="Potential Referrers (will be emailed)" />
              </ListItem>
              <ListItem>
                <ListItemText primary={recipientsData?.potential_applicants_count || 'N/A'} secondary="Potential Applicants (will be emailed)" />
              </ListItem>
              <ListItem>
                <ListItemText primary={recipientsData?.aware_users_count || 'N/A'} secondary="Members Aware about this Job" />
              </ListItem>
              <ListItem>
                <ListItemText primary={recipientsData?.already_messaged_count || 'N/A'} secondary="Members already messaged about this Job" />
              </ListItem>
            </List>
          )}
          <DialogContentText>
            All potential referrers and applicants that are not aware and have not been emailed will be emailed about this job. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={this.send}
            disabled={loading}
          >
            { loading ? 'Sending' : 'Send' }
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderModal()}
        <Button
          color="primary"
          onClick={this.openModal}
        >
          <EmailIcon style={{ marginRight: '10px' }} />
          Job Opportunity
        </Button>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showNotification: notification => dispatch(showNotificationAction(notification)),
})

const connector = connect(null, mapDispatchToProps)

type ContainerProps = ConnectedProps<typeof connector>

export default connector(EmailFreelancersButton)
