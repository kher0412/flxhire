import { useMemo } from 'react'
import { AnimBox, Condition, ConditionSwitch } from 'components'
import { Box } from 'components/themed'
import {
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Grid,
} from '@material-ui/core'
import { useSnackbar, useQuickCommit } from 'hooks'
import { graphql, useFragment } from 'react-relay'
import { EmailSettings_User$key } from '__generated__/EmailSettings_User.graphql'
import { EmailSettings_UpdateEmailSubscriptionMutation } from '__generated__/EmailSettings_UpdateEmailSubscriptionMutation.graphql'

function getSubscriptionData() {
  return {
    freelancer_incomplete: {
      primary: 'Member Profile and Screening reminders',
      secondary: `
        Includes periodic emails to remind you about your profile
        effectiveness on the Flexhire platform.
      `,
    },
    job_opportunity: {
      primary: 'Job Opportunities',
      secondary: `
        Includes emails about job opportunities for yourself. We will send this emails
        when a client is looking for someone matching your profile and compensation.
      `,
    },
    referral_opportunity: {
      primary: 'Referral Opportunities',
      secondary: `
        Includes emails about opportunities to refer someone else from your industry for a job,
        if they are within your country or timezone. You will be rewarded with a payment if someone
        you referred gets hired.
      `,
    },
    timesheet_reminders: {
      primary: 'Work Report Reminders',
      secondary: `
        At the end of the week, we remind you to submit your Work Reports
        for any active contracts you have at the moment. By turning this
        off, you won't receive any reminder. Keep in mind that the payment dates
        for your work will depend on Work Report submission and approval by the client.
      `,
    },
  }
}

const EmailSettings = ({ user: userProp }: { user: EmailSettings_User$key }) => {
  const user = useFragment(graphql`
    fragment EmailSettings_User on User {
      emailSubscriptions {
        id
        subscriptionName
        userEnabled
      }
    }
  `, userProp)

  const subscriptionData = useMemo(() => getSubscriptionData(), [])
  const subscriptions = useMemo(() => user?.emailSubscriptions?.map((s) => {
    const extraData: { primary?: string, secondary?: string } = subscriptionData[s.subscriptionName] || {}
    return { ...s, ...extraData } as typeof s & typeof extraData
  }) || [], [user?.emailSubscriptions])

  const toggleSnackbar = useSnackbar()

  const { execute: updateEmailSubscription } = useQuickCommit<EmailSettings_UpdateEmailSubscriptionMutation>(
    graphql`
      mutation EmailSettings_UpdateEmailSubscriptionMutation($input: UpdateEmailSubscriptionInput!) {
        updateEmailSubscription(input: $input) {
          emailSubscription {
            userEnabled
          }
        }
      }
    `,
  )

  const toggleSubscription = (id: string) => async (e: any, checked: boolean) => {
    const result = await updateEmailSubscription({
      input: {
        id,
        userEnabled: checked,
      },
    })

    if (result) toggleSnackbar('Subscription updated')
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AnimBox slide>
            <Typography variant="h4">
              Your Email Subscriptions
            </Typography>
          </AnimBox>
        </Grid>

        <Grid item xs={12}>
          <List>
            <ConditionSwitch>
              <Condition condition={subscriptions?.length > 0}>
                {subscriptions.map(s => (
                  <ListItem key={s.id}>
                    <ListItemText
                      primary={s.primary || s.subscriptionName}
                      secondary={s.secondary || 'Failed to fetch details for this subscription'}
                      style={{ paddingRight: '64px' }}
                    />

                    <ListItemSecondaryAction>
                      <ConditionSwitch>
                        <Condition condition={Boolean(s?.id)}>
                          <Switch
                            onChange={toggleSubscription(s.id)}
                            checked={s.userEnabled}
                            data-cy={`toggle-subscription-${s.subscriptionName}`}
                            data-value={s.userEnabled}
                          />
                        </Condition>
                        <Condition condition>
                          <Switch disabled checked={s.userEnabled} />
                        </Condition>
                      </ConditionSwitch>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </Condition>

              <Condition condition>
                <ListItem>
                  <ListItemText
                    primary="You have no Email Subscriptions"
                  />
                </ListItem>
              </Condition>
            </ConditionSwitch>
          </List>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EmailSettings
