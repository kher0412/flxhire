import { connect, ConnectedProps } from 'react-redux'
import { reduxForm, InjectedFormProps, formValueSelector } from 'redux-form'
import { RootState } from 'reducers'
import { IBillingPlan } from 'types'
import { commitMutation } from 'api/graphql'
import { graphql } from 'relay-runtime'
import { PaymentFormContainer_UpdateJobDetailsMutation } from '__generated__/PaymentFormContainer_UpdateJobDetailsMutation.graphql'
import { browserHistory } from 'services/router'
import { trackError } from 'services/analytics'
import { createAction } from 'redux-actions'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { getErrorText } from 'services/error'
import { FORM_NAME as PLAN_SELECTION_FORM_NAME } from '../PlanSelectionForm/PlanSelectionFormContainer'
import PaymentForm, { IPaymentFormProps } from './PaymentForm'

export const FORM_NAME = 'paymentForm'

const paymentForm = {
  form: FORM_NAME,
  validate: (values) => {
    const errors = {} as any

    if (!values.billing_plan_id) {
      errors.billing_plan_id = 'Selecting a billing plan is required'
    }

    return errors
  },
  destroyOnUnmount: false,
  enableReinitialize: true,
}

const mapStateToProps = (state: RootState) => {
  const billingPlan = formValueSelector(PLAN_SELECTION_FORM_NAME)(state, 'billing_plan') as IBillingPlan

  return {
    user: state.auth.currentUser,
    isSavingJob: state.clientHire.isSavingJob,
    selectedPlan: billingPlan,
    initialValues: {
      billing_plan_id: billingPlan?.id,
    },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: async (formData, jobId) => {
      try {
        const mutationResponse = await commitMutation<PaymentFormContainer_UpdateJobDetailsMutation>({
          mutation: graphql`
            mutation PaymentFormContainer_UpdateJobDetailsMutation($input: UpdateJobDetailsInput!) {
              updateJobDetails(input: $input) {
                job {
                  slug
                  status
                }
              }
            }
          `,
          variables: {
            input: {
              slug: jobId ? `${jobId}` : undefined,
              status: 'opened',
            },
          },
        })
        const job = mutationResponse?.updateJobDetails?.job

        if (job?.status === 'opened') {
          browserHistory.push('/client/hire', `/client/hire?job=${job.slug}&tab=potential`)
        }
      } catch (error) {
        trackError(error)
        dispatch(createAction(TOGGLE_SNACKBAR)({ message: getErrorText(error) }))
      }
    },
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type PaymentFormContainerProps = InjectedFormProps<any, IPaymentFormProps> & ConnectedProps<typeof connector>

export default connector(reduxForm<any, IPaymentFormProps>(paymentForm)(PaymentForm))
