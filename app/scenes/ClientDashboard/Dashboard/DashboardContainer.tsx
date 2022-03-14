/* eslint-disable relay/unused-fields */
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { withRouter } from 'next/router'
import FlexhireAPI, { getAPIClient } from 'api'
import { IAPIError, ICurrentUser, IJob } from 'types'
import { RootState } from 'reducers'
import { trackError } from 'services/analytics'
import { errorToObject } from 'services/error'
import { fetchQuery } from 'api/graphql'
import { graphql } from 'relay-runtime'
import { DashboardContainer_PayrollItemsQuery } from '__generated__/DashboardContainer_PayrollItemsQuery.graphql'
import { DashboardContainer_BonusesQuery } from '__generated__/DashboardContainer_BonusesQuery.graphql'
import { Suspense } from 'components'
import {
  SET_JOB_DATA, SET_TEAM_DATA, SET_INVOICES_DATA, SET_TIMESHEET_DATA,
  SET_INTERVIEW_DATA, SET_OFFERS_DATA, SET_TIMESHEET_SUMMARY_DATA,
  SET_APPLICATIONS_DATA, SET_SCREENING_DATA, SET_CANDIDATES_DATA, SET_CONTRACT_STATS, GET_DASHBOARD_DATA, SET_ERROR, SET_PAYROLL_ITEMS_DATA, SET_BONUSES_DATA,
} from '../ClientDashboardDucks'
import Dashboard from './Dashboard'

const handleError = (dispatch: any, error: IAPIError, context?: string) => {
  trackError(error)
  if (context) dispatch(createAction(SET_ERROR)({ error: errorToObject(error), context }))
}

const getJobs = async (dispatch, jobsPromise: Promise<IJob[]>, jobsManagedByMePromise: Promise<IJob[]>) => {
  try {
    // Jobs and Candidates
    const jobs = await jobsPromise
    const jobsManagedByMe = await jobsManagedByMePromise

    dispatch(createAction(SET_JOB_DATA)({ jobs, jobsManagedByMe }))
  } catch (error) {
    handleError(dispatch, error, 'jobs')
  }
}

const getTeam = async (dispatch, api: FlexhireAPI, user: ICurrentUser) => {
  try {
    // Team
    const team = await api.getContractsPaginated({
      firm_id: user.firm?.id,
      stage: 'contract',
      status: 'active,paused',
      per_page: 3,
    })

    const managedByMe = await api.getContractsPaginated({
      firm_id: user.firm?.id,
      stage: 'contract',
      status: 'active,paused',
      client_id: user.id,
      per_page: 3,
    })

    dispatch(createAction(SET_TEAM_DATA)({
      myTeam: managedByMe.body,
      myTeamCount: managedByMe.headers.totalCount,
      team: team.body,
      teamCount: team.headers.totalCount,
    }))
  } catch (error) {
    handleError(dispatch, error, 'team')
  }
}

const getInvoices = async (dispatch, api: FlexhireAPI, user: ICurrentUser) => {
  try {
    // Invoices
    const invoices = await api.getClientInvoices({ sort: 'actionable' })
    const invoicesManagedByMe = await api.getClientInvoices({ sort: 'actionable', client_id: user.id })
    const invoicesSummary = await api.getClientInvoicesSummary()

    dispatch(createAction(SET_INVOICES_DATA)({
      invoices: invoices.body,
      invoicesManagedByMe: invoicesManagedByMe.body,
      invoiceCount: invoices.headers.totalCount,
      invoiceStats: invoicesSummary.body,
    }))
  } catch (error) {
    handleError(dispatch, error, 'invoices')
  }
}

const getTimesheetsSummary = async (dispatch, api: FlexhireAPI, user: ICurrentUser) => {
  try {
    // Timesheets
    const allTimesheetsCount = await api.getClientTimesheetsSummary()
    const allTimesheetsCountManagedByMe = await api.getClientTimesheetsSummary({ client_id: user.id })

    const toApproveTimesheetsStats = await api.getClientTimesheetsSummary({ status: 'submitted' })
    const toApproveTimesheetsStatsManagedByMe = await api.getClientTimesheetsSummary({
      client_id: user.id,
      status: 'submitted',
    })

    const draftTimesheetsStats = await api.getClientTimesheetsSummary({ status: 'pending' })
    const draftTimesheetsStatsManagedByMe = await api.getClientTimesheetsSummary({
      client_id: user.id,
      status: 'pending',
    })

    dispatch(createAction(SET_TIMESHEET_SUMMARY_DATA)({
      all: allTimesheetsCount.body,
      allManagedByMe: allTimesheetsCountManagedByMe.body,
      toApprove: toApproveTimesheetsStats.body,
      toApproveManagedByMe: toApproveTimesheetsStatsManagedByMe.body,
      draft: draftTimesheetsStats.body,
      draftManagedByMe: draftTimesheetsStatsManagedByMe.body,
    }))
  } catch (error) {
    handleError(dispatch, error, 'timesheets')
  }
}

