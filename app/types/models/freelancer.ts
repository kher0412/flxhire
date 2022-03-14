import { IUserStatus } from './user'
import { IQuestion } from './question'
import { IProjectSubmission } from './project'
import { IFreelancerSubtype } from './freelancerSubtype'
import { IReference } from './reference'
import { IFreelancerType } from './freelancerType'

export interface IUserSkill {
  name: string
  id: number
  experience: number
}

export type IProfileAvailability = 'available_now' | 'available_soon' | 'not_available'

export type IProfileAvailabilityType = 'part_time' | 'full_time'

export type IProfileJobType = 'freelance' | 'permanent'

export interface IVideo {
  id: number
  url: string
  poster_url: string
  question_title?: string
}

export interface IVideoAnswer extends IVideo {
  question: IQuestion
}

export interface IProfile {
  id: number
  slug: string
  availability: IProfileAvailability
  availability_type: IProfileAvailabilityType[]
  freelancer_type: string
  text_introduction: string
  full_address?: string
  city: string
  region: string
  country: string
  annual_compensation: number
  total_experience: number
  rate: number
  freelancer_rate?: number
  phone?: string
  zip?: string
  city_recipient?: string
  country_recipient?: string
  state_recipient?: string
  tax_id?: string
  address_recipient?: string
  us_citizen?: string,
  managed_team_size: string
  visibility: 'visibility_public' | 'visibility_clients' | 'visibility_private'
  job_types: IProfileJobType[]
  freelancer_type_id: number
  freelancer_type_data: IFreelancerType
  freelancer_subtype_ids: number[]
  freelancer_subtypes: IFreelancerSubtype[]
  can_work_in_the_us: boolean
  open_to_opportunities: boolean
  location_latitude: string
  location_longitude: string
  location_bounds_0: string
  location_bounds_1: string
  location_bounds_2: string
  location_bounds_3: string
  url_blog: string
  url_dribbble: string
  url_github: string
  url_linkedin: string
  available_at: string
  working_or_offered_job?: boolean
}

export interface Institute {
  id: number
  name: string
  world_rank: any
  national_rank: any
  ranking_year: number
  country: string
  continent: string
}

export type TimelineEntryType = 'work' | 'education'

export interface ITimelineEntry {
  id: number
  entry_type: TimelineEntryType
  place: string
  title: string
  description: string
  date_start: string
  date_end?: string
  institute_id?: number
  institute?: Institute
  skills: ITimelineEntrySkill[]
}

export interface ITimelineEntrySkill {
  id: number
  name: string
}

export interface IFreelancer {
  id: number
  hidden?: boolean
  status?: IUserStatus
  avatar_url: string
  email?: string
  first_name: string
  last_name?: string
  user_skills: IUserSkill[]
  video: IVideo | null
  profile: IProfile
  invited_to_job?: boolean
  background_check_completed: boolean
  timezone: string
  timezone_offset: number
  timezone_name: string
  is_freelancer: true
  can_make_offer?: boolean
  can_notify?: boolean
  blog_posts: any[]
  timeline_entries: ITimelineEntry[]
  project_submissions: IProjectSubmission[]
  answers: IVideoAnswer[]
  applied_at?: string
  created_at?: string
  references?: IReference[]
  resume?: IResume
  direct_chat_thread_id?: number
  last_seen_at?: string
}

export function isFreelancer(object: any) : object is IFreelancer {
  return Boolean(object?.is_freelancer)
}

export interface IResume {
  url: string
  status: 'unprocessed' | 'processing_queued' | 'processing' | 'processing_failed' | 'processed'
  filename: string
  mimetype: string
  success?: boolean
  import_timed_out?: boolean
}
