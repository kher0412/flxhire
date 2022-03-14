import React from 'react'
import { graphql } from 'relay-runtime'
import { fetchQuery } from 'api/graphql'
import { useDebouncedEffect } from 'hooks'
import { trackError } from 'services/analytics'
import { useBonusPreview_BonusPreviewQuery } from '__generated__/useBonusPreview_BonusPreviewQuery.graphql'

export interface IBonusPreviewOptionsBase {
  contractId: string
  defaultClientBonus?: number
  defaultMemberbonus?: number
  debounceDuration?: number
  currencyCode: string
}

export interface IBonusPreviewHookResult {
  clientBonus: number
  memberBonus: number
  clientBonusLoading: boolean
  memberBonusLoading: boolean
  setClientBonus: (value: number) => void
  setMemberBonus: (value: number) => void
}

export function useBonusPreview(options: IBonusPreviewOptionsBase): IBonusPreviewHookResult {
  const ref = React.useRef({ timeoutHandle: 0 })
  const [clientBonus, setClientBonus] = React.useState<number>(options.defaultClientBonus)
  const [memberBonus, setMemberBonus] = React.useState<number>(options.defaultMemberbonus)
  const [clientBonusLoading, setClientBonusLoading] = React.useState(options.defaultClientBonus === undefined && options.defaultMemberbonus !== undefined)
  const [memberBonusLoading, setMemberBonusLoading] = React.useState(options.defaultClientBonus !== undefined && options.defaultMemberbonus === undefined)

  useDebouncedEffect(() => {
    if (!memberBonusLoading && !clientBonusLoading) return

    const queryResult = fetchQuery<useBonusPreview_BonusPreviewQuery>(
      graphql`
        query useBonusPreview_BonusPreviewQuery($contractId: ID, $input: BonusPreviewAttributes!) {
          contract(id: $contractId) {
            bonusPreview(input: $input) {
              memberBonus {
                currency {
                  code
                }
                value
              }
              clientBonus {
                currency {
                  code
                }
                value
              }
            }
          }
        }
      `,
      {
        contractId: options.contractId,
        input: {
          clientBonus: { value: clientBonusLoading ? 0 : clientBonus || 0, currencyCode: options.currencyCode },
          memberBonus: { value: memberBonusLoading ? 0 : memberBonus || 0, currencyCode: options.currencyCode },
        },
      },
      {
        fetchPolicy: 'network-only',
      },
    )

    queryResult.then((data) => {
      const memberBonusPreview = data.contract?.bonusPreview?.memberBonus
      const clientBonusPreview = data.contract?.bonusPreview?.clientBonus

      if (memberBonusPreview && memberBonusLoading) {
        setMemberBonus(memberBonusPreview.value)
      }

      if (clientBonusPreview && clientBonusLoading) {
        setClientBonus(clientBonusPreview.value)
      }

      window.clearTimeout(ref.current.timeoutHandle)
      setMemberBonusLoading(false)
      setClientBonusLoading(false)
    }).catch((err) => {
      trackError(err)
      window.clearTimeout(ref.current.timeoutHandle)
      setMemberBonusLoading(false)
      setClientBonusLoading(false)
    })
  }, options.debounceDuration || 600, [clientBonus, memberBonus, clientBonusLoading, memberBonusLoading])

  const performSetClientBonus = (value: number) => {
    if (clientBonusLoading) return

    setClientBonus(value)

    window.clearTimeout(ref.current.timeoutHandle)
    ref.current.timeoutHandle = window.setTimeout(() => setMemberBonusLoading(true), 0)
  }

  const performSetMemberBonus = (value: number) => {
    if (memberBonusLoading) return

    setMemberBonus(value)

    window.clearTimeout(ref.current.timeoutHandle)
    ref.current.timeoutHandle = window.setTimeout(() => setClientBonusLoading(true), 0)
  }

  return {
    clientBonus: clientBonus,
    memberBonus: memberBonus,
    clientBonusLoading: clientBonusLoading,
    memberBonusLoading: memberBonusLoading,
    setClientBonus: performSetClientBonus,
    setMemberBonus: performSetMemberBonus,
  }
}
