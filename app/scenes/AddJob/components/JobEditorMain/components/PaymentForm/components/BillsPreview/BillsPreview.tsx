import { Grid, Typography, Divider } from '@material-ui/core'
import React, { useMemo } from 'react'
import { activationBillsPreview, periodicBillsPreview } from 'services/billingPlans'
import { IBillingPlan, IJob } from 'types'
import styles from '../../PaymentForm.module.css'
import BillItem from './BillItem'

interface IBillsPreviewProps {
  job: Pick<IJob, 'job_integrations'> & { id: any }
  selectedPlan: IBillingPlan
}

const BillsPreview = ({ job, selectedPlan }: IBillsPreviewProps) => {
  const periodicBills = useMemo(() => periodicBillsPreview(selectedPlan, job), [job?.id, selectedPlan?.id])
  const activationBills = useMemo(() => activationBillsPreview(job), [job?.id])

  return (
    <React.Fragment>
      <Divider />

      <div className={styles.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">
              Billed on job publication
            </Typography>
          </Grid>

          {activationBills.length === 0 && <BillItem bill={{ name: 'No items will be billed' }} />}

          {activationBills.map(bill => <BillItem bill={bill} />)}
        </Grid>
      </div>

      <div className={styles.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">
              Billed on the first Wednesday of the month
            </Typography>
          </Grid>

          {periodicBills.length === 0 && <BillItem bill={{ name: 'No items will be billed' }} />}

          {periodicBills.map(bill => <BillItem bill={bill} />)}
        </Grid>
      </div>
    </React.Fragment>
  )
}

export default BillsPreview
