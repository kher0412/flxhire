import React from 'react'
import { Grid, Divider, Typography } from '@material-ui/core'
import { getCountryName } from 'services/location'
import { GridExpandable, LoadingPage, MoreButtonCard } from 'components'
import { Box, InfoMessage } from 'components/themed'
import { graphql, useFragment } from 'react-relay'
import { PayingYou_User$key } from '__generated__/PayingYou_User.graphql'
import PayoneerItem from './components/PayoneerItem'
import StripeConnectItem from './components/StripeConnectItem'
import PayoutMethod from './components/PayoutMethod'
import styles from './PayingYou.module.css'

const PayingYou = ({ user: userProp }: { user: PayingYou_User$key }) => {
  const user = useFragment(graphql`
    fragment PayingYou_User on User {
      canSetupPayoutMethod
      payoutMethods {
        id
        payoutMethodType
        status
        ...PayoutMethod_PayoutMethod
      }
      configuration {
        payoutMethodTypes
        stripeConnectSupportedCountries
      }
    }
  `, userProp)

  const canSetupPayoutMethod = user?.canSetupPayoutMethod
  const payoutMethods = user?.payoutMethods
  const payoutMethodTypes = user?.configuration?.payoutMethodTypes || []
  const payoneerAdded = payoutMethods.some(p => p.payoutMethodType === 'payoneer')
  const payoneerVisible = payoneerAdded || payoutMethodTypes?.indexOf('payoneer') >= 0
  const payoneerAvailable = payoneerAdded || (canSetupPayoutMethod && payoutMethodTypes?.indexOf('payoneer') >= 0)
  const stripeAdded = payoutMethods.some(p => p.payoutMethodType === 'stripe_connect')
  const stripeVisible = stripeAdded || payoutMethodTypes?.indexOf('stripe_connect') >= 0
  const stripeAvailable = stripeAdded || (canSetupPayoutMethod && payoutMethodTypes?.indexOf('stripe_connect') >= 0)
  const status = payoutMethods[payoutMethodTypes.indexOf('payoneer')]
  const countryCodeList = user?.configuration?.stripeConnectSupportedCountries || []
  const stripeSupportedCountries: string[] = React.useMemo(() => countryCodeList.map(c => getCountryName(c)).sort(), [countryCodeList])
  const payoneerPending = payoneerAvailable && status?.status === 'pending'

  return (
    <React.Fragment>
      <Box>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h4">
              Paying You
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="body1">
              How to choose the best payment provider for you:
              <ul>
                <li>Choose Payoneer to receive payments in USD</li>
                <li>
                  Choose Stripe to receive payments in any currency
                  {' '}
                  <MoreButtonCard
                    component={props => (
                      <a role="button" {...props} style={{ cursor: 'pointer', textDecoration: 'underline' }}>if your country is supported</a>
                    )}
                    popoverStyle={{ maxWidth: 500 }}
                  >
                    Supported countries for Stripe Payments: {stripeSupportedCountries.join(', ')}
                  </MoreButtonCard>
                </li>
              </ul>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      {!canSetupPayoutMethod && <InfoMessage>You need an active contract to set up payment methods</InfoMessage>}
      <Box>
        <Grid container spacing={2} style={{ justifyContent: 'center' }}>
          {payoneerVisible && (
            <Grid item xs={12} md={4}>
              <PayoneerItem
                available={payoneerAvailable}
                completed={!payoneerPending && payoneerAdded}
              />
            </Grid>
          )}
          {stripeVisible && (
            <Grid item xs={12} md={4}>
              <StripeConnectItem
                available={stripeAvailable}
                completed={stripeAdded}
              />
            </Grid>
          )}
        </Grid>
      </Box>

      <Divider />

      <Box>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Typography variant="h5">
              Existing Payment Methods
            </Typography>
          </Grid>

          <Grid item md={12} />

          <GridExpandable item sm={12} md={12} expand={!payoutMethods}>
            <LoadingPage />
          </GridExpandable>

          <GridExpandable item sm={12} md={12} expand={payoutMethods?.length === 0}>
            <InfoMessage>
              No payment methods added yet.
              Choose a new payment method to add from above.
            </InfoMessage>
          </GridExpandable>

          {payoutMethods?.map(p => (
            <Grid item sm={12} md={6} key={p.id}>
              <div className={styles.payoutMethod}>
                <PayoutMethod payoutMethod={p} />
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default PayingYou
