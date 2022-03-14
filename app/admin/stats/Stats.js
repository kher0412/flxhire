import React from 'react'

import { Card, CardHeader, CardContent } from '@material-ui/core'
import { List, NumberField, TopToolbar } from 'react-admin'
import StatList from '../components/StatCard/StatList'
import ExportDatabaseButton from './ExportDatabase'

const cardStyle = {
  width: 300,
  margin: '0.5em',
  display: 'inline-block',
  verticalAlign: 'top',
}

const infoStyle = {
  paddingLeft: '15px',
}

const StatsGrid = ({ ids, data }) => {
  if (ids) {
    return (
      <div style={{ margin: '1em' }}>
        <h3>Customer Pipeline</h3>
        <div>
          <Card style={cardStyle}>
            <CardHeader
              title="Client Pending Accounts"
              subheader={<NumberField record={data.clients_status} source="data.pending_account" />}
            />
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              title="Client Applied Accounts"
              subheader={<NumberField record={data.clients_status} source="data.applied_account" />}
            />
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              title="Client Accepted Accounts"
              subheader={<NumberField record={data.clients_status} source="data.accepted_account" />}
            />
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              title="Open Jobs"
              subheader={<NumberField record={data.jobs_status} source="data.open_jobs" />}
            />
            <CardContent style={infoStyle}>
              <StatList record={data.jobs_status} source="data" />
            </CardContent>
          </Card>
        </div>

        <h3>Member Pipeline</h3>
        <div>
          <Card style={cardStyle}>
            <CardHeader
              title="Pending"
              subheader={<NumberField record={data.freelancer_pending} source="data.total" />}
            />
            <StatList record={data.freelancer_pending} source="data" />
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              title="Unverified"
              subheader={<NumberField record={data.freelancer_unverified} source="data.total" />}
            />
            <StatList record={data.freelancer_unverified} source="data" />
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              title="Applying"
              subheader={<NumberField record={data.freelancer_applying} source="data.total" />}
            />
            <CardContent style={infoStyle}>
              <StatList record={data.freelancer_applying} source="data" />
            </CardContent>
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              title="Applied"
              subheader={<NumberField record={data.freelancer_applied} source="data.total" />}
            />
            <CardContent style={infoStyle}>
              <StatList record={data.freelancer_applied} source="data" />
            </CardContent>
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              title="Interview"
              subheader={<NumberField record={data.freelancer_interview} source="data.total" />}
            />
            <CardContent style={infoStyle}>
              <StatList record={data.freelancer_interview} source="data" />
            </CardContent>
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              title="Interview Slots"
              subheader={<NumberField record={data.interview_slots} source="data.total" />}
            />
            <CardContent style={infoStyle}>
              <StatList record={data.interview_slots} source="data" />
            </CardContent>
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              title="Accepted"
              subheader={<NumberField record={data.freelancer_accepted} source="data.total" />}
            />
            <CardContent style={infoStyle}>
              <StatList record={data.freelancer_accepted} source="data" />
            </CardContent>
          </Card>
        </div>

        <h3>Active Contracts</h3>
        <div>
          <Card style={cardStyle}>
            <CardHeader
              title="Active Contracts"
              subheader={<NumberField record={data.contract_stats} source="data.active_contracts" />}
            />
            <CardContent>
              <StatList record={data.contract_stats} source="data" />
            </CardContent>
          </Card>
          <Card style={cardStyle}>
            <CardHeader
              title="Timesheets submitted last week"
              subheader={<NumberField record={data.timesheets_submitted} source="data.timesheets_submitted" />}
            />
            <CardContent>
              <StatList record={data.timesheets_submitted} source="data" />
            </CardContent>
          </Card>
        </div>

      </div>
    )
  }
  return null
}

const ListActions = ({
  displayedFilters,
  filters,
  filterValues,
  resource,
  showFilter,
}) => (
  <TopToolbar>
    {filters && React.cloneElement(filters, {
      resource,
      showFilter,
      displayedFilters,
      filterValues,
      context: 'button',
    }) }
    <ExportDatabaseButton />
  </TopToolbar>
)

StatsGrid.defaultProps = {
  data: {},
  ids: [],
}

export const Stats = props => (
  <List title="Stats" {...props} actions={<ListActions />} bulkActionButtons={false}>
    <StatsGrid />
  </List>
)
