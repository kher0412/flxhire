import { Divider, Grid } from '@material-ui/core'
import { InfoMessage } from 'components/themed'
import React from 'react'
import { ICurrentUser, RateMode } from 'types'
import { MoneyInput } from '__generated__/ReviewStep_ContractPreviewQuery.graphql'
import styles from './InvitationMessagePreview.module.css'

interface IInvitationMessageProps {
  teamInvitationMessage: string
  // TODO: get current user data from useCurrentUser
  currentUser: ICurrentUser
  // TODO: use a fragment to get manager data instead
  manager: { name: string }
  startDate: string
  invitationMargin: number
  clientRate: MoneyInput
  rateMode: RateMode
  freelancerName: string
}

export default class InvitationMessagePreview extends React.PureComponent<IInvitationMessageProps> {
  render() {
    const { teamInvitationMessage } = this.props

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {this.props.children}
          </Grid>

          <Grid item xs={12}>
            <InfoMessage>
              You can use templates to tailor individual messages easily:
              $invitee_name$ for the name of the invited team member,
              $name$ for your name,
              $company$ for the name of your company,
              $rate$ for the contract rate, and
              $start_date$ for the contract start date.
            </InfoMessage>
          </Grid>
        </Grid>

        <Divider style={{ margin: '24px -24px' }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            Your invitation recipients will receive the following email from Flexhire:

            <div className={styles['email-preview']}>
              {this.processTemplateVariables(teamInvitationMessage).split('\n\n').map(p => (<p>{p}</p>))}
            </div>

            The email will include basic instructions about how they can sign up.
            After creating their account, your invitation recipients will immediately receive the offer on their Flexhire dashboard,
            allowing them to start the contract.
          </Grid>
        </Grid>
      </div>
    )
  }

  processTemplateVariables(message = '') {
    const { freelancerName, currentUser, manager, startDate, invitationMargin, clientRate, rateMode } = this.props

    return message
      .replace(/\$invitee_name\$/g, freelancerName)
      .replace(/\$name\$/g, manager?.name || currentUser?.name)
      .replace(/\$company\$/g, currentUser?.firm?.name)
      // TODO: replace this with previewed rate from backend
      .replace(/\$rate\$/g, `${Math.max(0, Math.round(clientRate.value * ((100 - invitationMargin) / 100)))}/${rateMode || 'hour'}`)
      .replace(/\$start_date\$/g, startDate)
  }
}
