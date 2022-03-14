import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { browserHistory } from 'services/router'
import { Stepper, Step, StepButton, Card, Typography, CardContent, CardActions, Collapse } from '@material-ui/core'
import { Button } from 'components/themed'
import { getDefaultPath } from 'services/auth'
import styles from './ProfileLevelStepper.module.css'
import { ProfileLevelStepperContainerProps } from './ProfileLevelStepperContainer'

export interface IProfileLevelStepperProps {
  defaultShowContent?: boolean
}

export interface IProfileLevelStepperState {
  isStepContentOpen: boolean
}

export default class ProfileLevelStepper extends React.PureComponent<IProfileLevelStepperProps & ProfileLevelStepperContainerProps, IProfileLevelStepperState> {
  constructor(props: IProfileLevelStepperProps & ProfileLevelStepperContainerProps) {
    super(props)

    this.state = {
      isStepContentOpen: props.defaultShowContent,
    }
  }

  render() {
    const { isStepContentOpen } = this.state
    const { user } = this.props
    const activeStep = this.getCurrentStep()

    return (
      <MediaQuery maxWidth={500}>
        {isMobile => (
          <div className={isStepContentOpen ? styles['step-content-open'] : undefined}>
            {user?.profile?.open_to_opportunities && (
              <Stepper
                orientation="horizontal"
                alternativeLabel={isMobile}
                className={styles.stepper}
                activeStep={activeStep}
              >
                <Step>
                  <StepButton
                    className={this.getStepStyleName(0)}
                    disabled={activeStep !== 0}
                  >
                    <span className={styles['step-label-text']}>
                      Create profile
                    </span>
                  </StepButton>
                </Step>

                <Step>
                  <StepButton
                    className={this.getStepStyleName(1)}
                    disabled={activeStep !== 1}
                    onClick={this.handleStepContentOpen}
                  >
                    <span className={styles['step-label-text']}>
                      Verify profile
                    </span>
                  </StepButton>
                </Step>

                <Step>
                  <StepButton
                    className={this.getStepStyleName(2)}
                    disabled={activeStep !== 2}
                    onClick={this.handleStepContentOpen}
                  >
                    <span className={styles['step-label-text']}>
                      Feature profile
                    </span>
                  </StepButton>
                </Step>
              </Stepper>
            )}

            {user && !user.feature_step_completed && (
              <Collapse in={isStepContentOpen}>
                <Card className={styles['step-content']} raised>
                  <CardContent>
                    {this.renderStepContent()}
                  </CardContent>

                  <CardActions>
                    {this.renderStepAction(isMobile)}

                    <Button onClick={this.handleStepContentClose}>
                      Hide
                    </Button>
                  </CardActions>
                </Card>
              </Collapse>
            )}
          </div>
        )}
      </MediaQuery>
    )
  }

  renderStepContent() {
    const { user } = this.props

    if (user.status === 'unverified') {
      return (
        <Typography variant="body1">
          Your profile is created! To be automatically recommended to potential clients, submit your profile for verification.
        </Typography>
      )
    }

    if (user.status === 'accepted') {
      return (
        <Typography variant="body1">
          Get featured by referring a colleague to Flexhire and writing a blog post
        </Typography>
      )
    }

    if (user.status === 'rejected') {
      return (
        <React.Fragment>
          <Typography variant="body1" data-cy="application-text-rejected">
            Thank you for submitting your Screening Application.
            Unfortunately, at this time we have decided to
            reject your request to become a Verified Freelancer.
          </Typography>

          {user.profile.allow_screening && (
            <React.Fragment>
              <Typography variant="body1">
                You can try again, or cancel your application. If you decide to Cancel your Application, you will still be able to
                re-enter the process without losing your progress.
              </Typography>

              {user.profile.screening_feedback && (
                <Typography variant="body1">
                  Should you instead decide to try again, we have the following feedback for you: <b>{user.profile.screening_feedback}</b>
                </Typography>
              )}
            </React.Fragment>
          )}

          {!user.profile.allow_screening && user.profile.screening_feedback && (
            <Typography variant="body1">
              Your request has been rejected for the following reason: {user.profile.screening_feedback}
            </Typography>
          )}

          <Typography variant="body1">
            If you have any questions, email us at info@flexhire.com
          </Typography>
        </React.Fragment>
      )
    }

    return (
      <Typography variant="body1">
        Profile verification application in progress.
      </Typography>
    )
  }

  renderStepAction(isMobile) {
    const { user, startApplication, cancelApplication } = this.props

    if (user.status === 'unverified') {
      return (
        <Button
          fullWidth={isMobile}
          color="primary"
          onClick={startApplication}
          data-cy="start-application"
        >
          Verify Profile
        </Button>
      )
    }

    if (user.status === 'accepted') {
      return (
        <React.Fragment>
          <Button
            fullWidth={isMobile}
            color="primary"
            onClick={this.handleCreatePostClick}
          >
            <MediaQuery minWidth={601}>
              Create a Post
            </MediaQuery>

            <MediaQuery maxWidth={600}>
              Post
            </MediaQuery>
          </Button>

          <Button
            fullWidth={isMobile}
            color="primary"
            onClick={this.handleReferralsClick}
          >
            <MediaQuery minWidth={601}>
              Refer a colleague
            </MediaQuery>

            <MediaQuery maxWidth={600}>
              Refer
            </MediaQuery>
          </Button>
        </React.Fragment>
      )
    }

    if (user.status === 'rejected') {
      return (
        <React.Fragment>
          {user.profile.allow_screening && (
            <Button
              fullWidth={isMobile}
              color="primary"
              onClick={startApplication}
              data-cy="restart-application"
            >
              Re-verify
            </Button>
          )}

          <Button
            fullWidth={isMobile}
            color="secondary"
            onClick={cancelApplication}
            data-cy="cancel-application"
          >
            Cancel
          </Button>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <Button
          fullWidth={isMobile}
          variant="contained"
          color="primary"
          onClick={this.handleViewApplication}
        >
          View
        </Button>
      </React.Fragment>
    )
  }

  handleViewApplication = () => {
    browserHistory.push('/application')
  }

  handleViewHome = () => {
    const { user } = this.props
    browserHistory.push(getDefaultPath(user))
  }

  handleCreatePostClick = () => {
    browserHistory.push('/blog/create-post')
  }

  handleReferralsClick = () => {
    browserHistory.push('/referrals')
  }

  handleStepContentOpen = () => {
    this.setState({
      isStepContentOpen: true,
    })
  }

  handleStepContentClose = () => {
    this.setState({
      isStepContentOpen: false,
    })
  }

  getStepStyleName(step: number): string {
    const activeStep = this.getCurrentStep()

    if (step === activeStep) {
      return [styles['step-label'], styles.current].join(' ')
    }

    if (activeStep > step) {
      return [styles['step-label'], styles.completed].join(' ')
    }

    return styles['step-label']
  }

  getCurrentStep(): number {
    const { user } = this.props

    if (user.feature_step_completed) {
      return 3
    }

    if (user.status === 'unverified') {
      return 1
    }

    if (user.status === 'accepted') {
      return 2
    }

    if (user.status === 'rejected') {
      return 1
    }

    return 1
  }
}
