import React from 'react'
import { Grid } from '@material-ui/core'
import { Tag, Tags, UserAvatar } from 'components'
import { IAPIError } from 'types'
import { InfoOutlined } from '@material-ui/icons'
import { DashboardContainer_PayrollItemsQuery } from '__generated__/DashboardContainer_PayrollItemsQuery.graphql'
import { formatAsCurrency } from 'services/formatting'
import { TYPE } from 'scenes/ClientManage/components/PayrollTab/components/PayrollItemList/payrollItemType'
import ViewAllButton from '../../../ViewAllButton'
import DataCard from '../../../DataCard'
import styles from '../../ManagementOverview.module.css'

export interface IPayrollItemsTabProps {
  payrollItems: DashboardContainer_PayrollItemsQuery['response']['firm']['payrollItems']['edges'][0]['node'][]
  loading: boolean
  error?: IAPIError
}

export default class PayrollItemsTab extends React.PureComponent<IPayrollItemsTabProps> {
  public render() {
    const { payrollItems = [], loading, error } = this.props

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

        {!error && payrollItems.slice(0, 2).map(payrollItem => (
          <Grid key={payrollItem.id} item xs={12} md={4}>
            <DataCard
              title={payrollItem.contract.freelancer.name}
              text={(
                <Tags>
                  <Tag>
                    {formatAsCurrency(payrollItem.totalToPayClient.value, { currency: payrollItem.contract.currency.code })}
                  </Tag>

                  <Tag>
                    {TYPE[payrollItem.type] || payrollItem.type}
                  </Tag>
                </Tags>
              )}
              icon={(<UserAvatar name={payrollItem.contract.freelancer.name} />)}
              href="/client/manage"
              as="/client/manage?tab=payroll"
              data-cy="payroll-item"
            />
          </Grid>
        ))}

        {!error && payrollItems.length === 0 && !loading && (
          <Grid item xs={12} md={4}>
            <DataCard
              title="No payroll yet"
              icon={<InfoOutlined />}
            />
          </Grid>
        )}

        <Grid item xs={12} md={3}>
          <ViewAllButton
            href="/client/manage"
            as="/client/manage?tab=team"
            data-cy="managers-view-all"
          />
        </Grid>
      </Grid>
    )
  }
}
