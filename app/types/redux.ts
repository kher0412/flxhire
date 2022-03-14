import { Action } from 'redux'

export type ActionWithPayload<T> = Action & {
  payload: T
}
