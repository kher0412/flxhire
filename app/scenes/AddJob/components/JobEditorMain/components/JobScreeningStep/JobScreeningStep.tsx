import React from 'react'
import { graphql, useFragment } from 'react-relay'
import { useRouter } from 'next/router'
import { useSnackbar, useQuickCommit } from 'hooks'
import { extractQueryParams } from 'services/router'
import { JobScreeningStep_Job$key } from '__generated__/JobScreeningStep_Job.graphql'
import JobScreeningForm, { IJobScreeningFormPayload } from './components/JobScreeningForm'

export const DEFAULT_SCREENING_REQUEST_MESSAGE_TEMPLATE = 'Hi $applicant_first_name$,\n\nThis is $your_first_name$ from $company_name$. Thank you so much for your application to work with us! Before we move to an in person interview we are requesting that all candidates answer a few quick questions: $link$'

export interface IJobScreeningStepProps {
  jobFragmentRef: JobScreeningStep_Job$key
  onContinue: () => void
}

function JobScreeningStep(props: IJobScreeningStepProps) {
  const { jobFragmentRef, onContinue } = props

  const router = useRouter()
  const showSnackbarMessage = useSnackbar()

  const job = useFragment(graphql`
    fragment JobScreeningStep_Job on Job {
      rawId
      slug
      status
      screeningRequestMessageTemplate
      autoSendScreeningRequests
      allowTextualAnswers
      questions {
        rawId
        title
        status
        description
        answersCount
        jobsCount
        maxDuration
      }
      project {
        rawId
        title
        description
      }
      ...JobScreeningForm_Job
    }
  `, jobFragmentRef)

  const { execute: commit } = useQuickCommit(
    graphql`
      mutation JobScreeningStep_UpdateJobScreeningMutation($input: UpdateJobScreeningInput!) {
        updateJobScreening(input: $input) {
          job {
            autoSendScreeningRequests
            screeningRequestMessageTemplate
            allowTextualAnswers
            project {
              rawId
              title
              description
            }
            questions {
              rawId
              title
              description
              status
              answersCount
              jobsCount
              maxDuration
            }
          }
        }
      }
    `,
  )

  const handleSubmit = async (formData: IJobScreeningFormPayload, shouldContinue: boolean) => {
    const result = await commit({
      input: {
        project: formData.project || { rawId: -1 },
        questions: formData.questions.map(q => ({ rawId: q.rawId, title: q.title, description: q.description, status: q.status, maxDuration: q.maxDuration })),
        autoSendScreeningRequests: formData.auto_send_screening_requests,
        screeningRequestMessageTemplate: formData.screening_request_message_template,
        allowTextualAnswers: formData.allow_textual_answers,
        slug: job?.slug,
      },
    })

    if (result) {
      showSnackbarMessage('Job saved')

      if (shouldContinue) {
        onContinue()
      }
    }
  }

  return (
    <JobScreeningForm
      jobFragmentRef={job}
      defaultQuestionTitle={extractQueryParams(router?.asPath).question_title}
      submitForm={handleSubmit}
      initialValues={{
        questions: job?.questions?.map(q => ({ ...q, id: q.rawId, answers_count: q.answersCount, jobs_count: q.jobsCount })),
        project: job?.project,
        screening_request_message_template: job?.screeningRequestMessageTemplate || DEFAULT_SCREENING_REQUEST_MESSAGE_TEMPLATE,
        auto_send_screening_requests: job?.autoSendScreeningRequests,
        allow_textual_answers: job?.allowTextualAnswers,
      }}
    />
  )
}

export default React.memo(JobScreeningStep)
