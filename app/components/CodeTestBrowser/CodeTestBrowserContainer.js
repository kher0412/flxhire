import React from 'react'
import { reduxForm } from 'redux-form'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import CodeTestBrowser from './CodeTestBrowser'

class CodeTestBrowserContainer extends React.Component {
  state = {
    projects: [],
    projectsReceived: false,
    isSubmitting: false,
  }

  async componentDidMount() {
    try {
      this.setState({
        projects: (await getAPIClient().getProjects({ per_page: 9999 })).filter(codeTest => !codeTest.custom),
        projectsReceived: true,
      })
    } catch (err) {
      trackError(err)

      this.setState({
        projectsReceived: true,
      })
    }
  }

  render() {
    const { handleSubmit, ...restProps } = this.props
    const { projects, projectsReceived, isSubmitting } = this.state

    return (
      <CodeTestBrowser
        {...restProps}
        projects={projects}
        projectsReceived={projectsReceived}
        handleSubmit={handleSubmit}
        onSubmit={this.onSubmit}
        isSubmitting={isSubmitting}
        submit={this.submit}
      />
    )
  }

  onSubmit = async (project, formData) => {
    this.setState({
      isSubmitting: true,
    })

    let projectSubmission

    try {
      if (project) {
        projectSubmission = await getAPIClient().submitProjectSubmission(project.id, formData)
      } else {
        projectSubmission = await getAPIClient().sendProfileProjectForm({ title: formData.title }, { ...formData, status: 'public' })
      }
    } catch (err) {
      trackError(err)
    }

    this.setState({
      isSubmitting: false,
    })

    if (this.props.onProjectSubmissionSubmit) {
      this.props.onProjectSubmissionSubmit(projectSubmission)
    }
  }
}

function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = 'Required'
  }

  if (!values.url) {
    errors.url = 'Required'
  } else {
    // Perform very basic url validation.
    let url = values.url.trim()

    if (url.indexOf(' ') !== -1 || url.indexOf('.') === -1) {
      errors.url = 'URL does not appear to be valid'
    }
  }

  if (values.description && values.description.length > 1000) {
    errors.url = 'Limit is 1000 characters'
  }

  return errors
}

export default reduxForm({ form: 'CodeTestBrowser', validate, initialValues: { title: '' } })(CodeTestBrowserContainer)
