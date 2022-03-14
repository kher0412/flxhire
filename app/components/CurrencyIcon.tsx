import { EuroSymbol, AttachMoney } from '@material-ui/icons'
import { CurrencyInput, normalizeCurrency } from 'services/formatting'

// TODO: add support for currency.icon_url
const CurrencyIcon = ({ currency }: { currency: CurrencyInput }) => normalizeCurrency(currency)?.code?.toLowerCase() === 'eur' ? <EuroSymbol /> : <AttachMoney />

export default CurrencyIcon
