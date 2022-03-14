import { useState, useEffect, ComponentProps } from 'react'
import ReactResponsive from 'react-responsive' // eslint-disable-line no-restricted-imports

export default function MediaQuery({ children, ...props }: ComponentProps<typeof ReactResponsive>) {
  // Workaround for this bug: https://github.com/contra/react-responsive/issues/162
  // We could do a better workaround, but this will do for now
  const [isFirstRender, setIsFirstRender] = useState(true)
  useEffect(() => setIsFirstRender(false))
  if (isFirstRender) return null
  return <ReactResponsive {...props}>{children}</ReactResponsive>
}
