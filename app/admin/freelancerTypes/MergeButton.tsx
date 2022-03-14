import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  Select,
  MenuItem,
} from '@material-ui/core'
import Icon from '@material-ui/icons/MergeType'
import { httpClient, getBaseURL } from 'admin/api'
import { showNotification as showNotificationAction } from 'react-admin'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { IFreelancerType } from 'types'

interface IMergeButtonProps extends ContainerProps {
  record: any
}

interface IMergeButtonState {
  open: boolean
  loading: boolean
  freelancerTypes: IFreelancerType[]
  targetContainerId: number
}

class MergeButton extends React.Component<IMergeButtonProps, IMergeButtonState> {
  state = {
    open: false,
    loading: false,
    freelancerTypes: [],
    targetContainerId: null,
  }

  refresh = async () => {
    if (this.props.record.id) {
      try {
        this.setState({ loading: true })
        const freelancerTypes = await getAPIClient().getFreelancerTypes()
        this.setState({
          freelancerTypes: freelancerTypes.filter(t => t.id !== this.props.record.id),
          loading: false,
        })
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
    const { targetContainerId } = this.state
    this.setState({ loading: true })
    try {
      await httpClient(`${getBaseURL()}/freelancer_types/${record.id}/merge_into`, {
        method: 'POST',
        body: JSON.stringify({
          id: record.id,
          container_id: targetContainerId,
        }),
      })
      this.setState({ loading: false, open: false })
      showNotification('Freelancer types merged')
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
      freelancerTypes,
      targetContainerId,
    } = this.state
    return (
      <Dialog
        onClose={this.onClose}
        open={open}
      >
        <DialogTitle>
          Merge Freelancer Type
          {' '}
          {record && record.name ? record.name : null}
        </DialogTitle>
        <DialogContent>
          {loading && (
            <DialogContentText>
              <b>Loading...</b>
            </DialogContentText>
          )}
          {freelancerTypes.length > 0 && (
            <Select value={targetContainerId} onChange={e => this.setState({ targetContainerId: e.target.value as number })}>
              {freelancerTypes.map(ft => <MenuItem value={ft.id}>{ft.name}</MenuItem>)}
            </Select>
          )}
          <DialogContentText>
            All data related to {record?.name || 'this freelancer type'} will be associated to the selected freelancer type
            and {record?.name || 'this freelancer type'} will be destroyed!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={this.send}
            disabled={loading || !targetContainerId}
          >
            Confirm
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
          <Icon style={{ marginRight: '10px' }} />
          Merge
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

export default connector(MergeButton)
