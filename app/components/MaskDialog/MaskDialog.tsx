import { Avatar, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { getAPIClient } from 'api'
import { TextField, Button } from 'components/themed'
import ResponsiveDialog from 'components/ResponsiveDialog'
import { debounce } from 'lodash'
import { useState } from 'react'
import { trackError } from 'services/analytics'
import { masqAsUser } from 'services/masq'
import { ICurrentUser } from 'types'

const updateResults = debounce(async (value, cb) => {
  try {
    if (value) {
      return cb(await getAPIClient().getUsersAdmin({ q: value, _start: 0, _end: 5 }))
    }
  } catch (error) {
    trackError(error)
  }
  return cb([])
}, 300)

const MaskDialog = ({ open, onClose }) => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([] as ICurrentUser[])

  const updateSearch = (event) => {
    setSearch(event.target.value)
    updateResults(event.target.value, setResults)
  }
  return (
    <ResponsiveDialog open={open} onClose={onClose} maxWidth="md" scroll="paper">
      <DialogTitle>Quick Mask</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Search"
          value={search}
          onChange={updateSearch}
          autoFocus
        />
        <List dense>
          {results.map(u => (
            <ListItem button onClick={() => masqAsUser({ id: u.id })}>
              <ListItemAvatar><Avatar src={u.avatar_url} /></ListItemAvatar>
              <ListItemText
                primary={u.name}
                secondary={`${(u.roles || []).join(', ')}${u.profile?.slug ? ` slug: ${u.profile.slug}` : ' '}${u.firm?.name ? ` @ ${u.firm?.name}` : ' '}`}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default MaskDialog
