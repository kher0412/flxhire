import React from 'react'
import { ServerError, FileUpload } from 'components'
import { Button, TextField, TextArea } from 'components/themed'
import { reduxForm, Field } from 'redux-form'
import { Grid, Divider, Typography } from '@material-ui/core'
import Link from 'components/Link'
import { connect } from 'react-redux'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import styles from '../../../Screening.module.css'
import {
  submitProjectForm,
  setProjects,
} from './ProjectFormDucks'

class ProjectFormComponent extends React.Component {
  componentDidMount() {
    this.props.getProjects()
  }

  render() {
    const {
      handleSubmit,
      submitting,
      submitForm,
      serverError,
    } = this.props

    return (
      <form onSubmit={handleSubmit(submitForm)}>
        <div className={styles.box}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4">
                Your Software Project
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                Please provide a Project representing your skills. Once we review your submission we will contact you to schedule your video conference.
                You will be asked to showcase your Project and potentially make live modifications to it, so make sure you have your development
                environment set up to work on the Project.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1">
                Consider the Project a representation of your skills, so it is important that it's fully functional and well written.
                Don't have an existing project? <Link href="/application/assignments" data-cy="view-assignments">Build one of our assignments</Link>
              </Typography>
            </Grid>

            <Grid item xs={12} />

            <Grid item xs={12} md={5}>
              <Field name="title" label="Project Title" component={TextField} fullWidth />
            </Grid>

            <Grid item xs={12} md={7}>
              <Field name="url" label="Project Homepage (with source code, eg a github repo)" component={TextField} fullWidth />
            </Grid>

            <Grid item xs={12} md={12}>
              <Field
                name="description"
                label="Project description"
                placeholder="Write a few brief lines about your project"
                component={TextArea}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Field
                name="screenshot_url"
                label="Upload screenshot"
                component={FileUpload}
                color="secondary"
              />
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div style={{ padding: 24, textAlign: 'right' }}>
          <ServerError error={serverError} />

          <Button
            color="primary"
            className={styles.button}
            type="submit"
            disabled={submitting}
            data-cy="save-project"
          >
            Save
          </Button>
        </div>
      </form>
    )
  }
}

export const ProjectForm = ProjectFormComponent

export const ProjectReduxForm = reduxForm({
  form: 'profileProject',
  enableReinitialize: true,
  validate: (values) => {
    const errors = {}
    if (!values.title) { errors.title = 'Required' }
    if (!values.description) { errors.description = 'Required' }
    return errors
  },
})(ProjectForm)

const mapStateToProps = (state) => {
  return state.screening.application.projectForm
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (formData) => { dispatch(submitProjectForm(formData)) },
    getProjects: async () => {
      try {
        const projects = await getAPIClient().getSubmittedProjects()
        dispatch(setProjects(projects))
      } catch (error) {
        trackError(error)
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectReduxForm)
