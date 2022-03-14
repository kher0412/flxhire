import React from 'react'
import { NumberField } from 'components/themed'
import { Currency, FormValueInput, FormValueMeta } from 'types'
import { currencyToShortSymbol } from 'services/formatting'
import { useDebouncedEffect } from 'hooks'
import { useBonusPreview } from 'hooks/useBonusPreview'

export interface IBonusFieldProps {
  input: FormValueInput<number>
  meta: FormValueMeta
  contractId?: string
  currencyCode?: string
}

function BonusField(props: IBonusFieldProps) {
  const { input, meta, contractId, currencyCode } = props

  const { clientBonus, memberBonus, setClientBonus, setMemberBonus, memberBonusLoading, clientBonusLoading } = useBonusPreview({
    contractId: contractId,
    defaultClientBonus: input?.value,
    currencyCode: currencyCode,
  })

  // sync all clientBonus changes to redux field (either manual change, or preview)
  // note: this doesn't have to be debounced, but if we are doing a useEffect anyways, then we might as well just debounce for performance
  useDebouncedEffect(() => {
    if (input?.value !== clientBonus) {
      input?.onChange(clientBonus)
    }
  }, 100, [clientBonus])

  return (
    <React.Fragment>
      <NumberField
        input={{
          ...input,
          value: clientBonus,
          onChange: setClientBonus,
        }}
        meta={meta}
        disabled={clientBonusLoading}
        label="Bonus (you pay)"
        startAdornment={currencyToShortSymbol({ code: currencyCode } as Currency)}
      />

      <NumberField
        value={memberBonus}
        disabled={memberBonusLoading}
        onChange={setMemberBonus}
        label="Bonus (they get)"
        startAdornment={currencyToShortSymbol({ code: currencyCode } as Currency)}
      />
    </React.Fragment>
  )
}

export default React.memo(BonusField)
