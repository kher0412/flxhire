import React from 'react'
import { Accordion, ExpansionPanelDetails, AccordionSummary } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import styles from './StaffingAgreement.module.css'

const StaffingAgreementText = () => (
  <div className={styles.container}>
    <div className={styles.contract}>
      <p>
        This FlexHire Staffing Agreement (the "Agreement" or "Contract") is a contract between the sender (the "Client") and recipient (the "Candidate") of an interview or work offer on the Flexhire platform, and FlexHire LLC, a Delaware incorporated company (“FlexHire”, "we" or "us") with its principal place of business in Utah, USA.
        The Client and the Candidate (the "Parties") must read, agree with and accept all of the terms and conditions contained in this contract in order to accept this interview or job offer.
        Accepting this Contract is also in addition to the Parties' acknowlegement of his/her prior acceptance of the <a href="/terms" target="_blank"> terms and conditions</a> governing usage of the Flexhire platform.
        The Parties' access to and use of the FlexHire Platform is also governed by information, guidelines and policies made available on the Site.
      </p>

      <p>
        <strong>Non Solicitation.</strong>
      </p>

      <p>
        The Parties acknowledge and agree not to attempt to directly engage in work together, for at least period of at least one calendar year from this form's submission date, other than through the Flexhire platform unless they can prove in a court of law a pre-existing relationship. The Parties acknowledge that failure to abide by this agreement can materially impact Flexhire's business and maybe subject to litigation.
      </p>

      <p>
        <strong>Working with Flexhire Clients.</strong>
      </p>

      <p>
        The Candidate is responsible for providing all tools and resources necessary to complete the Contract, unless explicitly stated otherwise in advance by (the "Client").
        Candidates agree to respond to all Client communications and requests for information within one business day unless otherwise agreed with the Client.
        If the Candidate will be unable to meet this requirement due to an absence, he/she is expected to notify the Client at least 2 weeks prior.
        After the completion of a Contract, the Candidate can provide timely, honest and objective feedback on the Client.
      </p>

      <p>
        <strong>Billing and Payments.</strong>
      </p>

      <p>
        If working on a freelance work offer, Candidates are expected to submit accurate timesheets noon every Friday.
        The Candidate acknowledges that failure to provide accurate, timely timesheets shall result in their potential failure to get paid.
        Candidate understands that Payment to the Candidate is firstly dependent on payment to Flexhire by the Client.
      </p>
      <p>
        In cases where there is a dispute on payments between a Candidate and a Client Flexhire may act as an intermediary however cannot guarantee payment and the Candidate indemnifies Flexhire of all responsiblity to do so.
        In cases where Flexhire decides to act as an intermediary in a dispute over Candidate payment, Flexhire reserves the right to ban a Client or Candidate from the platform at our discretion.
      </p>
      <p>
        Candidate understands that the client shall be invoiced after one week or one month of work, and has two further weeks in which to make payment.
        Candidate shall be paid post payment to Flexhire.
        Thus, for the first payment, Candidate understands it may take up to 6 weeks post initial contract start date and then every week thereafter.
      </p>
    </div>
  </div>
)

const StaffingAgreement = props => (
  <React.Fragment>
    <Accordion {...props}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} data-cy="flexhire-agreement">
        FlexHire Non Solicitation & Work Agreement
      </AccordionSummary>
      <ExpansionPanelDetails>
        <StaffingAgreementText />
      </ExpansionPanelDetails>
    </Accordion>

    <div className={styles.message}>
      By submitting this form, you acknowledge that you and your company shall agree not to attempt to directly hire this candidate, for at least period of at least one calendar year from this form's submission date, other than through the Flexhire platform unless you can prove in a court of law a pre-existing relationship with the candidate. You acknowledge that failure to abide by this agreement can materially impact Flexhire's business and may be subject to litigation.
    </div>
  </React.Fragment>
)

export default StaffingAgreement
