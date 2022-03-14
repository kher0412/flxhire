import { ComponentProps, memo } from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { getOnlineStatus } from 'services/chat'
import { getStatus } from 'services/contract'
import { IChatUser, ICurrentUser } from 'types'
import { getFirmRole } from 'services/client'
import { isMember } from 'services/user'
import { ContainerProps } from './ContactContainer'
import ChatUserAvatar from '../ChatUserAvatar'

export const getContactSubheader = (contact: IChatUser, user: ICurrentUser, hideOnlineStatus: boolean = false, hideRelationship: boolean = false) => {
  if (!contact) return null
  let companyAndRole = contact.firm_name
  if (companyAndRole === 'Flexhire') {
    // TODO: firm_role is probably never 'recruiter'
    if (contact.firm_role as any === 'recruiter') {
      companyAndRole = 'Flexhire Recruiter'
    } else {
      companyAndRole = 'Flexhire Team'
    }
  } else if (contact.firm_role) {
    companyAndRole = `${getFirmRole(contact.firm_role)} @ ${companyAndRole}`
  }
  let contractText = null
  if (contact.is_customer_success_rep) {
    contractText = 'Your Customer Success Rep'
  }
  if (isMember(user) && contact.job_title) {
    const jobRole = contact.job_role || 'Hiring Manager'
    contractText = `${jobRole} for ${contact.job_title}`
  }
  if (contact.contract_status) {
    contractText = getStatus(contact.contract_status)
    if (contact.job_title) contractText += ` for ${contact.job_title}`
  }
  let parts = []
  if (!hideRelationship) parts = [companyAndRole, contractText]
  if (!hideOnlineStatus) parts = parts.concat(getOnlineStatus(contact.last_seen_at))
  return parts.filter(x => Boolean(x)).join(' • ')
}

type IContactProps = ContainerProps & ComponentProps<typeof ListItem> & {
  hideRelationship?: boolean
  hideOnlineStatus?: boolean
}

const Contact = memo(({ contact, onClick, openDirectChat, user, hideRelationship, hideOnlineStatus, children, ...otherProps }: IContactProps) => {
  return (
    <ListItem button onClick={onClick || openDirectChat} {...otherProps}>
      <ListItemIcon>
        <ChatUserAvatar
          id={contact.id}
          url={contact.avatar_url}
          name={contact.name}
        />
      </ListItemIcon>

      <ListItemText
        primary={contact.name}
        secondary={getContactSubheader(contact, user, hideOnlineStatus, hideRelationship)}
      />
      {children}
    </ListItem>
  )
})

export default Contact
