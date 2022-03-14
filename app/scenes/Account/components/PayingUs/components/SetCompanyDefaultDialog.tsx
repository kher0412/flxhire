import { useCallback, memo } from 'react'
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button, InfoMessage } from 'components/themed'

export interface ISetCompanyDefaultDialogProps {
  open: boolean
  onConfirm: () => void
  onClose: () => void
}

function SetCompanyDefaultDialog(props: ISetCompanyDefaultDialogProps) {
  const { open, onClose, onConfirm } = props

  const handleConfirm = useCallback(() => {
    // order is important here, otherwise the payment method being set is cleared before the change is performed
    onConfirm()
    onClose()
  }, [onConfirm, onClose])

  return (
    <ResponsiveDialog open={open} onClose={onClose}>
      <DialogTitle>
        Set as company default
      </DialogTitle>

      <DialogContent>
        <div style={{ paddingBottom: 24 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DialogContentText>
                This payment method will be used when paying invoices.
                This setting can be changed any time.
              </DialogContentText>
            </Grid>

            <Grid item xs={12}>
              <InfoMessage>
                This payment method will be used when the "auto-pay invoices" option is enabled as well.
              </InfoMessage>
            </Grid>
          </Grid>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button onClick={handleConfirm} color="primary">
          Set as default
        </Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default memo(SetCompanyDefaultDialog)
