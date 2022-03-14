import update from 'immutability-helper'

export const SET_QUESTIONS = 'flexhire/questions/SET_QUESTIONS'
export const SET_JOBS = 'flexhire/questions/SET_JOBS'

function getInitialState() {
  return {
    questions: [],
    categoryName: null,
    questionsReceived: false,
    jobs: [],
    jobsReceived: false,
  }
}

export default function QuestionsReducer(state = getInitialState(), action) {
  const p = action.payload
  switch (action.type) {
    case SET_QUESTIONS:
      return update(state, {
        questions: { $set: p.questions },
        categoryName: { $set: p.categoryName || null },
        questionsReceived: { $set: true },
      })
    case SET_JOBS:
      return update(state, {
        jobs: { $set: p.jobs },
        jobsReceived: { $set: true },
      })
    default:
      return state
  }
}
