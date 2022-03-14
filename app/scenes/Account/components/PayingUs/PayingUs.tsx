import { useCallback, useState } from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import { GridExpandable, PaymentMethodSetup } from 'components'
import { Button, InfoMessage, Box } from 'components/themed'
import { useAvoidBillingSetupDialog, useSnackbar, useQuickCommit } from 'hooks'
import PaymentMethod from 'components/PaymentMethod'
import { PayingUs_DeletePaymentMethodMutation } from '__generated__/PayingUs_DeletePaymentMethodMutation.graphql'
import { PayingUs_UpdateFirmMutation } from '__generated__/PayingUs_UpdateFirmMutation.graphql'
import { PayingUs_Firm$key } from '__generated__/PayingUs_Firm.graphql'
import { useFragment, graphql } from 'react-relay'
import { Save } from '@material-ui/icons'
import SetCompanyDefaultDialog from './components/SetCompanyDefaultDialog'
import styles from './PayingUs.module.css'

export interface IPayingUsProps {
  firm: PayingUs_Firm$key
  reload?: () => void
}

function PayingUs({ firm: firmProp, reload }: IPayingUsProps) {
  const firm = useFragment(graphql`
    fragment PayingUs_Firm on Firm {
      id
      paymentMethods {
        id
        ...PaymentMethod_PaymentMethod
      }
    }
  `, firmProp)
  const paymentMethods = firm?.paymentMethods || []
  const showSnackbarMessage = useSnackbar()

  const { execute: updateFirm } = useQuickCommit<PayingUs_UpdateFirmMutation>(
    graphql`
      mutation PayingUs_UpdateFirmMutation($input: UpdateFirmInput!) {
        updateFirm(input: $input) {
          firm {
            ...PayingUs_Firm
          }
        }
      }
    `,
  )

  const { execute: commitRemovePaymentMethod } = useQuickCommit<PayingUs_DeletePaymentMethodMutation>(
    graphql`
      mutation PayingUs_DeletePaymentMethodMutation($input: DeletePaymentMethodInput!) {
        deletePaymentMethod(input: $input) {
          paymentMethod {
            ...PaymentMethod_PaymentMethod
            user {
              firm {
                ...PayingUs_Firm
              }
            }
          }
        }
      }
    `,
  )
  const removePaymentMethod = useCallback(async (paymentMethodId: string) => {
    const result = await commitRemovePaymentMethod({
      input: {
        id: paymentMethodId,
      },
    })

    if (result) showSnackbarMessage('Payment method removed')
  }, [])
  const setDefaultPaymentMethod = useCallback(async (paymentMethodId: string) => {
    const result = await updateFirm({
      input: {
        firmId: firm.id,
        defaultPaymentMethodId: paymentMethodId,
      },
    })

    if (result) showSnackbarMessage('Default payment method updated')
  }, [])
  const [defaultDialogOpenFor, setDefaultDialogOpenStateFor] = useState<string>(null)

  useAvoidBillingSetupDialog()

  return (
    <div>
      <SetCompanyDefaultDialog
        open={defaultDialogOpenFor !== null}
        onConfirm={() => setDefaultPaymentMethod(defaultDialogOpenFor)}
        onClose={() => setDefaultDialogOpenStateFor(null)}
      />

      <Box>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h4">
              Payments
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="body1">
              Set up a new payment method for your account.
            </Typography>
          </Grid>

          <Grid item md={12} />

          <Grid item md={12}>
            <PaymentMethodSetup onAdded={reload} />
          </Grid>

          <Grid item md={12} />
        </Grid>
      </Box>

      <Divider />

      <Box>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h5">
              Existing Payment Methods
            </Typography>
          </Grid>

          <Grid item md={12} />

          <GridExpandable item sm={12} md={12} expand={paymentMethods.length === 0}>
            <InfoMessage>
              No payment methods added yet.
              Choose a new payment method to add from above.
            </InfoMessage>
          </GridExpandable>

          {paymentMethods.map(p => (
            <Grid item sm={12} md={6}>
              <div className={styles.paymentMethod}>
                <PaymentMethod
                  paymentMethod={p}
                  onSetCompanyDefault={() => setDefaultDialogOpenStateFor(p.id)}
                  onRemove={() => removePaymentMethod(p.id)}
                />
              </div>
            </Grid>
          ))}

          <Grid item md={12} />
        </Grid>
      </Box>

      <Divider />

      <Box style={{ textAlign: 'right' }}>
        <Button disabled>
          <Save /> Autosaved
        </Button>
      </Box>
    </div>
  )
}

export default PayingUs
