import { useEffect, useMemo, useState } from 'react'
import { isPrerendering } from 'services/prerender'
import { detectTimezoneOffset, detectTimezoneName } from 'services/timeKeeping'
import { getBuildID } from 'services/versioning'
import { useSelector } from './redux'
import { useCurrentUser } from './useCurrentUser'

export * from './analytics'
export * from './billing'
export * from './chat'
export * from './redux'
export * from './restApi'
export * from './useCurrentUser'
export * from './debounce'
export * from './filters'
export * from './confirmation'
export * from './error'
export * from './router'
export * from './video'
export * from './form'
export * from './localStorage'
export * from './useQuickCommit'
export * from './useRouteChangeListener'

/**
 * @deprecated use useEffect(callback, []) instead
 * @param callback callback to execute only once
 */
export function useOnMount(callback: () => any) {
  const [init, setInit] = useState(false)
  if (!init) {
    setInit(true)
    callback()
  }
}

/**
 * A hook to determine whether the current render pass is being done through SSR (server-side rendering).
 *
 * **Important note: for components rendered on the server, this hook will return true for the first render on the client as well.**
 * **This is to avoid any hydration mismatches between server and client rendering, and will cause an additional re-render initially for such components.**
 *
 * @returns A boolean indicating whether the current render pass is SSR.
 */
export function useIsPrerendering() {
  const [clientRendered, setClientRendered] = useState(!isPrerendering())
  useEffect(() => setClientRendered(true)) // only runs on the client, after hydration (or standalone initial rendering)
  return !clientRendered
}

export function useDetectTimezone() {
  return useMemo(() => ({ name: detectTimezoneName(), offset: detectTimezoneOffset() }), [])
}

export function useInterval(timeMs: number, callback: () => void, enable = true) {
  const [intervalId, setIntervalId] = useState(null as any)
  useEffect(() => {
    if (enable) {
      if (!intervalId) setIntervalId(setInterval(callback, timeMs))
    } else {
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId)
  }, [enable])
}

export function useFrontendVersion() {
  const [user] = useCurrentUser()
  const serverBuildId = useSelector(state => state.common.serverBuildId)
  const lastBuildID = user?.configuration?.frontend_build_id || null
  const buildId = getBuildID()
  const updateAvailable = !isPrerendering() && buildId && lastBuildID && (buildId !== lastBuildID || (serverBuildId && serverBuildId !== buildId))

  return {
    updateAvailable,
  }
}
