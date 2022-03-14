import { Fab } from '@material-ui/core'
import { ChatUserAvatar } from 'components'
import { useChatContact, useDispatchAction } from 'hooks'
import { ComponentProps, useMemo } from 'react'
import { openChat } from 'reducers/Chat'
import { IChatUser } from 'types'
import { Message } from '@material-ui/icons'
import TextArea from '../TextArea'
import styles from './MessageField.module.css'

interface IMessageFieldProps extends ComponentProps<typeof TextArea> {
  contact: Partial<IChatUser> & { id: number }
}

const MessageField = ({ contact: contactData, ...props }: IMessageFieldProps) => {
  const contact = useChatContact(contactData)
  const onClick = useDispatchAction(() => openChat({ user_id: contact?.id }), [contact?.id])
  const helperText = useMemo(() => (
    `We'll send this ${contact?.first_name ? `to ${contact?.first_name} ` : ''} for you through the Flexhire chat`
  ), [contact?.first_name])
  return (
    <div className={styles.container}>
      {(contact?.avatar_url || contact?.first_name) && (
        <ChatUserAvatar
          src={contact?.avatar_url}
          name={contact?.first_name}
          style={{
            marginBottom: -18,
            zIndex: 8,
            border: '2px solid #E0E9F2',
            marginLeft: -16,
            width: 30,
            height: 30,
          }}
        />
      )}
      <TextArea
        helperText={helperText}
        {...props}
      />
      {contact?.id && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Fab
            size="small"
            color="primary"
            style={{
              marginTop: -40,
              marginRight: -14,
              width: 30,
              height: 30,
              minHeight: 30,
              boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 5px 0px rgba(0,0,0,0.14),0px 1px 6px 0px rgba(0,0,0,0.12)',
            }}
            onClick={onClick}
          >
            <Message style={{ fontSize: '1rem' }} />
          </Fab>
        </div>
      )}
    </div>
  )
}

export default MessageField
