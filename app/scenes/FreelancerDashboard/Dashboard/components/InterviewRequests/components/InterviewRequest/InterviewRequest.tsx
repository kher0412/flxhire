import React from 'react'
import MediaQuery from 'components/MediaQuery'
import Link from 'components/Link'
import {
  ListItem,
  ListItemAvatar,
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
import { Button } from 'components/themed'
import { IContractForFreelancer } from 'types'
import { ExternalLink, MasqButton, UserAvatar, ChatButton } from 'components'
import AssignmentIcon from '@material-ui/icons/Assignment'
import VisibilityIcon from '@material-ui/icons/Visibility'
import TodayIcon from '@material-ui/icons/Today'
import InterviewTimes from 'components/InterviewTimes'

import { browserHistory } from 'services/router'
import styles from './InterviewRequest.module.css'

const getRequestsText = (interview: IContractForFreelancer) => {
  const totalCount = interview.contract_requests.length
  const completedCount = interview.contract_requests.filter(r => r.status === 'completed').length
  return `${completedCount}/${totalCount} Requests from ${interview.client.name}`
}
interface IInterviewRequestProps {
  interview: IContractForFreelancer
  openAcceptInterviewDialog: (interview: IContractForFreelancer) => void
  openSkipInterviewDialog: (interview: IContractForFreelancer) => void
}

class InterviewRequest extends React.Component<IInterviewRequestProps> {
  render() {
    const { interview } = this.props

    return (
      <Card className={[styles.container, 'cy-interview-request-card'].join(' ')} raised>
        <CardHeader title="New Interview Request" />

        <Divider />

        <CardContent>
          <List>
            <ListItem className={[styles.item, 'cy-interview-request-client'].join(' ')}>
              <ListItemAvatar>
                {this.renderClientAvatar(interview.client)}
              </ListItemAvatar>

              <ListItemText
                primary={(
                  <span>
                    {interview.client.first_name} {this.renderWebsiteLink()}
                  </span>
                )}
                secondary="Client"
              />

              <ListItemSecondaryAction>
                <MasqButton record={interview.client} />
              </ListItemSecondaryAction>
            </ListItem>

            {interview.job_title && (
              <ListItem className={[styles.item, 'cy-interview-request-job'].join(' ')}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>

                <ListItemText
                  primary={interview.job_title}
                  secondary="Job"
                />

                <ListItemSecondaryAction>
                  <Link href="/[...slugs]" as={`/${interview.firm_slug}/${interview.job_slug}`} className={styles.link} data-cy="view-job-from-interview">
                    <Tooltip title="View job details">
                      <IconButton>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </ListItemSecondaryAction>
              </ListItem>
            )}

            {this.renderSuggestedInterviewTimes()}

            {interview.contract_requests.length > 0 && (
              <ListItem button className={[styles.item, 'cy-contract-requests'].join(' ')} onClick={this.openRequests}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary={getRequestsText(interview)}
                  secondary="Click to review"
                />
              </ListItem>
            )}
          </List>
        </CardContent>

        {this.renderOfferNote()}

        <Divider />

        <CardActions className={[styles.actions, 'cy-interview-request-card-actions'].join(' ')}>
          {this.renderActions()}
        </CardActions>
      </Card>
    )
  }

  renderSuggestedInterviewTimes() {
    const { interview } = this.props
    if (interview?.interview_scheduling_method === 'schedule_via_calendly' && interview?.status !== 'interview_accepted') return null

    const interviewTimes = <InterviewTimes contract={interview} />

    if (!interviewTimes) {
      return null
    }

    if (interview.status === 'interview_accepted' && !interview.interview_date) {
      return (
        <ListItem className={[styles.item, 'cy-interview-request-times'].join(' ')}>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>

          <ListItemText
            primary="No interview time"
            secondary={`${interview.client.first_name} will contact you to schedule the interview using the contact details you provided`}
          />
        </ListItem>
      )
    }

    return (
      <ListItem className={[styles.item, 'cy-interview-request-times'].join(' ')}>
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>

        <ListItemText
          primary={interviewTimes}
          secondary={interview.interview_date ? 'Confirmed interview time in your local time' : 'Suggested interview time(s) in your local time'}
        />
      </ListItem>
    )
  }

  renderActions() {
    const { interview, openAcceptInterviewDialog, openSkipInterviewDialog } = this.props

    if (interview.status === 'pending') {
      const hiringManager = interview.hiring_manager || interview.client
      return (
        <React.Fragment>
          <ChatButton
            showContactInfo
            recipientId={hiringManager?.id}
            contact={{
              first_name: hiringManager?.first_name,
              name: `${hiringManager?.first_name || ''} ${hiringManager?.last_name || ''}`.trim(),
              avatar_url: hiringManager?.avatar_url,
            }}
            style={{ marginRight: 'auto' }}
          />
          <Button
            style={{ marginLeft: 'auto' }}
            onClick={() => openSkipInterviewDialog(interview)}
            data-cy="reject-interview"
          >
            Reject
          </Button>
          <Button
            color="secondary"
            onClick={() => openAcceptInterviewDialog(interview)}
            data-cy="accept-interview"
          >
            Accept
          </Button>

        </React.Fragment>
      )
    }

    if (interview.status === 'interview_accepted') {
      return (
        <Button disabled style={{ marginLeft: 'auto' }}>
          Interview Accepted
        </Button>
      )
    }

    return null
  }

  renderOfferNote() {
    const { interview } = this.props

    if (interview.interview_note) {
      return (
        <React.Fragment>
          <Divider />
          <div className={styles['offer-note']} data-cy="interview-request-note">
            <strong>{interview.client.first_name}:</strong> {interview.interview_note}
          </div>
        </React.Fragment>
      )
    }

    return null
  }

  renderWebsiteLink() {
    const { interview } = this.props

    if (interview.client.company_website) {
      return (
        <MediaQuery minWidth={800}>
          <ExternalLink
            href={interview.client.company_website}
            style={{ fontSize: '13px', marginLeft: 6, display: 'inline-block' }}
          />
        </MediaQuery>
      )
    }

    return null
  }

  renderClientAvatar(client) {
    return (
      <UserAvatar className={styles.avatar} name={client.first_name} url={client.avatar_url} />
    )
  }

  openRequests = () => {
    const { interview } = this.props
    browserHistory.push('/pre_interview_questions/[id]', `/pre_interview_questions/${interview.id}`)
  }
}

export default InterviewRequest
