import React from 'react'
import { IFreelancerType, IFreelancerSubtype, ISkill, IQuestion, IQuestionUpdateNode } from 'types'
import { Button, InfoMessage } from 'components/themed'
import { MediaQuery, ExistingQuestionsDialog } from 'components'
import { useOnMount } from 'hooks'
import { FieldArrayFieldsProps, FieldArrayMetaProps } from 'redux-form'
import { LibraryBooks } from '@material-ui/icons'
import JobQuestion from './components/JobQuestion'
import AddQuestionButton from './components/AddQuestionButton'
import { QuestionType } from '../../JobScreeningFormContainer'

export interface IJobQuestionsProps {
  fields: FieldArrayFieldsProps<Partial<QuestionType>>
  meta: FieldArrayMetaProps
  questionTitle?: string
  freelancerTypes: IFreelancerType[]
  freelancerSubtypes: IFreelancerSubtype[]
  skills: ISkill[]
  selectedFreelancerSubtypeIds: number[]
}

function JobQuestions(props: IJobQuestionsProps) {
  const { fields, meta, freelancerTypes, freelancerSubtypes, skills, selectedFreelancerSubtypeIds, questionTitle: initialQuestionTitle } = props
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const closeExistingQuestionsDialog = () => setDialogOpen(false)
  const openExistingQuestionsDialog = () => setDialogOpen(true)

  const removeExistingQuestion = (question: IQuestion) => {
    const id = question?.id

    if (id) {
      fields.map((q, i) => fields.get(i).rawId === id ? i : -1).filter(x => x >= 0).forEach(x => fields.remove(x))
    }
  }

  const addExistingQuestion = (question: IQuestion) => {
    // TODO: once the ExistingQuestionsDialog is also on graphql, the ID-to-RawID conversion can be dropped
    fields.push({ rawId: question.id, maxDuration: question.max_duration, ...question })
  }

  const handleQuestionChange = (q: IQuestionUpdateNode, i: number) => {
    if (i >= fields.length) {
      fields.push(q)
    } else {
      fields.remove(i)
      fields.insert(i, q)
    }
  }

  const handleQuestionRemove = (i: number) => {
    fields.remove(i)
  }

  useOnMount(() => {
    if (initialQuestionTitle) {
      setDialogOpen(true)
    }
  })

  return (
    <React.Fragment>
      {dialogOpen && (
        <ExistingQuestionsDialog
          open
          onClose={closeExistingQuestionsDialog}
          questions={fields.map((q, i) => fields.get(i)).map(q => ({ id: q.rawId, ...q }))}
          addQuestion={addExistingQuestion}
          removeQuestion={removeExistingQuestion}
          freelancerSubtypes={freelancerSubtypes}
          selectedFreelancerSubtypeIds={selectedFreelancerSubtypeIds}
          freelancerTypes={freelancerTypes}
          skills={skills}
          questionTitle={initialQuestionTitle}
          noFiltersMessage="Choose a Candidate Type for this Job to unlock more Question filtering tools."
        />
      )}

      <div>
        <JobQuestion
          index={-1}
          question={{
            title: [
              'Please record a brief video telling us a bit about you!',
              'For example, who you are, where you are from, your background, education, professional experience and something you like to do for fun!',
              'You can use our built in recorder and teleprompter and check out sample videos for inspiration or upload an an existing video if you prefer.',
            ].join(' '),
            rawId: 1,
          } as QuestionType}
          disabled
        />

        {fields.map((q, i) => (
          <JobQuestion
            key={i}
            index={i}
            question={fields.get(i)}
            onChange={question => handleQuestionChange(question, i)}
            onRemove={() => handleQuestionRemove(i)}
          />
        ))}

        {meta.error && (
          <InfoMessage style={{ marginBottom: 24 }}>
            {meta.error}
          </InfoMessage>
        )}
      </div>

      <MediaQuery maxWidth={500}>
        {isMobile => (
          <React.Fragment>
            <Button
              color="secondary"
              onClick={openExistingQuestionsDialog}
              data-cy="add-existing-question"
              style={{ marginRight: 12, marginBottom: 12 }}
              fullWidth={isMobile}
            >
              <LibraryBooks style={{ marginRight: 12 }} /> Browse From Existing Questions
            </Button>

            <AddQuestionButton
              onAdd={question => handleQuestionChange(question, fields.length)}
              fullWidth={isMobile}
            />
          </React.Fragment>
        )}
      </MediaQuery>
    </React.Fragment>
  )
}

export default React.memo(JobQuestions)
