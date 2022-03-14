import React, { useState } from 'react'
import { Tabs, Tab, AppBar, Toolbar, IconButton, DialogTitle, DialogContent, DialogActions, Zoom } from '@material-ui/core'
import { ResponsiveDialog, CloseDialogButton } from 'components'
import { Fab } from 'components/themed'
import { AddComment, Message, Search } from '@material-ui/icons'
import { ContainerProps } from './ChatDialogContainer'
import ChatThreadTitle from '../ChatThreadTitle'
import ChatThreadActions from '../ChatThreadActions'
import ChatThreadContent from '../ChatThreadContent'
import ChatHome from '../ChatHome'
import SearchField from './SearchField'
import DesktopNotificationButton from '../DesktopNotificationButton'

const transitionDuration = 200

const useContainer = (props: ContainerProps) => {
  const { threads, contacts, setThread } = props

  const closeThread = () => setThread(null)
  const [enableSearch, setEnableSearch] = useState(false)
  const [search, setSearch] = useState('')
  const toggleSearch = () => {
    if (enableSearch) {
      setEnableSearch(false)
      setSearch('')
    } else {
      setEnableSearch(true)
    }
  }
  const handleSearchBlur = () => {
    if (!search) setEnableSearch(false)
  }
  const [tab, setTab] = useState(0)
  const threadCountLabel = threads.length > 0 ? ` (${threads.length})` : ''
  const contactsCountLabel = contacts.length > 0 ? ` (${contacts.length})` : ''

  return {
    tab,
    setTab,
    threadCountLabel,
    contactsCountLabel,
    toggleSearch,
    setSearch,
    closeThread,
    enableSearch,
    search,
    handleSearchBlur,
  }
}

const ChatDialog = (props: ContainerProps) => {
  const { open, messages, closeChat, thread, threads, contacts, setThread, user, sendMessage, loadingThreads, loadingContacts } = props

  const {
    closeThread,
    search,
    enableSearch,
    toggleSearch,
    handleSearchBlur,
    tab,
    setTab,
    threadCountLabel,
    contactsCountLabel,
    setSearch,
  } = useContainer(props)

  return (
    <ResponsiveDialog
      open={open}
      onClose={closeChat}
      maxWidth="md"
      fullWidth
      scroll="paper"
      tall
    >
      {thread && (
        <React.Fragment>
          <DialogTitle>
            <ChatThreadTitle
              thread={thread}
              contacts={contacts}
              handleBackButton={threads.length > 1 || contacts.length > 1 ? closeThread : undefined}
              closeChat={closeChat}
              user={user}
            />
          </DialogTitle>
        </React.Fragment>
      )}
      {!thread && (
        <AppBar style={{ position: 'relative' }}>
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Zoom in>
              <span style={{ display: 'flex' }}>
                <Message />
                <span style={{ marginLeft: 12 }}>Messages</span>
              </span>
            </Zoom>
            <span style={{ display: 'flex' }}>
              <Zoom
                in={enableSearch}
                timeout={transitionDuration}
                style={{
                  transitionDelay: `${enableSearch ? transitionDuration : 0}ms`,
                }}
                mountOnEnter
                unmountOnExit
              >
                <SearchField
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onBlur={handleSearchBlur}
                  style={{ marginRight: 6 }}
                />
              </Zoom>
              <Zoom
                in={!enableSearch}
                timeout={transitionDuration}
                unmountOnExit
                style={{
                  transitionDelay: `${enableSearch ? 0 : transitionDuration}ms`,
                }}
              >
                <IconButton size="small" onClick={toggleSearch} style={{ color: 'white', marginRight: 6 }}>
                  <Search />
                </IconButton>
              </Zoom>
              <DesktopNotificationButton style={{ color: 'white' }} />
              <CloseDialogButton style={{ color: 'white' }} onClick={closeChat} />
            </span>
          </Toolbar>
          <Tabs value={tab} onChange={(event, value) => setTab(value)} centered>
            <Tab label={`Conversations ${threadCountLabel}`} />
            <Tab label={`Contacts ${contactsCountLabel}`} />
          </Tabs>
        </AppBar>
      )}
      <DialogContent style={{ padding: '8px 0' }}>
        {!thread && (
          <ChatHome
            tab={tab}
            search={enableSearch ? search : null}
            threads={threads}
            contacts={contacts}
            threadId={thread?.id}
            setThread={setThread}
            loadingContacts={loadingContacts}
            loadingThreads={loadingThreads}
            user={user}
            newConversation={() => setTab(1)}
            closeChat={closeChat}
          />
        )}
        {thread && (
        <ChatThreadContent
          thread={thread}
          messages={messages}
          user={user}
          contacts={contacts}
          closeChat={closeChat}
        />
        )}
      </DialogContent>
      {thread && (
      <DialogActions>
        <ChatThreadActions
          thread={thread}
          sendMessage={sendMessage}
          user={user}
          contacts={contacts}
        />
      </DialogActions>
      )}
      {tab === 0 && !thread && (
        <Fab
          color="primary"
          onClick={() => setTab(1)}
          style={{ position: 'absolute', right: 32, bottom: 32 }}
          transitionDelay={500}
        >
          <AddComment />
        </Fab>
      )}
    </ResponsiveDialog>
  )
}

export default ChatDialog
