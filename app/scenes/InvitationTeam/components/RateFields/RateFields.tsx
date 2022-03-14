import React from 'react'
import { MenuItem } from '@material-ui/core'
import { Suspense } from 'components'
import { InputGroup, InputGroupConnector, SelectField, InputGroupHelpButton, InfoMessage, NumberField } from 'components/themed'
import { currencyToShortSymbol } from 'services/formatting'
import { Currency, FormValue } from 'types'
import { useCurrentUser, useDebouncedEffect } from 'hooks'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { useContractPreview } from 'hooks/useContractPreview'
import { MoneyInput } from '__generated__/useContractPreview_ContractPreviewQuery.graphql'
import { RateMode } from '__generated__/InvitationTeamContainer_MakeOfferMutation.graphql'
import RatePreviewText from '../RatePreviewText'

interface IRateFieldsProps {
  client_rate: FormValue<MoneyInput>
  currency: FormValue<string>
  rate_mode: FormValue<string>
  currencies: Currency[]
  freelancerFirstName: string
  freelancerEmail: string
  offerMode: boolean
  firstInvitation: boolean
  freelancerRate?: MoneyInput
  contractId?: string
}

const RateFields = ({ contractId, freelancerRate: defaultFreelancerRate, client_rate, rate_mode, currency, currencies: currenciesProp, freelancerFirstName, freelancerEmail, firstInvitation, offerMode }: IRateFieldsProps) => {
  const [currentUser] = useCurrentUser()
  const currencies = currenciesProp || currentUser?.configuration?.supported_currencies || [{ code: currentUser?.firm?.currency || 'USD' } as Currency]
  const isTinyScreen = useMediaQuery('(max-width:440px)')
  const { clientRate, memberRate, setClientRate, setMemberRate, memberRateLoading, clientRateLoading } = useContractPreview({
    rateMode: rate_mode?.input?.value as RateMode,
    contractId: contractId,
    currencyCode: currency?.input?.value,
    freelancerEmail: freelancerEmail,
    defaultClientRate: client_rate?.input?.value?.value,
    defaultMemberRate: defaultFreelancerRate?.value,
  })

  // sync all clientRate changes to redux field (either manual change, or preview)
  // note: this doesn't have to be debounced, but if we are doing a useEffect anyways, then we might as well just debounce for performance
  useDebouncedEffect(() => {
    if (client_rate?.input?.value?.value !== clientRate) {
      client_rate?.input?.onChange(clientRate)
    }
  }, 100, [clientRate])

  return (
    <InputGroup>
      <SelectField
        label="Cur."
        name="currency"
        input={currency.input}
        meta={currency.meta}
        disabled={currencies.length < 2}
        fullWidth
      >
        {currencies.map(v => (
          <MenuItem
            key={v.code}
            value={v.code}
          >
            {v.code}
          </MenuItem>
        ))}
      </SelectField>

      <NumberField
        name="client_rate"
        label="You Pay"
        input={{
          ...client_rate.input,
          value: clientRate,
          onChange: setClientRate,
        }}
        // disabled={clientRateLoading} // toggling breaks focus
        meta={client_rate.meta}
        fullWidth
        numDecimals={2}
        startAdornment={isTinyScreen ? undefined : currencyToShortSymbol({ code: currency.input.value } as Currency)}
        {...{
          // workaround visuals for 'disabled' not working fully
          style: clientRateLoading ? { opacity: 0.45, pointerEvents: 'none' } : undefined,
        } as any}
      />

      <NumberField
        name="member_rate"
        input={{
          value: memberRate,
          onChange: setMemberRate,
          name: 'member_rate',
        }}
        label="They Get"
        // disabled={memberRateLoading} // toggling breaks focus
        fullWidth
        numDecimals={2}
        startAdornment={isTinyScreen ? undefined : currencyToShortSymbol({ code: currency.input.value } as Currency)}
        data-cy="member_rate"
        {...{
          // workaround visuals for 'disabled' not working fully
          style: memberRateLoading ? { opacity: 0.45, pointerEvents: 'none' } : undefined,
        } as any}
      />

      {!isTinyScreen && (
        <InputGroupConnector>
          /
        </InputGroupConnector>
      )}

      <SelectField
        name="rate_mode"
        input={rate_mode.input}
        meta={rate_mode.meta}
        fullWidth
      >
        <MenuItem value="hour" data-cy="select-rate_mode-hour">
          {isTinyScreen ? 'Hr' : 'Hour'}
        </MenuItem>

        <MenuItem value="month" data-cy="select-rate_mode-month">
          {isTinyScreen ? 'Mth' : 'Month'}
        </MenuItem>
      </SelectField>

      <InputGroupHelpButton title="Compensation">
        <strong>Contract Currency</strong>
        <br />

        The contract currency is the currency you get invoiced in. {freelancerFirstName || 'The recipient'} can choose to get paid in their local currency.
        If that is different from the contract currency, {freelancerFirstName || 'the recipient'} will be paid the equivalent amount in their local currency
        based on the live exchange rate at the time according to our exchange rate policy.

        <br />
        <br />
        <strong>Compensation Period</strong>
        <br />

        Hourly - with an hourly offer you pay the person an hourly rate.
        Those hours are tracked in our work report system. Hourly is the standard for freelance work in the USA.

        {/* <br />
        <br />

        Daily - with a daily offer you pay the person a fixed daily rate for each day worked.
        Those days are tracked in our work report system.
        Daily is the standard for freelance work in Europe. */}

        <br />
        <br />

        Monthly - for permanent offers, some countries standardize to monthly salary offers.
        This is a fixed monthly salary option.
        Fixed monthly salaries are paid irrespective of hours worked.
        You can still enable work reports, but they will get paid a fixed monthly salary.

        {/* <br />
        <br />
        Fixed Annual - for permanent offers, some countries standardize to annual salary offers.
        Fixed annual salaries are paid irrespective of hours worked.
        You can still enable work reports and require them to be approved before the person gets paid, but they will get paid a fixed annual salary. */}

        {(client_rate?.input?.value?.value > 0 && rate_mode?.input?.value) && (
          <React.Fragment>
            <br />
            <br />

            <InfoMessage>
              <Suspense fallback="Loading...">
                <RatePreviewText
                  name={freelancerFirstName || 'the invitee'}
                  freelancerEmail={freelancerEmail}
                  offerMode={offerMode}
                  contractId={contractId}
                  currentValues={{
                    payments_enabled: true,
                    client_rate: clientRate,
                    rate_mode: rate_mode?.input?.value,
                    currency: currency?.input?.value,
                    client_agrees_terms: true,
                    status: 'offer_made',
                    invitation_type: offerMode ? 'hire' : 'invitation',
                  }}
                />
              </Suspense>
            </InfoMessage>
          </React.Fragment>
        )}

        {firstInvitation && (
          <React.Fragment>
            <br />
            <br />

            <InfoMessage>
              Note - irrespective of how you present the offer, you must still separately select your invoice and payroll schedule.
              This determines the schedule you want to pay the person - weekly or monthly.
              We invoice you on the schedule you select and then immediately pay the person.
            </InfoMessage>
          </React.Fragment>
        )}
      </InputGroupHelpButton>
    </InputGroup>
  )
}

export default RateFields
