import { combineReducers, Dispatch as ReduxDispatch, Action as ReduxAction, Store as ReduxStore } from 'redux'
import { trackError } from 'services/analytics'
import { HYDRATE } from 'next-redux-wrapper'

import common from 'reducers/Common'
import home from 'scenes/Home/HomeDucks'
import auth, { initialState as authInitialState } from 'reducers/Auth'
import signup from 'scenes/Signup/SignupDucks'
import freelancerDashboard from 'scenes/FreelancerDashboard/FreelancerDashboardDucks'
import freelancerTimesheets from 'scenes/FreelancerTimesheets/FreelancerTimesheetsDucks'
import login from 'scenes/Login/LoginDucks'
import passwordSetup from 'scenes/PasswordSetup/PasswordSetupDucks'
import confirmEmail from 'scenes/ConfirmEmail/ConfirmEmailDucks'
import profile from 'scenes/Profile/ProfileDucks'
import screening from 'scenes/Screening/ScreeningReducers'
import job from 'scenes/Job/JobDucks'
import sampleSkills from 'scenes/SampleSkills/SampleSkillsDucks'
import layout from 'components/Layout/LayoutDucks'

import blogPosts from 'scenes/Blog/BlogPostDucks'
import blogCategories from 'scenes/Blog/BlogCategoryDucks'

import clientHire from 'scenes/ClientHire/HireDucks'
import clientManage, { getInitialState as getManageInitialState } from 'scenes/ClientManage/ManageDucks'
import account from 'scenes/Account/AccountDucks'
import clientDashboard, { loadClosedSnackbars } from 'scenes/ClientDashboard/ClientDashboardDucks'
import navigation from 'components/Layout/components/Navigation/NavigationDucks'
import clientPageTitle from 'components/ClientPageTitle/ClientPageTitleDuck'
import InvitationTeam from 'scenes/InvitationTeam/InvitationTeamDucks'
import questions from 'scenes/Questions/QuestionDucks'

import freelancer from 'scenes/FreelancerProfile/FreelancerProfileDucks'
import { reducer as formReducer } from 'redux-form'
import slugViewer from 'scenes/SlugViewer/SlugViewerDucks'
import jobsListing from 'scenes/JobsListing/JobsListingDucks'
import { isDevelopment } from 'services/environment'
import { ActionFunctionAny, createAction } from 'redux-actions'
import tracking from './Tracking'
import chat from './Chat'

export const CLEAR_STATE = 'flexhire/CLEAR_STATE'

export const clearState = createAction(CLEAR_STATE) as ActionFunctionAny<ReduxAction<typeof CLEAR_STATE>>

export const allReducers = {
  auth,
  home,
  login,
  confirmEmail,
  passwordSetup,
  blogPosts,
  blogCategories,
  clientHire,
  clientManage,
  account,
  clientDashboard,
  navigation,
  clientPageTitle,
  common,
  job,
  sampleSkills,
  form: formReducer,
  signup,
  freelancerDashboard,
  freelancerTimesheets,
  layout,
  profile,
  screening,
  freelancer,
  slugViewer,
  jobsListing,
  InvitationTeam,
  questions,
  chat,
  tracking,
}

const reducer = combineReducers(allReducers)

export type RootState = ReturnType<typeof reducer>

export type Action = Parameters<typeof reducer>[1]

export type Dispatch = ReduxDispatch<Action>

export type Store = ReduxStore<RootState, Action>

export function getInitialState() : Partial<RootState> {
  return {
    auth: authInitialState,
    clientManage: getManageInitialState(),
  }
}

const RootReducer = (state = getInitialState() as RootState, action: Action) : RootState => {
  try {
    if (action?.type === CLEAR_STATE) {
      state = getInitialState() as RootState
    }
    if (action?.type === HYDRATE) {
      return {
        ...state,
        // Merge state that comes from server
        layout: {
          ...state.layout,
          // For layout type, trust the server
          type: action.payload.layout.type,
          // Initialize layout header at server state, but do not overwrite client state
          header: state.layout.header || action.payload.layout.header,
        },
        auth: action.payload.auth,
        common: {
          ...state.common,
          isIframe: action.payload.common.isIframe,
          // Always keep server value for serverBuildId
          serverBuildId: action.payload.common.serverBuildId,
        },
        home: action.payload.home,
        freelancerDashboard: action.payload.freelancerDashboard,
        clientDashboard: {
          // Do not overwrite locally stored collection of closed snackbars
          ...action.payload.clientDashboard,
          closedSnackbars: loadClosedSnackbars(),
        },
        questions: action.payload.questions,
        blogPosts: action.payload.blogPosts,
        job: action.payload.job,
        freelancer: action.payload.freelancer,
        slugViewer: action.payload.slugViewer,
        jobsListing: action.payload.jobsListing,
        tracking: {
          // Do not overwrite tracking info if the browser already has it
          ...state.tracking,
          referer: action.payload.tracking?.referer || state.tracking.referer,
        },
      }
    }
    return reducer(state, action)
  } catch (error) {
    if (isDevelopment()) throw error
    trackError(error, {
      state,
      action,
    })
    return state
  }
}

export default RootReducer
