import React from 'react'
import { Card } from '@material-ui/core'
import { Video } from 'components'
import { FreelancerCardSlider_AnswersQuery } from '__generated__/FreelancerCardSlider_AnswersQuery.graphql'
import styles from './VideoAnswerItem.module.css'

type VideoAnswerType = FreelancerCardSlider_AnswersQuery['response']['contract']['answers'][number]
type VideoType = Omit<VideoAnswerType, 'question'> & { question?: VideoAnswerType['question'] }

export interface IVideoAnswerItemProps {
  title: string
  video: VideoType
  videoPreload?: boolean
  videoDisabled?: boolean
  onClick?: () => void
}

function VideoAnswerItem(props: IVideoAnswerItemProps) {
  const { videoPreload, videoDisabled, video, title, onClick } = props

  return (
    <div className={styles.container} onClick={onClick} role="button">
      <Card raised className={styles.wrapper}>
        <Video
          compact
          disabled={videoDisabled}
          preload={videoPreload ? 'metadata' : 'none'}
          video={{ url: video.url, poster_url: video.posterUrl }}
          className={styles.video}
          title={title}
        />
      </Card>
    </div>
  )
}

export default React.memo(VideoAnswerItem)
