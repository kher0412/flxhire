import React from 'react'
import { Grid } from '@material-ui/core'
import { Tag, Tags, UserAvatar } from 'components'
import { IAPIError } from 'types'
import { InfoOutlined } from '@material-ui/icons'
import { DashboardContainer_BonusesQuery } from '__generated__/DashboardContainer_BonusesQuery.graphql'
import { formatAsCurrency } from 'services/formatting'
import ViewAllButton from '../../../ViewAllButton'
import DataCard from '../../../DataCard'
import styles from '../../ManagementOverview.module.css'

export interface IBonusesTabProps {
  bonuses: DashboardContainer_BonusesQuery['response']['firm']['bonuses']['edges'][0]['node'][]
  loading: boolean
  error?: IAPIError
}

export default class BonusesTab extends React.PureComponent<IBonusesTabProps> {
  public render() {
    const { bonuses = [], loading, error } = this.props

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

        {!error && bonuses.slice(0, 3).map(bonus => (
          <Grid key={bonus.id} item xs={12} md={3}>
            <DataCard
              title={bonus.contract.freelancer.name}
              text={(
                <Tags>
                  <Tag>
                    {formatAsCurrency(bonus.totalToPayClient.value, { currency: bonus.contract.currency.code })}
                  </Tag>

                  <Tag>
                    Bonus
                  </Tag>
                </Tags>
              )}
              icon={(<UserAvatar name={bonus.contract.freelancer.name} />)}
              href="/client/manage"
              as="/client/manage?tab=bonuses"
              data-cy="bonus-item"
            />
          </Grid>
        ))}

        {!error && bonuses.length === 0 && !loading && (
          <Grid item xs={12} md={4}>
            <DataCard
              title="No bonuses yet"
              icon={<InfoOutlined />}
            />
          </Grid>
        )}

        <Grid item xs={12} md={3}>
          <ViewAllButton
            href="/client/manage"
            as="/client/manage?tab=bonuses"
            data-cy="managers-view-all"
          />
        </Grid>
      </Grid>
    )
  }
}
