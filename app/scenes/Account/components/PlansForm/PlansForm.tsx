import React from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import PlanSelectionField from 'components/PlanSelectionField'
import { Field } from 'redux-form'
import { Button, Box } from 'components/themed'
import { Save } from '@material-ui/icons'
import { PlansFormContainerProps } from './PlansFormContainer'

function PlansForm(props: PlansFormContainerProps) {
  const { submitting, pristine, handleSubmit, submitForm, setAvoidBillingSetupDialog } = props

  React.useEffect(() => {
    setAvoidBillingSetupDialog(true)
    return () => setAvoidBillingSetupDialog(false)
  })

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Box>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h4">
              Your Plan
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="body1">
              Pick up the account type that is right for you. You can change your plan at any time.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box>
        <Field
          name="billing_plan"
          component={PlanSelectionField}
        />
      </Box>

      <Divider />

      <Box style={{ textAlign: 'right' }}>
        <Button color="primary" type="submit" disabled={submitting || pristine}>
          <Save /> Save
        </Button>
      </Box>
    </form>
  )
}

export default React.memo(PlansForm)
