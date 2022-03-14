import update from 'immutability-helper'
import { uniq } from 'lodash'
import { errorToObject } from 'services/error'
import storage from 'services/localStorage'
import {
  IClientInvoice,
  IContractForClient,
  IJob,
  ITimesheetForClient,
  ICandidate,
  IContractStatsForClient,
  IAPIError,
  IClient,
} from 'types'
import { DashboardContainer_BonusesQuery } from '__generated__/DashboardContainer_BonusesQuery.graphql'
import { DashboardContainer_PayrollItemsQuery } from '__generated__/DashboardContainer_PayrollItemsQuery.graphql'

export const GET_DASHBOARD_DATA = 'flexhire/client/GET_DASHBOARD_DATA'
export const CLOSE_SNACKBAR = 'flexhire/client/DASHBOARD_CLOSE_SNACKBAR'
export const RESET_CLOSED_SNACBKARS = 'flexhire/client/DASHBOARD_RESET_SNACKBARS'

export const SET_JOB_DATA = 'flexhire/client/SET_JOB_DATA'
export const SET_TEAM_DATA = 'flexhire/client/SET_TEAM_DATA'
export const SET_INVOICES_DATA = 'flexhire/client/SET_INVOICES_DATA'
export const SET_TIMESHEET_DATA = 'flexhire/client/SET_TIMESHEET_DATA'
export const SET_TIMESHEET_SUMMARY_DATA = 'flexhire/client/SET_TIMESHEET_SUMMARY_DATA'
export const SET_PAYROLL_ITEMS_DATA = 'flexhire/client/SET_PAYROLL_ITEMS_DATA'
export const SET_BONUSES_DATA = 'flexhire/client/SET_BONUSES_DATA'
export const SET_CANDIDATES_DATA = 'flexhire/client/SET_CANDIDATES_DATA'
export const SET_APPLICATIONS_DATA = 'flexhire/client/SET_APPLICATIONS_DATA'
export const SET_SCREENING_DATA = 'flexhire/client/SET_SCREENING_DATA'
export const SET_INTERVIEW_DATA = 'flexhire/client/SET_INTERVIEW_DATA'
export const SET_OFFERS_DATA = 'flexhire/client/SET_OFFERS_DATA'
export const SET_CONTRACT_STATS = 'flexhire/client/SET_CONTRACT_STATS'
export const SET_ERROR = 'flexhire/client/dashboard/SET_ERROR'

const closedSnackbarsLocation = 'flexhire-client-dashboard-closed-snackbars'

function saveClosedSnackbars(list: string[]) {
  storage.setItem(closedSnackbarsLocation, JSON.stringify(list))
}

export function loadClosedSnackbars(): string[] {
  try {
    let closedSnackbarsString = storage.getItem(closedSnackbarsLocation)
    return (closedSnackbarsString ? JSON.parse(closedSnackbarsString) : []) || []
  } catch (error) {
    console.warn(error)
    return []
  }
}

