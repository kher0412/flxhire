import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TableFooter from '@material-ui/core/TableFooter'
import CheckIcon from '@material-ui/icons/CheckCircle'
import VisibilityIcon from '@material-ui/icons/Visibility'
import CloseIcon from '@material-ui/icons/Close'
import { Pagination, MoreButtonMenu, Tags, Tag, StatusInfoButton } from 'components'
import DeleteDialog from 'scenes/FreelancerTimesheets/components/DeleteDialog'
import { IContractForFreelancer, IPagination, ITimesheetForFreelancer } from 'types'
import { getPaymentAt, getStatusForFreelancer } from 'services/timesheets'
import { formatAsCurrency, formatAsShortDate, formatAsShortDateRange, formatDuration } from 'services/formatting'
import SubmitWarningDialog from '../components/SubmitWarningDialog'
import styles from './TimesheetsTable.module.css'

interface ITimesheetsTableProps {
  timesheets: ITimesheetForFreelancer[]
  contracts: IContractForFreelancer[]
  showTimesheet: (id: number) => void
  openWarning: (params: any) => void
  pagination: IPagination
  onChangePage: (params: any) => void
  onChangeRowsPerPage: (params: any) => void
  openDeleteDialog: (id: number) => void
}

class TimesheetsTable extends React.PureComponent<ITimesheetsTableProps> {
  onChangePage = (event, page) => {
    const params = {
      page: page,
      rowsPerPage: this.props.pagination.rowsPerPage,
    }
    this.props.onChangePage(params)
  }

  onChangeRowsPerPage = (event) => {
    const params = {
      rowsPerPage: event.target.value,
    }
    this.props.onChangeRowsPerPage(params)
  }

  pagination = () => {
    return (
      <Pagination
        count={this.props.pagination.count}
        rowsPerPageOptions={[5, 10, 25]}
        rowsPerPage={this.props.pagination.rowsPerPage}
        page={this.props.pagination.page}
        onChangePage={this.onChangePage}
        onChangeRowsPerPage={this.onChangeRowsPerPage}
      />
    )
  }

  handleItemViewClick = (e, t) => {
    e.stopPropagation()
    this.props.showTimesheet(t.id)
  }

  handleItemSubmitClick = (e, t) => {
    e.stopPropagation()
    this.props.openWarning({
      id: t.id,
      amount: t.total_to_pay,
      payments_enabled: t.payments_enabled,
      client_id: t.client_id,
    })
  }

  handleItemDeleteClick = (e, t) => {
    e.stopPropagation()
    this.props.openDeleteDialog(t.id)
  }

