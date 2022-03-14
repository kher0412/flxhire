import React from 'react'
import styles from './AnimBox.module.css'

class AnimBox extends React.Component {
  static defaultProps = {
    delay: 0,
    offset: 0,
  }

  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      isShown: false,
    }
  }

  render() {
    let style = {
      visibility: this.state.isShown ? 'visible' : 'hidden',
    }

    if (this.props.style) {
      style = {
        ...this.props.style,
        ...style,
      }
    }

    let props = {
      ...this.props,
    }

    delete props.grow
    delete props.slide
    delete props.delay
    delete props.heavySlide
    delete props.heavySlideRight
    delete props.heavySlideUp

    return (
      <div
        ref={div => this.wrapper = div}
        {...props}
        style={style}
        className={this.state.isShown ? undefined : styles['animbox-hidden']}
      >
        {this.props.children}
      </div>
    )
  }

  componentDidMount() {
    this._isMounted = true

    if (window.innerWidth < 700) {
      this.setState({ isShown: true })
    } else {
      this.animateWhenVisible()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isShown && !prevState.isShown) {
      if (this.wrapper.animate && !this._noAnim) {
        if (this.props.grow) {
          this.wrapper.animate(
            [
              { opacity: 0, transform: 'scale(0)' },
              { opacity: 1, transform: 'scale(1)' },
            ],
            {
              duration: 500,
              delay: this.props.delay,
              fill: 'backwards',
              easing: 'cubic-bezier(0.7,0,0,1)',
            },
          )
        } else if (this.props.slide) {
          this.wrapper.animate(
            [
              { opacity: 0, transform: 'translateX(-48px)' },
              { opacity: 1, transform: 'translateX(0)' },
            ],
            {
              duration: 500,
              delay: this.props.delay,
              fill: 'backwards',
              easing: 'cubic-bezier(0,1,1,1)',
            },
          )
        } else if (this.props.heavySlide) {
          this.wrapper.animate(
            [
              { opacity: 0, transform: 'translateX(-1080px)' },
              { opacity: 1, transform: 'translateX(0)' },
            ],
            {
              duration: 500,
              delay: this.props.delay,
              fill: 'backwards',
              easing: 'cubic-bezier(0,1,0.1,1)',
            },
          )
        } else if (this.props.heavySlideRight) {
          this.wrapper.animate(
            [
              { opacity: 0, transform: 'translateX(1080px)' },
              { opacity: 1, transform: 'translateX(0)' },
            ],
            {
              duration: 500,
              delay: this.props.delay,
              fill: 'backwards',
              easing: 'cubic-bezier(0,1,0.1,1)',
            },
          )
        } else if (this.props.heavySlideUp) {
          this.wrapper.animate(
            [
              { opacity: 0, transform: 'translateY(640px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            {
              duration: 500,
              delay: this.props.delay,
              fill: 'backwards',
              easing: 'cubic-bezier(0,1,0.1,1)',
            },
          )
        } else {
          this.wrapper.animate(
            [
              { opacity: 0 },
              { opacity: 1 },
            ],
            {
              duration: 350,
              delay: this.props.delay,
              fill: 'backwards',
            },
          )
        }
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  animateWhenVisible() {
    if (!this._isMounted) return

    let domElem = this.wrapper
    let domElemRect = domElem.getBoundingClientRect()
    let appearThreshold = window.innerHeight * 9 / 10
    let domCenterY = (domElemRect.bottom + domElemRect.top) / 2 + this.props.offset

    if (!this.isHiddenByParent(domElem) && domCenterY < appearThreshold) {
      if (domCenterY - this.props.offset < 0) {
        this._noAnim = true
      }

      this.setState({
        isShown: true,
      })
    } else {
      // Keep polling at 20 FPS
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            this.animateWhenVisible()
          })
        })
      })
    }
  }

  isHiddenByParent(el) {
    // eslint-disable-next-line no-cond-assign
    while (el && (el = el.parentElement)) {
      if (getComputedStyle(el).visibility === 'hidden') {
        return true
      }
    }

    return false
  }
}

export default AnimBox
