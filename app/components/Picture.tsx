import React from 'react'
import { trackError } from 'services/analytics'
import { optimizeSrc } from 'services/filestack'

function getImageType(src: string) : string {
  if (!src) return null
  if (src.indexOf('data:image') === 0) {
    return src.slice('data:'.length, src.indexOf(';'))
  }
  const type = src.slice(src.lastIndexOf('.') + 1)
  if (type === 'jpg') return 'image/jpeg'
  return `image/${type}`
}

export interface IPictureProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  src: string
  srcFallback?: string
  alt?: string
  filestack?: boolean
  width?: number
  onError?: (error: Error) => void
}

interface IPictureState {
  srcEmpty: boolean
  retryCount: number
}

export default class Picture extends React.PureComponent<IPictureProps, IPictureState> {
  timeout: number

  state = {
    srcEmpty: false,
    retryCount: 0,
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout)
  }

  render() {
    const { src, srcFallback, alt = '', filestack = false, width, ...props } = this.props
    const { srcEmpty } = this.state

    const effectiveSrc = srcEmpty ? undefined : src
    const effectiveSrcFallback = srcEmpty ? undefined : srcFallback

    if (srcFallback) {
      return (
        <picture>
          <source srcSet={effectiveSrc} type={getImageType(src)} />
          <img
            src={effectiveSrcFallback}
            alt={alt}
            {...props}
            onError={this.handleError}
          />
        </picture>
      )
    }

    if (!filestack && getImageType(src) === 'image/webp') {
      console.warn(`Picture with src ${src}: no fallback image provided!`)
    }

    const srcProcessed = filestack && effectiveSrc ? optimizeSrc(effectiveSrc, { width }) : effectiveSrc

    return (
      <img
        src={srcProcessed}
        alt={alt}
        {...props}
        onError={this.handleError}
      />
    )
  }

  retryLoadingImage = () => {
    this.setState({ srcEmpty: true }, () => {
      this.timeout = window.setTimeout(() => {
        this.timeout = null
        this.setState(state => ({ srcEmpty: false, retryCount: state.retryCount + 1 }))
      }, 300)
    })
  }

  handleError = () => {
    const { src, srcFallback, onError } = this.props
    const { retryCount, srcEmpty } = this.state

    if (!srcEmpty) {
      const err = new Error(`Failed to load image: ${src || '<none>'} - with fallback: ${srcFallback || '<none>'}`)

      if (retryCount < 2) {
        this.retryLoadingImage()
      } else {
        trackError(err)
        if (onError) onError(err)
      }
    }
  }
}
