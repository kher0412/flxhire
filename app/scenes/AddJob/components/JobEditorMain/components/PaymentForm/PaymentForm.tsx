import React from 'react'
import { Grid, Typography, Divider, Collapse, Card } from '@material-ui/core'
import { Button } from 'components/themed'
import { IJob } from 'types'
import { ExternalLink, LoadingIcon, PaymentMethodSetup } from 'components'
import { Send } from '@material-ui/icons'
import styles from './PaymentForm.module.css'
import { PaymentFormContainerProps } from './PaymentFormContainer'
import BillsPreview from './components/BillsPreview'

export interface IPaymentFormProps {
  jobId?: string
  job?: Pick<IJob, 'job_integrations'> & { id: any }
  show: boolean
  onPaymentMethodAdded: () => void
}

export interface IPaymentFormState {
  paymentMethodAdded: boolean
}

export default class PaymentForm extends React.Component<IPaymentFormProps & PaymentFormContainerProps, IPaymentFormState> {
  formElement: HTMLFormElement

  constructor(props: IPaymentFormProps & PaymentFormContainerProps) {
    super(props)

    this.state = {
      paymentMethodAdded: !!props.user?.firm?.payment_method,
    }
  }

  componentDidUpdate(prevProps: IPaymentFormProps & PaymentFormContainerProps) {
    const { show, selectedPlan } = this.props

    if ((show && !!selectedPlan) && (!prevProps.show || !prevProps.selectedPlan)) {
      window.setTimeout(() => {
        if (this.formElement) {
          this.formElement.scrollIntoView({ behavior: 'smooth' })
        }
      }, 500)
    }
  }

  render() {
    const { show, selectedPlan, handleSubmit, submitForm, jobId, job, isSavingJob, user, onPaymentMethodAdded } = this.props
    const { paymentMethodAdded } = this.state

    const needsPaymentMethod = !paymentMethodAdded && !user?.firm?.allow_no_payment_method

    return (
      <Collapse in={show && !!selectedPlan}>
        <Card raised style={{ marginTop: 48 }}>
          <form onSubmit={handleSubmit(formData => submitForm(formData, jobId))} ref={form => this.formElement = form}>
            <div className={styles.box}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h3">
                    Review &amp; Publish
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body1">
                    <ExternalLink href={`/job/${jobId}`} label="Review your job posting" showExternalIcon /> and set up your payment method.
                  </Typography>
                </Grid>
              </Grid>
            </div>

            <BillsPreview job={job} selectedPlan={selectedPlan} />

            <Collapse in={!paymentMethodAdded}>
              <Divider />

              <div className={styles.box}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h4">
                      Payment method
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <PaymentMethodSetup
                      redirectUrl={jobId ? `/client/job/${jobId}/review` : undefined}
                      onAdded={() => {
                        onPaymentMethodAdded()
                        this.setState({
                          paymentMethodAdded: true,
                        })
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </Collapse>

            <div className={styles.box} style={{ textAlign: 'right' }}>
              <Button type="submit" color="primary" data-cy="publish-changes" disabled={needsPaymentMethod || !selectedPlan || isSavingJob}>
                {isSavingJob ? <LoadingIcon /> : <Send />} Publish Job
              </Button>
            </div>
          </form>
        </Card>
      </Collapse>
    )
  }
}
