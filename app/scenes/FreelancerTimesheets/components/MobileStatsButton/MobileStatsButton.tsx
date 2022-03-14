import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { DialogTitle, DialogContent, Grid, CardHeader, Avatar, DialogActions } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import { ITimesheetStats } from 'scenes/FreelancerTimesheets/FreelancerTimesheetsDucks'
import { Assessment, AttachMoney, QueryBuilder, Send } from '@material-ui/icons'

interface IMobileStatsButtonProps {
  stats: ITimesheetStats
  paymentsEnabled: boolean
}

export default class MobileStatsButton extends React.PureComponent<IMobileStatsButtonProps> {
  state = {
    isOpen: false,
  }

  render() {
    const { stats, paymentsEnabled, ...restProps } = this.props

    return (
      <React.Fragment>
        <Button {...restProps} onClick={this.handleDialogOpen}>
          <MediaQuery minWidth={400}>
            <Assessment style={{ marginRight: 12 }} /> View Stats
          </MediaQuery>

          <MediaQuery maxWidth={399}>
            <Assessment style={{ marginRight: 12 }} /> Stats
          </MediaQuery>
        </Button>

        {this.renderDialog()}
      </React.Fragment>
    )
  }

  renderDialog() {
    const { stats, paymentsEnabled } = this.props
    const { isOpen } = this.state

    if (!isOpen || !stats) {
      return null
    }

    // eslint-disable-next-line camelcase
    const { total_pending, total_paid, total_paid_hours, currency } = stats

    return (
      <ResponsiveDialog open onClose={this.handleDialogClose}>
        <DialogTitle>
          Timesheets Summary
        </DialogTitle>

        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <CardHeader
                title={<span>{(paymentsEnabled || total_pending) ? `${this.currencyToSymbol(currency)}${total_pending}` : 'N/A'}</span>}
                subheader="Pending payments"
                avatar={<Avatar><Send /></Avatar>}
              />
            </Grid>

            <Grid item xs={12}>
              <CardHeader
                title={<span>{(paymentsEnabled || total_paid) ? `${this.currencyToSymbol(currency)}${total_paid}` : 'N/A'}</span>}
                subheader="Total earnings"
                avatar={<Avatar><AttachMoney /></Avatar>}
              />
            </Grid>

            <Grid item xs={12}>
              <CardHeader
                title={total_paid_hours || 0}
                subheader="Total hours"
                avatar={<Avatar><QueryBuilder /></Avatar>}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleDialogClose}>
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  currencyToSymbol(curr: string) {
    return curr === 'USD' ? '$' : '€'
  }

  handleDialogOpen = () => {
    this.setState({
      isOpen: true,
    })
  }

  handleDialogClose = () => {
    this.setState({
      isOpen: false,
    })
  }
}