const getTimesheets = async (dispatch, api: FlexhireAPI, user: ICurrentUser) => {
  try {
    const timesheets = await api.getClientTimesheets({ firm_id: user.firm?.id, per_page: 50, _sort: 'actionable' })
    const timesheetsManagedByMe = await api.getClientTimesheets({
      per_page: 50,
      client_id: user.id,
      _sort: 'actionable',
    })

    dispatch(createAction(SET_TIMESHEET_DATA)({
      timesheets: timesheets.body,
      timesheetsManagedByMe: timesheetsManagedByMe.body,
    }))
  } catch (error) {
    handleError(dispatch, error, 'timesheets')
  }
}

const getPayrollItems = async (dispatch) => {
  try {
    // PayrollItems
    const queryResult = await fetchQuery<DashboardContainer_PayrollItemsQuery>(
      graphql`
        query DashboardContainer_PayrollItemsQuery {
          firm {
            payrollItems(first: 3) {
              totalCount
              edges {
                node {
                  # node is payrollItem
                  id
                  totalToPayClient {
                    currency {
                      code
                    }
                    value
                  }
                  type
                  contract {
                    freelancer {
                      name
                    }
                    client {
                      name
                    }
                    currency {
                      code
                    }
                  }
                }
              }
            }
          }
        }
      `,
      {
        fetchPolicy: 'network-only',
      },
    )

    dispatch(createAction(SET_PAYROLL_ITEMS_DATA)({
      payrollItems: queryResult?.firm?.payrollItems?.edges?.map(edge => edge?.node) || [],
      payrollItemsCount: queryResult?.firm?.payrollItems?.totalCount || 0,
    }))
  } catch (error) {
    handleError(dispatch, error, 'payrollItems')
  }
}

const getBonuses = async (dispatch) => {
  try {
    // Bonuses
    const queryResult = await fetchQuery<DashboardContainer_BonusesQuery>(
      graphql`
        query DashboardContainer_BonusesQuery {
          firm {
            bonuses(first: 3) {
              __id
              totalCount
              edges {
                node {
                  # node is bonus
                  id
                  totalToPayClient {
                    currency {
                      code
                    }
                    value
                  }
                  contract {
                    freelancer {
                      name
                    }
                    client {
                      name
                    }
                    currency {
                      code
                    }
                  }
                }
              }
            }
          }
        }
      `,
      {
        fetchPolicy: 'network-only',
      },
    )

    dispatch(createAction(SET_BONUSES_DATA)({
      bonuses: queryResult?.firm?.bonuses?.edges?.map(edge => edge?.node) || [],
      bonusesCount: queryResult?.firm?.bonuses?.totalCount || 0,
    }))
  } catch (error) {
    handleError(dispatch, error, 'bonuses')
  }
}

const getCandidates = async (dispatch, api: FlexhireAPI, jobsPromise: Promise<IJob[]>, jobsManagedByMePromise: Promise<IJob[]>) => {
  try {
    // Candidates
    const limit = 3 // max number of candidates displayed in the hiring overview

    const jobsManagedByMe = await jobsManagedByMePromise
    const myCandidatesRequest = await api.getJobCandidates({ per_page: limit, page: 0, jobs_ids: jobsManagedByMe.map(j => j.id).join(',') })
    const myCandidates = myCandidatesRequest.body
    const myCandidatesCount = myCandidatesRequest.headers.totalCount

    const allCandidatesRequest = await api.getJobCandidates({ per_page: limit, page: 0 }) // , jobs_ids: jobs.map(j => j.id).join(',')
    const allCandidates = allCandidatesRequest.body
    const allCandidatesCount = allCandidatesRequest.headers.totalCount

    dispatch(createAction(SET_CANDIDATES_DATA)({
      managedByMe: myCandidates,
      wholeTeam: allCandidates,
      wholeTeamCount: allCandidatesCount,
      managedByMeCount: myCandidatesCount,
    }))
  } catch (error) {
    handleError(dispatch, error, 'candidates')
  }
}

