import { takeEvery, put, select } from 'redux-saga/effects'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { graphql } from 'react-relay'
import { fetchQuery } from 'api/graphql'
import { RootState } from 'reducers'
import { commitMutationEffect } from 'sagas/__helpers'
import { ClientSagas_ExpireContractMutation } from '__generated__/ClientSagas_ExpireContractMutation.graphql'
import { ClientSagas_PauseContractMutation } from '__generated__/ClientSagas_PauseContractMutation.graphql'
import { ClientSagas_ResumeContractMutation } from '__generated__/ClientSagas_ResumeContractMutation.graphql'
import { ClientSagas_ContractIdQuery } from '__generated__/ClientSagas_ContractIdQuery.graphql'
import { END_CONTRACT, PAUSE_CONTRACT, RESUME_CONTRACT } from './ClientDucks'
import { SET_INTERVIEWS } from '../../../InterviewRequests/components/InterviewRequest/InterviewRequestDucks'

function* performGetContractId(rawId: number) {
  const data = yield fetchQuery<ClientSagas_ContractIdQuery>(graphql`
    query ClientSagas_ContractIdQuery($contractId: Int!) {
      contract(rawId: $contractId) {
        id
      }
    }
  `, { contractId: rawId }, { fetchPolicy: 'store-or-network' })
  return data?.contract?.id
}

function* performEndContract(action) {
  const id = yield performGetContractId(action.payload.contract.id)
  try {
    yield commitMutationEffect<ClientSagas_ExpireContractMutation>({
      mutation: graphql`
        mutation ClientSagas_ExpireContractMutation($input: ExpireContractInput!) {
          expireContract(input: $input) {
            contract {
              lastInteractionAt
              status
            }
          }
        }
      `,
      variables: {
        input: {
          contractId: id,
        },
      },
    })

    const user = yield select((state: RootState) => state.auth.currentUser)
    const interviews = yield getAPIClient().getContracts({ freelancer_id: user?.id })
    yield put(createAction(SET_INTERVIEWS)({ interviews }))
  } catch (err) {
    trackError(err)
  }
}

function* performPauseContract(action) {
  const id = yield performGetContractId(action.payload.contract.id)
  try {
    yield commitMutationEffect<ClientSagas_PauseContractMutation>({
      mutation: graphql`
        mutation ClientSagas_PauseContractMutation($input: PauseContractInput!) {
          pauseContract(input: $input) {
            contract {
              lastInteractionAt
              status
            }
          }
        }
      `,
      variables: {
        input: {
          contractId: id,
        },
      },
    })

    const user = yield select((state: RootState) => state.auth.currentUser)
    const interviews = yield getAPIClient().getContracts({ freelancer_id: user?.id })
    yield put(createAction(SET_INTERVIEWS)({ interviews }))
  } catch (err) {
    trackError(err)
  }
}

function* performResumeContract(action) {
  const id = yield performGetContractId(action.payload.contract.id)
  try {
    yield commitMutationEffect<ClientSagas_ResumeContractMutation>({
      mutation: graphql`
        mutation ClientSagas_ResumeContractMutation($input: ResumeContractInput!) {
          resumeContract(input: $input) {
            contract {
              lastInteractionAt
              status
            }
          }
        }
      `,
      variables: {
        input: {
          contractId: id,
        },
      },
    })

    const user = yield select((state: RootState) => state.auth.currentUser)
    const interviews = yield getAPIClient().getContracts({ freelancer_id: user?.id })
    yield put(createAction(SET_INTERVIEWS)({ interviews }))
  } catch (err) {
    trackError(err)
  }
}

function* watch() {
  yield takeEvery(END_CONTRACT, performEndContract)
  yield takeEvery(PAUSE_CONTRACT, performPauseContract)
  yield takeEvery(RESUME_CONTRACT, performResumeContract)
}

export default watch
