import React from 'react'
import MediaQuery from 'components/MediaQuery'
import moment from 'moment'
import {
  Divider,
  Card,
} from '@material-ui/core'
import {
  PageHeader,
  PageHeaderTitle,
  PageHeaderSubtitle,
  Tags,
  Tag,
  NavigationPrompt,
  Page,
  PageContent,
  Timesheet,
  InfoMessage,
  PageBundlePlaceholder,
  PageBody,
  UserAvatar,
} from 'components'
import { Button } from 'components/themed'
import { DATE_FORMAT, formatAsShortDateRange } from 'services/formatting'
import Rating from 'scenes/ClientManage/components/Rating'
import { Cancel, CheckCircle, QueryBuilder } from '@material-ui/icons'
import DeleteDialog from '../DeleteDialog'
import SubmitWarningDialog from '../SubmitWarningDialog'
import NoPayoutMethod from './components/NoPayoutMethod'
import SaveDraftButton from './components/SaveDraftButton'
import styles from './TimesheetForm.module.css'
import { ContainerProps } from './TimesheetFormContainer'

const UNSAVED_CHANGES_MSG = 'You have unsaved changes. Are you sure you want to leave?'

interface ITimesheetFormState {
  isChanged: boolean
}

export default class TimesheetForm extends React.Component<ContainerProps, ITimesheetFormState> {
  state = {
    isChanged: false,
  }

  componentDidMount() {
    const {
      resetTimesheet,
      getContracts,
      getTimesheets,
      getTimesheet,
      router,
    } = this.props

    resetTimesheet()
    getContracts()
    getTimesheets()

    if (router.query.id) {
      getTimesheet(router.query.id)
    } else {
      // TODO: what is this?
      let monday = moment().day('Monday')
      if (monday.toDate() > new Date()) monday = monday.subtract(1, 'week')
    }
  }

  renderPreventNavigation() {
    const { isChanged } = this.state
    if (isChanged) {
      // prevent navigating away while having unsaved changes
      // (both full and pushState navigation)
      return (
        <NavigationPrompt
          message={UNSAVED_CHANGES_MSG}
        />
      )
    }
    return null
  }

  handleFormSubmit = (shouldDisableDraftDialog) => {
    this.setState({
      isChanged: false,
    })

    if (this.props.handleSubmit) {
      const handleSubmit = this.props.handleSubmit as any
      // For some reason, handleSubmit requires a function as first argument according to its type definition.
      // However, if we provide the onSubmit prop to it, it does not work. It only works here if we call it with no argument
      // TODO: Fix this
      handleSubmit()
    }

    if (shouldDisableDraftDialog) {
      this.props.disableDraftDialog()
    }
  }

  renderNoPayoutMethodNotice = () => !this.props.currentUser?.has_active_payout_method && <NoPayoutMethod onClick={this.props.setupPayoneer} />

  query = () => {
    const { timesheet } = this.props

    if (timesheet?.status === 'client_query') {
      return (
        <div className={styles.query}>
          <div className={styles.title}>
            <UserAvatar className={styles.avatar} src={timesheet.client_avatar} alt={timesheet.client_name} />
            <div className={styles['client-name']}>Query from {timesheet.client_name}:</div>
          </div>
          <div className={styles.content}>{timesheet.client_comments}</div>
        </div>
      )
    }
    return null
  }

