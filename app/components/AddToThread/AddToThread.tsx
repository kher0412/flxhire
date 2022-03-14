import React from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Zoom,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { ResponsiveDialog, FileUpload, VirtualizedList } from 'components'
import { Button, TextField } from 'components/themed'
import { IChatUser } from 'types'
import { IChatThreadInfo } from 'reducers/Chat'
import { isMobile } from 'services/browserAgent'
import { fuzzySearch } from 'services/lists'
import { Check, Info, Search } from '@material-ui/icons'
import Contact from '../Contact'
import styles from './AddToThread.module.css'
import { ContainerProps } from './AddToThreadContainer'

function filterContacts(contacts: IChatUser[], nameFilter: string) {
  if (!nameFilter) return contacts
  return fuzzySearch(nameFilter, contacts, contact => [contact.name])
}

interface IAddToThreadProps extends ContainerProps {
  onClose: () => void
  thread?: IChatThreadInfo
  preselectedUser?: IChatUser
}

interface IAddToThreadState {
  selectedUsersIds: number[]
  nameFilter: string
  title: string
  avatarUrl: string
}

export default class AddToThread extends React.PureComponent<IAddToThreadProps, IAddToThreadState> {
  constructor(props) {
    super(props)
    let selectedUsersIds = props.thread?.users?.map(u => u.id) || []
    if (props.preselectedUser?.id && selectedUsersIds.indexOf(props.preselectedUser.id) < 0) selectedUsersIds.push(props.preselectedUser.id)
    this.state = {
      selectedUsersIds,
      nameFilter: '',
      title: props?.thread?.title || '',
      avatarUrl: props?.thread?.avatar_url,
    }
  }

  render() {
    const { contacts, thread, onClose, preselectedUser, user } = this.props
    const { selectedUsersIds, nameFilter, title, avatarUrl } = this.state

    const isExistingThread = Boolean(thread?.id)
    const disabled = selectedUsersIds.filter(id => id !== user.id).length < 2
    let dialogTitle = isExistingThread ? 'Edit Group Chat' : 'Create New Group Chat'

    if (preselectedUser?.name) dialogTitle = `Create new Group Chat With ${preselectedUser.name}`
    const list = filterContacts(contacts, nameFilter)

    return (
      <ResponsiveDialog open onClose={onClose} maxWidth="sm" fullWidth scroll="paper">
        <DialogTitle>
          {dialogTitle}
        </DialogTitle>

        <DialogContent>
          <div className={styles['avatar-field']}>
            <FileUpload
              avatar
              label={avatarUrl ? 'Update Image' : 'Add Image'}
              input={{
                onChange: this.updateAvatar,
                value: avatarUrl,
                name: 'avatar_url',
              }}
            />
          </div>

          <TextField
            label="Title"
            name="title"
            value={title}
            onChange={this.updateTitle}
            helperText="You can leave an empty title and the names of the participants will show instead."
            fullWidth
          />

          <Typography variant="h6" style={{ marginTop: 24 }}>
            Participants
          </Typography>

          <DialogContentText>
            {isExistingThread && 'Add or remove participants to this group chat. Make sure at least 2 contacts are selected.'}
            {!isExistingThread && 'Choose the participants for the new group chat from your contact list. Make sure at least 2 contacts are selected.'}
          </DialogContentText>

          <TextField
            placeholder="Search"
            name="name"
            value={nameFilter}
            onChange={this.updateNameFilter}
            fullWidth
            autoFocus={!isMobile()}
            startAdornment={<Search style={{ color: 'rgba(0, 0, 0, 0.54)' }} />}
          />

          <VirtualizedList
            Component={({ index, style }) => (
              <Contact
                contact={list[index]}
                style={style}
                disabled={preselectedUser?.id && list[index].id === preselectedUser.id}
                selected={selectedUsersIds.find(id => id === list[index].id)}
                onClick={() => this.toggleUser(list[index].id)}
              >
                <Zoom in={Boolean(selectedUsersIds.find(id => id === list[index].id))}>
                  <Check color="primary" />
                </Zoom>
              </Contact>
            )}
            count={list.length}
            rowHeight={72}
            height={72 * 3}
            noRowsRenderer={() => (
              <ListItem>
                <ListItemIcon><Info /></ListItemIcon>
                <ListItemText
                  primary="No Results"
                />
              </ListItem>
            )}
            preselectedUser={preselectedUser}
            selectedUsersIds={selectedUsersIds}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="primary" onClick={this.save} disabled={disabled}>{isExistingThread ? 'Save' : 'Create'}</Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  toggleUser = (id: number) => this.setState((state) => {
    const index = state.selectedUsersIds.indexOf(id)
    return {
      selectedUsersIds: index >= 0 ? state.selectedUsersIds.filter(x => x !== id) : state.selectedUsersIds.concat(id),
    }
  })

  save = () => {
    const { thread, createThread, updateThread, onClose } = this.props
    const { selectedUsersIds, title, avatarUrl } = this.state
    const payload = {
      users_ids: selectedUsersIds.join(','),
      title,
      avatar_url: avatarUrl,
    }
    if (thread?.id) {
      updateThread({ id: thread.id, ...payload })
    } else {
      createThread(payload)
    }
    onClose()
  }

  updateNameFilter = event => this.setState({ nameFilter: event.target.value })

  updateTitle = event => this.setState({ title: event.target.value })

  updateAvatar = value => this.setState({ avatarUrl: value })
}
