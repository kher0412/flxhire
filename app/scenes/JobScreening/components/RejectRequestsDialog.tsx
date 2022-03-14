import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { getAPIClient } from 'api'
import { FormErrorSummary, ResponsiveDialog } from 'components'
import { Button, TextArea } from 'components/themed'
import { useAPIWrite, useSnackbar } from 'hooks'
import { useCallback, useState } from 'react'
import { isMobile } from 'services/browserAgent'
import { browserHistory } from 'services/router'
import { IContractForFreelancer } from 'types'

interface IRejectRequestsDialogProps {
  open: boolean
  contract: IContractForFreelancer
  rejected: boolean
  onClose: () => void
  refresh: () => void
}

const RejectRequestsDialog = ({ open, contract, onClose, rejected, refresh }: IRejectRequestsDialogProps) => {
  const showSnackbarMessage = useSnackbar()
  const [message, setMessage] = useState('')
  const apiCall = useCallback(() => getAPIClient().rejectContractRequests(contract.id, message), [contract.id, message])
  const { submit, error, submitting } = useAPIWrite(apiCall)
  const clientName = contract.client.first_name
  const jobTitle = contract.job_title
  const handleSubmit = useCallback(() => {
    submit().then(() => {
      onClose()
      refresh()
      showSnackbarMessage(`Your feedback has been sent to ${clientName}`)
      browserHistory.push('/member/dashboard')
    })
  }, [onClose, contract.client.name, submit])
  return (
    <ResponsiveDialog open={open} onClose={onClose}>
      <DialogTitle>Your Application to {jobTitle}</DialogTitle>
      {!rejected && (
        <DialogContent>
          <DialogContentText>
            Let {clientName} know why you prefer not to continue with Pre-Interview Requests.
            {' '}{clientName} might still want to schedule an interview.
          </DialogContentText>
          <TextArea
            label={`Your message to ${clientName}`}
            name="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            autoFocus={!isMobile()}
          />
          <FormErrorSummary show={Boolean(error)} message={error} />
        </DialogContent>
      )}
      {rejected && (
        <DialogContent>
          <DialogContentText>
            You already declined {clientName}'s requests.
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        {!rejected && (
          <Button color="primary" onClick={handleSubmit} disabled={submitting} data-cy="submit">
            Submit
          </Button>
        )}
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default RejectRequestsDialog
