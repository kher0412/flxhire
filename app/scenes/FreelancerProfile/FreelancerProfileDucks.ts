import update from 'immutability-helper'
import { IFreelancer, IUserSkill, IAPIError, IVideo, IProfile, ITimelineEntry, IProjectSubmission, IResume, IContractForClient } from 'types'
import { AUTOSAVE_ENDED } from 'scenes/Profile/ProfileDucks'

export const GET_FREELANCER = 'flexhire/freelancer/GET_FREELANCER'
export const SET_FREELANCER = 'flexhire/freelancer/SET_FREELANCER'
export const GET_CONTRACTS = 'flexhire/client/freelancer/GET_CONTRACTS'
export const SET_CONTRACTS = 'flexhire/client/freelancer/SET_CONTRACTS' // the name is weird to avoid conflicts
export const REFRESH_FREELANCER = 'flexhire/freelancer/REFRESH_FREELANCER'
export const REFRESH_FREELANCER_SELF = 'flexhire/freelancer/REFRESH_FREELANCER_SELF'
export const LOADING_FREELANCER = 'flexhire/freelancer/LOADING_FREELANCER'
export const FREELANCER_ERROR = 'flexhire/freelancer/FREELANCER_ERROR'
export const IMPORT_RESUME = 'flexhire/profile/IMPORT_RESUME'
export const SET_EDITING_TIMELINE_ENTRY = 'flexhire/profile/SET_EDITING_TIMELINE_ENTRY'
export const RESUME_PROCESSING_FINISHED = 'flexhire/profile/RESUME_PROCESSING_FINISHED'

export function getFreelancer(id: number) {
  return {
    type: GET_FREELANCER,
    payload: { id },
  }
}

export function refreshFreelancer() {
  return {
    type: REFRESH_FREELANCER,
  }
}

export function refreshFreelancerSelf() {
  return {
    type: REFRESH_FREELANCER_SELF,
  }
}

export function setFreelancer(freelancer: IFreelancer) {
  return {
    type: SET_FREELANCER,
    payload: { freelancer },
  }
}

export function getContracts() {
  return {
    type: GET_CONTRACTS,
  }
}

export function setContracts(contracts: IContractForClient[]) {
  return {
    type: SET_CONTRACTS,
    payload: { contracts },
  }
}

export function loadingFreelancer(id: number) {
  return {
    type: LOADING_FREELANCER,
    payload: { id },
  }
}

export function setError(error) {
  return {
    type: FREELANCER_ERROR,
    payload: { error },
  }
}

export function setEditingTimelineEntry(index: number, previousValue?: any) {
  return {
    type: SET_EDITING_TIMELINE_ENTRY,
    payload: { index, previousValue },
  }
}

const initialState = {
  loading: true as boolean,
  error: null as IAPIError,
  user_skills: [] as IUserSkill[],
  profile: {} as IProfile,
  video: null as IVideo,
  timeline_entries: [] as ITimelineEntry[],
  projects: [] as IProjectSubmission[],
  contracts: [] as IContractForClient[],
  freelancerId: null as number,
  resume: null as IResume,
  editingTimelineEntry: {
    index: -1 as number,
    previousValue: null,
  },
}

type FreelancerState = Partial<IFreelancer> & typeof initialState

export default function reducer(state: FreelancerState = initialState, action) : FreelancerState {
  switch (action.type) {
    case GET_FREELANCER:
      return update(state, {
        loading: {
          // Do not set loading: true if we are just refreshing
          $set: action.payload.id !== state.freelancerId && action.payload.id !== state.profile.slug,
        },
        error: { $set: null },
        freelancerId: { $set: action.payload.id },
      })

    case SET_FREELANCER:
      return update(state, {
        $set: {
          ...state,
          ...action.payload.freelancer,
          freelancerId: action.payload.freelancer?.profile?.slug || state.freelancerId,
          loading: false,
          error: null,
        },
      })

    case AUTOSAVE_ENDED:
      return update(state, {
        loading: { $set: false },
      })

    case SET_CONTRACTS:
      return update(state, {
        contracts: {
          $set: action.payload.contracts,
        },
      })

    case SET_EDITING_TIMELINE_ENTRY:
      return update(state, {
        editingTimelineEntry: {
          previousValue: {
            $set: action.payload.previousValue,
          },
          index: {
            $set: isNaN(action.payload.index) ? -1 : action.payload.index,
          },
        },
      })

    case IMPORT_RESUME:
      return update(state, {
        resume: {
          $set: {
            status: 'processing_queued',
            url: action.payload.url,
            filename: action.payload.filename,
            mimetype: action.payload.mimetype,
            success: false,
          },
        },
      })

    case REFRESH_FREELANCER:
      return update(state, {
        error: { $set: null },
      })

    case LOADING_FREELANCER:
      if (state.id === action.payload.id) {
        return update(state, {
          error: { $set: null },
        })
      }
      return update(state, {
        loading: { $set: true },
        error: { $set: null },
      })

    case FREELANCER_ERROR:
      return update(state, {
        error: { $set: action.payload.error },
        loading: { $set: false },
      })

    case RESUME_PROCESSING_FINISHED:
      return update(state, {
        resume: { $set: action.payload.resume },
      })

    default:
      return state
  }
}
