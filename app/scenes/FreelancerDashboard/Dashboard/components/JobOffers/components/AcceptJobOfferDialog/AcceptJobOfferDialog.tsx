import React from 'react'
import { Field } from 'redux-form'
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { TermsOfServiceField, ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import styles from './AcceptJobOfferDialog.module.css'
import { ContainerProps } from './AcceptJobOfferDialogContainer'

const AcceptJobOfferDialog = ({ open, closeDialog, handleSubmit, pristine, submitting, submitForm, jobOffer }: ContainerProps) => {
  if (!jobOffer) return null

  return (
    <ResponsiveDialog open={open} onClose={closeDialog}>
      <form onSubmit={handleSubmit(formData => submitForm(formData, jobOffer))}>
        <DialogTitle>
          Accept offer
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Congratulations on receiving an offer!
            Please read the below contract carefully, you are ready to start immediately once done.
          </DialogContentText>

          <div className={styles.contract}>
            This FlexHire Contractor Agreement (the "Agreement" or "Contract") is a contract between you (the "Contractor") and FlexHire LLC, a Delaware incorporated company (“FlexHire”, "we" or "us") with its principal place of business in Utah, USA. You must read, agree with and accept all of the terms and conditions contained in this contract in order to accept this job offer.
            Accepting this Contract is also in addition to your acknowledgment of your prior acceptance of the <a href="/terms"> terms and conditions</a> governing Flexhire. Your access to and use of the FlexHire Platform is also governed by information, guidelines and policies made available on the Site.

            <p><b>Working on Contracts.</b></p>

            The Contractor is responsible for providing all tools and resources necessary to complete the Contract, unless explicitly stated otherwise in advance by the Client. Contractors agree to respond to all Client communications and requests for information within one business day. If the Contractor will be unable to meet this requirement due to an absence, he/she is expected to notify the Client at least 2 weeks prior. After the completion of a Contract, the Contractor can provide timely, honest and objective feedback on the Client.

            <p><b>Billing and Payments.</b></p>

            Contractors are expected to submit accurate timesheets noon every Friday. The Contractor acknowledges that failure to provide accurate, timely timesheets shall result in their potential failure to get paid.
            Contractor understands that Payment to the Contractor is firstly dependent on payment to Flexhire by the Client.
            <p>
              In cases where there is a dispute on payments between a Contractor and a Client Flexhire may act as an intermediary however cannot guarantee payment and the Contractor indemnifies Flexhire of all responsibility to do so.
              In cases where Flexhire decides to act as an intermediary in a dispute over Contractor payment, Flexhire reserves the right to ban a Client or Contractor from the platform at our discretion.
            </p>
            Contractor understands that the client shall be invoiced after every week of work, and has two further weeks in which to make payment.
            Contractor shall be paid post payment to Flexhire. Thus, for the first payment, Contractor understands it shall take up to 3 weeks post initial contract start date and then every week thereafter.
          </div>
          <div className={styles['terms-of-service']}>
            <Field name="freelancer_agrees_terms" component={TermsOfServiceField} />
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>
            Cancel
          </Button>

          <Button type="submit" disabled={pristine || submitting} color="primary" data-cy="submit-accept-offer">
            Accept
          </Button>
        </DialogActions>
      </form>
    </ResponsiveDialog>
  )
}

export default AcceptJobOfferDialog
