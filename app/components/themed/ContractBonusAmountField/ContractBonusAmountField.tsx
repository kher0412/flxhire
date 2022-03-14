import { Fragment, memo, useState, useEffect } from 'react'
import { NumberField } from 'components/themed'
import { FormValueInput, FormValueMeta } from 'types'
import { useDebouncedEffect } from 'hooks'
import { currencyToShortSymbol } from 'services/formatting'
import { useBonusPreview } from 'hooks/useBonusPreview'

export interface IContractBonusAmountFieldCurrency {
  symbol: string
  code: string
}

export interface IContractBonusAmountFieldProps {
  input: FormValueInput<number>
  meta: FormValueMeta

  /** If set, the rendered NumberFields are set as nullable. */
  nullable?: boolean

  /** The contract for which to compute the bonus. */
  contractId: string

  /** Currency object or currency code; defaults to "USD". */
  currency?: IContractBonusAmountFieldCurrency | string

  /** Called when the field value (client bonus amount) is being loaded and is about to change, with true, and then with false once it loaded. */
  onLoadingChange?: (loading: boolean) => void
}

/**
 * Renders 2 directly adjacent NumberFields, where one is for specifying the client bonus, and the other is for specifying the member bonus.
 * The field itself is for the client bonus amount.
 */
const ContractBonusAmountField = (props: IContractBonusAmountFieldProps) => {
  const { input, meta, contractId, currency = 'USD', nullable, onLoadingChange } = props

  const [hideFormFieldErrors, setHideFormFieldErrors] = useState(false)

  const { clientBonus, memberBonus, setClientBonus, setMemberBonus, memberBonusLoading, clientBonusLoading } = useBonusPreview({
    contractId: contractId,
    defaultClientBonus: input?.value,
    currencyCode: typeof currency === 'string' ? currency : currency?.code,
  })

  // sync all clientBonus changes to redux field (either manual change, or preview)
  // note: this doesn't have to be debounced, but if we are doing a useEffect anyways, then we might as well just debounce for performance
  useDebouncedEffect(() => {
    if (input?.value !== clientBonus) {
      input?.onChange(clientBonus)

      // show errors on the UI again
      setHideFormFieldErrors(false)

      if (onLoadingChange) {
        onLoadingChange(false)
      }
    }
  }, 100, [clientBonus])

  // when the client bonus is starting to load to be computed from the member bonus amount, clear its form value
  // this is to block submit in case the user entered a member bonus, the client bonus is still loading, but they still expect everything to work
  // during this brief period, form field errors are not shown on the UI, as they would be misleading
  useEffect(() => {
    if (clientBonusLoading) {
      if (input?.value !== 0) {
        input?.onChange(0)
      }

      setHideFormFieldErrors(true)

      if (onLoadingChange) {
        onLoadingChange(true)
      }
    }
  }, [clientBonusLoading, onLoadingChange])

  return (
    <Fragment>
      <NumberField
        input={{
          ...input,
          value: clientBonus,
          onChange: setClientBonus,
        }}
        meta={{
          ...meta,
          error: hideFormFieldErrors ? undefined : meta.error,
        }}
        nullable={nullable}
        disabled={clientBonusLoading || !contractId}
        label="Bonus (you pay)"
        startAdornment={currencyToShortSymbol(currency)}
      />

      <NumberField
        name="member_rate"
        value={memberBonus}
        nullable={nullable}
        disabled={memberBonusLoading || !contractId}
        onChange={setMemberBonus}
        label="Bonus (they get)"
        startAdornment={currencyToShortSymbol(currency)}
      />
    </Fragment>
  )
}

export default memo(ContractBonusAmountField)
