import React from 'react'
import moment from 'moment'
import { get } from 'lodash'
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
} from '@material-ui/core'
import { ConfirmButton, AddToCalendar } from 'components'
import ScreeningInterviewSlots from '../ScreeningInterviewSlots'


// TODO: replace placeholder with real google meet room
const GOOGLE_MEET_URL = 'https://meet.google.com/njz-anvk-avs'

class CurrentInterviewStatus extends React.Component {
  componentDidMount() {
    this.props.getCurrentScreeningInterview()
  }

  renderDateTime() {
    const { interviewSlot } = this.props
    const m = new moment(interviewSlot.datetime)
    return `${m.format('LLL')}, ${m.fromNow()}`
  }

  renderBooked() {
    const { interviewSlot } = this.props
    if (get(interviewSlot, 'status') === 'booked') {
      return (
        <div>
          <CardContent>
            <p>Your video conference with a Flexhire team member has been booked and will start on <strong>{this.renderDateTime()}</strong>.</p>
            <p>At the video conference time, please connect to the following Google Meet room: <a href={GOOGLE_MEET_URL} target="_blank" rel="noopener noreferrer">{GOOGLE_MEET_URL}</a></p>
            <p>
              If you won't be available, you can <strong>Postpone</strong> the meeting and choose a new slot.
            </p>
            <p>After the Video Conference, your application to become a verified freelancer will be complete. If you have any questions, email us at info@flexhire.com</p>
          </CardContent>
          <CardActions>
            <ConfirmButton
              dialogMessage="You will have to choose a new interview slot"
              variant="contained"
              color="secondary"
              onClick={this.handlePostpone}
              data-cy="postpone"
            >Postpone
            </ConfirmButton>
            {this.renderAddToCalendar()}
          </CardActions>
        </div>
      )
    }
  }

  renderAddToCalendar() {
    const { interviewSlot } = this.props
    const startTime = moment(interviewSlot.datetime).format()
    const endTime = moment(interviewSlot.datetime).add(1, 'hour').format()
    const title = 'Flexhire Screening Interview'
    const description = `more details at ${process.env.ROOT_URL}/application/interview`
    return (
      <AddToCalendar
        startTime={startTime}
        endTime={endTime}
        title={title}
        description={description}
      />
    )
  }

  handlePostpone = (event) => {
    const { handlePostpone, interviewSlot } = this.props
    handlePostpone(interviewSlot.id)
  }

  renderPostponed() {
    const { interviewSlot } = this.props
    if (get(interviewSlot, 'status') === 'postponed') {
      const { reason } = interviewSlot
      return (
        <CardContent>
          <p>Your video conference was successfully postponed.</p>
          <p>You can book a new interview slot below.</p>
        </CardContent>
      )
    }
  }

  renderPassed() {
    if (get(this.props, 'interviewSlot.status') === 'passed') {
      return (
        <CardContent>
          <p>Congratulations! Your profile has been verified successfully! You are now a Flexhire verified freelancer</p>
          <p>If you have any questions, email us at info@flexhire.com</p>
        </CardContent>
      )
    }
  }

  renderFailed() {
    if (get(this.props, 'interviewSlot.status') === 'failed') {
      return (
        <CardContent>
          <p>Unfortunately we feel your skills are not strong enough to join Flexhire as a verified Member at this time.</p>
          <p>If you have any questions, email us at info@flexhire.com</p>
        </CardContent>
      )
    }
  }

  renderSlots() {
    const currentStatus = get(this.props, 'interviewSlot.status', 'missing')
    const allowedStatuses = ['missing', 'postponed']
    if (allowedStatuses.indexOf(currentStatus) >= 0) {
      return <ScreeningInterviewSlots />
    }
  }

  renderCurrentSlot() {
    const { interviewSlot } = this.props
    if (interviewSlot) {
      return (
        <Card data-cy={`current-slot-${interviewSlot.status}`}>
          <CardHeader
            title="Your Video Conference"
            subheader={this.renderDateTime()}
          />
          {this.renderBooked()}
          {this.renderPostponed()}
          {this.renderFailed()}
          {this.renderPassed()}
        </Card>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderCurrentSlot()}
        {this.renderSlots()}
      </div>
    )
  }
}

export default CurrentInterviewStatus
