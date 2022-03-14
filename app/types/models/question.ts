import { IUserSkill, IVideo } from './freelancer'
import { IFreelancerType } from './freelancerType'
import { IFreelancerSubtype } from './freelancerSubtype'
import { ITag } from './tag'
import { IAnswer } from './answer'

export interface IQuestion {
  id: number
  title: string
  status: 'private' | 'public'
  description: string
  answers_count?: number
  jobs_count?: number
  freelancer_types: IFreelancerType[]
  freelancer_subtypes: IFreelancerSubtype[]
  skills: IUserSkill[]
  tags: ITag[]
  max_duration: number
}

export interface IQuestionForFreelancer {
  id: number
  title: string
  description: string
  freelancer_types: IFreelancerType[]
  freelancer_subtypes: IFreelancerSubtype[]
  skills: IUserSkill[]
  tags: ITag[]
  answer: IVideo
  textual_answer: string
  textual_answer_id: number
  max_duration: number
}

export interface IQuestionUpdateNode {
  rawId?: number
  title: string
  description?: string
  status: string
  maxDuration: number
  answersCount?: number
}
