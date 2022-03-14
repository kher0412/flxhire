import VideoMeet from 'scenes/VideoMeet'
import { withRouter } from 'next/router'
import { withLayout } from 'withLayout'

(VideoMeet as any).getInitialProps = () => ({
  disableLayout: true,
})

export default withLayout(withRouter(VideoMeet), { name: 'VideoMeet' })
