import { debounce } from 'lodash'
import { useState, useRef, useEffect, useMemo } from 'react'

export function useDebouncedEffect(callback: () => void, delay: number, deps?: any[]) {
  const timeoutRef = useRef(0)

  useEffect(() => {
    window.clearTimeout(timeoutRef.current)

    timeoutRef.current = window.setTimeout(callback, delay)

    return () => window.clearTimeout(timeoutRef.current)
  }, deps)
}

export function useDebouncedData<T>(data: T = null, debounceMs = 400) {
  const [debouncedData, setDebouncedData] = useState(data)
  const updateDebouncedData = useMemo(() => debounceMs > 0 ? debounce(setDebouncedData, debounceMs) : setDebouncedData, [debounceMs])
  useEffect(() => {
    if (debounceMs > 0) updateDebouncedData(data)
  }, [data, debounceMs])

  return debounceMs > 0 ? debouncedData : data
}

export function useDebouncedCallback<T extends(...args: any) => any>(callback: T, debounceMs: number, deps?: any[]) {
  return useMemo(() => debounce<T>(callback, debounceMs), [callback, ...deps])
}
