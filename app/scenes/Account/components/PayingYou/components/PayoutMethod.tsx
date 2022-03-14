import React from 'react'
import { Avatar, Card, CardHeader, Checkbox, IconButton } from '@material-ui/core'
import styles from 'components/PaymentMethod/PaymentMethod.module.css'
import { startCase } from 'lodash'
import { graphql, useFragment } from 'react-relay'
import { PayoutMethod_PayoutMethod$key } from '__generated__/PayoutMethod_PayoutMethod.graphql'
import { PayoutMethod_SetDefaultMutation } from '__generated__/PayoutMethod_SetDefaultMutation.graphql'
import { AccountBalance, OpenInNew } from '@material-ui/icons'
import { useQuickCommit } from 'hooks'

export interface IPayoutMethodProps {
  payoutMethod: PayoutMethod_PayoutMethod$key
}

function PayoutMethod(props: IPayoutMethodProps) {
  const { payoutMethod: payoutMethodProp } = props
  const payoutMethod = useFragment(graphql`
    fragment PayoutMethod_PayoutMethod on PayoutMethod {
      id
      status
      payoutMethodType
      isDefault
      setupUrl
    }
  `, payoutMethodProp)
  const { execute: commit } = useQuickCommit<PayoutMethod_SetDefaultMutation>(
    graphql`
      mutation PayoutMethod_SetDefaultMutation($input: UpdateUserInput!) {
        updateUser(input: $input) {
          user {
            payoutMethods {
              setupUrl
              isDefault
            }
          }
        }
      }
    `,
  )
  const setDefault = React.useCallback(async () => {
    await commit({
      input: {
        defaultPayoutMethodId: payoutMethod.id,
      },
    })
  }, [payoutMethod?.id])

  const continueSetup = React.useCallback(() => {
    if (payoutMethod?.setupUrl) window.location.href = payoutMethod?.setupUrl
  }, [payoutMethod?.setupUrl])

  if (!payoutMethod) return null

  const title = startCase(payoutMethod?.payoutMethodType)
  const active = payoutMethod?.status === 'active'

  let action = null
  if (active) {
    action = (
      <Checkbox
        checked={payoutMethod?.isDefault}
        onClick={setDefault}
        disabled={payoutMethod?.isDefault}
      />
    )
  } else if (payoutMethod?.setupUrl) {
    action = (
      <IconButton onClick={continueSetup}>
        <OpenInNew />
      </IconButton>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.highlight} style={{ height: payoutMethod?.isDefault ? 24 : 0 }}>
        <div className={styles.highlightLabel} style={{ color: payoutMethod?.isDefault ? '#fff' : 'transparent' }}>
          Default
        </div>
      </div>

      <Card raised data-cy="payment-method-card">
        <CardHeader
          avatar={(
            <Avatar>
              <AccountBalance />
            </Avatar>
          )}
          title={title}
          subheader={startCase(payoutMethod?.status)}
          action={action}
        />
      </Card>
    </div>
  )
}

export default React.memo(PayoutMethod)