  renderDesktopTable() {
    return (
      <Card className={styles.paper} raised>
        <div>
          <Table>
            <TableHead>
              <TableRow className={styles.hrow}>
                <TableCell>Client</TableCell>
                <TableCell>Dates</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Payment due by</TableCell>
                <TableCell>Approved on</TableCell>
                <TableCell>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody data-cy="timesheets-table-body">
              {this.props.timesheets.map((t, index) => {
                const status = getStatusForFreelancer(t)
                const payable = t.payable
                const paymentAt = payable ? formatAsShortDate(getPaymentAt(t)) : 'N/A'
                return (
                  <TableRow
                    key={t.id}
                    className={t.status === 'pending' ? [styles.row, styles.pending].join(' ') : styles.row}
                    hover
                    style={{ animationDelay: `${index * 40}ms` }}
                    onClick={() => this.props.showTimesheet(t.id)}
                    data-cy="row"
                    data-cy-timesheet-id={t.id}
                  >
                    <TableCell>
                      {t.client_name}
                    </TableCell>

                    <TableCell>
                      {formatAsShortDateRange(t.start_date, t.end_date)}
                    </TableCell>

                    <TableCell>
                      {formatDuration(t.total_hours, t.total_minutes)}
                    </TableCell>

                    <TableCell>
                      {t.payments_enabled ? `${formatAsCurrency(t.freelancer_rate, { currency: t.currency })}/hr` : '-'}
                    </TableCell>

                    <TableCell>
                      {t.payments_enabled ? formatAsCurrency(t.total_to_pay, { currency: t.currency, removeEmptyCents: false }) : '-'}
                    </TableCell>

                    <TableCell>
                      {paymentAt}
                    </TableCell>

                    <TableCell>
                      {formatAsShortDate(t.approved_at) || <span>{'\u2014'}</span>}
                    </TableCell>

                    <TableCell>
                      <div className={`${styles.paddings} ${styles.status} ${styles[t.status] || ''}`}>
                        {status}
                        <StatusInfoButton timesheet={t} />
                      </div>
                    </TableCell>

                    <TableCell>{this.actions(t)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>

            <TableFooter>
              {this.pagination()}
            </TableFooter>
          </Table>
        </div>
      </Card>
    )
  }

  actions = t => (
    <MoreButtonMenu onClick={e => e.stopPropagation()} data-cy="timesheets-table-row-actions">
      <MenuItem
        onClick={e => this.handleItemViewClick(e, t)}
      >
        <ListItemIcon>
          <VisibilityIcon />
        </ListItemIcon>

        <ListItemText primary="View" data-cy="timesheets-table-row-view" />
      </MenuItem>

      <MenuItem
        disabled={t.status !== 'pending' && t.status !== 'client_query' && t.status !== 'rejected'}
        onClick={e => this.handleItemSubmitClick(e, t)}
      >
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>

        <ListItemText primary="Submit" data-cy="timesheets-table-row-submit" />
      </MenuItem>

      <MenuItem
        disabled={t.status !== 'pending' && t.status !== 'client_query'}
        onClick={e => this.handleItemDeleteClick(e, t)}
      >
        <ListItemIcon>
          <CloseIcon />
        </ListItemIcon>

        <ListItemText primary="Delete" data-cy="timesheets-table-row-delete" />
      </MenuItem>
    </MoreButtonMenu>
  )

  mobilePagination = () => {
    return (
      <Table>
        <TableFooter>
          {this.pagination()}
        </TableFooter>
      </Table>
    )
  }

  renderMobileTable() {
    return (
      <div className={styles.container}>
        {this.props.timesheets.map((t) => {
          const status = getStatusForFreelancer(t)
          return (
            <Card
              raised
              key={t.id}
              style={{ margin: '10px 5px' }}
              onClick={() => this.props.showTimesheet(t.id)}
              // className={t.status === 'pending' ? `${styles.card} ${styles.pending}` : styles.card}
            >
              <div>
                <CardHeader
                  style={{ marginTop: -8 }}
                  title={(
                    <span style={{ fontSize: 18 }}>
                      {t.client_name}
                    </span>
                  )}
                  subheader={(
                    <span style={{ fontSize: 14 }}>
                      {formatAsShortDateRange(t.start_date, t.end_date)}
                      {t.approved_at ? ` - Approved ${formatAsShortDate(t.approved_at)}` : ''}
                    </span>
                  )}
                  action={this.actions(t)}
                />

                <CardContent className={styles.details}>
                  <Tags>
                    <Tag style={{ textTransform: 'capitalize' }} className={styles[t.status]}>
                      {status}
                    </Tag>

                    <Tag>
                      {formatAsCurrency(t.freelancer_rate, { currency: t.currency })}/h
                    </Tag>

                    <Tag>
                      {t.total_hours}h {t.total_minutes}m
                    </Tag>

                    <Tag>
                      {formatAsCurrency(t.total_to_pay, { currency: t.currency })}
                    </Tag>
                  </Tags>
                </CardContent>
              </div>
            </Card>
          )
        })}
        {this.mobilePagination()}
      </div>
    )
  }

  render() {
    return (
      <div>
        <MediaQuery maxWidth={999}>
          {isMobile => isMobile ? this.renderMobileTable() : this.renderDesktopTable()}
        </MediaQuery>

        <SubmitWarningDialog />
        <DeleteDialog />
      </div>
    )
  }
}

export default TimesheetsTable
