import { connect, ConnectedProps } from 'react-redux'
import { reduxForm, InjectedFormProps } from 'redux-form'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import { setAvoidBillingSetupDialog } from 'reducers/Common'
import PlansForm from './PlansForm'
import { SUBMIT_ACCOUNT_FORM } from '../../AccountDucks'

const form = {
  form: 'plansForm',
  enableReinitialize: true,
}

const mapStateToProps = (state: RootState) => {
  const user = state.auth.currentUser

  return {
    user: user,
    initialValues: {
      billing_plan: user?.firm?.billing_plan,
    },
  }
}

const mapDispatchToProps = dispatch => ({
  setAvoidBillingSetupDialog: (avoid: boolean) => dispatch(setAvoidBillingSetupDialog(avoid)),
  submitForm: formData => dispatch(createAction(SUBMIT_ACCOUNT_FORM)({
    formData: {
      ...formData,
      billing_plan_id: formData.billing_plan?.id,
    },
  })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type PlansFormContainerProps = ConnectedProps<typeof connector> & InjectedFormProps

export default connector(reduxForm(form)(PlansForm))
