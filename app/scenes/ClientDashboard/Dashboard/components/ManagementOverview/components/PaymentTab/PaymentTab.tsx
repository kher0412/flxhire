import React from 'react'
import { Grid } from '@material-ui/core'
import { IClientInvoice } from 'types/models/invoice'
import { getInvoiceStatusText } from 'services/invoice'
import { IAPIError } from 'types'
import { InfoOutlined, Receipt } from '@material-ui/icons'
import ViewAllButton from '../../../ViewAllButton'
import DataCard from '../../../DataCard'
import styles from '../../ManagementOverview.module.css'

export interface IPaymentTabProps {
  invoices: IClientInvoice[]
  loading: boolean
  error?: IAPIError
}

export default class PaymentTab extends React.Component<IPaymentTabProps> {
  public render() {
    const { invoices = [], loading, error } = this.props

    return (
      <Grid container spacing={2} className={styles.list}>
        {error && (
          <Grid item xs={12} md={4}>
            <DataCard error={error} />
          </Grid>
        )}

        {loading && !error && (
          <Grid item xs={12} md={4}>
            <DataCard loading />
          </Grid>
        )}

        {!error && invoices.slice(0, 3).map(invoice => (
          <Grid key={invoice.id} item xs={12} md={3}>
            <DataCard
              title={`INVOICE #${invoice.invoice_num}`}
              highlighted={!invoice.client_paid_at}
              text={(
                <React.Fragment>
                  <strong
                    style={{ textTransform: 'uppercase', color: invoice.status !== 'paid' ? '#93A6BA' : undefined }}
                  >
                    {getInvoiceStatusText(invoice)}
                  </strong>
                </React.Fragment>
              )}
              icon={<Receipt />}
              href={`/client/invoices/${invoice.token}`}
              data-cy="invoice-item"
            />
          </Grid>
        ))}

        {!error && invoices.length === 0 && !loading && (
          <Grid item xs={12} md={4}>
            <DataCard
              title="No invoices yet"
              icon={<InfoOutlined />}
            />
          </Grid>
        )}

        <Grid item xs={12} md={3}>
          <ViewAllButton href="/client/manage?tab=invoices" data-cy="invoices-view-all" />
        </Grid>
      </Grid>
    )
  }
}
