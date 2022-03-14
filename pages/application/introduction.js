import { withLayout } from 'withLayout'
import { withScreeningLayout } from 'scenes/Screening'
import { VideoIntroduction } from 'scenes/Screening/VideoIntroduction'

export default withLayout(withScreeningLayout(VideoIntroduction), { name: 'VideoIntroduction' })
