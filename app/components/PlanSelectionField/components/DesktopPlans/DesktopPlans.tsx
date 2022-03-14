import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { FormValueInput, FormValueMeta, IBillingPlan } from 'types'
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons'
import PlanDetails from '../PlanDetails'
import styles from './DesktopPlans.module.css'

export interface IDesktopPlansProps {
  plans: Array<{ plan: IBillingPlan, disabledMessage: string }>
  input: FormValueInput<IBillingPlan>
  meta: FormValueMeta
}

export interface IDesktopPlansState {
  expand: boolean
}

export default class DesktopPlans extends React.Component<IDesktopPlansProps, IDesktopPlansState> {
  state: IDesktopPlansState = {
    expand: false,
  }

  render() {
    const { plans = [], input } = this.props
    const { expand } = this.state

    if (plans.length === 0) {
      return null
    }

    return (
      <Grid container spacing={0}>
        {plans.map(({ plan, disabledMessage }, i) => (
          <Grid key={plan.id} item xs={12} md={Math.round(12 / plans.length) as any}>
            <div style={{ height: '100%' }}>
              <PlanDetails
                showFeatures={expand}
                plan={plan}
                recommended={plan.highlighted && !input.value?.id}
                onSelect={() => input.onChange(plan)}
                selected={input.value?.id === plan.id}
                disabledMessage={disabledMessage}
                style={{
                  borderTopLeftRadius: (i === 0) ? 8 : 0,
                  borderTopRightRadius: (i === plans.length - 1) ? 8 : 0,
                }}
              />
            </div>
          </Grid>
        ))}

        <Grid item xs={12} md={12}>
          <div className={styles.expand}>
            <Button
              onClick={this.handleToggleExpandClick}
              fullWidth
              endIcon={expand ? <ArrowDropUp /> : <ArrowDropDown />}
            >
              {expand ? 'Hide features' : 'Show features'}
            </Button>
          </div>
        </Grid>
      </Grid>
    )
  }

  handleToggleExpandClick = () => {
    this.setState(state => ({
      expand: !state.expand,
    }))
  }
}
