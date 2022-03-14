import { Collapse, Hidden } from '@material-ui/core'
import { getAPIClient } from 'api'
import { LoadingPage } from 'components'
import { InfoMessage } from 'components/themed'
import { useAPIRead, useCurrentUser } from 'hooks'
import React from 'react'
import { getErrorText } from 'services/error'
import { formatAsCurrency } from 'services/formatting'
import { IBillingPlan, FormValueInput, FormValueMeta } from 'types'
import CancelPlan from './components/CancelPlan'
import DesktopPlans from './components/DesktopPlans'
import MobilePlans from './components/MobilePlans'
import styles from './PlanSelectionField.module.css'

export interface IPlanSelectionFieldProps {
  plans?: IBillingPlan[]
  plansReceived?: boolean
  plansError?: string
  input: FormValueInput<IBillingPlan>
  meta: FormValueMeta
  requireMultipleManagers?: boolean
  requireBackgroundChecks?: boolean
}

const PlanSelectionField = (props: IPlanSelectionFieldProps) => {
  const { input, meta, requireMultipleManagers, requireBackgroundChecks } = props
  const [user] = useCurrentUser()
  const plansResult = useAPIRead(() => getAPIClient().getBillingPlans(), { preload: true })
  const currentPlan = input.value
  const movingAwayFromCustomPlan = input.value && !input.value?.hidden && user?.firm?.billing_plan?.hidden

  let plansData = plansResult.value?.map(p => ({ plan: p, disabledMessage: '' })) || []

  for (let data of plansData) {
    let multipleManagersUnsupported = requireMultipleManagers && !data.plan.allow_multiple_managers
    let backgroundChecksUnsupported = requireBackgroundChecks && !data.plan.allow_background_checks

    if (multipleManagersUnsupported && backgroundChecksUnsupported) {
      data.disabledMessage = 'This plan does not support manager/admin invitations or background checks.'
    } else if (multipleManagersUnsupported) {
      data.disabledMessage = 'This plan does not support manager/admin invitations.'
    } else if (backgroundChecksUnsupported) {
      data.disabledMessage = 'This plan does not support background checks.'
    }
  }

  return (
    <div>
      <Collapse in={Boolean(plansResult.error)}>
        <InfoMessage>
          {getErrorText(plansResult.error)}
        </InfoMessage>
      </Collapse>

      <Collapse in={movingAwayFromCustomPlan && !plansResult.error}>
        <InfoMessage>
          You are currently on a custom plan.
          By choosing another plan, you will not be able to return to your current custom plan.
        </InfoMessage>
      </Collapse>

      <Collapse in={plansResult.loading}>
        <LoadingPage />
      </Collapse>

      <Collapse in={!plansResult.loading}>
        {!plansResult.error && (
          <React.Fragment>
            <Hidden mdDown>
              <DesktopPlans
                plans={plansData}
                input={input}
                meta={meta}
              />
            </Hidden>

            <Hidden lgUp>
              <MobilePlans
                plans={plansData}
                input={input}
                meta={meta}
              />
            </Hidden>

            <div className={styles.info}>
              <strong>
                Standard freelance management & Payroll Rates
              </strong>

              <br />

              {currentPlan && (
                <React.Fragment>
                  All freelance positions on Flexhire must be managed and paid through FlexManage<br />
                  For candidates sourced by Flexhire we charge the greater of:
                  {' '}
                  {currentPlan.contracts_hire_sourced_by_flexhire_margin}% margin or {formatAsCurrency(currentPlan.contracts_hire_min_margin_usd, { currency: 'USD' })}/hour
                  <br />
                  For candidates sourced by you we charge the greater of:
                  {' '}
                  {currentPlan.contracts_hire_sourced_by_client_margin}% or {formatAsCurrency(currentPlan.contracts_hire_min_margin_usd, { currency: 'USD' })}/hour
                  <br />

                  {currentPlan.daily_invite_contract_fee_usd > 0 && (
                    <React.Fragment>
                      {' '}
                      For contracts created from invitations,
                      Flexhire charges an (additional) daily fee of {formatAsCurrency(currentPlan.daily_invite_contract_fee_usd, { currency: 'USD' })}
                      <br />
                    </React.Fragment>
                  )}

                  {currentPlan.allow_payments_disabled_contracts && currentPlan.daily_payments_disabled_contract_fee_usd > 0 && (
                    <React.Fragment>
                      {' '}
                      For contracts without payments processing enabled (work tracking only),
                      Flexhire charges an (additional) daily fee of {formatAsCurrency(currentPlan.daily_payments_disabled_contract_fee_usd, { currency: 'USD' })}
                      {currentPlan.free_payments_disabled_contracts_limit > 0 && '*'}
                      <br />

                      {currentPlan.free_payments_disabled_contracts_limit > 0 && (
                        <React.Fragment>
                          *(except for the first {currentPlan.free_payments_disabled_contracts_limit} such contracts)
                        </React.Fragment>
                      )}
                      <br />
                    </React.Fragment>
                  )}

                  {currentPlan.daily_sourced_by_client_hire_contract_fee_usd > 0 && (
                    <React.Fragment>
                      {' '}
                      For candidates sourced by you,
                      we charge an (additional) daily fee of {formatAsCurrency(currentPlan.daily_sourced_by_client_hire_contract_fee_usd, { currency: 'USD' })}

                      <br />
                    </React.Fragment>
                  )}

                  {currentPlan.daily_sourced_by_flexhire_hire_contract_fee_usd > 0 && (
                    <React.Fragment>
                      {' '}
                      For candidates sourced by Flexhire,
                      we charge an (additional) daily fee of {formatAsCurrency(currentPlan.daily_sourced_by_flexhire_hire_contract_fee_usd, { currency: 'USD' })}
                      <br />
                    </React.Fragment>
                  )}

                  <CancelPlan />
                </React.Fragment>
              )}

              {!currentPlan && (
                'Choose a plan to view freelance and payroll rates'
              )}
            </div>
          </React.Fragment>
        )}
      </Collapse>
    </div>
  )
}

export default PlanSelectionField
