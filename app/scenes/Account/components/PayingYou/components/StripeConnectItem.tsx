import React from 'react'
import { ExternalLink } from 'components'
import PaymentMethodItem from 'components/PaymentMethodSetup/components/PaymentMethodItem'
import { graphql } from 'react-relay'
import { useRouter } from 'next/router'
import { extractQueryParams } from 'services/router'
import { useSnackbar, useQuickCommit } from 'hooks'
import { StripeConnectItem_Mutation } from '__generated__/StripeConnectItem_Mutation.graphql'

const LOGO_URL = 'https://upload.wikimedia.org/wikipedia/en/e/eb/Stripe_logo,_revised_2016.png'

export interface IStripeConnectItemProps {
  redirectUrl?: string
  available: boolean
  completed: boolean
}

function StripeConnectItem(props: IStripeConnectItemProps) {
  const { available = true, completed = false } = props

  const { execute: commit, loading: isInFlight } = useQuickCommit<StripeConnectItem_Mutation>(graphql`
    mutation StripeConnectItem_Mutation($input: SetupStripeConnectedAccountInput!) {
      setupStripeConnectedAccount(input: $input) {
        payoutMethod {
          status
          setupUrl
        }
      }
    }
  `)

  const showSnackbarMessage = useSnackbar()

  const startOnboarding = React.useCallback(async () => {
    if (isInFlight) return

    const result = await commit({
      input: {},
    })

    if (result) {
      const payoutMethod = result?.setupStripeConnectedAccount?.payoutMethod
      if (payoutMethod?.status === 'pending' && payoutMethod?.setupUrl) {
        window.location.href = payoutMethod.setupUrl
      }
    }
  }, [commit, isInFlight])

  const refresh = React.useCallback(async () => {
    const result = await commit({
      input: {},
    })

    if (result) {
      const payoutMethod = result?.setupStripeConnectedAccount?.payoutMethod
      if (payoutMethod?.status === 'active') {
        showSnackbarMessage('Setup completed!')
      }
    }
  }, [commit])

  const router = useRouter()

  React.useEffect(() => {
    const query = extractQueryParams(router?.asPath)
    if (query.stripe_connect === 'refresh') {
      // This means the link must be refreshed server side
      // and we need to kick off the onboarding again
      startOnboarding()
    }
    if (query.stripe_connect === 'return') {
      // This means the user has completed onboarding
      // However, they might have not have finished it
      // We need to refresh the payment methods list
      if (typeof refresh === 'function') refresh()
    }
  }, [router?.asPath])

  return (
    <PaymentMethodItem
      icon={<img src={LOGO_URL} alt="Stripe Logo" />}
      title="Stripe Connect"
      text={(
        <React.Fragment>
          <ExternalLink href="http://stripe.com" label="Stripe" />
          {' '}
          is a worldwide payments platform. Stripe payments will be in your contract's
          currency.
        </React.Fragment>
      )}
      addText="Continue to Stripe"
      unavailableText={completed ? 'Added' : 'Unavailable'}
      onClick={startOnboarding}
      available={available && !completed}
      data-cy="payout-setup-stripe-connect"
    />
  )
}

export default React.memo(StripeConnectItem)
