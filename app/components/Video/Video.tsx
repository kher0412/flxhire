import React, { HTMLAttributes } from 'react'
import { classList } from 'services/styles'
import { AnimBox, MediaQuery } from 'components'
import { convertVideoURLToUseCDN } from 'services/videos'
import { trackError, trackEvent } from 'services/analytics'
import { IVideo } from 'types'
import styles from './Video.module.css'
import PlayIcon from './PlayIcon'
import { ContainerProps } from './VideoContainer'
import Picture, { IPictureProps } from '../Picture'

interface IVideoProps {
  video: Pick<IVideo, 'url' | 'poster_url'> & {
    id?: number
  }
  disabled?: boolean
  rounded?: boolean
  preload?: 'metadata' | 'auto' | 'none'
  title?: string
  compact?: boolean
  pictureProps?: IPictureProps
}

interface IVideoState {
  isEnabled: boolean
  isPlaying: boolean
  isPosterFailed: boolean
  retryCount: number
}

export default class Video extends React.PureComponent<IVideoProps & ContainerProps & HTMLAttributes<HTMLDivElement>, IVideoState> {
  state = {
    isEnabled: false,
    isPlaying: false,
    isPosterFailed: false,
    retryCount: 0,
  }

  videoElement: HTMLVideoElement

  onVideoEndedTimeoutHandle: number

  render() {
    const { video, user, rounded = true, className, title, preload = 'metadata', compact, disabled, pictureProps = {}, ...restProps } = this.props
    const { isEnabled, isPlaying, isPosterFailed } = this.state

    if (!video) return null

    const enablePoster = !isEnabled && video.poster_url && !isPosterFailed
    const cdnURL = user?.configuration?.video_cdn_url
    const useCDN = (user?.configuration?.use_video_cdn || false) && Boolean(cdnURL)
    const videoUrl = useCDN ? convertVideoURLToUseCDN(video.url, cdnURL) : video.url

    return (
      <div className={classList(styles.container, className)} style={rounded ? undefined : { borderRadius: 0 }} {...restProps}>
        <div className={styles.overlay} style={{ opacity: isEnabled ? 0.5 : 1 }} />

        <div
          className={styles.play}
          onClick={this.handlePlayClick}
          role="button"
        >
          {!isEnabled && (
            <AnimBox grow delay={100} offset={-100}>
              <MediaQuery maxWidth={800}>
                {(isMobile => (
                  <PlayIcon compact={isMobile} />
                ))}
              </MediaQuery>
            </AnimBox>
          )}

          {title && (
            <AnimBox
              heavySlideRight
              delay={100}
              offset={-100}
            >
              <div
                className={classList(styles.title, compact && styles.compact)}
                title={(typeof title === 'string') && title}
                style={isPlaying ? { opacity: 0.5 } : undefined}
              >
                {title}
              </div>
            </AnimBox>
          )}
        </div>

        {enablePoster && (
          <Picture
            filestack
            width={400}
            className={styles.poster}
            src={video.poster_url}
            onClick={this.handlePlayClick}
            onError={this.handleImgError}
            {...pictureProps}
          />
        )}

        {video.url && !enablePoster && (
          // Explanation for crossOrigin: https://developers.google.com/web/tools/workbox/guides/advanced-recipes#warm_the_runtime_cache
          <video
            style={disabled ? { pointerEvents: 'none' } : undefined}
            controls={isEnabled}
            className={styles.video}
            preload={preload}
            ref={_video => this.videoElement = _video}
            onError={this.handleError}
            onEnded={this.handleVideoEnded}
            onPlay={this.handleVideoPlay}
            onPause={this.handleVideoPause}
            crossOrigin="anonymous"
          >
            <source
              src={enablePoster ? videoUrl : `${videoUrl}#t=0.25`}
              type="video/mp4"
            />

            Your browser does not support HTML5 video.
          </video>
        )}
      </div>
    )
  }

  handlePlayClick = () => {
    if (this.props.disabled) return

    this.setState({
      isEnabled: true,
    }, () => {
      try {
        if (this.videoElement) {
          const playPromise = this.videoElement.play()
          // Note: on IE11 play() does not return anything
          if (typeof playPromise?.catch === 'function') playPromise.catch(err => console.log(err))
          trackEvent('Video Play Start')
        }
      } catch (error) {
        trackError(error)
      }
    })
  }

  handleImgError = () => {
    this.setState({
      isPosterFailed: true,
    })
  }

  handleError = () => {
    const { video } = this.props
    const { retryCount } = this.state
    if (retryCount < 2 && this.videoElement) {
      this.videoElement.load()
      this.setState({ retryCount: retryCount + 1 })
    } else {
      trackError(new Error(`Failed to load video: ${video?.url || '<none>'} (Video#${video?.id || 'unknown'})`))
    }
  }

  handleVideoPlay = () => {
    this.setState({
      isPlaying: true,
    })

    window.clearTimeout(this.onVideoEndedTimeoutHandle)
    trackEvent('Video Play')
  }

  handleVideoPause = () => {
    this.setState({
      isPlaying: false,
    })
    trackEvent('Video Pause')
  }

  handleVideoEnded = () => {
    window.clearTimeout(this.onVideoEndedTimeoutHandle)
    this.onVideoEndedTimeoutHandle = window.setTimeout(() => {
      this.setState({
        isEnabled: false,
      })
    }, 1000)
    trackEvent('Video Ended')
  }
}
