/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react'
import { Card } from '@material-ui/core'
import { AnimBox } from 'components'
import styles from './VideoIntro.module.css'

export default class VideoIntro extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <AnimBox heavySlideUp offset={-1000} delay={800}>
        <Card className={styles.container} raised>
          <video
            className={styles.video}
            autoPlay
            loop
            style={{ filter: 'hue-rotate(-45deg)' }} // TODO: this filter is only for the placeholder video, remove before real video.
          >
            <source
              src="https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1579302979877%2Fassets%2F0B3T7oTWa3HiFTktwZVJ5VzZ3U1E%2Fitem-selection-toggling-selection-desktop.mp4"
              type="video/mp4"
            />
          </video>
        </Card>
      </AnimBox>
    )
  }
}
