import update from 'immutability-helper'
import { IFreelancer, ISkill } from 'types'

export const GET_TOP_FREELANCERS = 'flexhire/sample_skills/GET_TOP_FREELANCERS'
export const SET_TOP_FREELANCERS = 'flexhire/sample_skills/SET_TOP_FREELANCERS'
export const GET_SKILL = 'flexhire/sample_skills/GET_SKILL'
export const SET_SKILL = 'flexhire/sample_skills/SET_SKILL'

const initialState = {
  topFreelancers: [] as IFreelancer[],
  topFreelancersReceived: false,
  skill: null as ISkill,
  skillReceived: false,
}

export default function reducer(state = initialState, action) {
  const p = action.payload

  switch (action.type) {
    case GET_TOP_FREELANCERS:
      return update(state, {
        topFreelancersReceived: {
          // Set it to true only if I already have the right skill data and some freelancers
          $set: p.slug === state.skill?.slug && state.topFreelancersReceived,
        },
      })

    case SET_TOP_FREELANCERS:
      return update(state, {
        topFreelancers: { $set: p },
        topFreelancersReceived: { $set: true },
      })

    case GET_SKILL:
      return update(state, {
        skillReceived: {
          // Set it to true only if I am refreshing the same skill
          $set: p.slug === state.skill?.slug && state.skillReceived,
        },
      })

    case SET_SKILL:
      return update(state, {
        skill: { $set: p },
        skillReceived: { $set: true },
      })

    default:
      return state
  }
}
