import { reduxForm, InjectedFormProps } from 'redux-form'
import { JobScreeningStep_Job$data } from '__generated__/JobScreeningStep_Job.graphql'
import JobScreeningForm, { IJobScreeningFormProps } from './JobScreeningForm'

export const FORM_NAME = 'editJobScreeningForm'
export const MIN_QUESTION_LENGTH = 10

export interface IJobScreeningFormPayload {
  questions: JobScreeningStep_Job$data['questions']
  project: JobScreeningStep_Job$data['project']
  screening_request_message_template: string
  auto_send_screening_requests: boolean
  allow_textual_answers: boolean
}

export type QuestionType = IJobScreeningFormPayload['questions'][0]
export type ProjectType = IJobScreeningFormPayload['project']

const signupJobScreeningForm = {
  form: FORM_NAME,
  destroyOnUnmount: false,
  enableReinitialize: true,
  validate: (values: IJobScreeningFormPayload) => {
    const errors: any = {}
    const questions = values.questions || []
    const questionTitles = questions.map(q => q.title).filter(t => t)
    const questionsErrors: any = {}

    questions.forEach((value, i) => {
      if (!value.rawId && (!value.title || value.title.length < MIN_QUESTION_LENGTH)) {
        questionsErrors[i] = { title: `Must be at least ${MIN_QUESTION_LENGTH} characters long` }
      }
    })

    if (questionTitles.length > new Set(questionTitles).size) {
      // there are duplicates
      questionsErrors._error = 'Duplicate questions are not allowed'
    }

    if (Object.keys(questionsErrors).length > 0) {
      errors.questions = questionsErrors
    }

    return errors
  },
}

export type JobScreeningFormContainerProps = InjectedFormProps<IJobScreeningFormPayload, IJobScreeningFormProps>

const JobScreeningFormContainer = reduxForm<IJobScreeningFormPayload, IJobScreeningFormProps>(signupJobScreeningForm)(JobScreeningForm)

export default JobScreeningFormContainer
