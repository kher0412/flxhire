import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { trackError } from 'services/analytics'
import styles from './VideoBackground.module.css'

export default class VideoBackground extends React.PureComponent {
  constructor(props, ctx) {
    super(props, ctx)

    this.state = {
      isLoading: props.videoURL ? true : false,
    }
  }

  render() {
    const { isPlaybackProgress, videoURL } = this.props
    const { isLoading } = this.state

    if (!isPlaybackProgress || !videoURL) {
      return false
    }

    return (
      <div className={styles.container}>
        <video
          key={`${videoURL}-cover`}
          className={styles['cover-video']}
          src={videoURL}
          ref={video => this.coverVideo = video}
        />

        <video
          key={videoURL}
          className={styles.video}
          src={videoURL}
          ref={video => this.video = video}
        />

        {isLoading && (
          <div className={styles['alt-content']}>
            <div className={styles['progress-wrapper']}>
              <CircularProgress
                variant="indeterminate"
                size={18}
                thickness={2}
              />
            </div>

            Loading stored recording...
          </div>
        )}
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    const { isPlaybackProgress, videoURL } = this.props

    if (videoURL !== nextProps.videoURL || (!isPlaybackProgress && nextProps.isPlaybackProgress)) {
      this.setState({
        isLoading: true,
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { isPlaybackProgress, videoURL, onEnded } = this.props

    if (videoURL !== prevProps.videoURL || (isPlaybackProgress && !prevProps.isPlaybackProgress)) {
      if (this.video && this.coverVideo && videoURL) {
        this.video.play().catch(err => console.log(err))
        this.coverVideo.play().catch(err => console.log(err))
        this.coverVideo.muted = true

        this.video.onloadeddata = this.handleVideoLoad
        this.video.onended = onEnded
      }
    }
  }

  handleVideoLoad = () => {
    this.setState({
      isLoading: false,
    })
  }
}
