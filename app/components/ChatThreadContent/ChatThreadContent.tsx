import { memo } from 'react'
import { CardContent, Chip, List, ListItem } from '@material-ui/core'
import { PagePlaceholder } from 'components'
import { IChatMessage, IChatUser, ICurrentUser } from 'types'
import { IChatThreadInfo } from 'reducers/Chat'
import MediaQuery from 'components/MediaQuery'
import { isGuest } from 'services/user'
import { Check, Info } from '@material-ui/icons'
import ChatMessage from '../ChatMessage'
import AutomatedMessage from '../AutomatedMessage'
import styles from './ChatThreadContent.module.css'
import Contact from '../Contact'
import ContactForm from '../ChatMessage/ContactForm'

interface IChatThreadContentProps {
  thread: IChatThreadInfo
  messages: IChatMessage[]
  user: ICurrentUser
  contacts: IChatUser[]
  closeChat: () => void
}

const ChatThreadContent = memo(({ thread, messages, user, contacts, closeChat }: IChatThreadContentProps) => {
  const loading = Boolean(thread?.loading && thread?.id)
  const loadingMessages = thread?.messages_count > 0 && messages.length === 0

  let placeholderIcon = <Info />
  let placeholderTitle = 'Please Wait'
  let placeholderSubtitle = null

  if (loading) placeholderSubtitle = 'Getting thread information...'
  if (loadingMessages) placeholderSubtitle = 'Loading thread...'

  let otherUsers = []
  if (thread?.users) {
    otherUsers = thread?.users?.length > 1 ? thread.users.filter(x => x.id !== user.id) : []
  } else if (thread?.user_id) {
    otherUsers = contacts.filter(c => c.id === thread?.user_id)
  }
  const otherUser = otherUsers.length === 1 ? otherUsers[0] : null
  const isDirectWithSelf = Boolean(otherUser)
  const otherUserIsProfileFeedback = isDirectWithSelf && otherUser?.id === user.configuration?.profile_feedback_participants_ids?.[0]
  const otherUserHasMessages = isDirectWithSelf && (messages.length < thread.messages_count || messages.filter(m => m.user_id === otherUser.id).length > 0)
  const email = user.email || user.unconfirmed_email
  const showProvideEmailMessage = messages.length > 0 && isGuest(user) && isDirectWithSelf
  const showProfileFeedbackWelcome = otherUserIsProfileFeedback && (messages.length === 0 || !otherUserHasMessages)
  const showPlaceholder = loading || loadingMessages
  let automatedMessages = []
  if (showProfileFeedbackWelcome || showProvideEmailMessage) {
    automatedMessages = [
      `Hi there and welcome! I'm ${otherUser.first_name} from ${otherUser.firm_name}.`,
      "If you have any questions, I'm here to help!",
    ]
    if (isGuest(user)) {
      automatedMessages.push("If I'm not online when you are here, just drop me your email below and I'll reply as soon as I see it.")
    }
  }
  return (
    <div className={styles['thread-content']}>
      {showPlaceholder && (
        <PagePlaceholder
          flat
          title={placeholderTitle}
          subtitle={placeholderSubtitle}
          icon={placeholderIcon}
          style={{ width: '100%' }}
        />
      )}
      {!showPlaceholder && (
        <div className={styles['messages-container']}>
          <div className={styles['messages-content']}>
            {(showProfileFeedbackWelcome || showProvideEmailMessage) && (
              <AutomatedMessage
                message={automatedMessages.join(' ')}
                contact={otherUser}
                user={user}
              >
                {isGuest(user) && (
                  <CardContent style={{ paddingTop: 0 }}>
                    <List dense disablePadding>
                      <ListItem disableGutters>
                        {email ? (
                          <Chip
                            size="small"
                            icon={<Check />}
                            label={`Email Saved: ${email}`}
                          />
                        ) : <ContactForm />}
                      </ListItem>
                    </List>
                  </CardContent>
                )}
              </AutomatedMessage>
            )}
            {messages.map((chatMessage, index) => (
              <ChatMessage
                message={chatMessage}
                contact={chatMessage.user_id === otherUser?.id ? otherUser : null}
                user={user}
                autoScroll={index === messages.length - 1}
                closeChat={closeChat}
              />
            ))}
          </div>
        </div>
      )}
      {!isDirectWithSelf && thread?.users && (
        <div className={styles['thread-aside']}>
          <List>
            <MediaQuery maxWidth={749}>
              {isMobile => thread.users.map(contact => (
                <Contact contact={contact} compact={isMobile} hideRelationship />
              ))}
            </MediaQuery>
          </List>
        </div>
      )}
    </div>
  )
})

export default ChatThreadContent