function getInitialState() {
  return {
    data: {
      contractStats: {
        managed_by_me: {
          interviews_actionable_count: 0,
          interviews_total_count: 0,
          offers_actionable_count: 0,
          offers_total_count: 0,
        },
        whole_team: {
          interviews_actionable_count: 0,
          interviews_total_count: 0,
          offers_actionable_count: 0,
          offers_total_count: 0,
        },
      } as IContractStatsForClient,
      candidatesCount: {
        managedByMe: 0,
        wholeTeam: 0,
      },
      candidates: {
        managedByMe: [] as ICandidate[],
        wholeTeam: [] as ICandidate[],
        error: null as IAPIError,
      },
      applicationsCount: {
        managedByMe: 0,
        wholeTeam: 0,
        highlightCount: 0,
        highlightCountMyTeam: 0,
        totalCount: 0,
        totalCountMyTeam: 0,
      },
      applications: {
        managedByMe: [] as IContractForClient[],
        wholeTeam: [] as IContractForClient[],
        error: null as IAPIError,
      },
      screeningCount: {
        managedByMe: 0,
        wholeTeam: 0,
        highlightCount: 0,
        highlightCountMyTeam: 0,
        totalCount: 0,
        totalCountMyTeam: 0,
      },
      screening: {
        managedByMe: [] as IContractForClient[],
        wholeTeam: [] as IContractForClient[],
        error: null as IAPIError,
      },
      interviewCount: {
        managedByMe: 0,
        wholeTeam: 0,
      },
      interviews: {
        wholeTeam: [] as IContractForClient[],
        managedByMe: [] as IContractForClient[],
        error: null as IAPIError,
      },
      invoices: {
        wholeTeam: [] as IClientInvoice[],
        managedByMe: [] as IClientInvoice[],
        error: null as IAPIError,
      },
      invoiceCount: 0,
      invoiceStats: {
        overdueBalance: 0,
        overdueCount: 0,
        unpaidBalance: 0,
        unpaidCount: 0,
      },
      jobCount: {
        managedByMe: 0,
        wholeTeam: 0,
      },
      jobs: {
        managedByMe: [] as IJob[],
        wholeTeam: [] as IJob[],
        error: null as IAPIError,
      },
      myTeam: [] as IContractForClient[],
      offerCount: {
        wholeTeam: 0,
        managedByMe: 0,
      },
      offers: {
        managedByMe: [] as IContractForClient[],
        wholeTeam: [] as IContractForClient[],
        error: null as IAPIError,
      },
      team: [] as IContractForClient[],
      teamCount: { wholeTeam: 0, managedByMe: 0 },
      timesheetStats: {
        all: { count: 0 },
        allManagedByMe: { count: 0 },
        draft: { count: 0 },
        draftManagedByMe: { count: 0 },
        toApprove: { count: 0 },
        toApproveManagedByMe: { count: 0 },
      },
      timesheets: {
        managedByMe: [] as ITimesheetForClient[],
        wholeTeam: [] as ITimesheetForClient[],
        error: null as IAPIError,
      },
      payrollItems: {
        data: [] as DashboardContainer_PayrollItemsQuery['response']['firm']['payrollItems']['edges'][0]['node'][],
        error: null as IAPIError,
        count: 0,
      },
      bonuses: {
        data: [] as DashboardContainer_BonusesQuery['response']['firm']['bonuses']['edges'][0]['node'][],
        error: null as IAPIError,
        count: 0,
      },
      jobsReceived: false,
      candidatesReceived: false,
      applicationsReceived: false,
      screeningReceived: false,
      teamReceived: false,
      offersReceived: false,
      interviewsReceived: false,
      invoicesReceived: false,
      timesheetsReceived: false,
      payrollItemsReceived: false,
      bonusesReceived: false,
    },
    closedSnackbars: null as string[],
  }
}

export type IDashboardState = ReturnType<typeof getInitialState>
export type IDashboardStateData = IDashboardState['data']

