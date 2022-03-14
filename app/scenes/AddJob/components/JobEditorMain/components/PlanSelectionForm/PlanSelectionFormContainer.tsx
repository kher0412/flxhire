import { InjectedFormProps, reduxForm } from 'redux-form'
import { IBillingPlan } from 'types'
import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import { SUBMIT_ACCOUNT_FORM } from 'scenes/Account/AccountDucks'
import PlanSelectionForm, { IPlanSelectionFormProps } from './PlanSelectionForm'

const mapStateToProps = (state: RootState) => {
  const currentUser = state.auth.currentUser

  return {
    currentUser: currentUser,
    isSavingJob: state.clientHire.isSavingJob,
    savedBillingPlan: currentUser?.firm?.billing_plan,
    initialValues: {
      billing_plan: currentUser?.firm?.billing_plan,
    },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: (jobId: string, billingPlan: IBillingPlan) => {
      if (jobId && billingPlan) {
        dispatch(createAction(SUBMIT_ACCOUNT_FORM)({
          formData: {
            billing_plan_id: billingPlan.id,
          },
        }))
      }
    },
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export type PlanSelectionFormContainerProps = InjectedFormProps<any, IPlanSelectionFormProps> & ConnectedProps<typeof connector>

export const FORM_NAME = 'planSelectionForm'

const planSelectionForm = {
  form: FORM_NAME,
  destroyOnUnmount: false,
  enableReinitialize: true,
}

export default connector(reduxForm<any, IPlanSelectionFormProps>(planSelectionForm)(PlanSelectionForm))
