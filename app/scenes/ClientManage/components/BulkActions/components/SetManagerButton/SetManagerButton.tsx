import React, { useState } from 'react'
import { MenuItem, ListSubheader } from '@material-ui/core'
import { MoreButtonMenu } from 'components'
import { getAPIClient } from 'api'
import { useCurrentUser, useOnMount } from 'hooks'
import { trackError } from 'services/analytics'
import { IClient } from 'types'
import { SupervisedUserCircle } from '@material-ui/icons'

const SetManagerButton = (props: { numSelectedItems: number, onChange: (id: number) => void }) => {
  const { onChange, numSelectedItems } = props
  const [user] = useCurrentUser()
  const [managers, setManagers] = useState([] as IClient[])

  useOnMount(async () => {
    try {
      setManagers(await getAPIClient().getClientsFirm())
    } catch (error) {
      trackError(error)
    }
  })

  return (
    <MoreButtonMenu
      label={<React.Fragment><SupervisedUserCircle style={{ marginRight: 12 }} /> Set manager</React.Fragment>}
      fullWidth
      style={{ width: '100%' }}
      data-cy="set-manager"
    >
      <ListSubheader>
        Set manager of selected contracts ({numSelectedItems}) to:
      </ListSubheader>

      {managers.map(manager => (
        <MenuItem onClick={() => onChange(manager.id)} data-cy={`set-manager-${manager.id}`}>
          {manager.name} {(manager.id === user.id) && '(me)'}
        </MenuItem>
      ))}
    </MoreButtonMenu>
  )
}

export default SetManagerButton
