import React, { useState, useCallback } from 'react'
import { IContractStatus } from 'types'
import { DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { ResponsiveDialog, FreelancerCardInfoItem } from 'components'
import { Button } from 'components/themed'
import { getManagerName } from 'services/contract'
import { HireManager_Contract$key } from '__generated__/HireManager_Contract.graphql'
import { HireManager_UpdateContractMutation } from '__generated__/HireManager_UpdateContractMutation.graphql'
import { graphql, useFragment } from 'react-relay'
import { AccountCircle, Info, Person } from '@material-ui/icons'
import { useQuickCommit } from 'hooks'

interface IHireManagerProps {
  contract: HireManager_Contract$key
}

const HireManager = ({ contract: contractProp } : IHireManagerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const contract = useFragment(graphql`
    fragment HireManager_Contract on Contract {
      id
      status
      client {
        id
        name
        firm {
          users {
            id
            name
          }
        }
      }
    }
  `, contractProp)

  const { execute: commit } = useQuickCommit<HireManager_UpdateContractMutation>(graphql`
    mutation HireManager_UpdateContractMutation($input: UpdateContractInput!) {
      updateContract(input: $input) {
        contract {
          client {
            id
            name
          }
        }
      }
    }
  `)

  const title = getManagerName(contract ? { status: contract.status as IContractStatus } : null)

  const handleSave = useCallback(async (managerId: string) => {
    setDialogOpen(false)
    await commit({
      input: {
        contractId: contract.id,
        clientId: managerId,
      },
    })
  }, [setDialogOpen, commit])

  const managers = contract?.client?.firm?.users || []

  return (
    <React.Fragment>
      <FreelancerCardInfoItem
        button
        icon={<Person />}
        primary={contract?.client?.name}
        secondary={title}
        onClick={() => setDialogOpen(true)}
      />

      <ResponsiveDialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md">
        <div style={{ width: 600 }} />

        <DialogTitle>
          Set {title}
        </DialogTitle>

        <DialogContent>
          <List>
            {(managers.length === 0) && (
              <ListItem>
                <ListItemIcon>
                  <Info />
                </ListItemIcon>

                <ListItemText secondary="No managers available at this time" />
              </ListItem>
            )}

            {managers.map(manager => (
              <ListItem
                key={manager.id}
                button
                onClick={() => handleSave(manager.id)}
                selected={contract?.client?.id === manager.id}
              >
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>

                <ListItemText primary={manager.name || 'unknown'} />
              </ListItem>
            ))}
          </List>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    </React.Fragment>
  )
}

export default HireManager
