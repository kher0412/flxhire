import React from 'react'
import { Grid } from '@material-ui/core'
import { IAPIError, IContractForClient } from 'types'
import { getContractStatus } from 'services/contract'
import { UserAvatar } from 'components'
import { InfoOutlined } from '@material-ui/icons'
import DataCard from '../../../DataCard'
import ViewAllButton from '../../../ViewAllButton'
import styles from '../../HiringOverview.module.css'

export interface IOffersTabProps {
  offers: IContractForClient[]
  loading: boolean
  error?: IAPIError
}

export default class OffersTab extends React.PureComponent<IOffersTabProps> {
  public render() {
    const { offers = [], loading, error } = this.props

    return (
      <Grid key="offers" container spacing={2} className={styles.list}>
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

        {!error && offers.slice(0, 3).map(offer => (
          <Grid key={offer.id} item xs={12} md={3}>
            <DataCard
              data-cy="offer-item"
              title={`${offer.freelancer_first_name} ${offer.freelancer_last_name || ''}`.trim()}
              highlighted={offer.status === 'offer_rejected'}
              text={this.getStatusText(offer)}
              href={this.getOfferUrl(offer)}
              icon={(
                <UserAvatar
                  name={offer.freelancer_first_name}
                  url={offer.freelancer?.avatar_url}
                />
              )}
            />
          </Grid>
        ))}

        {offers.length === 0 && !error && !loading && (
          <Grid item xs={12} md={4}>
            <DataCard
              title="No offers yet"
              icon={<InfoOutlined />}
            />
          </Grid>
        )}

        <Grid item xs={12} md={3}>
          <ViewAllButton
            data-cy="view-all-offers"
            href="/client/hire"
            as="/client/hire?tab=offers"
          />
        </Grid>
      </Grid>
    )
  }

  private getStatusText(contract: IContractForClient) {
    if (contract && contract.status === 'offer_made' && !contract.payments_enabled) {
      return 'Invited for Work Tracking'
    }

    return getContractStatus(contract)
  }

  private getOfferUrl(offer: IContractForClient) {
    const jobSlug = offer.job_slug
    const freelancerSlug = offer.freelancer?.profile?.slug || offer.freelancer_email

    if (jobSlug && freelancerSlug) {
      return `/client/hire?tab=offers&job=${encodeURIComponent(jobSlug)}&focus=${encodeURIComponent(freelancerSlug)}`
    }

    return undefined
  }
}
