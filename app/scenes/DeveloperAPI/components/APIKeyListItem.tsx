import { useCallback, Fragment } from 'react'
import { ListItem, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core'
import { useFragment, graphql } from 'react-relay'
import { APIKeyListItem_ApiKey$key } from '__generated__/APIKeyListItem_ApiKey.graphql'
import { APIKeyListItem_DeleteMutation } from '__generated__/APIKeyListItem_DeleteMutation.graphql'
import { useActionConfirmation, useQuickCommit } from 'hooks'
import moment from 'moment'
import { ConfirmationDialog } from 'components/themed'
import { Delete } from '@material-ui/icons'

const APIKeyListItem = ({ apiKey: apiKeyProp }: { apiKey: APIKeyListItem_ApiKey$key }) => {
  const apiKey = useFragment(graphql`
    fragment APIKeyListItem_ApiKey on ApiKey {
      id
      keySlice
      createdAt
      lastUsedAt
      user {
        name
      }
    }
  `, apiKeyProp)

  const { execute: commitDelete } = useQuickCommit<APIKeyListItem_DeleteMutation>(graphql`
    mutation APIKeyListItem_DeleteMutation($input: DeleteApiKeyInput!) {
      deleteApiKey(input: $input) {
        apiKey {
          id @deleteRecord
        }
      }
    }
  `)

  const destroyImmediate = useCallback(async () => {
    await commitDelete({
      input: {
        id: apiKey.id,
      },
    })
  }, [apiKey?.id])
  const destroy = useActionConfirmation(destroyImmediate)

  if (!apiKey) return null

  const createdAt = apiKey.createdAt ? moment(apiKey.createdAt).fromNow() : '?'
  const lastUsedAt = apiKey.lastUsedAt ? moment(apiKey.lastUsedAt).fromNow() : 'never'
  const userName = apiKey.user?.name || '?'

  return (
    <Fragment>
      <ListItem data-cy={`api-key-${apiKey.keySlice}`}>
        <ListItemText
          primary={`Starts with ${apiKey.keySlice}`}
          secondary={`Created ${createdAt} by ${userName} | Last used ${lastUsedAt}`}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={destroy.perform} data-cy="delete"><Delete /></IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ConfirmationDialog
        {...destroy}
        text="This action is permanent. The API key will immediately stop working and will not be recoverable."
      />
    </Fragment>
  )
}

export default APIKeyListItem
