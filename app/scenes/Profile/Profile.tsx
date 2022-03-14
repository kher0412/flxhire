import React from 'react'
import { getLocationHash, extractQueryParams } from 'services/router'
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  MenuItem,
  Grid,
  FormControlLabel,
  Hidden,
  Tooltip,
} from '@material-ui/core'
import {
  PagePlaceholder,
  PageHeader,
  PageHeaderTitle,
  PageContainer,
  PageWrapper,
  FreelancerProfile,
  ExternalLink,
  PageSideAction,
  MoreButtonDialog,
  ShareWidget,
} from 'components'
import { Button, SelectField, InfoMessage } from 'components/themed'
import { pickAndStore } from 'services/filestack'
import { IContractForFreelancer } from 'types'
import { Field } from 'redux-form'
import SwitchField from 'components/SwitchField'
import { isImportingResume } from 'services/freelancer'
import { AttachFile, CloudUpload, Save, Share } from '@material-ui/icons'
import styles from './Profile.module.css'
import { ContainerProps } from './ProfileContainer'

interface IProfileState {
  jobApplications: IContractForFreelancer[],
  showFrame: boolean,
}

class Profile extends React.Component<ContainerProps, IProfileState> {
  state = {
    jobApplications: [],
    showFrame: true,
  }

  componentDidMount() {
    const { refresh, getJobApplications, user } = this.props
    const isPending = user.status === 'pending'
    refresh()
    getJobApplications().then(jobApplications => this.setState({ jobApplications }))

    if (isPending) {
      this.setState({
        showFrame: false,
      })
    }
  }

  renderContent() {
    const {
      handleSubmit,
      submitting,
      isSubmitting,
      isAutosaving,
      submitForm,
      submitFailed,
      user,
      resume,
      errors,
      router,
      pristine,
      liteMode,
    } = this.props
    let { jobApplications, showFrame } = this.state
    const isPending = user.status === 'pending'
    const loading = submitting || isSubmitting || isAutosaving // isSubmitting/isAutosaving is true while the saga is running
    const hasOneJobApplication = jobApplications.length === 1
    const onlyJobApplicationIsDraft = hasOneJobApplication && jobApplications[0].status === 'job_application_draft'
    let label = 'Save'
    if (onlyJobApplicationIsDraft) label = 'Save and Apply'
    if (loading && !isAutosaving) label = 'Saving...'
    if (isPending) {
      label = 'Create'
      if (onlyJobApplicationIsDraft) label = 'Create and Apply'
      if (loading && !isAutosaving) label = 'Creating...'
    }
    const showUnsavedChangesNotification = !isPending && (isSubmitting || (!loading && !pristine))
    const showImportResume = !showUnsavedChangesNotification
    const importingResume = isImportingResume(resume)
    // Prevent saving if applying to a job and closed to opportunities
    const disableSave = loading || ((onlyJobApplicationIsDraft || this.applyingToJob()) && liteMode)
    const workingOrOfferedJob = user?.profile?.working_or_offered_job

    return (
      <React.Fragment>
        {(isPending && !liteMode) && this.renderSubmit()}

        <PageWrapper noAnim cardStyle={{ overflow: 'visible' }} withoutCard>
          <Card raised className={styles.card}>
            <form onSubmit={handleSubmit(submitForm)}>
              {showFrame && (
                <div className={styles.controls}>
                  <Hidden smUp>
                    <Grid container spacing={2}>
                      <Grid item xs={12} style={{ textAlign: 'center' }}>
                        {!workingOrOfferedJob && this.renderLiteToggle()}
                      </Grid>

                      <Grid item xs={6}>
                        {this.renderShareButton()}
                      </Grid>

                      <Grid item xs={6}>
                        {this.renderVisibilitySelect()}
                      </Grid>
                    </Grid>
                  </Hidden>

                  <Hidden xsDown>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        {this.renderShareButton()}
                      </Grid>

                      <Grid item xs={4}>
                        {!workingOrOfferedJob && this.renderLiteToggle()}
                      </Grid>

                      <Grid item xs={4}>
                        {this.renderVisibilitySelect()}
                      </Grid>
                    </Grid>
                  </Hidden>
                </div>
              )}

              {!showFrame && (
                <FreelancerProfile
                  editable
                  errors={errors}
                  liteMode={liteMode}
                  defaultTab={parseInt(getLocationHash(router), 10) || 0}
                />
              )}

              {showFrame && (
                <div className={styles.wrapper}>
                  <div>
                    <FreelancerProfile
                      editable
                      errors={errors}
                      liteMode={liteMode}
                      defaultTab={parseInt(getLocationHash(router), 10) || 0}
                    />
                  </div>
                </div>
              )}

              <Divider />

              <div className={styles['button-container']}>
                <span style={{ marginLeft: 'auto', marginRight: '15px', color: '#f44336' }} data-cy="profile-error">
                  {submitFailed && 'Please complete your Profile'}
                </span>

                <Button
                  style={{ marginRight: '12px', marginBottom: '12px' }}
                  type="submit"
                  color="primary"
                  disabled={disableSave}
                  data-cy="save-and-continue"
                >
                  {label}
                </Button>
              </div>
            </form>

            <PageSideAction
              subtitle="You have unsaved changes on your profile."
              icon={<Save />}
              show={showUnsavedChangesNotification && showFrame}
              loading={isSubmitting}
              onConfirm={() => handleSubmit(submitForm)()}
            />

            {(!resume && showFrame) && (
              <PageSideAction
                title="Import your Resume/CV"
                subtitle="By uploading a Resume or CV, our system will attempt to import its data into your Flexhire profile"
                icon={<CloudUpload />}
                show={showImportResume}
                loading={importingResume}
                buttonText="Upload"
                loadingButtonText="Importing..."
                onConfirm={this.importResume}
              />
            )}
          </Card>
        </PageWrapper>

        {this.renderVanityURL()}
      </React.Fragment>
    )
  }

