import { IContractRequestStatus, IContractStatus } from './contract'
import { IFirmRole } from './user'

export interface IChatMessage {
  id: number
  user_id: number
  chat_thread_id: number
  contract_id?: number
  contract_status?: IContractStatus
  contract_requests_status?: IContractRequestStatus
  contract_freelancer_slug?: string
  job_slug?: string
  firm_slug?: string
  label: string
  message: string
  author_name: string
  author_avatar_url: string
  author_slug: string
  created_at: string
}

export interface IChatUser {
  id: number
  avatar_url: string
  name: string
  first_name: string
  slug: string
  contract_status: IContractStatus
  job_title: string
  job_role?: string
  firm_name: string
  firm_slug: string
  firm_role?: IFirmRole
  last_seen_at: string
  timezone_name: string
  is_customer_success_rep: boolean
}

export interface IChatThread {
  id: number
  thread_type: 'direct' | 'group'
  user_id?: number
  avatar_url: string
  title: string
  default_title: string
  messages_count: number
  unread_messages_count: number
  last_activity_at: string
  created_at: string
  users: IChatUser[]
  last_message?: string
  last_message_author_name?: string
  enable_meeting_room: boolean
  meeting_room: string
}
