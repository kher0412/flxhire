import React, { memo, useMemo, useState } from 'react'
import { IChatUser, ICurrentUser } from 'types'
import { fuzzySearch } from 'services/lists'
import { PagePlaceholder, VirtualizedList } from 'components'
import { Avatar, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { browserHistory } from 'services/router'
import { isClient } from 'services/user'
import { People, PersonAdd } from '@material-ui/icons'
import Contact from '../Contact'
import AddToThread from '../AddToThread'

const searchFields = contact => [contact.name]

interface IContactListProps {
  contacts: IChatUser[]
  loading: boolean
  search: string
  user: ICurrentUser
  closeChat: () => void
}

const ContactList = memo(({ contacts, loading, search, user, closeChat }: IContactListProps) => {
  const [contactsOpen, setContactsOpen] = useState(false)
  const searchResults = useMemo(() => fuzzySearch(search, contacts, searchFields), [search, contacts])
  let actions: any[] = ['group']
  if (isClient(user)) actions = actions.concat('invite')
  const list: any[] = search ? searchResults : actions.concat(...contacts)
  return (
    <React.Fragment>
      {contactsOpen && (
        <AddToThread
          onClose={() => setContactsOpen(false)}
        />
      )}
      <VirtualizedList
        Component={({ index, style }) => {
          const item = list[index]
          if (item === 'group') {
            return (
              <ListItem style={style} button onClick={() => setContactsOpen(true)}>
                <ListItemIcon><Avatar><People /></Avatar></ListItemIcon>
                <ListItemText
                  primary="New Group Conversation"
                />
              </ListItem>
            )
          }
          if (item === 'invite') {
            return (
              <ListItem style={style} button onClick={() => { closeChat(); browserHistory.push('/client/invitation_team') }}>
                <ListItemIcon><Avatar><PersonAdd /></Avatar></ListItemIcon>
                <ListItemText
                  primary="Invite"
                />
              </ListItem>
            )
          }
          return <Contact contact={item as IChatUser} style={style} />
        }}
        noRowsRenderer={() => (
          <PagePlaceholder
            flat
            title={loading ? 'Please Wait' : (search ? 'No results' : "No one's here")}
            subtitle={loading ? 'Loading Contacts...' : (search ? null : "Once you meet someone on the platform, you'll be able to message them here.")}
          />
        )}
        count={list.length}
        rowHeight={72}
      />
    </React.Fragment>

  )
})

export default ContactList
