import React from 'react'
import Slick from 'react-slick'
import { PrevArrowFactory, NextArrowFactory } from 'components/ReactSlickUtils'
import styles from './SlickSlider.module.css'

export interface ISlickSliderProps {
  initialStep?: number
  children?: React.ReactNode
  onChange?: (step: number) => void
}

const arrowsStyle = {
  color: 'white',
  filter: 'drop-shadow(0 0 2px rgba(0,0,0,1)',
}

const NextArrow = NextArrowFactory(arrowsStyle)
const PrevArrow = PrevArrowFactory(arrowsStyle)

function SlickSlider(props: ISlickSliderProps) {
  const { onChange, initialStep = 0, children } = props

  const wrapperRef = React.useRef(null)

  const handleChange = (step: number) => {
    // prevent video elements from playing while hidden
    if (wrapperRef.current) {
      wrapperRef.current.querySelectorAll('video').forEach((item: HTMLVideoElement) => item.pause())
    }

    if (onChange) {
      onChange(step)
    }
  }

  return (
    <div ref={wrapperRef} className={styles.container}>
      <Slick
        dots
        arrows
        infinite
        initialSlide={initialStep}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        nextArrow={(<NextArrow />)}
        prevArrow={(<PrevArrow />)}
        centerMode={false}
        autoplay={false}
        afterChange={handleChange}
      >
        {children}
      </Slick>
    </div>
  )
}

export default React.memo(SlickSlider)
