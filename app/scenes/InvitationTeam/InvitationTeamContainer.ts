import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { withRouter } from 'next/router'
import { formValueSelector } from 'redux-form'
import moment from 'moment'
import { GET_CURRENT_USER } from 'reducers/Auth'
import storage from 'services/localStorage'
import { RootState } from 'reducers'
import { WithRouterProps } from 'next/dist/client/with-router'
import { setAvoidBillingSetupDialog, TOGGLE_SNACKBAR } from 'reducers/Common'
import { trackError, trackEvent } from 'services/analytics'
import { commitMutation } from 'api/graphql'
import { graphql } from 'relay-runtime'
import { InvitationTeamContainer_MakeOfferMutation } from '__generated__/InvitationTeamContainer_MakeOfferMutation.graphql'
import { InvitationTeamContainer_SendInvitationIndividualMutation } from '__generated__/InvitationTeamContainer_SendInvitationIndividualMutation.graphql'
import { InvitationTeamContainer_SendInvitationManagerMutation } from '__generated__/InvitationTeamContainer_SendInvitationManagerMutation.graphql'
import { browserHistory } from 'services/router'
import { getErrorText } from 'services/error'
import { ensureDateAsString } from 'services/formatting'
import {
  INVITATION_FORM_LOCAL_STORAGE_KEY,
  INVITATION_FORM,
  IInvitationFormFields,
} from './components/InvitationEditorMain/components/InvitationForm/InvitationFormContainer'
import InvitationTeam from './InvitationTeam'
import { IRecipientEntry } from './RecipientEntry'

const mapStateToProps = (state: RootState) => ({
  currentUser: state.auth.currentUser,
  requestBackgroundCheck: formValueSelector(INVITATION_FORM.form)(state, 'request_background'),
})

