import React from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import { Field } from 'redux-form'
import PlanSelectionField from 'components/PlanSelectionField'
import { InfoMessage } from 'components/themed'
import { PlanSelectionFormContainerProps } from './PlanSelectionFormContainer'
import styles from './PlanSelectionForm.module.css'

export interface IPlanSelectionFormProps {
  jobId: string
}

export default class PlanSelectionForm extends React.Component<IPlanSelectionFormProps & PlanSelectionFormContainerProps> {
  render() {
    const { isSavingJob, currentUser, jobId, onSelect } = this.props

    return (
      <form
        style={{
          maxWidth: '100%',
          opacity: isSavingJob ? 0.35 : undefined,
          pointerEvents: isSavingJob ? 'none' : undefined,
        }}
      >
        <div className={styles.box}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3">
                Pricing Plans
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                Pick up the account type that is right for you. You can change plan at any time.
              </Typography>
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div className={styles.box}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field
                name="billing_plan"
                component={PlanSelectionField}
                onChange={billingPlan => onSelect(jobId, billingPlan)}
              />
            </Grid>
          </Grid>
        </div>

      </form>
    )
  }
}
