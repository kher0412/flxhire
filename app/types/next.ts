import { ComponentType } from 'react'
import { NextPageContext, NextComponentType } from 'next'
import { IFlexhireAPI } from 'api'
import { Store } from 'reducers'
import { ICurrentUser } from './models/user'

export interface INextPageContext extends NextPageContext {
  api: InstanceType<IFlexhireAPI>
  currentUser: ICurrentUser
  store: Store
}

export const isNextComponent = (component: ComponentType | NextComponentType): component is NextComponentType => {
  return Boolean(typeof (component as any)?.getInitialProps === 'function')
}
