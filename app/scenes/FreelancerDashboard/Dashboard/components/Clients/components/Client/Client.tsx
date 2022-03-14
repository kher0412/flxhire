import React from 'react'
import MediaQuery from 'components/MediaQuery'
import {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  Divider,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  List,
  ListItemIcon,
  IconButton,
  Tooltip,
  Hidden,
} from '@material-ui/core'
import { ExternalLink, ConfirmButton, MasqButton, Link, Tags, Tag, CurrencyIcon } from 'components'
import { Button } from 'components/themed'
import moment from 'moment'
import { IContractForFreelancer, ITimesheetForFreelancer } from 'types'
import { formatAsCurrency, formatAsDate } from 'services/formatting'
import { AccountBalance, Assignment, Today, Visibility } from '@material-ui/icons'
import ClientChart from './ClientChart'
import styles from './Client.module.css'
import { ContainerProps } from './ClientContainer'

const AVAILABILITY_TYPE_STRINGS = {
  full_time: 'full-time',
  part_time: 'part-time',
}

interface IClientProps extends ContainerProps {
  contract: IContractForFreelancer & {
    timesheets: ITimesheetForFreelancer[]
  }
}

class Client extends React.PureComponent<IClientProps> {
  renderWebsiteLink() {
    const { contract } = this.props

    if (contract.client.company_website) {
      return (
        <MediaQuery minWidth={800}>
          <ExternalLink style={{ fontSize: '13px' }} href={contract.client.company_website} />
        </MediaQuery>
      )
    }

    return null
  }

  renderPauseResumeToggleButton() {
    const { contract, pauseContract, resumeContract } = this.props

    if (contract.status === 'active' && contract?.payment_mode === 'pay_work_reports') {
      return (
        <ConfirmButton dialogTitle="Pause contract" onClick={() => pauseContract(contract)} data-cy="pause-contract">
          Pause Contract
        </ConfirmButton>
      )
    }

    if (contract.status === 'paused') {
      return (
        <ConfirmButton dialogTitle="Resume contract" onClick={() => resumeContract(contract)} data-cy="resume-contract">
          Resume Contract
        </ConfirmButton>
      )
    }

    return null
  }

  renderClientAvatar() {
    const { contract } = this.props
    const { client } = contract

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

    return null
  }

  render() {
    const { contract, endContract } = this.props
    const availability = contract.availability_type.map(item => AVAILABILITY_TYPE_STRINGS[item]).filter(item => !!item)
    const rateMode = contract.rate_mode
    const rate = contract.freelancer_rate
    const rateSuffix = !rateMode || rateMode === 'hour' ? 'hr' : rateMode

    return (
      <Card className={[styles.container, 'cy-contract-card'].join(' ')} raised>
        <CardHeader
          title="Active Contract Overview"
          subheader={contract.status === 'paused' ? 'PAUSED' : undefined}
        />

        <Divider />

        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem className={[styles.item, 'cy-contract-client'].join(' ')}>
                  <ListItemAvatar>
                    {this.renderClientAvatar()}
                  </ListItemAvatar>

                  <ListItemText
                    primary={contract.client.first_name}
                    secondary="Client"
                  />

                  <ListItemSecondaryAction>
                    <MasqButton record={contract.client} />
                  </ListItemSecondaryAction>
                </ListItem>

                {contract.job_title && (
                  <ListItem className={[styles.item, 'cy-contract-job'].join(' ')}>
                    <ListItemIcon>
                      <Assignment />
                    </ListItemIcon>

                    <ListItemText
                      primary={contract.job_title}
                      secondary="Role"
                    />

                    {contract.job_slug && (
                      <ListItemSecondaryAction>
                        <Tooltip title="View job details">
                          <IconButton
                            component={Link}
                            href="/[...slugs]"
                            as={`/${contract.firm_slug}/${contract.job_slug}`}
                            data-cy="view-job-from-contract"
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                )}

                {contract.payments_enabled && (
                  <ListItem className={[styles.item, 'cy-contract-date'].join(' ')}>
                    <ListItemIcon>
                      <Today />
                    </ListItemIcon>

                    <ListItemText
                      primary={`${formatAsDate(contract.start_date)} to ${formatAsDate(contract.end_date)}`}
                      secondary={(
                        <Tags>
                          <Tag>
                            Contract Duration
                          </Tag>

                          {moment(contract.end_date).isBefore(moment(new Date()).add(8, 'days')) && (
                            <Tag>
                              <strong style={{ color: 'rgb(255,30,0)' }}>
                                EXPIRES SOON
                              </strong>
                            </Tag>
                          )}
                        </Tags>
                      )}
                    />
                  </ListItem>
                )}

                {contract.payments_enabled && (
                  <ListItem className={[styles.item, 'cy-contract-hourly-rate'].join(' ')}>
                    <ListItemIcon>
                      <CurrencyIcon currency={contract.currency} />
                    </ListItemIcon>

                    <ListItemText
                      primary={(
                        <span>
                          {formatAsCurrency(rate, { currency: contract.currency })}/{rateSuffix}
                          {' '}
                          <span className={styles.availability}>{availability.join(', ')}</span>
                        </span>
                      )}
                      secondary={contract.payment_mode === 'salary' ? 'Salary' : 'Rate'}
                    />
                  </ListItem>
                )}

                {contract.estimated_next_salary_payout_date && (
                  <ListItem className={[styles.item, 'cy-contract-hourly-rate'].join(' ')}>
                    <ListItemIcon>
                      <AccountBalance />
                    </ListItemIcon>

                    <ListItemText
                      primary={formatAsDate(contract.estimated_next_salary_payout_date)}
                      secondary="Next Paycheck"
                    />

                    <ListItemSecondaryAction>
                      <Button muiComponent={Link} href="/account/paying_you">Setup Payments</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </List>
            </Grid>

            <Hidden mdDown>
              <Grid item xs={12} md={6}>
                <div className={styles.chart}>
                  <ClientChart timesheets={contract.timesheets} />
                </div>
              </Grid>
            </Hidden>
          </Grid>
        </CardContent>

        <Divider />

        <CardActions className={styles.actions}>
          {this.renderWebsiteLink()}

          <Button muiComponent={Link} href="/member/work_reports/new" style={{ marginLeft: 'auto' }} data-cy="add-new-timesheet">
            New Report
          </Button>

          {this.renderPauseResumeToggleButton()}

          <ConfirmButton
            dialogTitle="End contract"
            dialogMessage="Are you sure? Ending a contract is permanent and cannot be undone without completing the interviewing process again."
            dialogConfirmLabel="End Contract"
            critical
            onClick={() => endContract(contract)}
            data-cy="end-contract"
          >
            End Contract
          </ConfirmButton>
        </CardActions>
      </Card>
    )
  }
}

export default Client
