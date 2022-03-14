import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { Helmet } from 'react-helmet'
import { get } from 'lodash'
import { PageHeader, PageHeaderTitle, PageHeaderSubtitle, PageHeaderPrimaryButton, PageContainer, PageWrapper } from 'components'
import Link from 'components/Link'
import { Grid } from '@material-ui/core'
import SampleQuestions from 'components/SampleQuestions'
import { isClient, isGuest } from 'services/user'
import Question from './components/Question'
import UseQuestionDialog from './components/UseQuestionDialog'
import SubmitQuestionDialog from './components/SubmitQuestionDialog'
import styles from './Questions.module.css'

class Questions extends React.Component {
  state = {
    dialogOpen: false,
    question: undefined,
  }

  componentDidMount() {
    const { getJobs, user } = this.props
    if (isClient(user)) getJobs()
    if (!isGuest(user)) this.refresh()
  }

  refresh = () => {
    const { getFeaturedQuestions, router } = this.props
    getFeaturedQuestions(get(router.query.category))
  }

  render() {
    const { questions = [], questionsReceived, user, jobs = [], categoryName, router } = this.props
    const { dialogOpen, question } = this.state
    const category = router.query.category

    return (
      <div>
        <Helmet>
          <title>Questions</title>
          <meta name="description" content="Post a job with Structured Interview Questions that correlate highly to successful hiring based on a research from Standford University." />
          <meta property="og:title" content={`${categoryName ? `${categoryName} ` : ''}Questions - Flexhire`} />
          <meta property="og:description" content="Post a job with Structured Interview Questions that correlate highly to successful hiring based on a research from Standford University." />
        </Helmet>

        <PageHeader>
          <PageHeaderTitle variant="center">
            Science Based Successful Hiring
          </PageHeaderTitle>

          <PageHeaderSubtitle variant="center">
            Asking all candidates the same questions during an interview is an approach known as Structured Interview Questions.
            According to research from Standford University based on 65 years of interview data, Structured Interview Questions correlate highly to successful hiring.
            <br /><br />
            Flexhire makes it simple for our customers to ask Structured Interview Questions for open roles and see video responses from candidates.
            Ask your own specific questions to candidates or choose from our pre-existing top {categoryName || 'relevant'} interview questions.
          </PageHeaderSubtitle>

          {this.getPostAJobLink() && (
            <Link href={this.getPostAJobLink()} style={{ textDecoration: 'none', maxWidth: 700, display: 'block', margin: '0 auto' }}>
              <PageHeaderPrimaryButton data-cy="post-a-job">
                <MediaQuery minWidth={620}>
                  Post a Job with{categoryName ? ` ${categoryName} ` : ' '}Structured Interview Questions
                </MediaQuery>

                <MediaQuery maxWidth={619}>
                  Post a Job
                </MediaQuery>
              </PageHeaderPrimaryButton>
            </Link>
          )}
        </PageHeader>

        <PageContainer>
          <PageWrapper withoutCard>
            <div>
              {(questions.length === 0) && (
                <div className={styles.placeholder} />
              )}

              {questions.map(q => (
                <div style={{ paddingTop: '20px' }}>
                  <Question
                    key={q.id}
                    user={user}
                    question={q}
                    handleUse={this.useQuestion(q)}
                    onVideoChanged={this.refresh}
                  />
                </div>
              ))}
            </div>

            <Grid container>
              <Grid item xs={12} md={6}>
                {this.getPostAJobLink() && (
                  <Link href={this.getPostAJobLink()} style={{ textDecoration: 'none' }}>
                    <PageHeaderPrimaryButton>
                      Post a Job with Questions
                    </PageHeaderPrimaryButton>
                  </Link>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <PageHeaderPrimaryButton onClick={this.openSubmitQuestion} data-cy="submit-question">
                  Have a Good Question? Add it!
                </PageHeaderPrimaryButton>
              </Grid>
            </Grid>

            {category && (
              <SampleQuestions
                parentName={category}
                title="Related Interview Questions"
                subtitle={null}
              />
            )}
          </PageWrapper>
        </PageContainer>

        <UseQuestionDialog
          open={Boolean(dialogOpen && question)}
          jobs={jobs}
          question={question}
          onClose={this.closeDialog}
        />

        <SubmitQuestionDialog
          open={Boolean(dialogOpen && !question)}
          onClose={this.closeDialog}
        />
      </div>
    )
  }

  getPostAJobLink = () => {
    const { user } = this.props
    if (isGuest(user)) return '/signup/client?mode=job'
    if (isClient(user)) return '/client/job/add_job/job'
    return null
  }

  useQuestion = question => () => this.setState({ dialogOpen: true, question })

  openSubmitQuestion = () => this.setState({ dialogOpen: true, question: undefined })

  closeDialog = () => this.setState({ dialogOpen: false, question: undefined })
}

export default Questions
