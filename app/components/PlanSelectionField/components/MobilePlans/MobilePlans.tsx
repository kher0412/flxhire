import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { IBillingPlan, FormValueInput, FormValueMeta } from 'types'
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons'
import PlanDetails from '../PlanDetails'
import styles from './MobilePlans.module.css'

export interface IMobilePlansProps {
  plans: Array<{ plan: IBillingPlan, disabledMessage: string }>
  input: FormValueInput<IBillingPlan>
  meta: FormValueMeta
}

export interface IMobilePlansState {
  expandPlanId: number
}

export default class MobilePlans extends React.Component<IMobilePlansProps, IMobilePlansState> {
  state: IMobilePlansState = {
    expandPlanId: -1,
  }

  render() {
    const { plans = [], input } = this.props
    const { expandPlanId } = this.state

    if (plans.length === 0) {
      return null
    }

    return (
      <Grid container spacing={3}>
        {plans.map(({ plan, disabledMessage }) => (
          <Grid key={plan.id} item xs={12}>
            <PlanDetails
              showFeatures={expandPlanId === plan.id}
              recommended={plan.highlighted}
              plan={plan}
              onSelect={() => input.onChange(plan)}
              selected={input.value?.id === plan.id}
              disabledMessage={disabledMessage}
              style={plan.highlighted ? undefined : { borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
            />

            <div className={styles.expand}>
              <Button fullWidth onClick={() => this.handleExpandToggleClick(plan.id)}>
                {(expandPlanId === plan.id) ? 'Hide features' : 'Show features'}
                {(expandPlanId === plan.id) ? <ArrowDropUp /> : <ArrowDropDown />}
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
    )
  }

  handleExpandToggleClick = (planId) => {
    if (this.state.expandPlanId === planId) {
      this.setState({
        expandPlanId: -1,
      })
    } else {
      this.setState({
        expandPlanId: planId,
      })
    }
  }
}
