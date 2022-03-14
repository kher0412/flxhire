import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { Field } from 'redux-form'
import { Currency, RateMode } from 'types'
import { formatAsDate, formatAsCurrency } from 'services/formatting'
import { CurrencyIcon, StaffingAgreement } from 'components'
import { TextArea, Button, Box } from 'components/themed'
import { Typography, Divider, List, Grid, ListItem, ListItemIcon, ListItemText, Paper, Card } from '@material-ui/core'
import { InvitationEditorMainQuery_JobQuery } from '__generated__/InvitationEditorMainQuery_JobQuery.graphql'
import { MoneyInput, ReviewStep_ContractPreviewQuery } from '__generated__/ReviewStep_ContractPreviewQuery.graphql'
import { AccountCircle, Schedule, Today } from '@material-ui/icons'
import InvitationMessagePreview from '../InvitationMessagePreview'
import { IReviewStepFormFields, ReviewStepContainerProps } from './ReviewStepContainer'

export interface IReviewStepProps {
  // TODO: use a fragment to get manager data instead
  manager: Partial<InvitationEditorMainQuery_JobQuery['response']['currentUser']['firm']['users'][0]>
  offerMode: boolean
  clientRate: MoneyInput
  rateMode: RateMode
  currency: string
  startDate: string
  endDate: string
  invoiceSchedule: string
  onSubmit: (formData: IReviewStepFormFields) => void
  freelancerName: string
}

function ReviewStep(props: IReviewStepProps & ReviewStepContainerProps) {
  const {
    currentUser,
    manager,
    teamInvitationMessage,
    startDate,
    endDate,
    invitationMargin,
    clientRate,
    offerMode,
    rateMode,
    invoiceSchedule,
    currency,
    onSubmit,
    handleSubmit,
  } = props

  const preview = useLazyLoadQuery<ReviewStep_ContractPreviewQuery>(
    graphql`
      query ReviewStep_ContractPreviewQuery($input: ContractPreviewAttributes!) {
        contractPreview(input: $input) {
          freelancerRate {
            currency {
              code
            }
            value
          }
        }
      }
    `,
    {
      input: {
        currency: currency,
        clientRate: clientRate,
        rateMode: rateMode,
      },
    },
    {
      fetchPolicy: 'network-only',
    },
  )

  const memberRate = preview?.contractPreview?.freelancerRate

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box disableBottomPadding>
              <Typography variant="h5">
                The following offer will be sent
              </Typography>
            </Box>

            <Box>
              {offerMode && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper elevation={0}>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <CurrencyIcon currency={{ code: currency } as Currency} />
                          </ListItemIcon>

                          <ListItemText
                            // TODO: more modes
                            primary={memberRate ? `${formatAsCurrency(memberRate.value, { currency: currency })} / ${rateMode}` : '...'}
                            secondary="Compensation"
                          />
                        </ListItem>

                        {invoiceSchedule && (
                          <ListItem>
                            <ListItemIcon>
                              <Schedule />
                            </ListItemIcon>

                            <ListItemText
                              primary={invoiceSchedule === 'weekly' ? 'Paid every week' : 'Paid every month'}
                              secondary="Payment Schedule (company level)"
                            />
                          </ListItem>
                        )}

                        {manager && (
                          <ListItem>
                            <ListItemIcon>
                              <AccountCircle />
                            </ListItemIcon>

                            <ListItemText
                              primary={`${manager.name} at ${currentUser?.firm?.name}`}
                              secondary="Manager"
                            />
                          </ListItem>
                        )}

                        {startDate && endDate && (
                          <ListItem>
                            <ListItemIcon>
                              <Today />
                            </ListItemIcon>

                            <ListItemText
                              primary={`${formatAsDate(startDate)} / ${formatAsDate(endDate)}`}
                              secondary="Start date / end date"
                            />
                          </ListItem>
                        )}

                        {startDate && !endDate && (
                          <ListItem>
                            <ListItemIcon>
                              <Today />
                            </ListItemIcon>

                            <ListItemText
                              primary={formatAsDate(startDate)}
                              secondary="Start date"
                            />
                          </ListItem>
                        )}
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              )}

              {!offerMode && (
                <InvitationMessagePreview
                  currentUser={currentUser}
                  manager={{ name: manager?.name }} // TODO: fix typing
                  teamInvitationMessage={teamInvitationMessage}
                  startDate={startDate}
                  invitationMargin={invitationMargin}
                  clientRate={clientRate}
                  rateMode={rateMode}
                  freelancerName={props.freelancerName}
                >
                  <Field
                    label="Invitation Message"
                    name="team_invitation_message"
                    placeholder="The invitation message template..."
                    component={TextArea}
                  />
                </InvitationMessagePreview>
              )}
            </Box>
          </Card>
        </Grid>

        {offerMode && (
          <Grid item xs={12}>
            <Card variant="outlined" elevation={0}>
              <Box>
                <StaffingAgreement />
              </Box>
            </Card>
          </Grid>
        )}

        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box style={{ textAlign: 'right' }}>
              <Button type="submit" color="primary" data-cy="submit-invitation">
                {offerMode ? 'Make Offer' : 'Send Invitation'}
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </form>
  )
}

export default React.memo(ReviewStep)
