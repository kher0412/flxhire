import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { reduxForm, formValueSelector } from 'redux-form'
import { trackError } from 'services/analytics'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { commitMutation } from 'api/graphql'
import { graphql } from 'relay-runtime'
import RatingForm, { IRatingFormProps } from './RatingForm'
import { RatingFormContainer_SendContractRatingMutation } from '__generated__/RatingFormContainer_SendContractRatingMutation.graphql'

const validate = (values: any) => {
  const errors = {} as any

  if (!values.description) {
    errors.description = 'Required'
  }

  if (values.rating_positive !== true && values.rating_positive !== false) {
    errors.rating_positive = 'Required'
  }

  return errors
}

const mapStateToProps = (state: any) => ({
  isRatingSelected: formValueSelector('contractRatingForm')(state, 'rating_positive') !== undefined,
})

export default connect(mapStateToProps)(reduxForm({
  form: 'contractRatingForm',
  validate,
  onSubmit: async (values, dispatch, props: IRatingFormProps) => {
    try {
      await commitMutation<RatingFormContainer_SendContractRatingMutation>({
        mutation: graphql`
          mutation RatingFormContainer_SendContractRatingMutation($input: SendContractRatingInput!) {
            sendContractRating(input: $input) {
              contractFeedback {
                contract {
                  positiveFeedbackCount
                  negativeFeedbackCount
                  contractFeedbacks {
                    id
                    user {
                      rawId
                    }
                    ...RatingEntry_Feedback
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: {
            contractId: props.contract.id,
            status: 'sent',
            description: values.description,
            ratingPositive: values.rating_positive,
          },
        },
      })
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Rating sent' }))
      if (props.afterSend) props.afterSend()
    } catch (error) {
      trackError(error)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: error.response || error.message }))
    }
  },
})(RatingForm as any))
