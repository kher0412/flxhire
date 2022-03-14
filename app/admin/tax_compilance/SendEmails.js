import React from 'react'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { showNotification } from 'react-admin'
import { httpClient, getBaseURL } from 'admin/api'

function SendEmails({ selectedIds = [], sendEmails }) {
  return (
    <Button onClick={sendEmails}>
    Email {selectedIds.length > 0 ? 'Selected' : 'Filtered'}
    </Button>
  )
}

const mapDispatchToProps = (dispatch, { filters, selectedIds }) => ({
  sendEmails: async () => {
    const params = {
      ids: selectedIds && selectedIds.length > 0 ? selectedIds.join(',') : null,
      ...filters,
    }
    try {
      dispatch(showNotification('Sending, Please Wait'))
      await httpClient(`${getBaseURL()}/tax_compliances/send_emails`, {
        method: 'POST',
        body: JSON.stringify(params),
      })
      dispatch(showNotification('Sent'))
    } catch (error) {
      console.log(error)
      dispatch(showNotification(`Error: ${error.message || error}`))
    }
  },
})

export default connect(null, mapDispatchToProps)(SendEmails)