export default function clientDashboardReducer(state = getInitialState(), { type, payload }) {
  switch (type) {
    case GET_DASHBOARD_DATA:
      return update(state, {
        data: {
          timesheetStats: {
            draft: { count: { $set: 0 } },
            draftManagedByMe: { count: { $set: 0 } },
            toApprove: { count: { $set: 0 } },
            toApproveManagedByMe: { count: { $set: 0 } },
          },
          timesheets: {
            managedByMe: { $set: [] },
            wholeTeam: { $set: [] },
            error: { $set: null },
          },
          myTeam: { $set: [] },
          team: { $set: [] },
          jobs: {
            managedByMe: { $set: [] },
            wholeTeam: { $set: [] },
            error: { $set: null },
          },
          offers: {
            managedByMe: { $set: [] },
            wholeTeam: { $set: [] },
            error: { $set: null },
          },
          invoiceStats: {
            overdueBalance: { $set: 0 },
            overdueCount: { $set: 0 },
            unpaidBalance: { $set: 0 },
            unpaidCount: { $set: 0 },
          },
          interviews: {
            wholeTeam: { $set: [] },
            managedByMe: { $set: [] },
            error: { $set: null },
          },
          jobsReceived: { $set: false },
          teamReceived: { $set: false },
        },
      })

    case CLOSE_SNACKBAR: {
      const newList = uniq((state.closedSnackbars || []).concat([payload.name]).filter(x => typeof x === 'string'))
      saveClosedSnackbars(newList)
      return update(state, { closedSnackbars: { $set: newList } })
    }

    case RESET_CLOSED_SNACBKARS:
      saveClosedSnackbars([])
      return update(state, { closedSnackbars: { $set: [] } })

    case SET_JOB_DATA:
      return update(state, {
        data: {
          jobs: {
            managedByMe: { $set: payload.jobsManagedByMe },
            wholeTeam: { $set: payload.jobs },
            error: { $set: null },
          },
          jobCount: {
            managedByMe: { $set: payload.jobsManagedByMe.length },
            wholeTeam: { $set: payload.jobs.length },
          },
          jobsReceived: { $set: true },
        },
      })

    case SET_TEAM_DATA:
      return update(state, {
        data: {
          myTeam: { $set: payload.myTeam },
          team: { $set: payload.team },
          teamCount: {
            managedByMe: { $set: payload.myTeamCount },
            wholeTeam: { $set: payload.teamCount },
          },
          teamReceived: { $set: true },
        },
      })

    case SET_INVOICES_DATA:
      return update(state, {
        data: {
          invoices: {
            managedByMe: { $set: payload.invoicesManagedByMe },
            wholeTeam: { $set: payload.invoices },
            error: { $set: null },
          },
          invoiceStats: { $set: payload.invoiceStats },
          invoiceCount: { $set: payload.invoiceCount },
          invoicesReceived: { $set: true },
        },
      })
    case SET_TIMESHEET_SUMMARY_DATA:
      return update(state, {
        data: {
          timesheetStats: { $set: payload },
        },
      })
    case SET_TIMESHEET_DATA:
      return update(state, {
        data: {
          timesheets: {
            managedByMe: { $set: payload.timesheetsManagedByMe },
            wholeTeam: { $set: payload.timesheets },
            error: { $set: null },
          },
          timesheetsReceived: { $set: true },
        },
      })

    case SET_PAYROLL_ITEMS_DATA:
      return update(state, {
        data: {
          payrollItems: {
            data: { $set: payload.payrollItems },
            error: { $set: null },
            count: { $set: payload.payrollItemsCount },
          },
          payrollItemsReceived: { $set: true },
        },
      })

    case SET_BONUSES_DATA:
      return update(state, {
        data: {
          bonuses: {
            data: { $set: payload.bonuses },
            error: { $set: null },
            count: { $set: payload.bonusesCount },
          },
          bonusesReceived: { $set: true },
        },
      })

    case SET_CANDIDATES_DATA:
      return update(state, {
        data: {
          candidates: {
            managedByMe: { $set: payload.managedByMe },
            wholeTeam: { $set: payload.wholeTeam },
            error: { $set: null },
          },
          candidatesCount: {
            managedByMe: { $set: payload.managedByMeCount },
            wholeTeam: { $set: payload.wholeTeamCount },
          },
          candidatesReceived: { $set: true },
        },
      })

    case SET_CONTRACT_STATS:
      return update(state, {
        data: {
          contractStats: { $set: payload },
        },
      })

    case SET_APPLICATIONS_DATA:
      return update(state, {
        data: {
          applications: {
            wholeTeam: { $set: payload.wholeTeam },
            managedByMe: { $set: payload.managedByMe },
            error: { $set: null },
          },
          applicationsCount: {
            wholeTeam: { $set: payload.wholeTeam.length },
            managedByMe: { $set: payload.managedByMe.length },
            highlightCount: { $set: payload.highlightCount },
            highlightCountMyTeam: { $set: payload.highlightCountMyTeam },
            totalCount: { $set: payload.totalCount },
            totalCountMyTeam: { $set: payload.totalCountMyTeam },
          },
          applicationsReceived: { $set: true },
        },
      })

    case SET_SCREENING_DATA:
      return update(state, {
        data: {
          screening: {
            wholeTeam: { $set: payload.wholeTeam },
            managedByMe: { $set: payload.managedByMe },
            error: { $set: null },
          },
          screeningCount: {
            wholeTeam: { $set: payload.wholeTeam.length },
            managedByMe: { $set: payload.managedByMe.length },
            highlightCount: { $set: payload.highlightCount },
            highlightCountMyTeam: { $set: payload.highlightCountMyTeam },
            totalCount: { $set: payload.totalCount },
            totalCountMyTeam: { $set: payload.totalCountMyTeam },
          },
          screeningReceived: { $set: true },
        },
      })

    case SET_INTERVIEW_DATA:
      return update(state, {
        data: {
          interviews: {
            wholeTeam: { $set: payload.wholeTeam },
            managedByMe: { $set: payload.managedByMe },
            error: { $set: null },
          },
          interviewCount: {
            managedByMe: { $set: payload.managedByMe.length },
            wholeTeam: { $set: payload.wholeTeam.length },
          },
          interviewsReceived: { $set: true },
        },
      })
    case SET_OFFERS_DATA:
      return update(state, {
        data: {
          offers: {
            wholeTeam: { $set: payload.wholeTeam },
            managedByMe: { $set: payload.managedByMe },
            error: { $set: null },
          },
          offerCount: {
            managedByMe: { $set: payload.managedByMe.length },
            wholeTeam: { $set: payload.wholeTeam.length },
          },
          offersReceived: { $set: true },
        },
      })

    case SET_ERROR:
      return update(state, {
        data: {
          [payload.context]: {
            error: { $set: errorToObject(payload.error) },
          },
        },
      })
    default:
      return state
  }
}
