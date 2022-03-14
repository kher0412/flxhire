import React from 'react'
import { List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, MenuItem } from '@material-ui/core'
import { Box, MoreButtonMenu } from 'components'
import { Button } from 'components/themed'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { useQuickCommit } from 'hooks'
import { pickAndStore } from 'services/filestack'
import { SignableDocuments_Query } from '__generated__/SignableDocuments_Query.graphql'
import { SignableDocuments_CreateMutation } from '__generated__/SignableDocuments_CreateMutation.graphql'
import { SignableDocuments_RemoveMutation } from '__generated__/SignableDocuments_RemoveMutation.graphql'
import { InsertDriveFile, MoreVert } from '@material-ui/icons'

const SignableDocuments = () => {
  const data = useLazyLoadQuery<SignableDocuments_Query>(graphql`
    query SignableDocuments_Query {
      currentUser {
        firm {
          signableDocuments {
            id
            title
            url
            user {
              name
            }
          }
        }
      }
    }
  `, {}, {
    fetchPolicy: 'store-and-network',
  })
  const { execute: commitAdd } = useQuickCommit<SignableDocuments_CreateMutation>(graphql`
    mutation SignableDocuments_CreateMutation($input: CreateSignableDocumentInput!) {
      createSignableDocument(input: $input) {
        currentUser {
          firm {
            signableDocuments {
              id
              title
              url
              user {
                name
              }
            }
          }
        }
      }
    }
  `)
  const { execute: commitRemove } = useQuickCommit<SignableDocuments_RemoveMutation>(graphql`
    mutation SignableDocuments_RemoveMutation($input: RemoveSignableDocumentInput!) {
      removeSignableDocument(input: $input) {
        signableDocument {
          id @deleteRecord
        }
        currentUser {
          firm {
            signableDocuments {
              id
              title
              url
              user {
                name
              }
            }
          }
        }
      }
    }
  `)

  const uploadNew = React.useCallback(() => {
    pickAndStore({
      accept: 'application/pdf',
    }, async (file) => {
      await commitAdd({
        input: {
          url: file.url,
          title: file.filename,
        },
      })
    })
  }, [])

  const removeDocument = React.useCallback(async (id: string) => {
    await commitRemove({
      input: {
        signableDocumentId: id,
      },
    })
  }, [])

  const signableDocuments = data?.currentUser?.firm?.signableDocuments || []

  return (
    <Box>
      <List>
        {signableDocuments.map(s => (
          <ListItem key={s.id} button onClick={() => window.open(s.url)}>
            <ListItemIcon><InsertDriveFile /></ListItemIcon>
            <ListItemText
              primary={s.title}
              secondary={s.user?.name ? `Added by ${s.user.name}` : undefined}
            />
            <ListItemSecondaryAction>
              <MoreButtonMenu icon={<MoreVert />}>
                <MenuItem onClick={() => removeDocument(s.id)}>
                  Remove
                </MenuItem>
              </MoreButtonMenu>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        {signableDocuments.length === 0 && (
          <ListItem>
            <ListItemText
              primary="You have no Signable Contracts yet"
            />
          </ListItem>
        )}
      </List>
      <Button onClick={uploadNew}>
        Add New
      </Button>
    </Box>
  )
}

export default SignableDocuments
