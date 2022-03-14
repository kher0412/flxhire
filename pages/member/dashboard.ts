import FreelancerDashboard from 'scenes/FreelancerDashboard'
import { withLayout } from 'withLayout'
import { createAction } from 'redux-actions'
import { trackError, ctxErrorInfo } from 'services/analytics'
import { SET_INTERVIEWS } from 'scenes/FreelancerDashboard/Dashboard/components/InterviewRequests/components/InterviewRequest/InterviewRequestDucks'
import { SET_JOB_APPLICATIONS } from 'scenes/FreelancerDashboard/Dashboard/components/JobApplications/JobApplicationsDucks'
import { SET_TIMESHEETS, SET_TIMESHEET_STATS } from 'scenes/FreelancerTimesheets/FreelancerTimesheetsDucks'
import { INextPageContext } from 'types'

(FreelancerDashboard as any).getInitialProps = async (ctx: INextPageContext) => {
  try {
    const [interviews, timesheetsResponse, stats, contracts] = await Promise.all([
      ctx.api.getContracts({ freelancer_id: ctx.currentUser?.id }),
      ctx.api.getFreelancerTimesheets({ page: 1, per_page: 25 }),
      ctx.api.getTimesheetStats(),
      ctx.api.getContracts({ freelancer_id: ctx.currentUser?.id, status: 'job_application_draft,job_application_invited,job_application_sent' }),
    ])

    ctx.store.dispatch(createAction(SET_INTERVIEWS)({ interviews }))

    ctx.store.dispatch(createAction(SET_TIMESHEETS)({
      timesheets: timesheetsResponse.body,
      count: timesheetsResponse.headers.totalCount,
      page: 0,
      rowsPerPage: 25,
    }))

    ctx.store.dispatch(createAction(SET_TIMESHEET_STATS)({ stats }))
    ctx.store.dispatch(createAction(SET_JOB_APPLICATIONS)({ contracts }))
  } catch (error) {
    trackError(error, ctxErrorInfo(ctx))
  }

  return {}
}

export default withLayout(FreelancerDashboard, { name: 'FreelancerDashboard' })
