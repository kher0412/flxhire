import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { FormValueInput } from 'types'
import { Box } from 'components/themed'
import TimeWorkedChart from '../TimeWorkedChart'

export interface IWeekBreakdownFieldsProps {
  input: FormValueInput<any[]>
}

export default class WeekBreakdownFields extends React.Component<IWeekBreakdownFieldsProps> {
  render() {
    const { input } = this.props

    return (
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">
              Report Breakdown
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TimeWorkedChart timesheetEntries={input.value || []} />
          </Grid>
        </Grid>
      </Box>
    )
  }
}
