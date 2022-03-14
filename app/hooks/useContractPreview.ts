import React from 'react'
import { graphql } from 'relay-runtime'
import { fetchQuery } from 'api/graphql'
import { useDebouncedEffect } from 'hooks'
import { useContractPreview_ContractPreviewQuery } from '__generated__/useContractPreview_ContractPreviewQuery.graphql'
import { trackError } from 'services/analytics'
import { RateMode } from '__generated__/FreelancerRates_Contract.graphql'

export interface IContractPreviewOptionsBase {
  defaultClientRate?: number
  defaultMemberRate?: number
  discountCode?: string
  rateMode?: RateMode
  debounceDuration?: number
  jobId?: string
}

/**
 * Specifies contract rate preview options when used with an existing contract.
 */
export interface IContractPreviewOptionsForContract extends IContractPreviewOptionsBase {
  /** The contract's graph ID. */
  contractId: string

  /** A currency code (such as "usd") that, if provided, overrides contract currency. */
  currencyCode?: string
}

/**
 * Specifies contract rate preview options when used with an existing member.
 */
export interface IContractPreviewOptionsForExistingMember extends IContractPreviewOptionsBase {
  /** The member's graph ID. */
  freelancerId: string

  /** The currency code (such as "usd") used to preview rates. */
  currencyCode: string
}

/**
 * Specifies contract rate preview options when used with a member, that's not known to exist.
 */
export interface IContractPreviewOptionsForNonExistingMember extends IContractPreviewOptionsBase {
  /** The member's email address. */
  freelancerEmail: string

  /** The currency code (such as "usd") used to preview rates. */
  currencyCode: string
}

export type ContractPreviewHookOptions = (
  IContractPreviewOptionsForContract |
  IContractPreviewOptionsForExistingMember |
  IContractPreviewOptionsForNonExistingMember
)

export interface IContractPreviewHookResult {
  clientRate: number
  memberRate: number
  clientRateLoading: boolean
  memberRateLoading: boolean
  setClientRate: (value: number) => void
  setMemberRate: (value: number) => void
}

export function useContractPreview(options: ContractPreviewHookOptions): IContractPreviewHookResult {
  const ref = React.useRef({ timeoutHandle: 0 })
  const [clientRate, setClientRate] = React.useState<number>(options.defaultClientRate)
  const [memberRate, setMemberRate] = React.useState<number>(options.defaultMemberRate)
  const [clientRateLoading, setClientRateLoading] = React.useState(options.defaultClientRate === undefined && options.defaultMemberRate !== undefined)
  const [memberRateLoading, setMemberRateLoading] = React.useState(options.defaultClientRate !== undefined && options.defaultMemberRate === undefined)

  useDebouncedEffect(() => {
    if (!memberRateLoading && !clientRateLoading) return
    const queryResult = fetchQuery<useContractPreview_ContractPreviewQuery>(
      graphql`
        query useContractPreview_ContractPreviewQuery($input: ContractPreviewAttributes!) {
          contractPreview(input: $input) {
            freelancerRate {
              currency {
                code
              }
              value
            }
            clientRate {
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
          contractId: (options as IContractPreviewOptionsForContract).contractId,
          currency: options.currencyCode,
          clientRate: { value: (clientRateLoading ? 0 : clientRate || 0), currencyCode: options.currencyCode },
          freelancerRate: { value: memberRateLoading ? 0 : memberRate || 0, currencyCode: options.currencyCode },
          freelancerEmail: (options as IContractPreviewOptionsForNonExistingMember).freelancerEmail,
          rateMode: options.rateMode || 'hour',
        },
      },
      {
        fetchPolicy: 'network-only',
      },
    )

    queryResult.then((data) => {
      const { freelancerRate: freelancerRatePreview, clientRate: clientRatePreview } = data.contractPreview

      if (freelancerRatePreview && memberRateLoading) {
        setMemberRate(freelancerRatePreview.value)
      }

      if (clientRatePreview && clientRateLoading) {
        setClientRate(clientRatePreview.value)
      }

      window.clearTimeout(ref.current.timeoutHandle)
      setMemberRateLoading(false)
      setClientRateLoading(false)
    }).catch((err) => {
      trackError(err)
      window.clearTimeout(ref.current.timeoutHandle)
      setMemberRateLoading(false)
      setClientRateLoading(false)
    })
  }, options.debounceDuration || 600, [clientRate, memberRate, clientRateLoading, memberRateLoading])

  const performSetClientRate = (value: number) => {
    if (clientRateLoading) return

    setClientRate(value)

    window.clearTimeout(ref.current.timeoutHandle)
    ref.current.timeoutHandle = window.setTimeout(() => setMemberRateLoading(true), 0)
  }

  const performSetMemberRate = (value: number) => {
    if (memberRateLoading) return

    setMemberRate(value)

    window.clearTimeout(ref.current.timeoutHandle)
    ref.current.timeoutHandle = window.setTimeout(() => setClientRateLoading(true), 0)
  }

  return {
    clientRate: clientRate,
    memberRate: memberRate,
    clientRateLoading: clientRateLoading,
    memberRateLoading: memberRateLoading,
    setClientRate: performSetClientRate,
    setMemberRate: performSetMemberRate,
  }
}
