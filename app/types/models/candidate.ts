import { IFreelancer } from './freelancer'
import { IJob } from './job'

export interface ICandidate extends IFreelancer {
  id: number
  invited_to_job?: boolean
  job_incompatibility_reasons?: string[]
  job_id?: number
  job_title?: string
  job_slug?: string
  job_status?: IJob['status']
  firm_slug?: string
  bookmarked?: boolean
}
