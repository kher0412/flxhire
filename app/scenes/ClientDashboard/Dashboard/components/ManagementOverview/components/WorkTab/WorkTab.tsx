import React from 'react'
import { Grid } from '@material-ui/core'
import { ITimesheetForClient } from 'types/models/timesheet'
import { UserAvatar } from 'components'
import { IAPIError } from 'types'
import { InfoOutlined } from '@material-ui/icons'
import ViewAllButton from '../../../ViewAllButton'
import DataCard from '../../../DataCard'
import styles from '../../ManagementOverview.module.css'
import workStyles from './WorkTab.module.css'

export interface IWorkTabProps {
  timesheets: ITimesheetForClient[]
  loading: boolean
  error?: IAPIError
}

export default class WorkTab extends React.PureComponent<IWorkTabProps> {
  public render() {
    const { timesheets = [], loading, error } = this.props

    return (
      <Grid container spacing={2} className={styles.list}>
        {error && (
          <Grid item xs={12} md={4}>
            <DataCard error={error} />
          </Grid>
        )}

        {!error && loading && (
          <Grid item xs={12} md={4}>
            <DataCard loading />
          </Grid>
        )}

        {!error && timesheets.slice(0, 3).map(timesheet => (
          <Grid key={timesheet.id} item xs={12} md={3}>
            <DataCard
              href={`/client/work_reports/${timesheet.id}`}
              title={timesheet.freelancer_name}
              highlighted={timesheet.status === 'submitted'}
              text={(
                <React.Fragment>
                  {timesheet.total_hours} Hours <strong title={timesheet.status} className={workStyles[`status-${timesheet.status}`]}>${timesheet.total_to_pay}</strong>
                </React.Fragment>
              )}
              icon={(
                <UserAvatar
                  name={timesheet.freelancer_name}
                  url={timesheet.avatar_url}
                />
              )}
              data-cy="timesheet-item"
            />
          </Grid>
        ))}

        {!error && timesheets.length === 0 && !loading && (
          <Grid item xs={12} md={4}>
            <DataCard
              title="No timesheets yet"
              icon={<InfoOutlined />}
            />
          </Grid>
        )}

        <Grid item xs={12} md={3}>
          <ViewAllButton href="/client/manage?tab=work" data-cy="timesheets-view-all" />
        </Grid>
      </Grid>
    )
  }
}
