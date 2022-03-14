import React from 'react'
import { Field } from 'redux-form'
import ReactMarkdown from 'react-markdown'
import { Collapse, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemIcon, ListItemText, DialogContentText } from '@material-ui/core'
import { LoadingIcon, ResponsiveDialog, TextField, TextArea } from 'components'
import { Button } from 'components/themed'
import ScreenshotUpload from 'scenes/Job/components/JobApplicationDialog/components/CodeTestSubmission/components/ScreenshotUpload'
import { AddCircle } from '@material-ui/icons'
import styles from './CodeTestBrowser.module.css'

export default class CodeTestBrowser extends React.PureComponent {
  state = {
    isDialogOpen: false,
    isSubmissionDialogOpen: false,
    selectedCodeTestId: -1,
  }

  render() {
    const { isSubmitting, disabled } = this.props

    return (
      <React.Fragment>
        <Button onClick={this.handleOpenClick} disabled={isSubmitting || disabled} data-cy="add-sample-work">
          {!isSubmitting && <AddCircle className={styles['button-icon']} />}
          {isSubmitting && <LoadingIcon className={styles['button-icon']} />}
          Add sample work
        </Button>

        {this.renderDialog()}
        {this.renderSubmissionDialog()}
      </React.Fragment>
    )
  }

  renderDialog() {
    const { projects, projectsReceived, isSubmitting, handleSubmit } = this.props
    const { isDialogOpen, selectedCodeTestId } = this.state

    if (!isDialogOpen) {
      return null
    }

    return (
      <ResponsiveDialog open onClose={this.handleClose}>
        <DialogTitle>
          Add sample work
        </DialogTitle>

        <DialogContent>
          <div className={styles['code-test-description']}>
            One of the strongest validations of expertise is showing work you have done.
            Share a software project you have written or if you don't have an existing project,
            you can build and submit our simple app per the specifiction below.
          </div>

          <List>
            {!projectsReceived && (
              <ListItem>
                <ListItemIcon>
                  <LoadingIcon />
                </ListItemIcon>

                <ListItemText secondary="Loading..." />
              </ListItem>
            )}

            {projectsReceived && (
              <React.Fragment>
                <ListItem
                  button
                  onClick={() => this.handleListItemClick()}
                  className={selectedCodeTestId === -1 ? styles['open-item'] : undefined}
                  data-cy="your-project"
                >
                  <ListItemText primary="Your Project to Share" />
                </ListItem>

                <Collapse in={selectedCodeTestId === -1}>
                  <div className={styles.collapse}>
                    <form className={styles.form}>
                      <div style={{ marginBottom: 12 }}>
                        <Field
                          name="title"
                          placeholder="Project Title"
                          component={TextField}
                        />
                      </div>

                      <div style={{ marginBottom: 12 }}>
                        <Field
                          name="url"
                          component={TextField}
                          fullWidth
                          placeholder="Project repository URL (e.g. Github)"
                        />
                      </div>

                      <div style={{ margin: '12px 0' }}>
                        <Field
                          name="screenshot_url"
                          component={ScreenshotUpload}
                        />
                      </div>

                      <div style={{ paddingTop: 6 }}>
                        <Field
                          name="description"
                          component={TextArea}
                          style={{ minHeight: 120 }}
                          label="Additional notes"
                          placeholder="Additional information about the project... (optional)"
                        />
                      </div>

                      {/*
                      NOTE: Do not use type=submit on this button.
                      Instead, it submits through redux-form using this.submit to avoid conflicting with other forms:
                      Otherwise, when this Component is used inside the Profile form it causes issues.
                      */}
                      <Button variant="contained" color="primary" disabled={isSubmitting} onClick={handleSubmit(formData => this.handleSubmit(undefined, formData))} data-cy="submit-custom-project">
                        {isSubmitting && (<LoadingIcon />)} Submit
                      </Button>
                    </form>
                  </div>
                </Collapse>
              </React.Fragment>
            )}

            {projectsReceived && projects.map(codeTest => (
              <React.Fragment key={codeTest.id}>
                <ListItem
                  button
                  onClick={() => this.handleListItemClick(codeTest)}
                  className={codeTest.id === selectedCodeTestId ? styles['open-item'] : undefined}
                >
                  <ListItemText primary={codeTest.title} />
                </ListItem>

                <Collapse in={codeTest.id === selectedCodeTestId}>
                  <div className={styles.collapse}>
                    <div className={styles['code-test-description']}>
                      <ReactMarkdown source={codeTest.description || 'No description.'} />
                    </div>

                    <div>
                      <Button variant="contained" color="primary" onClick={this.handleSubmitOpenClick} data-cy="submit-existing-project">
                        Submit a project
                      </Button>
                    </div>
                  </div>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClose} data-cy="cancel">
            Cancel
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  renderSubmissionDialog() {
    const { projects, handleSubmit, isSubmitting } = this.props
    const { isSubmissionDialogOpen, selectedCodeTestId } = this.state

    if (!isSubmissionDialogOpen) {
      return null
    }

    const codeTest = projects.find(_codeTest => _codeTest.id === selectedCodeTestId) || {}

    return (
      <ResponsiveDialog open onClose={this.handleSubmissionClose}>
        <DialogTitle>
          Submit a project
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            {codeTest.title}
          </DialogContentText>

          <form className={styles.form}>
            <div style={{ marginBottom: 12 }}>
              <Field
                name="url"
                component={TextField}
                fullWidth
                placeholder="Project repository URL (e.g. Github)"
              />
            </div>

            <div style={{ margin: '12px 0' }}>
              <Field
                name="screenshot_url"
                component={ScreenshotUpload}
              />
            </div>

            <div style={{ paddingTop: 6 }}>
              <Field
                name="description"
                component={TextArea}
                style={{ minHeight: 120 }}
                label="Additional notes"
                placeholder="Additional information about the project... (optional)"
              />
            </div>

            <Button variant="contained" color="primary" disabled={isSubmitting} onClick={handleSubmit(formData => this.handleSubmit(codeTest, formData))} data-cy="submit-code-test">
              {isSubmitting && (<LoadingIcon />)} Submit
            </Button>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleSubmissionClose} data-cy="cancel">
            Cancel
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleSubmit = (codeTest, formData) => {
    this.setState({
      isDialogOpen: false,
      isSubmissionDialogOpen: false,
    })

    this.props.onSubmit(codeTest, formData)
  }

  handleSubmitOpenClick = () => {
    this.setState({
      isDialogOpen: false,
      isSubmissionDialogOpen: true,
    })
  }

  handleOpenClick = () => {
    this.setState({
      isDialogOpen: true,
    })
  }

  handleListItemClick = (codeTest) => {
    this.setState({
      selectedCodeTestId: codeTest ? codeTest.id : -1,
    })
  }

  handleClose = () => {
    this.setState({
      isDialogOpen: false,
    })
  }

  handleSubmissionClose = () => {
    this.setState({
      isSubmissionDialogOpen: false,
      isDialogOpen: true,
    })
  }
}
