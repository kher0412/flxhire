import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { isEmpty, some, matches } from 'lodash'
import { Card, CardHeader, Avatar, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircleOutline'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import SendIcon from '@material-ui/icons/Send'
import { Link, LoadingPage, PageHeader, PageHeaderTitle, PageHeaderDivider, PageHeaderActions, PageContainer, PageWrapper } from 'components'
import { Button, InfoMessage } from 'components/themed'
import { formatAsCurrency, formatAsDate } from 'services/formatting'
import NoTimesheets from '../components/NoTimesheets'
import NoClients from '../components/NoClients'
import TimesheetsTable from './TimesheetsTable'
import styles from './Timesheets.module.css'
import MobileStatsButton from '../components/MobileStatsButton'
import { ContainerProps } from './TimesheetsContainer'

class Timesheets extends React.PureComponent<ContainerProps> {
  componentDidMount() {
    const { getTimesheets, getTimesheetStats, getContracts } = this.props

    getTimesheets()
    getTimesheetStats()
    getContracts()
  }

  renderContent() {
    const {
      timesheets,
      timesheetsReceived,
      contracts,
      showTimesheet,
      openWarning,
      pagination,
      onChangePage,
      onChangeRowsPerPage,
      openDeleteDialog,
    } = this.props

    if (!timesheetsReceived) {
      return <LoadingPage />
    }

    if (!isEmpty(timesheets)) {
      return (
        <TimesheetsTable
          timesheets={timesheets}
          contracts={contracts}
          showTimesheet={showTimesheet}
          openWarning={openWarning}
          pagination={pagination}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          openDeleteDialog={openDeleteDialog}
        />
      )
    }

    return isEmpty(contracts) ? <NoClients /> : <NoTimesheets />
  }

  renderInfoMessages() {
    const { timesheets, timesheetsReceived, contractsReceived, contracts } = this.props
    const messages = []
    const hasRejectedTimesheets = some(timesheets, matches({ status: 'rejected' }))
    const hasQueriedTimesheets = some(timesheets, matches({ status: 'client_query' }))
    const hasPayoutFailedTimesheet = some(timesheets, matches({ status: 'payout_failed' }))

    const style = { color: 'white', marginBottom: 12 }

    if (timesheetsReceived && contractsReceived && this.isTimesheetCreationDisabled()) {
      if (contracts.length > 0) {
        messages.push(
          <InfoMessage style={style}>
            Work reports have been disabled by the client for your active contract
          </InfoMessage>,
        )
      } else {
        messages.push(
          <InfoMessage style={style}>
            To create a work report, you need to have an active client contract
          </InfoMessage>,
        )
      }
    }

    if (timesheetsReceived && contractsReceived && !this.isTimesheetCreationDisabled() && this.notStartedContracts().length > 0) {
      const startDate = this.notStartedContracts()[0].start_date

      messages.push(
        <InfoMessage style={style}>
          You'll be able to create work reports once your contract has started{startDate && ` (${formatAsDate(startDate)})`}
        </InfoMessage>,
      )
    }

    if (hasRejectedTimesheets || hasQueriedTimesheets) {
      messages.push(
        <InfoMessage type="warning" style={style}>
          A client has queried or rejected a work report.
          Please address the issue with the client.
        </InfoMessage>,
      )
    }

    if (hasPayoutFailedTimesheet) {
      messages.push(
        <InfoMessage type="error" style={style}>
          A work report failed in being paid out to you.
          Please contact Flexhire to resolve this issue at info@flexhire.com
        </InfoMessage>,
      )
    }

    if (messages.length > 0) {
      return (
        <div style={{ paddingBottom: 12 }}>
          {messages}
        </div>
      )
    }

    return null
  }

  render() {
    const { contracts, stats, timesheets, timesheetsReceived } = this.props
    const { total_pending, total_paid, total_paid_hours, currency } = stats
    const paymentsEnabled = contracts.some(contract => contract.payments_enabled && contract.enable_timesheets)
    const hasDraftTimesheets = timesheets.some(timesheet => timesheet.status === 'pending')

    return (
      <div>
        <PageHeader className={styles.header}>
          <PageHeaderTitle>
            Work Reports
          </PageHeaderTitle>

          <PageHeaderDivider />

          <PageHeaderActions>
            <Button
              disabled={!timesheetsReceived || this.isTimesheetCreationDisabled() || this.notStartedContracts().length !== 0}
              muiComponent={Link}
              href="/member/work_reports/new"
              style={{ marginRight: 12 }}
            >
              <MediaQuery minWidth={400}>
                <AddIcon className={styles['button-icon']} /> New Work Report
              </MediaQuery>

              <MediaQuery maxWidth={399}>
                <AddIcon className={styles['button-icon']} /> New
              </MediaQuery>
            </Button>

            <MediaQuery maxWidth={699}>
              <MobileStatsButton
                stats={stats}
                paymentsEnabled={paymentsEnabled}
              />
            </MediaQuery>
          </PageHeaderActions>
        </PageHeader>

        <PageContainer>
          <PageWrapper withoutCard noAnim>
            {this.renderInfoMessages()}

            <div data-cy-client-count={this.props.contracts.length} />

            <div>
              <MediaQuery minWidth={700}>
                {isLargeScreen => (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} hidden={!isLargeScreen}>
                      <Card raised className={styles['stats-card']}>
                        <CardHeader
                          title={<span>{(paymentsEnabled || total_pending) ? `${formatAsCurrency(total_pending, { currency })}` : 'N/A'}</span>}
                          subheader="Pending payments"
                          avatar={<Avatar><SendIcon /></Avatar>}
                        />
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={4} hidden={!isLargeScreen}>
                      <Card raised className={styles['stats-card']}>
                        <CardHeader
                          title={<span>{(paymentsEnabled || total_paid) ? `${formatAsCurrency(total_paid, { currency })}` : 'N/A'}</span>}
                          subheader="Total earnings"
                          avatar={<Avatar><AttachMoneyIcon /></Avatar>}
                        />
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={4} hidden={!isLargeScreen}>
                      <Card raised className={styles['stats-card']}>
                        <CardHeader
                          title={total_paid_hours || 0}
                          subheader="Total hours"
                          avatar={<Avatar><QueryBuilderIcon /></Avatar>}
                        />
                      </Card>
                    </Grid>

                    <Grid item xs={12}>
                      {this.renderContent()}
                    </Grid>

                    {hasDraftTimesheets && (
                      <Grid item xs={12}>
                        <InfoMessage type="warning" style={{ color: 'rgb(199, 156, 0)' }}>
                          You have a work report saved as a draft.
                          Your client will not receive your report unless submitted.
                          Remember to submit your report in order to receive payments.
                        </InfoMessage>
                      </Grid>
                    )}
                  </Grid>
                )}
              </MediaQuery>
            </div>
          </PageWrapper>
        </PageContainer>
      </div>
    )
  }

  isTimesheetCreationDisabled() {
    const { contracts } = this.props

    return !contracts.some(c => c.enable_timesheets || new Date(c.start_date) >= new Date())
  }

  notStartedContracts() {
    const { contracts } = this.props

    return contracts.filter(c => new Date(c.start_date) >= new Date())
  }
}

export default Timesheets