  applyingToJob() {
    const { router } = this.props
    return Boolean(extractQueryParams(router?.asPath)?.job)
  }

  renderVanityURL() {
    const { user, liteMode } = this.props
    const isPending = user.status === 'pending'

    if (this.applyingToJob() && !user.profile.open_to_opportunities) {
      return (
        <InfoMessage data-cy="closed-to-opportunities" className={styles.infoMessage}>
          Your profile is currently set to closed to opportunities. To complete your job application, set your profile to open to opportunities.
        </InfoMessage>
      )
    }

    if (liteMode) return null

    if (isPending) {
      return (
        <InfoMessage data-cy="private-profile" className={styles.infoMessage}>
          Your profile will not be publicly visible until you submit it
        </InfoMessage>
      )
    }

    return null
  }

  renderShareButton() {
    const { user, liteMode } = this.props
    const isPending = user.status === 'pending'

    if (liteMode || isPending) return null

    return (
      <Tooltip title="Share my profile">
        <MoreButtonDialog
          icon={<Share />}
          dialogTitle="Share my profile"
          component={Button}
          iconOnly
          color="secondary"
        >
          <ShareWidget url={`https://flexhire.com/${user?.profile?.slug}`} />
        </MoreButtonDialog>
      </Tooltip>
    )
  }

  renderLiteToggle() {
    return (
      <FormControlLabel
        control={(
          <Field
            name="open_to_opportunities"
            component={SwitchField}
          />
        )}
        label="Open to opportunities"
        data-cy="open-to-opportunities-button"
      />
    )
  }

  renderVisibilitySelect() {
    const { user, liteMode } = this.props
    const isPending = user.status === 'pending'

    if (liteMode || isPending) return null

    return (
      <Field
        name="visibility"
        component={SelectField}
        label="Profile visibility"
        fullWidth
      >
        <MenuItem value="visibility_public">
          Public
        </MenuItem>

        <MenuItem value="visibility_clients">
          Clients only
        </MenuItem>

        <MenuItem value="visibility_private">
          Private
        </MenuItem>
      </Field>
    )
  }

  renderSubmit() {
    const { user } = this.props
    const { jobApplications } = this.state
    const hasJobApplications = user?.job_applications_count > 0 || jobApplications.length > 0
    const dataCy = hasJobApplications ? 'complete-profile-for-job-message' : undefined
    let title = 'Create your Profile'
    let text = "Create a rich professional profile page about you to join Flexhire and find great work. Don't worry, your progress is auto saved. You can come back to complete it any time."
    if (hasJobApplications) {
      const contract: IContractForFreelancer = jobApplications.length === 1 ? jobApplications[0] : null
      title = 'Complete your profile to finish your Job Application'
      text = `${contract?.company_name || 'the company'} is requesting applicants complete the profile below to streamline assessment. If you like, use our resume import tool for initial population. Progress is auto saved so you can come back to complete it any time! Click submit once done to complete your application.`
      if (contract) {
        title = `Complete your profile to finish your Job Application to ${contract.job_title} from ${contract.company_name}`
      }
    }

    return (
      <Card raised data-cy={dataCy} className={styles.introCard}>
        <CardHeader title={title} titleTypographyProps={{ variant: 'subtitle2' }} />

        <CardContent className={styles.introCardContent}>
          {text}
          <List style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            {this.renderResumeListItem()}
          </List>
        </CardContent>
      </Card>
    )
  }

  renderResumeListItem() {
    const { resume, user } = this.props
    const copy = 'By uploading a Resume or CV, our system will attempt to import its data into your Flexhire profile'
    const hasError = resume && (!resume?.success || resume?.status === 'processing_failed') && user?.status === 'pending'
    const error = 'Unfortunately our system was not able to fill out your profile using data from your resume/CV. Please complete your profile manually.'

    if (!hasError && user.status === 'pending' && resume) return null

    return (
      <ListItem button onClick={this.importResume}>
        <ListItemIcon><AttachFile /></ListItemIcon>
        <ListItemText
          primary={resume ? 'Update your Resume/CV' : 'Import your Resume/CV'}
          secondary={hasError ? <span className={styles['resume-error']}>{error}</span> : copy}
        />
      </ListItem>
    )
  }

  render() {
    const { user, loading, resume } = this.props
    const hasJobApplications = user?.job_applications_count > 0
    const isPending = user.status === 'pending'
    const importingResume = isImportingResume(resume)

    return (
      <React.Fragment>
        <PageHeader compact>
          {!hasJobApplications && !isPending && (
            <PageHeaderTitle>
              Your Profile
            </PageHeaderTitle>
          )}
        </PageHeader>

        <PageContainer className={styles.page}>
          {loading && <PagePlaceholder title="Please Wait" subtitle="Preparing profile..." />}
          {importingResume && <PagePlaceholder title="Please Wait" subtitle="Importing data..." />}
          {!loading && !importingResume && this.renderContent()}
        </PageContainer>
      </React.Fragment>
    )
  }

  importResume = () => {
    pickAndStore(
      {
        accept: ['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      },
      file => this.props.importResume({ url: file.url, filename: file.filename, mimetype: file.mimetype }),
    )
  }
}

export default Profile
