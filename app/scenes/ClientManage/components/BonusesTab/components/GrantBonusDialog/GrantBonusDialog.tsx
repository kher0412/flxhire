import React from 'react'
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import GrantBonusForm, { IGrantBonusFormPayload } from './components/GrantBonusForm'

export interface IGrantBonusDialogProps {
  open: boolean
  onClose: () => void
  onGrant: (data: IGrantBonusFormPayload, currencyCode: string) => void
}

function GrantBonusDialog(props: IGrantBonusDialogProps) {
  const { open, onClose, onGrant } = props

  const createBonus = (data: IGrantBonusFormPayload, currencyCode: string) => {
    onClose()
    onGrant(data, currencyCode)
  }

  return (
    <ResponsiveDialog open={open} onClose={onClose}>
      <DialogTitle>
        Grant a one-time bonus
      </DialogTitle>

      <GrantBonusForm
        onCancel={onClose}
        submitForm={createBonus}
      />
    </ResponsiveDialog>
  )
}

export default React.memo(GrantBonusDialog)
