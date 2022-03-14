import { List, Typography, DialogContent, DialogContentText, DialogTitle, DialogActions } from '@material-ui/core'
import { Fragment, useState, useCallback } from 'react'
import { PagePlaceholder, Condition, ConditionSwitch, ResponsiveDialog, Link } from 'components'
import { Button } from 'components/themed'
import { useFragment, graphql } from 'react-relay'
import { APIKeys_User$key } from '__generated__/APIKeys_User.graphql'
import { APIKeys_CreateMutation } from '__generated__/APIKeys_CreateMutation.graphql'
import { useRouter } from 'next/router'
import { useCurrentUser, useQuickCommit } from 'hooks'
import { getLoginRoute } from 'services/router'
import APIKeyListItem from './APIKeyListItem'

const APIKeys = ({ user: userProp }: { user: APIKeys_User$key }) => {
  const router = useRouter()
  const [createdKey, setCreatedKey] = useState<string>(null)
  // NOTE: if you arrive here signed out and click login, for some reason the user data does not refresh
  // so we use the hook
  const [currentUser] = useCurrentUser()
  const user = useFragment(graphql`
    fragment APIKeys_User on User {
        apiKeys {
          ...APIKeyListItem_ApiKey
        }
    }
  `, userProp)

  const { execute: commitCreate } = useQuickCommit<APIKeys_CreateMutation>(graphql`
    mutation APIKeys_CreateMutation($input: CreateApiKeyInput!) {
      createApiKey(input: $input) {
        key
        apiKey {
          ...APIKeyListItem_ApiKey
          user {
            apiKeys {
              ...APIKeyListItem_ApiKey
            }
          }
        }
      }
    }
  `)

  const create = useCallback(async () => {
    const data = await commitCreate({
      input: {},
    })
    setCreatedKey(data?.createApiKey?.key)
  }, [])

  const onCloseDialog = useCallback(() => { setCreatedKey(null) }, [])

  // NOTE: if an api key is deleted, the list won't change, but the item will be null
  const keys = user?.apiKeys?.filter(apiKey => Boolean(apiKey)) || []

  return (
    <Fragment>
      <ConditionSwitch>
        <Condition condition={!user}>
          <PagePlaceholder
            title="Account Required"
            subtitle="Log in to Flexhire to access your API keys"
            action={<Button muiComponent={Link} {...getLoginRoute(router)} color="primary">Login</Button>}
            flat
          />
        </Condition>
        <Condition condition={!currentUser?.api_access}>
          <PagePlaceholder
            title="No API Access"
            subtitle="Your account does not have access to the Developer API. Contact us to request access."
            flat
          />
        </Condition>
        <Condition condition={keys.length === 0}>
          <PagePlaceholder
            title="Create API Key"
            subtitle="Use the button below to create your first API key."
            action={<Button onClick={create} data-cy="create"><Link /> Create</Button>}
            flat
          />
        </Condition>
        <Condition condition={keys.length > 0}>
          <Typography variant="h3">Your API Keys</Typography>
          <List data-cy="api-keys">
            {keys.map(k => <APIKeyListItem apiKey={k} />)}
          </List>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="primary" onClick={create} data-cy="create">
              Create new API Key
            </Button>
          </div>
        </Condition>
      </ConditionSwitch>
      <ResponsiveDialog open={Boolean(createdKey)} onClose={onCloseDialog}>
        <DialogTitle>Your new API Key</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your new API Key is <code data-cy="api-key-value">{createdKey || 'N/A'}</code>. Copy it now and store it in a safe place. You will
            not be able to see this key anymore after closing this dialog. If you lose the key, you can create
            a new one
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog} data-cy="confirm">Confirm</Button>
        </DialogActions>
      </ResponsiveDialog>
    </Fragment>
  )
}

export default APIKeys
