import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { get } from 'lodash'
import { getAPIClient } from 'api'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import ScreeningInterviewSlots from './ScreeningInterviewSlots'
import {
  setSlots,
  setCurrentSlot,
  ROWS_PER_PAGE,
} from '../../ScheduleInterviewDucks'

const mapStateToProps = state => ({
  pagination: state.screening.application.scheduleInterview.pagination,
  interviewSlots: state.screening.application.scheduleInterview.interviewSlots,
  interviewSlotsReceived: state.screening.application.scheduleInterview.interviewSlotsReceived,
})

const getScreeningInterviews = async (params = {}) => {
  const apiParams = {
    per_page: get(params, 'rowsPerPage', ROWS_PER_PAGE),
    page: get(params, 'page', 0) + 1,
  }
  return await getAPIClient().getScreeningInterviews(apiParams)
}

const mapDispatchToProps = dispatch => ({
  getScreeningInterviews: async () => {
    const response = await getScreeningInterviews()
    dispatch(setSlots(response))
  },
  bookSlot: async (id) => {
    try {
      const currentSlot = await getAPIClient().bookScreeningInterview(id)
      if (currentSlot) dispatch(setCurrentSlot(currentSlot))
    } catch (error) {
      console.log(error)
      const message = 'Booking Failed'
      dispatch(createAction(TOGGLE_SNACKBAR)({ message }))
    }
  },
  onChangePage: async (params) => {
    const response = await getScreeningInterviews(params)
    dispatch(setSlots({ params, ...response }))
  },
  onChangeRowsPerPage: async (params) => {
    const response = await getScreeningInterviews(params)
    dispatch(setSlots({ params, ...response }))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ScreeningInterviewSlots)
