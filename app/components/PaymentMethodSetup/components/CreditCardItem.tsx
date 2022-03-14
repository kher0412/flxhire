import React from 'react'
import { useAPIRead, useOnMount, useSnackbar } from 'hooks'
import { trackError } from 'services/analytics'
import { getLocationPathname } from 'services/router'
import { setupCreditCard } from 'services/stripe'
import { getAPIClient } from 'api'
import { useRouter } from 'next/router'
import { CreditCard } from '@material-ui/icons'
import PaymentMethodItem from './PaymentMethodItem'

export interface ICreditCardItemProps {
  redirectUrl?: string
  onAdded?: () => void
  available: boolean
}

function CreditCardItem(props: ICreditCardItemProps) {
  const { onAdded, redirectUrl, available = true } = props

  const router = useRouter()
  const showSnackbarMessage = useSnackbar()
  const creditCards = useAPIRead(() => getAPIClient().getPaymentMethods({ cards_only: true }), { defaultValue: [] })

  const onClick = React.useCallback(() => {
    setupCreditCard(redirectUrl || getLocationPathname()).catch((error) => {
      trackError(error)
      showSnackbarMessage(error.response || error.message)
    })
  }, [])

  useOnMount(async () => {
    const stripeSessionId = router?.query?.stripe_session_id
    const stripeSessionType = router?.query?.stripe_session_type

    if (stripeSessionId && stripeSessionType === 'card') {
      try {
        await getAPIClient().createPaymentMethod({ payment_method_type: 'card', session_id: stripeSessionId })

        creditCards.refresh()
        showSnackbarMessage('Credit card connected successfully')

        if (onAdded) onAdded()
      } catch (err) {
        trackError(err)
        showSnackbarMessage('Could not add card')
      }
    } else {
      creditCards.refresh()
    }
  })

  if (!available) return null

  return (
    <PaymentMethodItem
      icon={<CreditCard />}
      title="Credit Card"
      text="Pay by credit card. All major cards accepted. We charge an additional 3% if you pay this way due to processing fees."
      onClick={onClick}
      available={available}
      data-cy="payment-setup-credit-card"
    />
  )
}

export default React.memo(CreditCardItem)
