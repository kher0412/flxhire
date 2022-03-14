import React from 'react'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { MenuItem } from '@material-ui/core'
import { SelectField } from 'components/themed'
import { FormValueInput, FormValueMeta } from 'types'
import { BonusRecipientSelectField_Query } from '__generated__/BonusRecipientSelectField_Query.graphql'

export interface IBonusRecipientSelectFieldProps {
  input: FormValueInput<string>
  meta: FormValueMeta
  onCurrencyChange: (currency: IBonusContractCurrency) => void
}

export type IBonusContractCurrency = BonusRecipientSelectField_Query['response']['firm']['contracts']['edges'][0]['node']['currency']

function BonusRecipientSelectField(props: IBonusRecipientSelectFieldProps) {
  const { input, meta, onCurrencyChange } = props

  const data = useLazyLoadQuery<BonusRecipientSelectField_Query>(
    graphql`
      query BonusRecipientSelectField_Query {
        firm {
          contracts(filters: { membersOnly: true, statuses: ["active", "paused"] }) {
            edges {
              node {
                # Node is Contract
                id
                status
                currency {
                  symbol
                  code
                }
                freelancer {
                  name
                }
              }
            }
          }
        }
      }
    `,
    {},
    {
      fetchPolicy: 'store-and-network',
    },
  )

  const contracts = data?.firm?.contracts?.edges?.map(edge => edge.node)

  return (
    <SelectField fullWidth label="Recipient" input={input} meta={meta}>
      {contracts.map(contract => (
        <MenuItem
          key={contract.id}
          value={contract.id}
          disabled={contract.status !== 'active'}
          data-cy={`select-contractId-${contract.id}`}
          onClick={() => onCurrencyChange(contract.currency)}
        >
          {contract.freelancer?.name}
        </MenuItem>
      ))}
    </SelectField>
  )
}

export default React.memo(BonusRecipientSelectField)
