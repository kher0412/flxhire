import React from 'react'
import { Button, Collapse } from '@material-ui/core'
import SuggestedQuestions from 'scenes/FreelancerDashboard/Dashboard/components/SuggestedQuestions'
import { AddCircle } from '@material-ui/icons'
import styles from './AddVideoAnswers.module.css'

export default class AddVideoAnswers extends React.PureComponent {
  state = {
    isQuestionsPanelOpen: false,
  }

  render() {
    const { onAnswerSubmit, isProfileCreationMode } = this.props
    const { isQuestionsPanelOpen } = this.state

    return (
      <div className={styles.container}>
        <div>
          <Button onClick={this.handleOpenClick} disabled={isProfileCreationMode}>
            <AddCircle className={styles['button-icon']} /> Add more videos
          </Button>

          <div className={styles.text}>
            {isProfileCreationMode && (
              <React.Fragment>
                Finish and save your profile first, then improve your profile by adding video answers to questions commonly queried by clients.
              </React.Fragment>
            )}

            {!isProfileCreationMode && (
              <React.Fragment>
                Improve your profile by adding video answers to questions commonly queried by clients.
              </React.Fragment>
            )}
          </div>
        </div>

        <Collapse
          in={isQuestionsPanelOpen}
          style={isQuestionsPanelOpen ? { marginTop: 24 } : undefined}
        >
          <SuggestedQuestions onAnswerSubmit={onAnswerSubmit} />
        </Collapse>
      </div>
    )
  }

  handleOpenClick = () => {
    this.setState(state => ({
      isQuestionsPanelOpen: !state.isQuestionsPanelOpen,
    }))
  }
}
