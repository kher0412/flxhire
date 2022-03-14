import { memo } from 'react'

/**
 * This component will block event propagation from its children to its parent
 */
const EventPropagationBlocker = ({ children }) => {
  if (!children || children?.length === 0) return null

  const eventNames = ['onClick', 'onMouseDown', 'onMouseUp']
  const stopPropagation = event => event?.stopPropagation()
  const props = Object.fromEntries(eventNames.map(eventName => [eventName, stopPropagation]))
  return (
    <div {...props}>{children}</div>
  )
}

export default memo(EventPropagationBlocker)
