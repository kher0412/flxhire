import { connect, ConnectedProps } from 'react-redux'
import { reduxForm, InjectedFormProps, formValueSelector } from 'redux-form'
import { createAction } from 'redux-actions'
import { RootState } from 'reducers'
import { SUBMIT_COMPANY_FORM } from 'scenes/Account/AccountDucks'
import InvoicesForm from './InvoicesForm'

export interface FormData {
  allow_invoice_auto_charge: boolean
  currency: string
  additional_invoice_text: string
  additional_invoice_text_user: string
  emails_for_invoices: string
  purchase_order_number: string
}

const form = {
  form: 'invoicesForm',
  enableReinitialize: true,
}

const mapStateToProps = (state: RootState) => {
  const user = state.auth.currentUser
  const firm = user?.firm

  return {
    unifyInvoicesInPreferredCurrency: formValueSelector(form.form)(state, 'unify_invoices_in_preferred_currency') as boolean,
    initialValues: {
      allow_invoice_auto_charge: firm?.allow_invoice_auto_charge,
      currency: firm?.currency,
      unify_invoices_in_preferred_currency: firm?.unify_invoices_in_preferred_currency,
      additional_invoice_text: firm?.additional_invoice_text,
      additional_invoice_text_user: user?.additional_invoice_text,
      emails_for_invoices: firm?.emails_for_invoices?.join(','),
      purchase_order_number: user.purchase_order_number,
    },
  }
}

const mapDispatchToProps = dispatch => ({
  submitForm: formData => dispatch(createAction(SUBMIT_COMPANY_FORM)({
    formData: {
      ...formData,
      billing_plan_id: formData.billing_plan?.id,
    },
  })),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type InvoicesFormContainerProps = ConnectedProps<typeof connector> & InjectedFormProps<FormData>

export default connector(reduxForm<FormData, {}>(form)(InvoicesForm))
