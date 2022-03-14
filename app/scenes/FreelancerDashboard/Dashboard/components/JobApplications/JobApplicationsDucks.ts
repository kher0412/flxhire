import { IContractForFreelancer } from 'types'

export const SET_JOB_APPLICATIONS = 'flexhire/freelancer/dashboard/SET_JOB_APPLICATIONS'

function getInitialState() {
  return {
    contracts: [] as IContractForFreelancer[],
  }
}

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case SET_JOB_APPLICATIONS:
      return { contracts: action.payload.contracts as IContractForFreelancer[] }
    default:
      return state
  }
}
