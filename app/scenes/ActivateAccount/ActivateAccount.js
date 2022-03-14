import React from 'react'
import { ChangePassword } from 'components/ChangePassword'

export default function ActivateAccount(props) {
  return (
    <ChangePassword
      title="Activate your Flexhire Account"
      saveButtonText="Activate"
      extraFormData={{ hand_off: true }}
      {...props}
    />
  )
}
