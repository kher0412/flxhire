import React from 'react'

import { List, NumberField, Card, CardHeader } from '@material-ui/core'

const cardStyle = {
  width: 300,
  margin: '0.5em',
  display: 'inline-block',
  verticalAlign: 'top',
}
const StatsGrid = ({ ids, data }) => {
  if (ids) {
    return (
      <div style={{ margin: '1em' }}>
        <h3>Revenue</h3>
        <div>
          <Card style={cardStyle}>
            <CardHeader
              primary="Revenue"
              subheader={<NumberField record={data.all_invoices} source="data.revenue" locales="en-US" />}
            />
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              primary="Costs"
              subheader={<NumberField record={data.all_invoices} source="data.costs" locales="en-US" />}
            />
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              primary="Profit"
              subheader={<NumberField record={data.all_invoices} source="data.profit" locales="en-US" />}
            />
          </Card>
        </div>
        <div>
          <Card style={cardStyle}>
            <CardHeader
              primary="Receivables"
              subheader={<NumberField record={data.all_invoices} source="data.receivable" locales="en-US" />}
            />
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              primary="Payables"
              subheader={<NumberField record={data.all_invoices} source="data.payable" locales="en-US" />}
            />
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              primary="Receivables - Payables"
              subheader={<NumberField record={data.all_invoices} source="data.future_profits" locales="en-US" />}
            />
          </Card>
        </div>

        <h3>This weeks activity</h3>
        <div>
          <Card style={cardStyle}>
            <CardHeader
              primary="Active Contract"
              subheader={<NumberField record={data.weekly_activity} source="data.active_contracts" />}
            />
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              primary="Timesheets Submitted"
              subheader={<NumberField record={data.weekly_activity} source="data.timesheets_submitted" />}
            />
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              primary="Revenue"
              subheader={<NumberField record={data.weekly_activity} source="data.revenue_weekly" locales="en-US" />}
            />
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              primary="Profit"
              subheader={<NumberField record={data.weekly_activity} source="data.profit_weekly" locales="en-US" />}
            />
          </Card>
        </div>

        <h3>Payments Status</h3>
        <div>
          <Card style={cardStyle}>
            <CardHeader
              primary="Payment amount due"
              subheader={<NumberField record={data.payments_status} source="data.amount" locales="en-US" />}
            />
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              primary="Due Date"
              subheader={<NumberField record={data.payments_status} source="data.due_date" />}
            />
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              primary="Payoneer Balance"
              subheader={<NumberField record={data.payments_status} source="data.balance" locales="en-US" />}
            />
          </Card>
        </div>

      </div>
    )
  }
}

StatsGrid.defaultProps = {
  data: {},
  ids: [],
}

export const Stats = props => (
  <List primary="Stats" {...props}>
    <StatsGrid />
  </List>
)
