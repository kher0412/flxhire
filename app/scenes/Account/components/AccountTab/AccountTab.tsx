import React from 'react'
import { graphql, useFragment } from 'react-relay'
import { AccountTab_Mutation } from '__generated__/AccountTab_Mutation.graphql'
import { useSnackbar, useQuickCommit } from 'hooks'
import { AccountTab_User$key, UserRole } from '__generated__/AccountTab_User.graphql'
import AccountForm from './components/AccountForm'

function AccountTab({ user: userProp }: { user: AccountTab_User$key }) {
  const user = useFragment(graphql`
    fragment AccountTab_User on User {
      firstName
      lastName
      email
      unconfirmedEmail
      phone
      avatarUrl
      roles
      teamInvitationMessage
      sendTimesheetReminders
      profile {
        visibility
      }
    }
  `, userProp)

  const showSnackbarMessage = useSnackbar()
  const [submitting, setSubmitting] = React.useState(false)

  const { execute: submit } = useQuickCommit<AccountTab_Mutation>(
    graphql`
      mutation AccountTab_Mutation($input: UpdateUserInput!) {
        updateUser(input: $input) {
          user {
            avatarUrl
            firstName
            lastName
            email
            unconfirmedEmail
            phone
            teamInvitationMessage
            sendTimesheetReminders
            profile {
              visibility
            }
          }
        }
      }
    `,
  )

  const onSubmit = async (data) => {
    setSubmitting(true)

    const result = await submit({
      input: {
        avatarUrl: data.avatarUrl,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        currentPassword: data.currentPassword,
        email: data.email,
        phone: data.phone,
        teamInvitationMessage: data.teamInvitationMessage,
        sendTimesheetReminders: data.sendTimesheetReminders,
        profile: {
          visibility: data.visibility,
        },
      },
    })
    setSubmitting(false)
    if (result) showSnackbarMessage('Account updated')
  }

  return (
    <AccountForm
      userRoles={user?.roles as UserRole[]}
      userUnconfirmedEmail={user?.unconfirmedEmail}
      initialValues={{ ...user, visibility: user?.profile?.visibility }}
      submitting={submitting}
      onSubmit={onSubmit}
    />
  )
}

export default React.memo(AccountTab)
