import { Collapse, DialogContentText } from '@material-ui/core'
import { memo } from 'react'
import { formatAsCurrency } from 'services/formatting'
import { Currency } from 'types'
import { useDebouncedData } from 'hooks'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { MarginNotice_ContractPreviewQuery } from '__generated__/MarginNotice_ContractPreviewQuery.graphql'

interface IMarginNoticeProps {
  contractId: string
  currentValues: any
}

const MarginNotice = memo(({ contractId, currentValues: currentValuesProp }: IMarginNoticeProps) => {
  const currentValues = useDebouncedData(currentValuesProp)
  const contractPreviewData = useLazyLoadQuery<MarginNotice_ContractPreviewQuery>(graphql`
  query MarginNotice_ContractPreviewQuery($input: ContractPreviewAttributes!) {
      contractPreview(input: $input) {
        paymentsEnabled
        freelancerFirstName
        freelancerRate {
          currency {
            code
          }
          value
        }
        currency{
          code
        }
        rateMode
        margin
        minMarginUsd
        invitationType
      }
    }
  `, {
    input: {
      contractId,
      currency: currentValues?.currency,
      clientRate: currentValues?.client_rate,
      rateMode: currentValues?.rate_mode,
      clientId: currentValues?.client_id,
    },
  }, {
    fetchPolicy: 'network-only',
  })
  const contract = contractPreviewData?.contractPreview
  if (!contract?.paymentsEnabled) return null
  if (!contract) return <span>...</span>

  const rate = formatAsCurrency(contract?.freelancerRate.value, { currency: contract?.currency as Currency })
  const message = contract?.invitationType === 'invitation' ? (
    `Note: for this contract Flexhire charges a margin of ${contract?.margin}% for
        contract management, 1099 taxation handling and payment distribution;
        thus, ${contract?.freelancerFirstName} will be paid ${rate} per ${contract?.rateMode}.`
  ) : (
    `Note: for this contract Flexhire charges the maximum between
        a margin of ${contract?.margin}% and ${formatAsCurrency(contract?.minMarginUsd, { currency: 'USD' })}/hr
        for contract management, 1099 taxation handling and payment distribution;
        thus, ${contract?.freelancerFirstName} will be paid ${rate} per ${contract?.rateMode}.`
  )

  return (
    <DialogContentText style={{ marginTop: 24 }} data-cy="margin-notice">
      <Collapse in={Boolean(message)} mountOnEnter unmountOnExit>
        {message}
        <br />
        <br />
      </Collapse>
    </DialogContentText>
  )
})

export default MarginNotice
