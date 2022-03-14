import React from 'react'
import { Collapse, Divider, Grid, List, ListSubheader, Typography } from '@material-ui/core'
import { Button } from 'components/themed'
import { IBillingPlan } from 'types'
import { formatAsCurrency } from 'services/formatting'
import { useCurrentUser } from 'hooks'
import { classList } from 'services/styles'
import { CheckCircle } from '@material-ui/icons'
import styles from './PlanDetails.module.css'
import PlanBenefitItem from './components/PlanBenefitItem'

export interface IButtonCellProps {
  plan: IBillingPlan
  recommended?: boolean
  selected?: boolean
  onSelect?: (plan: IBillingPlan) => void
  disabled?: boolean
}

const ButtonCell = ({ selected, recommended, plan, onSelect, disabled }: IButtonCellProps) => (
  <div className={styles.cell} style={{ opacity: 1 }}>
    <Button
      color={recommended ? 'primary' : 'secondary'}
      fullWidth
      onClick={() => onSelect(plan)}
      disabled={selected || disabled}
      data-cy="choose-plan"
    >
      <div>
        <Collapse in={!selected}>
          Choose Plan
        </Collapse>

        <Collapse in={selected} mountOnEnter unmountOnExit>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircle className={styles.selectedIcon} /> Selected
          </div>
        </Collapse>
      </div>
    </Button>
  </div>
)

export interface IPlanDetailsProps {
  plan: IBillingPlan
  recommended?: boolean
  selected?: boolean
  showFeatures: boolean
  disabledMessage?: string
  style?: React.CSSProperties
  onSelect?: (plan: IBillingPlan) => void
}

const PlanDetails = (props: IPlanDetailsProps) => {
  const { showFeatures, recommended, plan, onSelect, selected, disabledMessage, style } = props
  const [user] = useCurrentUser()

  if (!plan) return null

  const disabled = !!disabledMessage || (plan.hidden && user?.firm?.billing_plan?.id !== plan.id)

  return (
    <div data-cy={`billing-plan-${plan.id}`}>
      {recommended && (
        <div className={styles.highlight}>
          Recommended
        </div>
      )}

      {!recommended && (
        <div className={styles.highlightPlaceholder} />
      )}

      <div className={classList(styles.container, disabled && styles.disabled)} style={style}>
        <div className={styles.cell}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">
                {plan.name} {plan.hidden ? '(Custom)' : ''}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2">
                {!plan.allow_multiple_managers && 'Just you'}

                {plan.minimum_managers > 1 && plan.allow_multiple_managers && (
                  <React.Fragment>
                    Minimum {plan.minimum_managers} managers
                  </React.Fragment>
                )}

                {!(plan.minimum_managers > 1) && plan.allow_multiple_managers && 'Any number of managers'}
              </Typography>
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div className={styles.cell}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className={styles.pricetag}>
                <Typography variant="body1">
                  $
                </Typography>

                <Typography variant="h2">
                  {formatAsCurrency(plan.daily_job_fee_usd, { symbol: false, currency: 'USD' })}
                </Typography>

                <Typography variant="body1" style={{ marginLeft: 6 }}>
                  / job posting per day
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className={styles.pricetag}>
                <Typography variant="body1">
                  $
                </Typography>

                <Typography variant="h2">
                  {formatAsCurrency(plan.daily_manager_fee_usd * 30, { symbol: false, currency: 'USD' })}
                </Typography>

                <Typography variant="body1" style={{ marginLeft: 6 }}>
                  / user per 30 days
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>

        <Divider />

        <ButtonCell
          selected={selected}
          recommended={recommended}
          plan={plan}
          onSelect={onSelect}
          disabled={disabled}
        />

        {disabledMessage && (
          <div style={{ opacity: 0.8 }}>
            <Collapse in={!showFeatures}>
              <Divider />

              <div className={classList(styles.cell, styles.disabledMessage)}>
                {disabledMessage}
              </div>
            </Collapse>
          </div>
        )}

        <Collapse in={showFeatures} mountOnEnter unmountOnExit>
          <Divider />

          <div className={styles.cell}>
            <List disablePadding>
              <ListSubheader disableGutters>
                Hiring features
              </ListSubheader>

              <PlanBenefitItem
                text="Job post"
                enabled
                style={{ animationDelay: '50ms' }}
              />

              <PlanBenefitItem
                text="Multiple managers"
                enabled={plan.allow_multiple_managers}
                style={{ animationDelay: '100ms' }}
              />

              <PlanBenefitItem
                text="Flexhire verified users"
                enabled={plan.max_candidates > 0}
                style={{ animationDelay: '150ms' }}
              />

              <PlanBenefitItem
                text="Integrated Background Checks"
                enabled={plan.allow_background_checks}
                style={{ animationDelay: '200ms' }}
              />

              <PlanBenefitItem
                text="Career page integration"
                enabled={plan.allow_career_page_integration}
                style={{ animationDelay: '250ms' }}
              />

              <PlanBenefitItem
                text="Existing ATS integration"
                enabled={plan.allow_ats_job_integrations}
                style={{ animationDelay: '300ms' }}
              />

              <PlanBenefitItem
                text="Customer success Rep"
                enabled={plan.customer_success_rep}
                style={{ animationDelay: '350ms' }}
              />
            </List>
          </div>

          <Divider />

          <div className={styles.cell}>
            <List disablePadding>
              <ListSubheader disableGutters>
                Management features
              </ListSubheader>

              <PlanBenefitItem
                text="Enterprise contract management"
                enabled
                style={{ animationDelay: '450ms' }}
              />

              <PlanBenefitItem
                text="Work tracking"
                enabled
                style={{ animationDelay: '500ms' }}
              />

              <PlanBenefitItem
                text="Global payments processing"
                enabled
                style={{ animationDelay: '550ms' }}
              />

              <PlanBenefitItem
                text="Automated 1099 taxation"
                enabled
                style={{ animationDelay: '600ms' }}
              />
            </List>
          </div>

          <Divider />

          <ButtonCell
            selected={selected}
            recommended={recommended}
            plan={plan}
            onSelect={onSelect}
            disabled={disabled}
          />
        </Collapse>

        {disabledMessage && (
          <div style={{ opacity: 0.8 }}>
            <Collapse in={showFeatures}>
              <Divider />

              <div className={classList(styles.cell, styles.disabledMessage)}>
                {disabledMessage}
              </div>
            </Collapse>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlanDetails
