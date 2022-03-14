import React from 'react'
import { Badge } from '@material-ui/core'
import Slick from 'react-slick'
import { PrevArrowFactory, NextArrowFactory } from 'components/ReactSlickUtils'
import { MoreButtonCard, Video } from 'components'
import { VideoLibrary } from '@material-ui/icons'
import styles from './SampleVideosButton.module.css'

const arrowsStyle = {
  color: 'black',
}
const NextArrow = NextArrowFactory(arrowsStyle)
const PrevArrow = PrevArrowFactory(arrowsStyle)

const SLICK_SETTINGS = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  centerMode: true,
  autoplay: false,
}

export default class SampleVideosButton extends React.PureComponent {
  render() {
    const { sampleVideos, style } = this.props

    if (!sampleVideos || sampleVideos.length === 0) {
      return false
    }

    return (
      <Badge badgeContent={sampleVideos.length} color="secondary" className={styles.badge}>
        <MoreButtonCard
          responsive
          tooltip="Sample videos"
          mobileLabel="Samples"
          icon={<VideoLibrary />}
          style={style}
        >
          <div className={styles.container}>
            <div className={styles.title}>
              Here are some sample videos to help inspire yours
            </div>

            <Slick {...SLICK_SETTINGS}>
              {sampleVideos.map((v, vi) => (
                <Video key={vi} video={{ url: v.src || v.url }} className={styles.video} />
              ))}
            </Slick>
          </div>
        </MoreButtonCard>
      </Badge>
    )
  }
}
