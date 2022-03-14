import { MutableRefObject, useLayoutEffect, useRef } from 'react'

export interface IResizeObserverHookResult<T extends Element> {
  /**
   * The ResizeObserver instance created for detecing bounding box changes.
   */
  resizeObserver: ResizeObserver

  /**
   * A react ref object to be given as the ref prop to HTML nodes (such as a div).
   * If a ref was provided to the hook, the value of this ref will be the same ref value.
   */
  targetRef: MutableRefObject<T>
}

/**
 * React hook to create and connect a ResizeObserver quickly to the ref of a DOM element.
 * Useful to detect element bounding box changes, in the same way as using ResizeObserver directly.
 *
 * @param callback The callback to invoke when the ResizeObserver detects changes; called with a single entry matching the ref.
 * @param ref An Element to observe; if not provided, the returned targetRef must be passed to a DOM element to observe size changes.
 */
export function useResizeObserver<T extends Element>(callback: (entry: ResizeObserverEntry) => any, ref?: T): IResizeObserverHookResult<T> {
  const targetRef = useRef<T>(ref)
  const resizeObserverRef = useRef<ResizeObserver>()

  // connect the ResizeObserver to the element (if it changed, or is not set up yet)
  useLayoutEffect(() => {
    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        if (entries.length > 0) {
          callback(entries[0])
        }
      })
    }

    if (targetRef.current) {
      resizeObserverRef.current.observe(targetRef.current)
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
    }
  }, [targetRef.current])

  return {
    resizeObserver: resizeObserverRef.current,
    targetRef: targetRef,
  }
}
