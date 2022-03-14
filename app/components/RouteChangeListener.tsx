import { Fragment, useCallback, useState, ReactNode } from 'react'
import { useRouteChangeListener } from 'hooks/useRouteChangeListener'
import LoadingOverlay from './LoadingOverlay'

const RouteChangeListener = ({ children }: { children?: ReactNode }) => {
  const [showOverlay, setShowOverlay] = useState(false)

  const resetScrollPosition = useCallback(() => {
    // eslint-disable-next-line no-unused-expressions
    document.getElementById('top-bar')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const onRouteChangeStart = useCallback(() => {
    setShowOverlay(true)
  }, [])

  const onRouteChangeDone = useCallback(() => {
    setShowOverlay(false)
    resetScrollPosition()
  }, [])

  const onRouteChangeError = useCallback(() => {
    setShowOverlay(false)
  }, [])

  useRouteChangeListener({
    onRouteChangeStart,
    onRouteChangeDone,
    onRouteChangeError,
  })

  return (
    <Fragment>
      <LoadingOverlay show={showOverlay} />
      {children}
    </Fragment>
  )
}

export default RouteChangeListener
