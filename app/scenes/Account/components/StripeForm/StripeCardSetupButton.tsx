import { Button } from 'components/themed'
import { useSnackbar } from 'hooks'
import { ComponentProps, useCallback } from 'react'
import { trackError } from 'services/analytics'
import { getLocationPathname } from 'services/router'
import { setupCreditCard } from 'services/stripe'

type IStripeCardSetupButtonProps = Omit<ComponentProps<typeof Button>, 'onClick'> & { redirectUrl?: string }

const StripeCardSetupButton = (props: IStripeCardSetupButtonProps) => {
  const showSnackbarMessage = useSnackbar()

  const onClick = useCallback(() => {
    setupCreditCard(props.redirectUrl || getLocationPathname()).catch((error) => {
      trackError(error)
      showSnackbarMessage(error.response || error.message)
    })
  }, [])

  return (
    <Button color="primary" onClick={onClick} {...props}>Add credit card</Button>
  )
}

export default StripeCardSetupButton
