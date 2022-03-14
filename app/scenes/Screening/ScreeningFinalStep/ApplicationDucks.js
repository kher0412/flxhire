import { combineReducers } from "redux"
import projectForm from './components/ProjectForm/ProjectFormDucks'
import scheduleInterview from './components/ScheduleInterview/ScheduleInterviewDucks'

export const SUBMIT_APPLICATION = 'flexhire/profile/video_interview/SUBMIT_APPLICATION'

export function submitApplication() {
  return {
    type: SUBMIT_APPLICATION
  }
}

export default combineReducers({
  projectForm,
  scheduleInterview
})
