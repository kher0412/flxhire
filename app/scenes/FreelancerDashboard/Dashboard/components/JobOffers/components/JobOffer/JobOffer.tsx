import React from 'react'
import MediaQuery from 'components/MediaQuery'
import Link from 'components/Link'
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemIcon,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  List,
  Divider,
  ListItemSecondaryAction,
  Tooltip,
  IconButton,
} from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'
import VisibilityIcon from '@material-ui/icons/Visibility'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import TodayIcon from '@material-ui/icons/Today'
import { ExternalLink, MasqButton } from 'components'
import { Button } from 'components/themed'
import { formatAsCurrency, formatAsDate, formatAsDateTime } from 'services/formatting'
import { IProfileAvailabilityType, IContractForFreelancer } from 'types'
import styles from './JobOffer.module.css'
import { ContainerProps } from './JobOfferContainer'

const AVAILABILITY_TYPE_STRINGS: { [key in IProfileAvailabilityType]: string } = {
  full_time: 'full-time',
  part_time: 'part-time',
}

interface IJobOfferProps extends ContainerProps {
  jobOffer: IContractForFreelancer
}

class JobOffer extends React.Component<IJobOfferProps> {
  render() {
    const { jobOffer } = this.props

    if (!jobOffer.payments_enabled) {
      return (
        <Card className={[styles.container, 'cy-job-offer-card'].join(' ')} raised>
          <CardHeader title={`Team Invitation - Join ${jobOffer.client.first_name}'s team`} />

          <Divider />

          <CardContent>
            <List>
              <ListItem className={[styles.item, 'cy-job-offer-client'].join(' ')}>
                <ListItemAvatar>
                  {this.renderClientAvatar(jobOffer.client)}
                </ListItemAvatar>

                <ListItemText
                  primary={(
                    <span>
                      {jobOffer.client.first_name} {jobOffer.client.last_name} {this.renderWebsiteLink()}
                    </span>
                  )}
                  secondary="Team Manager"
                />

                <ListItemSecondaryAction>
                  <MasqButton record={jobOffer.client} />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>

          <Divider />

          <CardActions className={styles.actions}>
            {this.renderActions()}
          </CardActions>
        </Card>
      )
    }

    return (
      <Card className={[styles.container, 'cy-job-offer-card'].join(' ')} raised>
        <CardHeader
          title={(
            <div className={styles.title}>
              Job Offer <span className={styles.new}>New</span>
            </div>
          )}
        />

        <Divider />

        <CardContent>
          <List>
            <ListItem className={[styles.item, 'cy-job-offer-client'].join(' ')}>
              <ListItemAvatar>
                {this.renderClientAvatar(jobOffer.client)}
              </ListItemAvatar>

              <ListItemText
                primary={(
                  <span>
                    {jobOffer.client.first_name} {jobOffer.client.last_name} at {jobOffer.company_name} {this.renderWebsiteLink()}
                  </span>
                )}
                secondary="Client"
              />

              <ListItemSecondaryAction>
                <MasqButton record={jobOffer.client} />
              </ListItemSecondaryAction>
            </ListItem>

            {jobOffer.job_title && (
              <ListItem className={[styles.item, 'cy-job-offer-job'].join(' ')}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>

                <ListItemText
                  primary={jobOffer.job_title}
                  secondary="Job"
                />

                <ListItemSecondaryAction>
                  <Link href="/[...slugs]" as={`/${jobOffer.firm_slug}/${jobOffer.job_slug}`} className={styles.link} data-cy="view-job-from-interview">
                    <Tooltip title="View job details">
                      <IconButton>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </ListItemSecondaryAction>
              </ListItem>
            )}

            {this.renderHourlyRate()}
            {this.renderPaymentTerms()}
            {this.renderStartDate()}
          </List>
        </CardContent>

        {this.renderOfferNote()}
        <Divider />

        <CardActions className={styles.actions}>
          {this.renderActions()}
        </CardActions>
      </Card>
    )
  }

  renderActions() {
    const { jobOffer, openAcceptJobOfferDialog, openDeclineJobOfferDialog } = this.props

    if (jobOffer.status === 'offer_made') {
      return (
        <React.Fragment>
          <Button
            style={{ marginLeft: 'auto' }}
            onClick={() => openDeclineJobOfferDialog(jobOffer)}
            data-cy="reject-offer"
          >
            Reject
          </Button>

          <Button
            color="secondary"
            onClick={() => openAcceptJobOfferDialog(jobOffer)}
            data-cy="accept-offer"
          >
            Accept
          </Button>
        </React.Fragment>
      )
    }

    return null
  }

  renderStartDate() {
    const { jobOffer } = this.props

    if (jobOffer?.end_date) {
      return (
        <ListItem className={[styles.item, 'cy-job-offer-start-date'].join(' ')}>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>

          <ListItemText
            primary={`${formatAsDate(jobOffer.start_date)} / ${formatAsDate(jobOffer.end_date)}`}
            secondary="Start date / End date"
          />
        </ListItem>
      )
    }
    return (
      <ListItem className={[styles.item, 'cy-job-offer-start-date'].join(' ')}>
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>

        <ListItemText
          primary={`${formatAsDateTime(jobOffer.start_date)}`}
          secondary="Start date"
        />
      </ListItem>
    )
  }

  renderOfferNote() {
    const { jobOffer } = this.props

    if (jobOffer.offer_note) {
      return (
        <React.Fragment>
          <Divider />
          <div className={styles['offer-note']} data-cy="job-offer-note">
            <strong>{jobOffer.client.first_name}:</strong> {jobOffer.offer_note}
          </div>
        </React.Fragment>
      )
    }

    return null
  }

  renderWebsiteLink() {
    const { jobOffer } = this.props

    if (jobOffer.client.company_website) {
      return (
        <MediaQuery minWidth={800}>
          <ExternalLink
            href={jobOffer.client.company_website}
            style={{ fontSize: '13px', marginLeft: 6, display: 'inline-block' }}
          />
        </MediaQuery>
      )
    }

    return null
  }

  renderHourlyRate() {
    const { jobOffer } = this.props
    const availability = jobOffer.availability_type.map(item => AVAILABILITY_TYPE_STRINGS[item]).filter(item => !!item)
    const rateMode = jobOffer.rate_mode
    const rate = jobOffer.freelancer_rate
    const rateSuffix = !rateMode || rateMode === 'hour' ? 'hr' : rateMode

    return (
      <ListItem data-cy="job-offer-hourly-rate" className={[styles.item, 'cy-job-offer-hourly-rate'].join(' ')}>
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>

        <ListItemText
          primary={(
            <span>
              {formatAsCurrency(rate, { currency: jobOffer.currency })} / {rateSuffix}
              {' '}
              <span className={styles.availability}>{availability.join(', ')}</span>
            </span>
          )}
          secondary="Compensation"
        />
      </ListItem>
    )
  }

  renderPaymentTerms() {
    const { jobOffer } = this.props

    return (
      <ListItem className={[styles.item, 'cy-job-offer-payment-terms'].join(' ')}>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>

        <ListItemText
          primary={`Paid ${jobOffer.invoice_schedule}`}
          secondary="Payment Schedule"
        />
      </ListItem>
    )
  }

  renderClientAvatar(client) {
    if (client.avatar_url) {
      return (
        <Avatar className={styles.avatar} src={client.avatar_url} />
      )
    }

    if (client.first_name) {
      return (
        <Avatar className={styles.avatar}>
          {client.first_name[0]}
        </Avatar>
      )
    }

    return (
      <Avatar className={styles.avatar}>
        ?
      </Avatar>
    )
  }
}

export default JobOffer
