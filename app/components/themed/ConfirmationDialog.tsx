import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import Button from './Button'

interface IConfirmationDialogProps {
  confirming: boolean
  cancel: () => void
  perform: () => void
  title?: string
  text?: string
  confirmLabel?: string
  cancelLabel?: string
}

const ConfirmationDialog = ({ confirming, cancel, perform, title, text, confirmLabel, cancelLabel }: IConfirmationDialogProps) => {
  return (
    <ResponsiveDialog open={confirming} onClose={cancel}>
      <DialogTitle>{title || 'Are you sure?'}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text || 'Are you sure?'}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} data-cy="cancel">{cancelLabel || 'Cancel'}</Button>
        <Button onClick={perform} color="primary" data-cy="confirm">{confirmLabel || 'Continue'}</Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default ConfirmationDialog
