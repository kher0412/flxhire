import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'reducers'
import { IChatUser } from 'types'

export function useChatContact(contactData: Partial<IChatUser> & { id: number }) {
  const contacts = useSelector((state: RootState) => state.chat.contacts)
  return useMemo(
    () => contacts?.filter(c => c.id === contactData?.id)?.[0] || contactData,
    [contactData, contacts],
  )
}
