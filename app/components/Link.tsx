import { forwardRef } from 'react'
import { connect } from 'react-redux'
import OriginalLink from 'next/link'
import { RootState } from 'reducers'

const Link = forwardRef((props: any, ref) => {
  const {
    onClick,
    href,
    to, // Backwards compatibility with react-router Link
    as,
    passHref,
    prefetch,
    replace,
    scroll,
    children,
    noWrapChildren,
    isIframe,
    dispatch,
    ...others
  } = props

  const dest = href || to
  let content = children

  // if Link component has onClick prop, we have to disable default action caused by using href attribute to prevent page reloading
  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    onClick()
  }

  if (isIframe) {
    return (
      <a {...others} href={as || dest} target="_parent">
        {content}
      </a>
    )
  }

  if (typeof onClick === 'function') {
    return (
      <a {...others} href={href} onClick={handleClick}>
        {content}
      </a>
    )
  }

  if (!noWrapChildren) {
    content = (
      <a {...others}>
        {content}
      </a>
    )
  }

  if ((typeof dest !== 'string' || !dest) && typeof onClick !== 'function') {
    console.warn('Link was rendered with an invalid HREF attribute.')
    return content
  }

  const Component = OriginalLink as any // needed because "ref" can't be passed otherwise

  return (
    <Component
      ref={ref}
      onClick={onClick}
      href={dest}
      as={as}
      passHref={passHref}
      prefetch={prefetch}
      scroll={scroll}
      replace={replace}
    >
      {content}
    </Component>
  )
})

const mapStateToProps = (state: RootState) => ({
  isIframe: state.common.isIframe,
})

export default connect(mapStateToProps)(Link) as any
