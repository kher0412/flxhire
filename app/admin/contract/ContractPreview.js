import React from 'react'
import { TextField } from '@material-ui/core'
import { getAPIClient } from 'api'
import { debounce } from 'lodash'

export default class ContractPreview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      freelancer_rate: props.data.freelancer_rate,
      loading: false,
      error: null,
    }
  }

  componentDidMount() {
    this.refresh()
  }

  componentDidUpdate(oldProps) {
    const deepEqual = JSON.stringify(oldProps.data) === JSON.stringify(this.props.data)
    if (!deepEqual) {
      this.refresh()
    }
  }

  refresh = debounce(async () => {
    const { data } = this.props
    try {
      this.setState({ loading: true })
      const response = await getAPIClient().post(`/admin/contracts/${data.id}/preview_update`, data)
      this.setState({ loading: false, freelancer_rate: response.freelancer_rate })
    } catch (error) {
      this.setState({ loading: false, error: 'Failed to Preview changes' })
    }
  }, 200)

  render() {
    const { freelancer_rate, error, loading } = this.state
    return (
      <React.Fragment>
        <TextField label="Member Rate (Preview)" value={loading ? '...' : error || freelancer_rate} disabled />
      </React.Fragment>
    )
  }
}