const getApplications = async (dispatch, api: FlexhireAPI, user: ICurrentUser) => {
  try {
    // Applications
    const response = (await api.getDirectApplications({ firm_id: user?.firm?.id, exclude_screening: true })).body
    const allApplications = response.applications
    const myApplications = allApplications.filter(application => application.client_id === user.id)

    dispatch(createAction(SET_APPLICATIONS_DATA)({
      wholeTeam: allApplications,
      managedByMe: myApplications,
      highlightCount: response.highlight_count,
      highlightCountMyTeam: response.highlight_count_my_team,
      totalCount: response.total_count,
      totalCountMyTeam: response.total_count_my_team,
    }))
  } catch (error) {
    handleError(dispatch, error, 'applications')
  }
}

const getScreening = async (dispatch, api: FlexhireAPI, user: ICurrentUser) => {
  try {
    // Applications in screening
    const response = (await api.getDirectApplications({ firm_id: user?.firm?.id, screening_only: true })).body
    const allApplications = response.applications
    const myApplications = allApplications.filter(application => application.client_id === user.id)

    dispatch(createAction(SET_SCREENING_DATA)({
      wholeTeam: allApplications,
      managedByMe: myApplications,
      highlightCount: response.highlight_count,
      highlightCountMyTeam: response.highlight_count_my_team,
      totalCount: response.total_count,
      totalCountMyTeam: response.total_count_my_team,
    }))
  } catch (error) {
    handleError(dispatch, error, 'screening')
  }
}

const getContractStats = async (dispatch, api: FlexhireAPI) => {
  dispatch(createAction(SET_CONTRACT_STATS)(await api.getContractStats()))
}

const getInterviews = async (dispatch, api: FlexhireAPI, user: ICurrentUser) => {
  try {
    // Interviews

    const allInterviews = await api.getContracts({
      stage: 'interview',
      firm_id: user?.firm?.id,
      order_by: 'actionable',
    })

    const interviewsManagedByMe = await api.getContracts({
      stage: 'interview',
      client_id: user.id,
      firm_id: user?.firm?.id,
      order_by: 'actionable',
    })

    dispatch(createAction(SET_INTERVIEW_DATA)({
      wholeTeam: allInterviews,
      managedByMe: interviewsManagedByMe,
    }))
  } catch (error) {
    handleError(dispatch, error, 'interviews')
  }
}

const getOffers = async (dispatch, api: FlexhireAPI, user: ICurrentUser) => {
  try {
    // Offers

    const offers = await api.getContracts({
      firm_id: user?.firm?.id,
      stage: 'offer',
      order_by: 'actionable',
    })

    const offersManagedByMe = await api.getContracts({
      stage: 'offer',
      client_id: user.id,
      firm_id: user?.firm?.id,
      order_by: 'actionable',
    })

    dispatch(createAction(SET_OFFERS_DATA)({
      wholeTeam: offers,
      managedByMe: offersManagedByMe,
    }))
  } catch (error) {
    handleError(dispatch, error, 'offers')
  }
}

export async function getDashboardInitialData(state: RootState, dispatch, user: ICurrentUser, api: FlexhireAPI) {
  if (!state.clientDashboard.data.jobsReceived || !state.clientDashboard.data.teamReceived) {
    const jobsPromise = api.getJobs()
    const jobsManagedByMePromise = api.getJobs({ client_id: user.id })

    // Run these in parallel
    try {
      dispatch(createAction(GET_DASHBOARD_DATA)())
      await Promise.all([
        getJobs(dispatch, jobsPromise, jobsManagedByMePromise),
        getTeam(dispatch, api, user),
      ])
    } catch (error) {
      trackError(error)
    }
  }
}

export async function getDashboardData(dispatch, user, api: FlexhireAPI) {
  try {
    const jobsPromise = api.getJobs()
    const jobsManagedByMePromise = api.getJobs({ client_id: user.id })
    const promises = [
      getJobs(dispatch, jobsPromise, jobsManagedByMePromise),
      getTeam(dispatch, api, user),
      getTimesheetsSummary(dispatch, api, user),
      getTimesheets(dispatch, api, user),
      getInvoices(dispatch, api, user),
      getOffers(dispatch, api, user),
      getInterviews(dispatch, api, user),
      getPayrollItems(dispatch),
      getBonuses(dispatch),
      getApplications(dispatch, api, user),
      getScreening(dispatch, api, user),
      getContractStats(dispatch, api),
      getCandidates(dispatch, api, jobsPromise, jobsManagedByMePromise),
    ]
    // Run them in parallel
    await Promise.all(promises)
  } catch (error) {
    trackError(error)
  }
}

const DashboardContainer = () => {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  )
}

export default DashboardContainer
