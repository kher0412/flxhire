import { InfoMessage } from 'components/themed'
import { useCurrentUser } from 'hooks'
import { formatAsCurrency } from 'services/formatting'
import { IPaymentMethod } from 'types'

const FundsAvailableMessage = () => {
  const [user] = useCurrentUser()

  if (!user?.firm?.payment_method) return null

  const bank = user.firm.payment_method as IPaymentMethod

  if (!bank.amount_available) return null

  return (
    <InfoMessage>
      You have a total credit of {formatAsCurrency(bank.amount_available, { currency: bank.currency })}
      {' '}
      available to spend from bank transfers we received from you
    </InfoMessage>
  )
}

export default FundsAvailableMessage
