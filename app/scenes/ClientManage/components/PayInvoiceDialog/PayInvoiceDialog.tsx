import React from 'react'
import Link from 'components/Link'
import {
  ListItemIcon,
  ListItemText,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  Collapse,
  Divider,
  Grid,
} from '@material-ui/core'
import { ResponsiveDialog, LoadingIcon, CurrencyIcon } from 'components'
import { Button, InfoMessage } from 'components/themed'
import { formatAsCurrency } from 'services/formatting'
import { paymentFeeText } from 'services/invoice'
import { doesCurrencyForPaymentMethodHaveConversionFees, hasInsufficientFunds, isCurrencyCompatible, overSepaLimit, completePayment, redirectToCheckout } from 'services/stripe'
import { IClientInvoice } from 'types'
import { CheckCircle, Report } from '@material-ui/icons'
import { useCurrentUser, useDispatchAction } from 'hooks'
import { getAPIClient } from 'api'
import { PaymentIntent } from '@stripe/stripe-js'

import { submitInvoicePayment as submitInvoicePaymentAction } from 'scenes/ClientManage/ManageDucks'
import PaymentText from './components/PaymentText'
import PaymentSourceListItems from './components/PaymentSourceListItems'

export interface IPayInvoiceDialog {
  invoice: IClientInvoice
  isOpen: boolean
  onDialogClose: () => void
}

type CheckoutResultType = {
  client_secret?: string
  payment_method_type?: string
  session_id?: string
  charge_status?: string
}

