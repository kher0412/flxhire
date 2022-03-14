import React from 'react'
import { get } from 'lodash'
import { PageWrapper } from 'components'
import CurrentInterviewStatus from './components/CurrentInterviewStatus'
import styles from 'scenes/Screening/Screening.module.css'

class ScheduleInterview extends React.Component {
  render() {
    return (
      <PageWrapper raised>
        <div className={styles.box}>
          <div className={styles['section-heading']}>
            Schedule your Video Conference as the final step to become a verified profile.
          </div>

          <div className={styles.statement}>
            Your Video Introduction and References have been reviewed by Flexhire and accepted. As a last step,
            we would like to briefly meet you by video conference. A member of the Flexhire team will talk through your professional skills.
          </div>

          <div className={styles['section-heading']}>
            Video conference Requirements
          </div>

          <div className={styles.statement}>
            <li>A stable internet connection able to conduct a video call with a front facing camera and screen sharing</li>
            <li>A Google account: the interview will take place using Google Meet, so make sure Google Hangout/Meet works for you</li>
            {this.renderDeveloperSpecificRequirements()}
          </div>

          <div className={styles['section-heading']}>
            Choose your Preferred Time
          </div>

          <div className={styles.statement}>
            Pick any available slot for your video conference with a Flexhire team member. Once you have scheduled your
            video conference, make sure to satisfy the requirements listed above.
          </div>

          <div className={styles.statement}>
            <CurrentInterviewStatus />
          </div>
        </div>
      </PageWrapper>
    )
  }

  renderDeveloperSpecificRequirements() {
    if (get(this.props.user, 'profile.screening_requires_project')) {
      return (
        <div>
          <li>The project that you submitted as part of your application, running locally ready to present and discuss.</li>
          <li>Your full development environment: you may be asked to make changes to your showcased project</li>
        </div>
      )
    }
    return undefined
  }
}

export default ScheduleInterview
