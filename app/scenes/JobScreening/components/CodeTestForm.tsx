import React from 'react'
import { CardContent, CardHeader, Typography, CardActions, Divider } from '@material-ui/core'
import { InfoMessage, Button } from 'components/themed'
import { CodeTest } from 'components'
import { IContractForFreelancer } from 'types'
import CodeTestSubmission, { asyncValidate } from 'scenes/Job/components/JobApplicationDialog/components/CodeTestSubmission'
import { getAPIClient } from 'api'
import { createAction } from 'redux-actions'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { trackError } from 'services/analytics'
import { ConfigProps, InjectedFormProps, reduxForm } from 'redux-form'
import { getCodeTestRequests } from 'services/contract'
import { Save, Send } from '@material-ui/icons'
import HiringManagerChatButton from './HiringManagerChatButton'

interface ICodeTestFormProps {
  contract: IContractForFreelancer
  onUpdate?: () => void
  handleFinish?: () => void
  mobile?: boolean
}

const CodeTestForm = ({ contract, initialValues, handleSubmit, asyncValidating, submitting, mobile }: ICodeTestFormProps & InjectedFormProps<any>) => {
  const companyName = contract.company_name
  const project = getCodeTestRequests(contract)?.[0]?.project
  const hasSubmission = Boolean(initialValues?.id)
  const hiringManager = contract.hiring_manager || contract.client
  return (
    <React.Fragment>
      {!mobile && <CardHeader title={<Typography variant="h5">Code Test</Typography>} />}
      <CardContent>
        <Typography gutterBottom variant="body1" color="textSecondary" component="p">
          {companyName} has asked you to provide a solution to the following code test. Once ready,
          submit the link to the project, any additional instructions and optionally a screenshot.
        </Typography>

        <CodeTest
          title={project?.title}
          description={project?.description}
          style={{ marginBottom: '16px' }}
        />

        {initialValues?.id && (
          <InfoMessage data-cy="submission-saved" style={{ marginBottom: 12 }}>Your solution has been submitted</InfoMessage>
        )}

        <CodeTestSubmission
          asyncValidating={asyncValidating as any}
        />
      </CardContent>
      {!mobile && <Divider />}
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <HiringManagerChatButton hiringManager={hiringManager} mobile={mobile} />
        <Button
          color="primary"
          onClick={handleSubmit}
          disabled={submitting}
          data-cy={hasSubmission ? 'save' : 'finish'}
        >
          {hasSubmission ? <Save /> : <Send />}
          {hasSubmission ? 'Update' : 'Submit'}
        </Button>
      </CardActions>
    </React.Fragment>
  )
}

const formConfig: ConfigProps<any, ICodeTestFormProps> = {
  form: 'ContractRequests',
  asyncValidate,
  asyncBlurFields: ['url'],
  async onSubmit(values, dispatch, props) {
    try {
      const request = getCodeTestRequests(props.contract)?.[0]
      const project = request?.project
      const hasSubmission = Boolean(request.project_submission?.id)
      await getAPIClient().submitProjectSubmission(project.id, values)
      if (props.onUpdate) props.onUpdate()
      if (!hasSubmission && props.handleFinish) {
        props.handleFinish()
      } else {
        dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Code test submission saved' }))
      }
    } catch (error) {
      trackError(error)
    }
  },
}

export default reduxForm(formConfig)(CodeTestForm)
