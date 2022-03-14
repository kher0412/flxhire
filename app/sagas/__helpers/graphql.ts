import { call, CallEffect } from 'redux-saga/effects'
import { commitMutation, fetchQuery } from 'api/graphql'
import { MutationConfig, MutationParameters, OperationType } from 'relay-runtime'

export function* commitMutationEffect<T extends MutationParameters>(config: MutationConfig<T>): Generator<CallEffect<T['response']>> {
  yield call(commitMutation, config)
}

export function* fetchQueryEffect<T extends OperationType>(...args: Parameters<typeof fetchQuery>): Generator<CallEffect<T['response']>> {
  yield call(fetchQuery, ...args)
}
