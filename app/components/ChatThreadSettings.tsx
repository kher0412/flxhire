import { List, ListItem, ListItemSecondaryAction, ListItemText, Zoom } from '@material-ui/core'
import { getAPIClient } from 'api'
import { MoreButtonCard } from 'components'
import { useAPIWrite, useDispatchAction } from 'hooks'
import { useCallback } from 'react'
import { IChatThreadInfo, threadUpdated as threadUpdatedAction } from 'reducers/Chat'
import { Cancel, CheckCircle, Settings } from '@material-ui/icons'

interface IChatThreadSettingsProps {
  thread?: IChatThreadInfo
}

const ChatThreadSettingsButton = ({ thread }: IChatThreadSettingsProps) => {
  const threadUpdated = useDispatchAction(payload => threadUpdatedAction(payload), [])
  const { submit: updateThread, submitting } = useAPIWrite(threadData => getAPIClient().updateChatThread(threadData.id, threadData))
  const toggleVideoMeeting = useCallback(
    () => updateThread({ id: thread?.id, enable_meeting_room: !thread?.enable_meeting_room }).then(threadUpdated),
    [thread?.id, thread?.enable_meeting_room],
  )
  return (
    <Zoom mountOnEnter>
      <MoreButtonCard icon={<Settings />} size="small">
        <List>
          <ListItem button onClick={toggleVideoMeeting} disabled={submitting}>
            <ListItemText
              primary="Meeting Room"
              secondary={
                thread?.enable_meeting_room ? 'Click to disable Meeting Room for this conversation' : 'Click to enable Meeting Room for this conversation'
              }
            />
            <ListItemSecondaryAction>
              {thread?.enable_meeting_room ? <CheckCircle color="primary" /> : <Cancel />}
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </MoreButtonCard>
    </Zoom>
  )
}

export default ChatThreadSettingsButton
