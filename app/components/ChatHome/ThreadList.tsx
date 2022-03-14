import { memo, useMemo } from 'react'
import { ICurrentUser } from 'types'
import { IChatThreadInfo } from 'reducers/Chat'
import { fuzzySearch } from 'services/lists'
import { PagePlaceholder, VirtualizedList } from 'components'
import { Button } from 'components/themed'
import { AddComment, Search } from '@material-ui/icons'
import Thread from './Thread'

const getSearchFields = (user: ICurrentUser) => (t: IChatThreadInfo) => {
  const names = t.users?.filter(u => !user?.id || u.id !== user?.id)?.map(u => [u.first_name, u.name]) || []
  return [t.title, t.default_title].concat(...names)
}

interface IThreadListProps {
  user: ICurrentUser
  threads: IChatThreadInfo[]
  setThread: (thread: IChatThreadInfo) => void
  threadId: number
  loading: boolean
  search: string
  newConversation: () => void
}

const ThreadList = memo(({ threads, user, setThread, threadId, loading, search, newConversation }: IThreadListProps) => {
  const searchFields = useMemo(() => getSearchFields(user), [user])
  const searchResults = useMemo(() => fuzzySearch(search, threads, searchFields), [search, threads])
  const list = search ? searchResults : threads
  return (
    <VirtualizedList
      Component={({ index, style }) => (
        <Thread
          thread={list[index]}
          user={user}
          setThread={setThread}
          threadId={threadId}
          style={style}
        />
      )}
      noRowsRenderer={() => (
        <PagePlaceholder
          flat
          title={loading ? 'Please Wait' : (search ? 'No results' : 'No conversations yet')}
          subtitle={loading ? 'Loading Conversations...' : null}
          action={search ? (
            <Button color="primary" onClick={newConversation}>
              <Search /> Search Contacts
            </Button>
          ) : (
            <Button color="primary" onClick={newConversation}>
              <AddComment /> New Conversation
            </Button>
          )}
        />
      )}
      count={list.length}
      rowHeight={72}
    />
  )
})

export default ThreadList
