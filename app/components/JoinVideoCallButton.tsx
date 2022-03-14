import React, { CSSProperties, useCallback } from 'react'
import { IconButton, Zoom } from '@material-ui/core'
import { browserHistory } from 'services/router'
import { IChatThreadInfo } from 'reducers/Chat'
import { VideoCall } from '@material-ui/icons'

const JoinVideoCallButton = ({ style, thread, onClick }: { style?: CSSProperties, thread: IChatThreadInfo, onClick?: () => void }) => {
  const joinVideoCall = useCallback(() => {
    browserHistory.push('/meet/[id]', `/meet/${thread?.meeting_room}`)
    if (typeof onClick === 'function') onClick()
  }, [thread?.meeting_room, onClick])
  return (
    <Zoom
      in={Boolean(thread?.enable_meeting_room && thread?.meeting_room)}
      mountOnEnter
      unmountOnExit
    >
      <IconButton
        onClick={joinVideoCall}
        style={style}
        size="small"
      >
        <VideoCall />
      </IconButton>
    </Zoom>
  )
}

export default JoinVideoCallButton
