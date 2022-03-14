import React from 'react'
import { formatAsCurrency } from 'services/formatting'
import { useLazyLoadQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { Currency } from 'types'
import { RatePreviewText_ContractPreviewQuery } from '__generated__/RatePreviewText_ContractPreviewQuery.graphql'

interface IRatePreviewTextProps {
  offerMode: boolean
  name: string
  freelancerEmail: string
  contractId?: string
  currentValues: any
}

const RatePreviewText = React.memo((props: IRatePreviewTextProps) => {
  const { currentValues, contractId, name, freelancerEmail, offerMode } = props

  const contractPreviewData = useLazyLoadQuery<RatePreviewText_ContractPreviewQuery>(
    graphql`
      query RatePreviewText_ContractPreviewQuery($input: ContractPreviewAttributes!) {
        contractPreview(input: $input) {
          freelancerRate {
            currency {
              code
            }
            value
          }
          currency {
            code
          }
          rateMode
          margin
          minMarginUsd
          dailyFee {
            currency {
              code
            }
            value
          }
        }
      }
    `,
    {
      input: {
        contractId,
        jobId: currentValues?.job_id,
        currency: currentValues?.currency,
        freelancerId: currentValues?.freelancer_id,
        freelancerEmail: freelancerEmail,
        clientRate: { value: currentValues?.client_rate, currencyCode: currentValues?.currency },
        annualCompensation: { value: currentValues?.annual_compensation, currencyCode: currentValues?.currency },
        rateMode: currentValues?.rate_mode,
        clientId: currentValues?.client_id,
        discountCode: currentValues?.discount_code,
      },
    },
    {
      fetchPolicy: 'network-only',
    },
  )

  const contractPreview = contractPreviewData?.contractPreview
  const currency = contractPreview?.currency?.code
  const rateMode = contractPreview?.rateMode
  const freelancerRate = contractPreview?.freelancerRate
  const minMarginUsd = contractPreview?.minMarginUsd
  const margin = contractPreview?.margin
  const dailyFee = contractPreview?.dailyFee

  if (contractPreview) {
    const memberRateFormatted = `${formatAsCurrency(freelancerRate.value, { currency })}/${rateMode}`
    const dailyFeeFormatted = `${formatAsCurrency(dailyFee.value, { currency })}`

    if (margin > 0 && dailyFee.value > 0) {
      if (offerMode) {
        return (
          <React.Fragment>
            Note: for this offer, Flexhire charges the greater of {formatAsCurrency(minMarginUsd, { currency })}
            {' '}
            or a margin of {margin}% for contract management, taxation handling and payment distribution; thus, {name} will be paid {memberRateFormatted}.
            {' '}
            The member rates displayed to you on the platform already include the margin.
            {' '}
            Additionally, there is a daily fee of {dailyFeeFormatted} for this offer.
          </React.Fragment>
        )
      }

      return (
        <React.Fragment>
          Note: for this invitation, Flexhire charges a margin of {margin}% for contract management, taxation handling and payment distribution;
          thus, {name} will be paid {memberRateFormatted}.
          {' '}
          The member rates displayed to you on the platform already include the margin.
          {' '}
          Additionally, there is a daily fee of {dailyFeeFormatted} for this invitation.
        </React.Fragment>
      )
    }

    if (margin > 0) {
      if (offerMode) {
        return (
          <React.Fragment>
            Note: for this offer, Flexhire charges the greater of {formatAsCurrency(minMarginUsd, { currency })}
            {' '}
            or a margin of {margin}% for contract management, taxation handling and payment distribution; thus, {name} will be paid {memberRateFormatted}.
            {' '}
            The member rates displayed to you on the platform already include the margin.
          </React.Fragment>
        )
      }

      return (
        <React.Fragment>
          Note: for this invitation, Flexhire charges a margin of {margin}% for contract management, taxation handling and payment distribution;
          thus, {name} will be paid {memberRateFormatted}.
          {' '}
          The member rates displayed to you on the platform already include the margin.
        </React.Fragment>
      )
    }

    if (dailyFee.value > 0) {
      return (
        <React.Fragment>
          Note: for this {offerMode ? 'offer' : 'invitation'}, Flexhire charges a daily fee of {dailyFeeFormatted}.
        </React.Fragment>
      )
    }
  }

  return null
})

export default RatePreviewText
