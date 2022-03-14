import { IChatThread } from './chat'
import { IContractForClient } from './contract'
import { ICurrentUser } from './user'

export interface ILink {
  token: string
  type: 'candidate' | 'chat' | 'profile_feedback' | 'login'
  freelancer_slug?: string
  job_slug?: string
  contract?: IContractForClient
  firm_id?: number
  chat_thread?: IChatThread
  chat_user_id?: number
  current_user?: ICurrentUser
  login_only?: boolean
}