  render() {
    const {
      currentUser,
      isSubmitting,
      contracts,
      timesheet,
      openDeleteDialog,
      openWarning,
      router,
      dirty,
    } = this.props
    const isNew = !router.query.id

    if (!isNew && !timesheet?.id) return <PageBundlePlaceholder />

    const status = timesheet?.status || 'pending'
    const title = timesheet?.client_name ? `Work Report for ${timesheet?.client_name}` : 'New Work Report'
    const editable = (status === 'pending' || status === 'client_query')

    let paymentAt = timesheet?.paid_at || timesheet?.payout_due_date || timesheet?.assumed_payout_due_date
    let paymentAtDate = null

    if (paymentAt) {
      paymentAtDate = moment(paymentAt).add(1, 'day')
    }

    paymentAt = paymentAtDate ? paymentAtDate.format(DATE_FORMAT) : undefined

    return (
      <Page>
        <PageHeader compact>
          <PageHeaderTitle data-cy="page-title">{title}</PageHeaderTitle>
          <PageHeaderSubtitle style={{ marginLeft: 30 }} data-cy="page-subtitle">
            <MediaQuery minWidth={500}>
              <Tags>
                <Tag>{formatAsShortDateRange(timesheet?.start_date, timesheet?.end_date)}</Tag>
                {paymentAt && (<Tag>Payment due at: {paymentAt}</Tag>
                )}
              </Tags>
            </MediaQuery>

            <MediaQuery maxWidth={499}>
              {formatAsShortDateRange(timesheet?.start_date, timesheet?.end_date)}
              {paymentAt && <span><br />Payment due at: {paymentAt}</span>}
            </MediaQuery>
          </PageHeaderSubtitle>
        </PageHeader>

        <PageBody>
          <PageContent maxWidth="lg">
            <Card raised>
              <form>
                <Timesheet
                  timesheet={timesheet}
                  editable={editable}
                  contracts={contracts}
                  disableCardBorders
                />
                {this.renderRating()}
                {this.query()}

                <Divider />

                <div className={styles['buttons-container']} data-cy="timesheet-actions">
                  {(status === 'pending' || status === 'client_query') && (
                    <SaveDraftButton
                      isSubmitting={isSubmitting}
                      showSaveNotificationDialog={currentUser.display_dialog_after_saving_draft_timesheet}
                      isNew={isNew}
                      onClick={this.handleFormSubmit}
                    />
                  )}

                  {editable && timesheet?.id && !dirty && (
                    <React.Fragment>
                      <Button
                        className={styles.button}
                        color="primary"
                        onClick={() => openWarning({
                          id: timesheet.id,
                          amount: timesheet.total_to_pay,
                          client_id: timesheet.client_id,
                          payments_enabled: timesheet.payments_enabled,
                          contracts,
                        })}
                        data-cy="timesheet-submit"
                      >
                        <CheckCircle /> Submit
                      </Button>

                      <Button
                        className={styles.button}
                        style={timesheet.invoice_id ? { display: 'none' } : undefined}
                        onClick={() => openDeleteDialog(timesheet.id)}
                        data-cy="timesheet-delete"
                      >
                        <Cancel /> Delete
                      </Button>
                    </React.Fragment>
                  )}

                  {status === 'submitted' && (
                    <Button disabled className={styles.button}>
                      <QueryBuilder /> Awaiting Client Approval
                    </Button>
                  )}

                  {status === 'approved' && (
                    <Button disabled className={styles.button}>
                      <CheckCircle /> Approved
                    </Button>
                  )}
                </div>

                <SubmitWarningDialog />
                <DeleteDialog />
              </form>
            </Card>

            {this.renderStatusHelperMessage()}
          </PageContent>
        </PageBody>
      </Page>
    )
  }

  renderRating() {
    const { timesheet } = this.props

    if (timesheet?.status === 'approved' || timesheet?.status === 'rejected') {
      return (
        <React.Fragment>
          <Divider />

          <div>
            <Rating
              timesheet={timesheet}
            />
          </div>
        </React.Fragment>
      )
    }

    return null
  }

  renderStatusHelperMessage() {
    const { timesheet } = this.props

    if (!timesheet) return null

    const status = timesheet.status

    if (status === 'approved') {
      return (
        <InfoMessage>
          This work report has been approved, and is awaiting payment by {timesheet.client_name}
        </InfoMessage>
      )
    }

    if (status === 'client_query') {
      return (
        <InfoMessage>
          The contents of this work report have been queried by {timesheet.client_name};
          please do any requested changes and re-submit your report
        </InfoMessage>
      )
    }

    return null
  }
}
