import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from '@material-ui/core'
import { ExternalLink, ResponsiveDialog, Picture, PagePlaceholder, Link } from 'components'
import React from 'react'
import { Button, TextField } from 'components/themed'
import { isClient } from 'services/user'
import { ContainerProps } from './ImportJobContainer'
import { CloudDownload, VpnKey } from '@material-ui/icons'

// eslint-disable-next-line max-len
const GREENHOUSE_API_KEY_INSTRUCTIONS_URL = 'https://support.greenhouse.io/hc/en-us/articles/115000521723-Manage-Harvest-API-Key-Permissions#h_27e370c4-430c-4968-a041-3002ecbeb528'
const GREENHOUSE_ICON = 'https://play-lh.googleusercontent.com/FUuV3cDQCvMZUg0VFknf1KJowJ2uyCWhYvPADo7wR4dYEtOjdbTu3BMTB-70RXTYNogZ=s180-rw'

interface IImportJobProps extends ContainerProps {
  onClose: () => void
}

interface IImportJobState {
  integrationName: string
  loading: boolean
  greenhouseApiKey: string
  greenhouseJobs: any[]
  importing: boolean
  savingKey: boolean
}

export default class ImportJob extends React.PureComponent<IImportJobProps, IImportJobState> {
  state = {
    integrationName: null,
    loading: false,
    greenhouseApiKey: null,
    greenhouseJobs: [],
    importing: false,
    savingKey: false,
  }

  render() {
    const { onClose, user } = this.props
    const { loading, importing, integrationName, greenhouseApiKey, savingKey } = this.state
    const greenhouseConfigured = user?.firm?.greenhouse_configured
    const featureBlocked = !isClient(user) && !user?.firm?.legacy_billing && !user?.firm?.billing_plan?.allow_ats_job_integrations
    const showContinueButton = user?.is_firm_admin && !greenhouseConfigured && !loading && !importing && integrationName === 'greenhouse'
    const disabled = !greenhouseApiKey || savingKey || featureBlocked
    return (
      <ResponsiveDialog open>
        <DialogTitle>Import Job</DialogTitle>
        <DialogContent>
          {this.renderContent()}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          {showContinueButton && (
            <Button
              disabled={disabled}
              color="primary"
              onClick={this.saveGreenhouseAPIKey}
            >
              <VpnKey /> {savingKey ? 'Connecting...' : 'Continue'}
            </Button>
          )}
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  renderContent() {
    const { user } = this.props
    const { integrationName, loading, greenhouseApiKey, greenhouseJobs, importing } = this.state
    const greenhouseConfigured = user?.firm?.greenhouse_configured
    const featureBlocked = !user?.firm?.legacy_billing && !user?.firm?.billing_plan?.allow_ats_job_integrations

    if (featureBlocked) {
      return (
        <PagePlaceholder
          flat
          title="Unsupported Feature"
          subtitle="Integration with existing ATS is not available on your current billing plan. Use the button below to view upgrade options."
          action={(
            <Button color="primary" muiComponent={Link} href="/account/plans">
              Upgrade Plan
            </Button>
          )}
          style={{ width: '100%' }}
        />
      )
    }

    if (loading) {
      return (
        <PagePlaceholder
          flat
          title="Please wait"
          subtitle="Loading jobs..."
          icon={<CloudDownload />}
          style={{ width: '100%' }}
        />
      )
    }

    if (importing) {
      return (
        <PagePlaceholder
          flat
          title="Please wait"
          subtitle="Importing job data and applicants..."
          icon={<CloudDownload />}
          style={{ width: '100%' }}
        />
      )
    }

    if (integrationName === 'greenhouse') {
      if (!greenhouseConfigured) {
        return (
          <React.Fragment>
            <DialogContentText>
              To Continue, we need a Greenhouse Harvest API Key.
            </DialogContentText>
            <DialogContentText>
              Follow <ExternalLink href={GREENHOUSE_API_KEY_INSTRUCTIONS_URL} label="this link" /> to learn how to
              create the required API Key from Greenhouse.
            </DialogContentText>
            <DialogContentText>
              <strong>The following API Endpoint Permissions are needed for the Flexhire integration:</strong>
              <ul>
                <li>Applications &gt; GET: List Applications</li>
                <li>Applications &gt; PATCH: Update Application</li>
                <li>Candidates &gt; GET: Retrieve Candidate</li>
                <li>Candidates &gt; PATCH: Edit Candidate</li>
                <li>Custom Fields &gt; GET: Retrieve Custom Fields</li>
                <li>Custom Fields &gt; POST: Create Custom Field</li>
                <li>Job Posts &gt; GET: List Job Posts</li>
                <li>Job Posts &gt; GET: Retrieve Job Post for Job</li>
              </ul>
            </DialogContentText>

            <DialogContentText>
              This set up is only needed the first time you import data from Greenhouse.
            </DialogContentText>

            <div style={{ margin: '12px 0' }}>
              <TextField
                name="greenhouse_api_key"
                onChange={this.onChangeGreenhouseApiKey}
                value={greenhouseApiKey}
                label="Greenhouse Harvest API Key"
                fullWidth
              />
            </div>

            {!user.is_firm_admin && (
              <DialogContentText>
                <strong>You need to be an administrator in your company in order to set up this integration.</strong>
              </DialogContentText>
            )}
          </React.Fragment>
        )
      }
      return (
        <React.Fragment>
          <DialogContentText>
            We found the following Open Positions on Greenhouse. Select which one you would like to import into Flexhire.
          </DialogContentText>
          <List>
            {greenhouseJobs.map(gJob => (
              <ListItem button onClick={() => this.selectJob(gJob)}>
                <ListItemText>{gJob.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <DialogContentText>
          Choose a service from which to import a Job.
        </DialogContentText>
        <List>
          <ListItem button onClick={this.selectGreenhouse}>
            <ListItemIcon><Avatar><Picture src={GREENHOUSE_ICON} style={{ width: '100%' }} /></Avatar></ListItemIcon>
            <ListItemText>Greenhouse</ListItemText>
          </ListItem>
        </List>
      </React.Fragment>
    )
  }

  onChangeGreenhouseApiKey = event => this.setState({ greenhouseApiKey: event.target.value })

  selectGreenhouse = () => {
    this.setState({
      integrationName: 'greenhouse',
    }, () => {
      if (this.props.user.firm?.greenhouse_configured) this.refreshJobs()
    })
  }

  refreshJobs = () => {
    const { getJobs } = this.props
    const { integrationName } = this.state
    this.setState({ loading: true }, async () => {
      const jobs = await getJobs({ integration_name: integrationName })
      if (jobs) this.setState({ greenhouseJobs: jobs, loading: false })
    })
  }

  saveGreenhouseAPIKey = async () => {
    const { testAPIKey, updateFirm } = this.props
    this.setState({ savingKey: true })
    let valid = await testAPIKey({ greenhouse_api_key: this.state.greenhouseApiKey })
    let success = false
    if (valid) {
      success = await updateFirm({ greenhouse_api_key: this.state.greenhouseApiKey })
    }
    this.setState({ savingKey: false })
    if (valid && success) this.refreshJobs()
  }

  selectJob = (gJob) => {
    this.setState({ importing: true }, () => {
      this.props.importJob({ integration_name: this.state.integrationName, greenhouse_job_id: gJob.id }).then((success) => {
        if (!success) this.setState({ importing: false })
        // If success is true, the user will be automatically redirected and the dialog will close
      })
    })
  }
}
