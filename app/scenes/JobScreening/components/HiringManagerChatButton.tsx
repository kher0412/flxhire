import React from 'react'
import { ChatButton } from 'components'
import { IClient } from 'types'

export interface IHiringManagerChatButtonProps {
  hiringManager: IClient
  color?: 'primary' | 'secondary' | 'default'
  mobile?: boolean
  style?: React.CSSProperties
}

const HiringManagerChatButton = ({ hiringManager, mobile, color, style }: IHiringManagerChatButtonProps) => (
  <ChatButton
    color={color || 'primary'}
    showContactInfo={!mobile}
    recipientId={hiringManager.id}
    contact={{
      first_name: hiringManager.first_name,
      name: `${hiringManager.first_name || ''} ${hiringManager.last_name || ''}`.trim(),
      avatar_url: hiringManager.avatar_url,
    }}
    style={{ marginRight: 'auto', ...(style || {}) }}
  />
)

export default HiringManagerChatButton
