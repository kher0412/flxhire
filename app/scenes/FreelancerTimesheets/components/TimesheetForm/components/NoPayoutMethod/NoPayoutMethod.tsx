import React from 'react'
import { Button } from 'components/themed'
import Grid from '@material-ui/core/Grid'
import styles from './NoPayoutMethod.module.css'

const NoPayoutMethod = ({ onClick }: { onClick: () => void }) => (
  <Grid container spacing={8} className={styles['no-payout-method']}>
    <Grid item xs={12} sm={12} md={9} style={{ display: 'flex', alignItems: 'center' }}>
      <div className={styles.message}>
        Heads up!
        To receive payments, you'll need to set up payments from the Account page.
      </div>
    </Grid>

    <Grid item xs={12} sm={12} md={3}>
      <Button
        style={{ fontSize: '14px' }}
        color="secondary"
        fullWidth
        onClick={onClick}
      >
        Set up Payments now
      </Button>
    </Grid>
  </Grid>
)

export default React.memo(NoPayoutMethod)
