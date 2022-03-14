import { ComponentProps } from 'react'
import ChatMessage from './ChatMessage/ChatMessage'

interface IAutomatedMessageProps extends Omit<ComponentProps<typeof ChatMessage>, 'message'> {
  message: string
  createdAt?: string
  label?: string
}

const AutomatedMessage = ({ message, createdAt, label, contact, ...props }: IAutomatedMessageProps) => (
  <ChatMessage
    message={{
      id: null,
      user_id: contact.id,
      chat_thread_id: null,
      author_slug: contact.slug,
      author_name: contact.name,
      author_avatar_url: contact.avatar_url,
      created_at: createdAt,
      label,
      message,
    }}
    contact={contact}
    {...props}
  />

)

export default AutomatedMessage
