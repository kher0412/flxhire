import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from '@material-ui/core'
import { browserHistory } from 'services/router'
import { MoreButtonMenu, Tags, Tag, StatusInfoButton, Condition, TableActionCell } from 'components'
import { IClientInvoice, ISortablePagination } from 'types'
import { formatAsCurrency, formatAsDate } from 'services/formatting'
import { dueDateText, getInvoiceStatusText } from 'services/invoice'
import { AttachMoney, FileCopy, GetApp, Visibility } from '@material-ui/icons'
import { classList } from 'services/styles'
import styles from './InvoicesTable.module.css'
import FundsAvailableMessage from '../../../FundsAvailableMessage'

interface IInvoicesTableProps {
  isCompactView: boolean
  invoices: IClientInvoice[]
  pagination: ISortablePagination
  sortBy: (value: any) => void
  showInvoicePdf: (invoice: IClientInvoice) => void
  onOpenPaymentDialog: (invoice: IClientInvoice) => void
}

class InvoicesTable extends React.Component<IInvoicesTableProps> {
  avatar = (invoice) => {
    let backgroundColor
    let code

    switch (invoice.status) {
      case 'requested':
        backgroundColor = '#F5B861'
        code = 'R'
        break
      case 'paid':
        backgroundColor = '#5FCA50'
        code = 'P'
        break
      case 'void':
        backgroundColor = '#F50057'
        code = 'V'
        break
      case 'overdue':
        code = 'O'
        break
      default:
        backgroundColor = '#3F51B5'
        code = 'I'
    }

    return (
      <Avatar style={{ backgroundColor, width: '50px', height: '50px' }}>{code}</Avatar>
    )
  }

  renderMobileTable = () => {
    const { invoices } = this.props

    return (
      <Grid container spacing={2}>
        {invoices.map(invoice => (
          <Grid item xs={12} key={invoice.id}>
            <Card
              variant="outlined"
              elevation={0}
              onClick={() => browserHistory.push('/client/invoices/[token]', `/client/invoices/${invoice.token}`)}
            >
              <CardHeader
                avatar={this.avatar(invoice)}
                title={`Invoice #${invoice.invoice_num}`}
                subheader={(
                  <Tags>
                    <Tag>
                      Issued {formatAsDate(invoice?.invoice_date)}
                    </Tag>

                    <Tag>
                      Due {dueDateText(invoice?.invoice_date, invoice?.due_date)}
                    </Tag>
                  </Tags>
                )}
                action={this.actions(invoice)}
              />

              <CardContent>
                <div style={{ marginBottom: -12, marginTop: -12 }}>
                  <Tags className={styles.invoicesTags} style={{ fontSize: 14 }}>
                    <Tag className={classList(styles[invoice.status], styles.invoiceFirstTag)}>
                      {getInvoiceStatusText(invoice)}
                      <StatusInfoButton invoice={invoice} />
                    </Tag>

                    <Tag>
                      {formatAsCurrency(invoice.total_to_pay_client || 0, { removeEmptyCents: false, currency: invoice.currency })}
                    </Tag>

                    {invoice.client_paid_at && (
                      <Tag>
                        Paid: {formatAsDate(invoice.client_paid_at)}
                      </Tag>
                    )}
                  </Tags>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }

  sortableColumn = (orderBy, columnName) => {
    const { pagination } = this.props
    return (
      <TableCell>
        <TableSortLabel
          active={pagination.orderBy === orderBy}
          direction={pagination.order}
          onClick={this.sortBy(orderBy)}
        >
          {columnName}
        </TableSortLabel>
      </TableCell>
    )
  }

  sortBy = column => () => {
    const { pagination, sortBy } = this.props
    const order = pagination.orderBy === column && pagination.order === 'desc' ? 'asc' : 'desc'
    const orderBy = column
    sortBy({ orderBy, order })
  }

  renderDesktopTable = () => {
    const { invoices } = this.props

    return (
      <Card variant="outlined" elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              {this.sortableColumn('invoice_num', 'INVOICE NO.')}
              {this.sortableColumn('due_date', 'ISSUED')}
              {this.sortableColumn('due_date', 'DUE DATE')}
              {this.sortableColumn('total_to_pay_client', 'TOTAL')}
              {this.sortableColumn('status', 'PAYMENT STATUS')}
              {this.sortableColumn('client_paid_at', 'PAID AT')}
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody data-cy="invoices-table-body">
            {invoices.map(i => (
              <TableRow
                key={i.id}
                hover
                style={{ cursor: 'pointer' }}
                onClick={() => browserHistory.push('/client/invoices/[token]', `/client/invoices/${i.token}`)}
                data-cy="row"
                data-cy-invoice-id={i.id}
              >
                <TableCell>
                  INVOICE #{i.invoice_num}
                </TableCell>

                <TableCell>
                  {formatAsDate(i?.invoice_date)}
                </TableCell>

                <TableCell>
                  {dueDateText(i?.invoice_date, i?.due_date)}
                </TableCell>

                <TableCell data-cy="total">
                  {formatAsCurrency(i.total_to_pay_client || 0, { removeEmptyCents: false, currency: i.currency })}
                </TableCell>

                <TableCell
                  className={`${styles.status} ${styles[i.status]}`}
                  data-cy="payment-status"
                >
                  {getInvoiceStatusText(i)}
                  <StatusInfoButton invoice={i} />
                </TableCell>

                <TableCell>
                  {i.client_paid_at ? formatAsDate(i.client_paid_at) : '-'}
                </TableCell>

                <TableActionCell>
                  {this.actions(i)}
                </TableActionCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    )
  }

  actions = (i) => {
    const { showInvoicePdf, onOpenPaymentDialog } = this.props

    return (
      <MoreButtonMenu data-cy="actions" onClick={e => e.stopPropagation()}>
        <MenuItem
          onClick={() => browserHistory.push('/client/invoices/[token]', `/client/invoices/${i.token}`)}
          data-cy="open"
        >
          <ListItemIcon>
            <Visibility />
          </ListItemIcon>

          <ListItemText primary="View" />
        </MenuItem>

        <MenuItem
          onClick={() => showInvoicePdf(i)}
          data-cy="view"
        >
          <ListItemIcon>
            <FileCopy />
          </ListItemIcon>

          <ListItemText primary="Download PDF" />
        </MenuItem>

        <MenuItem
          onClick={() => onOpenPaymentDialog(i)}
          disabled={i['client_paid?'] || i.status === 'paid'}
          data-cy="pay"
        >
          <ListItemIcon>
            <AttachMoney />
          </ListItemIcon>

          <ListItemText primary="Pay" />
        </MenuItem>

        <MenuItem
          onClick={() => { (window as any).location = `${process.env.API_ROOT_URL}/invoices/${i.token}/csv` }}
          data-cy="download-csv"
        >
          <ListItemIcon>
            <GetApp />
          </ListItemIcon>

          <ListItemText primary="Download CSV" />
        </MenuItem>
      </MoreButtonMenu>
    )
  }

  render() {
    return (
      <div>
        <FundsAvailableMessage />

        <Condition condition={this.props.isCompactView}>
          {this.renderMobileTable()}
        </Condition>

        <Condition condition={!this.props.isCompactView}>
          {this.renderDesktopTable()}
        </Condition>
      </div>
    )
  }
}

export default InvoicesTable
