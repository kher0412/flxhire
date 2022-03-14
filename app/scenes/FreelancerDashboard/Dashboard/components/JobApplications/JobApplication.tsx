import { PureComponent, Fragment } from 'react'
import MediaQuery from 'components/MediaQuery'
import { browserHistory } from 'services/router'
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from '@material-ui/core'
import { IContractForFreelancer, ICurrentUser } from 'types'
import { isMember } from 'services/user'
import { AssignmentLate, Cancel, Work, Warning, Mail, CheckCircle, Assignment } from '@material-ui/icons'
import styles from './JobApplications.module.css'

interface IJobApplicationProps {
  contract: IContractForFreelancer
  user: ICurrentUser
  openDeleteDialog: (id: number) => void
}

class JobApplication extends PureComponent<IJobApplicationProps> {
  render() {
    const { contract, user, ...props } = this.props
    const deletable = ['job_application_draft', 'job_application_invited'].indexOf(contract.status) >= 0
    const client = contract.company_name || contract.job?.company_name || 'the client'
    const canApplyToJobs = isMember(user) && user?.status !== 'pending'
    const jobTitle = contract.job?.title || contract.job_title || 'Your Job Application'
    const incompleteRequestCount = (contract.contract_requests || []).filter(x => x.status !== 'completed').length
    const hasIncompleteRequests = incompleteRequestCount > 0

    let secondary: any = 'Click to view Job'
    let description = ''
    let Icon = Work
    let iconColor: 'primary' | 'secondary'

    if (contract.status === 'pending' && !hasIncompleteRequests) {
      return null
    }

    if (contract.status === 'job_application_draft') {
      secondary = <strong>Job Application Pending</strong>
      iconColor = 'secondary'

      if (!canApplyToJobs) {
        Icon = Warning
        description = 'Complete your Profile now to proceed'
      } else {
        description = 'Click to submit your Job Application now and immediately appear as an applicant to the client'
      }
    } else if (contract.status === 'job_application_invited') {
      Icon = Mail
      iconColor = 'secondary'
      secondary = 'Invited to Apply by the Client'
      description = `Your profile has been recommended to ${client} and they chose you as preferred candidate! Apply to the Job now to move forward in the client's Hiring pipeline.`
    } else if (contract.status === 'job_application_sent') {
      if (canApplyToJobs) {
        Icon = CheckCircle
        iconColor = 'primary'
        secondary = 'Job Application Sent!'
        description = 'The Client is reviewing your application'
      } else {
        Icon = Warning
        iconColor = 'secondary'
        secondary = 'Job Application Ready'
        description = 'Complete your Profile now and immediately appear as an applicant to the client'
      }
    }

    if (incompleteRequestCount > 0) {
      Icon = Assignment
      iconColor = 'secondary'
    }

    return (
      <ListItem button={canApplyToJobs || undefined} onClick={this.onClick} {...props}>
        <ListItemIcon>
          <Icon color={iconColor} />
        </ListItemIcon>

        <ListItemText
          primary={(
            <Fragment>
              {jobTitle}

              {hasIncompleteRequests && (
                <MediaQuery minWidth={901}>
                  <Chip
                    icon={<AssignmentLate />}
                    label={`${incompleteRequestCount} Requests from ${client}`}
                    clickable
                    color="secondary"
                    onClick={this.onClick}
                    className={styles.chip}
                    data-cy="request"
                  />
                </MediaQuery>
              )}
            </Fragment>
          )}
          secondary={(
            <Fragment>
              {secondary}
              {description && ' - '}
              {description}

              {hasIncompleteRequests && (
                <MediaQuery maxWidth={900}>
                  <Chip
                    icon={<AssignmentLate />}
                    label={`${incompleteRequestCount} Requests from ${client}`}
                    clickable
                    color="secondary"
                    style={{ marginTop: 6 }}
                    onClick={this.onClick}
                    data-cy="request"
                  />
                </MediaQuery>
              )}
            </Fragment>
          )}
        />

        {deletable && (
          <ListItemSecondaryAction>
            <IconButton onClick={this.openDeleteDialog} data-cy="cancel">
              <Cancel />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    )
  }

  onClick = (event) => {
    const { contract } = this.props
    event.stopPropagation() // Important when the chip is clicked
    const hasRequests = (contract.contract_requests || []).length > 0

    return hasRequests ? this.openRequests() : this.openJob()
  }

  openJob = () => {
    const { contract } = this.props
    const shouldApply = contract?.status !== 'job_application_sent'

    browserHistory.push('/[...slugs]', `/${contract?.firm_slug}/${contract?.job_slug}${shouldApply ? '?applying=true' : ''}`)
  }

  openRequests = () => {
    const { contract } = this.props
    browserHistory.push('/pre_interview_questions/[id]', `/pre_interview_questions/${contract.id}`)
  }

  openDeleteDialog = () => {
    const { contract, openDeleteDialog } = this.props
    openDeleteDialog(contract.id)
  }
}

export default JobApplication
