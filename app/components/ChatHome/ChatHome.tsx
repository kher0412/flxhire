import React, { memo } from 'react'
import { IChatThreadInfo } from 'reducers/Chat'
import { IChatUser, ICurrentUser } from 'types'
import ContactList from './ContactList'
import ThreadList from './ThreadList'

interface IChatHomeProps {
  threads: IChatThreadInfo[]
  contacts: IChatUser[]
  tab: number
  search: string
  threadId?: number
  setThread: (thread: IChatThreadInfo) => void
  loadingThreads: boolean
  loadingContacts: boolean
  user: ICurrentUser
  closeChat: () => void
  newConversation: () => void
}

const ChatHome = memo((props: IChatHomeProps) => {
  const { threads, contacts, threadId, loadingThreads, loadingContacts, user, setThread, tab, search, newConversation, closeChat } = props
  return (
    <React.Fragment>
      {tab === 0 && (
        <ThreadList
          threads={threads}
          user={user}
          threadId={threadId}
          setThread={setThread}
          loading={loadingThreads}
          newConversation={newConversation}
          search={search}
        />
      )}
      {tab === 1 && (
        <ContactList
          contacts={contacts}
          loading={loadingContacts}
          search={search}
          user={user}
          closeChat={closeChat}
        />
      )}
    </React.Fragment>
  )
})

export default ChatHome