const mapDispatchToProps = dispatch => ({
  submitForm: async (formData: IInvitationFormFields, offerMode: boolean) => {
    if (formData.invoice_manager_id === 'self') {
      formData.invoice_manager_id = null
    }

    // TODO: this field should be removed from the backend
    let paymentMode = 'pay_work_reports'
    if (formData.rate_mode === 'month') {
      paymentMode = 'salary'
    }

    try {
      if (offerMode) {
        await commitMutation<InvitationTeamContainer_MakeOfferMutation>({
          mutation: graphql`
            mutation InvitationTeamContainer_MakeOfferMutation($input: MakeOfferInput!) {
              makeOffer(input: $input) {
                contract {
                  id
                  lastInteractionAt
                  status
                  clientRate {
                    currency {
                      code
                    }
                    value
                  }
                  freelancerRate {
                    currency {
                      code
                    }
                    value
                  }
                  currency{
                    code
                  }
                  positionTypes
                  availabilityType
                  rateMode
                  paymentMode
                  enableTimesheets
                  requireTimesheetApprovalForPayments
                  client {
                    name
                    firm {
                      invoiceSchedule
                    }
                  }
                  job {
                    title
                  }
                  bonusClientRate {
                    currency {
                      code
                    }
                    value
                  }
                  bonusPeriod
                }
              }
            }
          `,
          variables: {
            input: {
              jobId: formData.job_id,
              freelancerId: formData.freelancer_id,
              clientId: formData.client_id,
              paymentMode,
              clientAgreesTerms: true,
              availabilityType: ['full_time'],
              discountCode: formData.discount_code,
              currency: formData.currency,
              annualCompensation: { value: formData.annual_compensation || 0, currencyCode: formData.currency },
              startDate: formData.start_date,
              endDate: formData.end_date,
              clientRate: { value: formData.client_rate, currencyCode: formData.currency },
              rateMode: formData.rate_mode,
              enableTimesheets: formData.enable_timesheets,
              requireTimesheetApprovalForPayments: formData.require_timesheet_approval_for_payments,
              invoiceSchedule: formData.invoice_schedule,
              bonusPeriod: formData.bonus_period,
              bonusClientRate: { value: formData.bonus_client_rate || 0, currencyCode: formData.currency },
            },
          },
        })

        trackEvent('Client Send Direct Offer')
        dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Offer sent' }))

        await new Promise(r => window.setTimeout(r, 500))

        browserHistory.push('/client/hire', '/client/hire?tab=offers', { shallow: true })
      } else {
        let recipients = formData.recipients as IRecipientEntry[]

        if (recipients.length === 0) {
          throw new Error('No recipients set')
        }

        if (recipients[0].invitation_type === 'individual') {
          for (let recipient of recipients) {
            await commitMutation<InvitationTeamContainer_SendInvitationIndividualMutation>({
              mutation: graphql`
                mutation InvitationTeamContainer_SendInvitationIndividualMutation($input: SendInvitationInput!) {
                  sendInvitation(input: $input) {
                    contract {
                      id
                      lastInteractionAt
                      status
                      clientRate {
                        currency {
                          code
                        }
                        value
                      }
                      currency {
                        code
                      }
                      positionTypes
                      availabilityType
                      rateMode
                      paymentMode
                      freelancer {
                        firstName
                        lastName
                        email
                      }
                      client {
                        id
                        name
                        teamInvitationMessage
                        firm {
                          invoiceSchedule
                        }
                      }
                      job {
                        id
                      }
                      bonusClientRate {
                        currency {
                          code
                        }
                        value
                      }
                      bonusPeriod
                    }
                  }
                }
              `,
              variables: {
                input: {
                  // NOTE: the form has no client_id in invitation mode. Do NOT send client_id here
                  // or it will cause the wrong client to be associated to the invite
                  jobId: formData.job_id,
                  freelancerFirstName: recipient.first_name,
                  freelancerLastName: recipient.last_name,
                  freelancerEmail: recipient.email,
                  clientId: formData.client_id,
                  paymentMode,
                  currency: formData.currency,
                  annualCompensation: { value: formData.annual_compensation || 0, currencyCode: formData.currency },
                  startDate: ensureDateAsString(formData.start_date),
                  endDate: ensureDateAsString(formData.end_date),
                  clientRate: { value: formData.client_rate || 0, currencyCode: formData.currency },
                  rateMode: formData.rate_mode,
                  invitationMessage: formData.team_invitation_message,
                  invoiceSchedule: formData.invoice_schedule,
                  bonusPeriod: formData.bonus_period,
                  bonusClientRate: { value: formData.bonus_client_rate || 0, currencyCode: formData.currency },
                },
              },
            })
          }
        } else {
          const isFirmAdmin = recipients[0].invitation_type === 'admin'
          for (let recipient of recipients) {
            await commitMutation<InvitationTeamContainer_SendInvitationManagerMutation>({
              mutation: graphql`
                mutation InvitationTeamContainer_SendInvitationManagerMutation($input: SendInvitationInput!) {
                  sendInvitation(input: $input) {
                    contract {
                      freelancerFirstName
                      freelancerLastName
                      freelancerEmail
                      invitationType
                      client {
                        name
                        id
                      }
                    }
                  }
                }
              `,
              variables: {
                input: {
                  freelancerFirstName: recipient.first_name,
                  freelancerLastName: recipient.last_name,
                  freelancerEmail: recipient.email,
                  isFirmAdmin: isFirmAdmin,
                  allowHireAccess: true,
                  allowManageAccess: formData.allow_manage_access,
                  clientId: formData.invoice_manager_id,
                  invitationMessage: formData.team_invitation_message,
                  startDate: ensureDateAsString(moment()),
                },
              },
            })
          }
        }

        trackEvent('Client Send Direct Offer')
        dispatch(createAction(TOGGLE_SNACKBAR)({ message: recipients.length > 1 ? 'Invitations sent' : 'Invitation sent' }))
        await new Promise(r => window.setTimeout(r, 500))
        browserHistory.push('/client/manage', '/client/manage?tab=team&subtab=invited', { shallow: true })
      }

      storage.removeItem(INVITATION_FORM_LOCAL_STORAGE_KEY)
    } catch (err) {
      trackError(err)
      storage.removeItem(INVITATION_FORM_LOCAL_STORAGE_KEY)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: getErrorText(err) }))

      throw err
    }
  },
  getCurrentUser: () => dispatch(createAction(GET_CURRENT_USER)()),
  setAvoidBillingSetupDialog: (avoid: boolean) => dispatch(setAvoidBillingSetupDialog(avoid)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & WithRouterProps

export default withRouter(connector(InvitationTeam))
