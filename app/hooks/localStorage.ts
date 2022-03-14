import { useEffect, useState, useCallback } from 'react'
import { useIsPrerendering } from 'hooks'
import localStorage from 'services/localStorage'
import { trackError } from 'services/analytics'

interface useLocalStorageItemOptions<T> {
  /** If provided, this value will be used as initial value and also in case the value from localStorage evaluates to null or undefined */
  default?: T | null | undefined
}

/**
 * Hook to read a value from localStorage. SSR Safe: during SSR, the value will be null (or the default).
 * After frontend hydration, the component will re-render with the value from localStorage
 *
 * @param name localStorage key to use
 * @param opts optional additional configuration
 */
export function useLocalStorageItem<T = any>(name: string, opts: useLocalStorageItemOptions<T> = {}) {
  const [value, setValue] = useState<T | null | undefined>(opts?.default)
  const ssr = useIsPrerendering()

  const refreshAndGet = useCallback(() => {
    if (!ssr) {
      try {
        const stringValue = localStorage.getItem(name)
        const newValue: T = JSON.parse(stringValue)
        setValue(newValue ?? opts?.default)
        return newValue
      } catch (error) {
        trackError(error)
      }
    }
    return value
  }, [ssr])

  useEffect(() => { refreshAndGet() }, [ssr])

  return [
    value,
    refreshAndGet,
  ] as [typeof value, typeof refreshAndGet]
}
