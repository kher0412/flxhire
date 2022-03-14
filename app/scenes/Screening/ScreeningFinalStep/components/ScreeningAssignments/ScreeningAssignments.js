import React from 'react'
import { trackError } from 'services/analytics'
import { withRouter } from 'next/router'
import styles from 'scenes/Screening/Screening.module.css'
import ReactMarkdown from 'react-markdown'
import { PageWrapper, PageContainer, InfoMessage } from 'components'
import { Button } from 'components/themed'
import { Divider } from '@material-ui/core'
import Link from 'components/Link'
import { browserHistory } from 'services/router'
import { find as lodashFind } from 'lodash'
import { getAPIClient } from 'api'

class ScreeningAssignments extends React.PureComponent {
  state = {
    assignments: [],
  }

  componentDidMount() {
    this.getAssignments()
  }

  async getAssignments() {
    try {
      const assignments = await getAPIClient().getScreeningAssignments()
      this.setState({ assignments })
    } catch (error) {
      trackError(error)
    }
  }

  goToApplication() {
    browserHistory.push('/application/interview')
  }

  renderAssignments() {
    const { assignments } = this.state
    if (assignments.length > 0) {
      return (
        <ul>
          {assignments.map(a => (
            <li key={a.id}>
              <Link href="/application/assignments/[id]" as={`/application/assignments/${a.id}`} data-cy={`view-assignment-${a.id}`}>{a.title}</Link>
            </li>
          ))}
        </ul>
      )
    }
    return <InfoMessage>We have no assignments at this time. Feel free to contact us at info@flexhire.com</InfoMessage>
  }

  renderAssignment() {
    const { router } = this.props
    const { assignments } = this.state
    const { id } = router.query

    if (id) {
      const assignment = lodashFind(assignments, { id: parseInt(id, 10) })

      if (assignment) {
        return (
          <div>
            <Divider />
            <div className={styles.box}>
              <div className={styles.statement} data-cy={`assignment-${id}-description`}>
                <ReactMarkdown source={assignment.description} />
              </div>
            </div>
          </div>
        )
      }

      return null
    }

    return null
  }

  render() {
    return (
      <PageContainer>
        <PageWrapper raised title="Flexhire Screening Assignments">
          <div className={styles.box}>
            <div className={styles['section-heading']}>
              Code Assignment
            </div>

            <div className={styles.statement}>
              If you have no existing project that you would like to highlight you can build our suggested assignment.
              Once completed, add the URL to the source code repository as part of your submission.
            </div>

            <div className={styles.statement}>
              {this.renderAssignments()}
            </div>
          </div>

          {this.renderAssignment()}

          <div className={styles.box}>
            <div className={styles['button-container']}>
              <Button
                color="primary"
                onClick={this.goToApplication}
              >
                Return to Application
              </Button>
            </div>
          </div>
        </PageWrapper>
      </PageContainer>
    )
  }
}

export default withRouter(ScreeningAssignments)
