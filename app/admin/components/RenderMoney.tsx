import { get } from 'lodash'
import { formatAsCurrency } from 'services/formatting'

const RenderMoney = (record, source) => {
  const value = get(record, source)
  if (!value) return null
  const currency = get(record, 'currency', 'USD')
  return formatAsCurrency(value, { currency })
}

export default RenderMoney
