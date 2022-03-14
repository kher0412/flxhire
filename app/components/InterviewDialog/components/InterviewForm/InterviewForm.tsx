import React from 'react'
import { reduxForm, Field, InjectedFormProps, Fields } from 'redux-form'
import { SelectField, MessageField } from 'components/themed'
import { createAction } from 'redux-actions'
import { trackError, trackEvent } from 'services/analytics'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { Grid, MenuItem } from '@material-ui/core'
import { IFreelancer, FormErrors } from 'types'
import { setUTCOffset } from 'services/timeKeeping'
import { useDetectTimezone } from 'hooks'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { commitMutation } from 'api/graphql'
import { InterviewForm_ClientsQuery } from '__generated__/InterviewForm_ClientsQuery.graphql'
import { InterviewForm_RequestInterviewMutation } from '__generated__/InterviewForm_RequestInterviewMutation.graphql'
import { InterviewDateFields } from '../InterviewDateFields'

export interface InterviewFormData {
  freelancer_id: number
  client_id: number
  interview_note: string
  calendly_url: string
  interview_scheduling_method: 'schedule_via_calendly' | 'schedule_via_flexhire'
  timezone_offset: number
  interview_date_1: string
  interview_date_2: string
  interview_date_3: string
}

interface IInterviewFormProps {
  contractId: string
  freelancer: Pick<IFreelancer, 'timezone_offset' | 'first_name' | 'id' | 'avatar_url'>
  onSuccess?: () => void
  isReschedule?: boolean
  connectionId?: string
}

const InterviewForm = (props: InjectedFormProps<InterviewFormData> & IInterviewFormProps) => {
  const { freelancer, isReschedule } = props
  const timezone = useDetectTimezone()
  const managerData = useLazyLoadQuery<InterviewForm_ClientsQuery>(graphql`
    query InterviewForm_ClientsQuery {
      currentUser {
        firm {
          users {
            rawId
            name
            timezoneOffset
          }
        }
      }
    }
  `, {}, {
    fetchPolicy: 'store-and-network',
  })

  const managers = managerData?.currentUser?.firm?.users || []
  const managersReceived = managers?.length > 0

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Fields
          names={['timezone_offset', 'interview_date_1', 'interview_date_2', 'interview_date_3', 'calendly_url', 'interview_scheduling_method']}
          component={InterviewDateFields}
          freelancer={freelancer}
          userTimezone={timezone?.offset}
        />

        <Grid item xs={12} md={12}>
          {!managersReceived && (
            // Show a separate SelectField while managers are loading, otherwise an empty label would show until loaded
            <SelectField
              disabled
              fullWidth
              label="Interviewer (loading...)"
            />
          )}

          {managersReceived && (
            <Field
              name="client_id"
              component={SelectField}
              label="Interviewer"
              fullWidth
            >
              {managers.map(manager => (
                <MenuItem
                  key={manager.rawId}
                  value={manager.rawId}
                >
                  {manager.name}
                </MenuItem>
              ))}
            </Field>
          )}
        </Grid>
        <Grid item xs={12}>
          <Field
            contact={{
              id: freelancer?.id,
              avatar_url: freelancer?.avatar_url,
              first_name: freelancer?.first_name,
            }}
            component={MessageField}
            name="interview_note"
            placeholder={(
                isReschedule ?
                  `Optionally tell ${freelancer?.first_name} why you are rescheduling...` :
                  `Optionally send ${freelancer?.first_name} a personal message with the interview...`
              )}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default reduxForm<InterviewFormData, IInterviewFormProps>({
  form: 'hireInterviewForm',
  validate: (values) => {
    const errors: FormErrors<InterviewFormData> = {}

    if (values.interview_scheduling_method !== 'schedule_via_calendly' && !values.interview_date_1) {
      errors.interview_date_1 = 'Required'
    }

    if (values.interview_scheduling_method === 'schedule_via_calendly' && !values.calendly_url) {
      errors.calendly_url = 'Required'
    }

    return errors
  },
  enableReinitialize: true,
  onSubmit: async (values, dispatch, props) => {
    try {
      const input: InterviewForm_RequestInterviewMutation['variables']['input'] = {
        contractId: props.contractId,
        interviewDate1: values.interview_date_1 ? setUTCOffset(values.interview_date_1, values.timezone_offset) as any : null,
        interviewDate2: values.interview_date_2 ? setUTCOffset(values.interview_date_2, values.timezone_offset) as any : null,
        interviewDate3: values.interview_date_3 ? setUTCOffset(values.interview_date_3, values.timezone_offset) as any : null,
        clientAgreesTerms: true,
        clientId: values.client_id,
        interviewNote: values.interview_note,
        calendlyUrl: values.calendly_url,
        interviewSchedulingMethod: values.interview_scheduling_method,
      }

      await commitMutation<InterviewForm_RequestInterviewMutation>({
        mutation: graphql`
          mutation InterviewForm_RequestInterviewMutation($input: RequestInterviewInput!, $connections: [ID!]!) {
            requestInterview(input: $input) {
              contract {
                id @deleteEdge(connections: $connections)
                lastInteractionAt
                status
                interviewDate
                interviewDate1
                interviewDate2
                interviewDate3
                calendlyUrl
                interviewSchedulingMethod
                client {
                  name
                }
              }
            }
          }
        `,
        variables: {
          input,
          connections: props?.connectionId ? [props.connectionId] : [],
        },
      })
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Interview requested successfully' }))
      trackEvent('Client Request Interview')
      if (props.onSuccess) props.onSuccess()
    } catch (error) {
      trackError(error)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: error.response || error.message }))
    }
  },
})(InterviewForm as any)
