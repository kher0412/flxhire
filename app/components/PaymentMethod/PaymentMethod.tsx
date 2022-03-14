import React from 'react'
import { Avatar, Card, CardHeader, MenuItem, Divider } from '@material-ui/core'
import { MoreButtonMenu } from 'components'
import { useFragment, graphql } from 'react-relay'
import { PaymentMethod_PaymentMethod$key } from '__generated__/PaymentMethod_PaymentMethod.graphql'
import { ArrowDropDown } from '@material-ui/icons'
import styles from './PaymentMethod.module.css'
import WireTransferDialog from './components/WireTransferDialog'
import PaymentMethodSubheader from './components/PaymentMethodSubheader'
import PaymentMethodTitle from './components/PaymentMethodTitle'
import PaymentMethodIcon from './components/PaymentMethodIcon'

export interface IPaymentMethodProps {
  paymentMethod: PaymentMethod_PaymentMethod$key
  onSetCompanyDefault?: () => void
  onRemove?: () => void
}

function PaymentMethod(props: IPaymentMethodProps) {
  const { paymentMethod: paymentMethodProp, onSetCompanyDefault, onRemove } = props
  const [wireTransferDialogOpen, setWireTransferDialogOpen] = React.useState(false)

  const paymentMethod = useFragment(graphql`
    fragment PaymentMethod_PaymentMethod on PaymentMethod {
      default
      paymentMethodType
      ...PaymentMethodTitle_PaymentMethod
      ...PaymentMethodSubheader_PaymentMethod
      ...PaymentMethodIcon_PaymentMethod
      ...WireTransferDialog_PaymentMethod
    }
  `, paymentMethodProp)

  if (!paymentMethod) return null

  const isDefault = paymentMethod?.default || false
  const isWireTransfer = (paymentMethod.paymentMethodType === 'ach_credit_transfer')

  return (
    <div className={styles.container}>
      {isWireTransfer && (
        <WireTransferDialog
          paymentMethod={paymentMethod}
          open={wireTransferDialogOpen}
          onClose={() => setWireTransferDialogOpen(false)}
        />
      )}

      <div className={styles.highlight} style={{ height: isDefault ? 24 : 0 }}>
        <div className={styles.highlightLabel} style={{ color: isDefault ? '#fff' : 'transparent' }}>
          Default for company
        </div>
      </div>

      <Card raised data-cy="payment-method-card">
        <CardHeader
          avatar={(
            <Avatar>
              <PaymentMethodIcon paymentMethod={paymentMethod} />
            </Avatar>
          )}
          title={<PaymentMethodTitle paymentMethod={paymentMethod} />}
          subheader={<PaymentMethodSubheader paymentMethod={paymentMethod} />}
          action={(
            <MoreButtonMenu icon={<ArrowDropDown />}>
              {isWireTransfer && (
                <MenuItem onClick={() => setWireTransferDialogOpen(true)}>
                  View Details
                </MenuItem>
              )}

              {isWireTransfer && (
                <Divider />
              )}

              <MenuItem disabled={!onSetCompanyDefault || isDefault} onClick={onSetCompanyDefault}>
                Set as default
              </MenuItem>

              <MenuItem disabled={true || !onRemove || isDefault} onClick={onRemove}>
                Remove
              </MenuItem>
            </MoreButtonMenu>
          )}
        />
      </Card>
    </div>
  )
}

export default React.memo(PaymentMethod)
