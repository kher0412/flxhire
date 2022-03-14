import { useFragment, graphql } from 'react-relay'
import { Tags, Tag } from 'components'
import { formatAsCurrency } from 'services/formatting'
import { Currency } from 'types'
import { PaymentMethodSubheader_PaymentMethod$key } from '__generated__/PaymentMethodSubheader_PaymentMethod.graphql'

function PaymentMethodSubheader({ paymentMethod: paymentMethodProp }: { paymentMethod: PaymentMethodSubheader_PaymentMethod$key }) {
  const paymentMethod = useFragment(graphql`
    fragment PaymentMethodSubheader_PaymentMethod on PaymentMethod {
      paymentMethodType
      expMonth
      expYear
      cardholderName
      institutionName
      currency{
        code
      }
      amountAvailable {
        currency {
          code
        }
        value
      }
    }
  `, paymentMethodProp)
  switch (paymentMethod.paymentMethodType) {
    case 'card':
      return (
        <Tags>
          <Tag>
            Credit Card
          </Tag>

          {(paymentMethod.expMonth && paymentMethod.expYear) && (
            <Tag>
              {paymentMethod.expMonth}/{paymentMethod.expYear}
            </Tag>
          )}

          {(paymentMethod.cardholderName) && (
            <Tag>
              {paymentMethod.cardholderName}
            </Tag>
          )}
        </Tags>
      )

    case 'plaid_link':
    case 'sepa_debit':
      return (
        <Tags>
          {paymentMethod.institutionName && (
            <Tag>
              {paymentMethod.institutionName}
            </Tag>
          )}

          <Tag>
            Direct Debit
          </Tag>
        </Tags>
      )

    case 'ach_credit_transfer':
      return (
        <Tags>
          <Tag>
            Wire Transfer
          </Tag>

          <Tag>
            Available funds: {formatAsCurrency(paymentMethod.amountAvailable.value, { currency: paymentMethod.currency as Currency })}
          </Tag>
        </Tags>
      )
  }

  return null
}

export default PaymentMethodSubheader