const PayInvoiceDialog = (props: IPayInvoiceDialog) => {
  const { invoice, isOpen, onDialogClose } = props

  if (invoice == null) return null

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false)
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [user] = useCurrentUser()

  const onClose = () => {
    setErrorMessage('')
    setIsSubmitting(false)
    setIsSuccess(false)
    onDialogClose()
  }

  const onSubmit = () => {
    setIsSubmitting(true)
    setIsSuccess(false)
    setErrorMessage('')
  }

  const onPaid = () => {
    setIsSubmitting(false)
    setIsSuccess(true)
    setErrorMessage('')
  }

  const onError = (em: string) => {
    setIsSubmitting(false)
    setIsSuccess(false)
    setErrorMessage(em)
  }

  const submitInvoicePayment = useDispatchAction((i: IClientInvoice) => submitInvoicePaymentAction({ invoice: i }), [])

  const onSubmitPayment = async (pendingInvoice: IClientInvoice) => {
    onSubmit()
    try {
      const result: CheckoutResultType = await getAPIClient().invoiceCheckout(pendingInvoice.id)
      if (result.client_secret) {
        const paymentIntent: PaymentIntent = await completePayment(result.client_secret, result.payment_method_type)
        const paidInvoice: IClientInvoice = await getAPIClient().refreshPaymentStatus(paymentIntent.id)
        if (paidInvoice['client_paid?'] || paidInvoice.status === 'payment_processing') {
          submitInvoicePayment(paidInvoice)
          onPaid()
        } else {
          throw new Error('Payment could not be completed at this time. Contact us at info@flexhire.com')
        }
      } else if (result.session_id) {
        redirectToCheckout(result.session_id)
      } else if (result.charge_status) {
        const paidInvoice: IClientInvoice = await getAPIClient().getClientInvoice(invoice.id)
        if (paidInvoice['client_paid?'] || paidInvoice.status === 'payment_processing') {
          submitInvoicePayment(paidInvoice)
          onPaid()
        } else {
          throw new Error('Payment could not be completed at this time. Contact us at info@flexhire.com')
        }
      } else {
        throw new Error('Checkout error')
      }
    } catch (err) {
      const em = `Payment Failed: ${err.response || err.message || 'Unknown Error'}`
      onError(em)
    }
  }

  const paymentMethod = user.firm?.payment_method
  const feesText = paymentFeeText(user?.configuration, paymentMethod, invoice)
  const feesInvoiceItem = invoice?.invoice_items?.filter(x => x.item_type === 'payment_processing_fee')?.[0]
  const feesIncluded = Boolean(feesInvoiceItem || invoice?.payment_processing_fee_included)
  const currencyIncompatible = isCurrencyCompatible(paymentMethod, invoice) === false
  const conversionFeesPercentage = user.configuration?.currency_conversion_percentage_fee || 0
  const hasConversionFees = currencyIncompatible && doesCurrencyForPaymentMethodHaveConversionFees(user.firm?.payment_method, user.configuration)
  const insufficientFunds = hasInsufficientFunds(paymentMethod, invoice)
  const disabled = !paymentMethod || isSubmitting || insufficientFunds || overSepaLimit(paymentMethod, invoice, user.configuration)

  return (
    <ResponsiveDialog open={isOpen} onClose={onClose} data-cy="pay-dialog">
      <div style={{ width: 9999 }} />

      <DialogTitle>
        Pay invoice{invoice && ` #${invoice.invoice_num}`}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PaymentText invoice={invoice} />
          </Grid>

          {user.firm?.payment_method && (
          <React.Fragment>
            <Grid item xs={12}>
              <Collapse in={!isSubmitting && !isSuccess}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CurrencyIcon currency={invoice.currency} />
                    </ListItemIcon>

                    <ListItemText
                      primary={formatAsCurrency(invoice.total_to_pay_client, { removeEmptyCents: false, currency: invoice.currency })}
                      secondary={feesText && !feesIncluded ? 'Payment Amount (Before fees)' : 'Payment amount'}
                    />
                  </ListItem>

                  {feesText && (
                  <ListItem>
                    <ListItemIcon />
                    <ListItemText
                      primary={feesText}
                      secondary={feesIncluded ? 'Payment Processing Fee (Included in total)' : 'Payment Processing Fee'}
                    />
                  </ListItem>
                  )}

                  <PaymentSourceListItems invoice={invoice} />
                </List>
              </Collapse>

              <Collapse in={currencyIncompatible && !isSubmitting && !isSuccess}>
                <InfoMessage>
                  <strong>Currency Conversion Needed</strong><br />
                  {[
                    'Your default payment method is not compatible with the currency of this invoice.',
                    'We will charge you in the appropriate currency for your payment method using current exchange rates from the EU Central Bank.',
                    hasConversionFees && conversionFeesPercentage > 0 ? (
                      `Due to your payment method's currency, an extra ${conversionFeesPercentage}% conversion fee will be applied.`
                    ) : null,
                  ].filter(x => Boolean(x)).join(' ')}
                </InfoMessage>
              </Collapse>

              <Collapse in={isSubmitting}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LoadingIcon />
                    </ListItemIcon>

                    <ListItemText
                      secondary="Paying invoice..."
                    />
                  </ListItem>
                </List>
              </Collapse>

              <Collapse in={isSuccess}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle style={{ color: 'green' }} />
                    </ListItemIcon>

                    <ListItemText
                      data-cy={isSuccess && 'success-message'}
                      style={{ color: 'green' }}
                      primary="Payment submitted successfully"
                    />
                  </ListItem>
                </List>
              </Collapse>

              <Collapse in={errorMessage?.length > 0}>
                <Divider />

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Report style={{ color: 'red' }} />
                    </ListItemIcon>

                    <ListItemText
                      data-cy={errorMessage?.length > 0 && 'error-message'}
                      style={{ color: 'red' }}
                      primary={errorMessage}
                    />
                  </ListItem>
                </List>
              </Collapse>
            </Grid>

            <Grid item xs={12}>
              <Link to="/account/paying_us" style={{ color: '#2ECB80' }}>
                Manage payment methods
              </Link>
            </Grid>
          </React.Fragment>
          )}
        </Grid>
      </DialogContent>

      <DialogActions>
        {isSuccess && (
        <Button onClick={onClose} data-cy="cancel">
          Close
        </Button>
        )}

        {!isSuccess && (
        <React.Fragment>
          <Button onClick={onClose} disabled={isSubmitting} data-cy="cancel">
            Cancel
          </Button>

          {!insufficientFunds && (
          <Button
            color="secondary"
            onClick={() => onSubmitPayment(invoice)}
            disabled={disabled}
            data-cy="pay"
          >
            Confirm & Pay
          </Button>
          )}

          {insufficientFunds && (
          <Button
            color="secondary"
            data-cy="review-payment_methods"
            muiComponent={Link}
            href="/account/paying_us"
          >
            Review Payment Methods
          </Button>
          )}
        </React.Fragment>
        )}
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default PayInvoiceDialog
