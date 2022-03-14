import React from 'react'
import { browserHistory } from 'services/router'
import { getApplicationPathForUser } from 'scenes/Screening/Redirectors'

class ApplicationRedirector extends React.PureComponent {
  render() {
    return null
  }

  componentDidMount() {
    const { user } = this.props
    browserHistory.push(getApplicationPathForUser(user))
  }
}

export default ApplicationRedirector