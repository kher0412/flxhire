import { createAction } from 'redux-actions'
import { withRouter } from 'next/router'
import { getAPIClient } from 'api'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { trackError } from 'services/analytics'
import { connect } from 'react-redux'
import { SET_QUESTIONS, SET_JOBS } from './QuestionDucks'
import Questions from './Questions'

const mapStateToProps = state => ({
  questions: state.questions.questions,
  questionsReceived: state.questions.questionsReceived,
  jobs: state.questions.jobs,
  jobsReceived: state.questions.jobsReceived,
  categoryName: state.questions.categoryName,
  user: state.auth.currentUser,
})

const mapDispatchToProps = dispatch => ({
  getFeaturedQuestions: async (category) => {
    try {
      if (category) {
        const response = await getAPIClient().getQuestionsFeaturedInCategory(category)
        dispatch(createAction(SET_QUESTIONS)({ questions: response.list, categoryName: response.category_name }))
      } else {
        const response = await getAPIClient().getQuestions({ featured: true })
        dispatch(createAction(SET_QUESTIONS)({ questions: response.body }))
      }
    } catch (error) {
      trackError(error)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Could not fetch Questions' }))
    }
  },
  getJobs: async () => {
    try {
      const jobs = await getAPIClient().getJobs()
      dispatch(createAction(SET_JOBS)({ jobs }))
    } catch (error) {
      trackError(error)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Could not fetch Jobs' }))
    }
  },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions))
