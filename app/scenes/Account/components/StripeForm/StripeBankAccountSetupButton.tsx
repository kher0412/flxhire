import { Button } from 'components/themed'
import { useSnackbar } from 'hooks'
import { ComponentProps, useCallback } from 'react'
import { trackError } from 'services/analytics'
import { getLocationPathname } from 'services/router'
import { setupSepaDebitBankAccount } from 'services/stripe'

type IStripeBankAccountSetupButtonProps = Omit<ComponentProps<typeof Button>, 'onClick'> & { redirectUrl?: string }

const StripeBankAccountSetupButton = (props: IStripeBankAccountSetupButtonProps) => {
  const showSnackbarMessage = useSnackbar()
  const onClick = useCallback(() => {
    setupSepaDebitBankAccount(props.redirectUrl || getLocationPathname()).catch((error) => {
      trackError(error)
      showSnackbarMessage(error.response || error.message)
    })
  }, [])
  return (
    <Button color="primary" onClick={onClick} {...props}>Add EU Bank Account</Button>
  )
}

export default StripeBankAccountSetupButton
