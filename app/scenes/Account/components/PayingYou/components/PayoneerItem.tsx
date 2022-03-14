import React from 'react'
import { ExternalLink } from 'components'
import PaymentMethodItem from 'components/PaymentMethodSetup/components/PaymentMethodItem'
import { graphql } from 'react-relay'
import { useSnackbar, useQuickCommit } from 'hooks'
import { PayoneerItem_Mutation } from '__generated__/PayoneerItem_Mutation.graphql'

const PAYONEER_LOGO_URL = 'https://clipartart.com/images/payoneer-logo-clipart.png'

export interface IPayoneerItemProps {
  redirectUrl?: string
  onAdded?: () => void
  available: boolean
  completed: boolean
}

function PayoneerItem(props: IPayoneerItemProps) {
  const { onAdded, available = true, completed = false } = props
  const showSnackbarMessage = useSnackbar()

  const { execute: commit } = useQuickCommit<PayoneerItem_Mutation>(
    graphql`
      mutation PayoneerItem_Mutation($input: SetupPayoneerInput!) {
        setupPayoneer(input: $input) {
          message
          payoutMethod {
            status
            setupUrl
          }
        }
      }
    `,
  )

  const onClick = React.useCallback(async () => {
    const result = await commit({
      input: {},
    })

    if (result) {
      if (result?.setupPayoneer?.payoutMethod?.setupUrl && result?.setupPayoneer?.payoutMethod?.status !== 'active') {
        window.location.href = result.setupPayoneer.payoutMethod.setupUrl
      } else if (result?.setupPayoneer?.message) {
        showSnackbarMessage(result.setupPayoneer.message)
      }

      if (typeof onAdded === 'function') onAdded()
    }
  }, [onAdded])

  return (
    <PaymentMethodItem
      icon={<img src={PAYONEER_LOGO_URL} alt="Payoneer Logo" />}
      title="Payoneer"
      text={(
        <React.Fragment>
          <ExternalLink href="http://www.payoneer.com" label="Payoneer" />
          {' '}
          is a leader in global payments. Payoneer payments are limited to the
          USD currency. Approval of your payoneer account can take up to
          {' '}
          <ExternalLink
            href="https://payoneer.custhelp.com/app/answers/detail/a_id/6001/~/why-has-my-account-not-been-approved-yet%3F"
            label="several business days."
          />
        </React.Fragment>
      )}
      addText="Continue to Payoneer"
      unavailableText={completed ? 'Added' : 'Unavailable'}
      onClick={onClick}
      available={available && !completed}
      pending={!completed}
      data-cy="payout-setup-payoneer"
    />
  )
}

export default React.memo(PayoneerItem)
