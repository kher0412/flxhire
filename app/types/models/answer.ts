import { IVideo } from './freelancer'
import { IQuestionForFreelancer } from './question'

export interface IAnswer {
  id: number
  user_id: number
  question_id: number
  textual_answer?: string
  video_answer?: IVideo
  question: IQuestionForFreelancer
}
