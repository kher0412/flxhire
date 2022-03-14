import { MutableRefObject, useLayoutEffect, useState } from 'react'
import { useResizeObserver } from './useResizeObserver'

function areBoundsDifferent(a: IDOMBounds, b: IDOMBounds): boolean {
  // note: this is the most performant way to compare DOMRects
  return (
    a.width !== b.width ||
    a.height !== b.height ||
    a.bottom !== b.bottom ||
    a.left !== b.left ||
    a.right !== b.right ||
    a.top !== b.top
  )
}

export interface IDOMBounds {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
}

export interface IComponentBoundsHookResult<T extends Element> {
  /**
   * A DOMRect with the current bounds of the targeted element.
   */
  bounds: IDOMBounds

  /**
   * A react ref object to be given as the ref prop to HTML nodes (such as a div); determines which element to report bounds for.
   * If a ref was provided to the hook, the value of this ref will be the same ref value.
   */
  boundsRef: MutableRefObject<T>
}

/**
 * React hook to report the live dimensions of the bounds of an element.
 *
 * @param ref An Element to observe; if not provided, the returned boundsRef must be passed to a DOM element to observe boundary changes.
 */
export function useComponentBounds<T extends Element>(ref?: T): IComponentBoundsHookResult<T> {
  const [bounds, setBounds] = useState<IDOMBounds>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  })

  // use a ResizeObserver to ensure that component bounds never slip
  const { targetRef } = useResizeObserver<T>((entry) => {
    let newBounds = entry.target.getBoundingClientRect()

    if (areBoundsDifferent(bounds, newBounds)) {
      setBounds(newBounds)
    }
  }, ref)

  // perform bounds check on updates and on mount
  // in most cases, this should only cause new bounds to be set on mounting
  useLayoutEffect(() => {
    // note: the getBoundingClientRect type-check should not be strictly necessary, as the typedefs won't allow it
    if (targetRef.current && typeof targetRef.current.getBoundingClientRect === 'function') {
      const newBounds = targetRef.current.getBoundingClientRect()

      // note: it's very important to compare bounding boxes here, otherwise we can end up in an infinite update-render loop
      if (areBoundsDifferent(bounds, newBounds)) {
        setBounds(newBounds)
      }
    }
  })

  return {
    boundsRef: targetRef,
    bounds: bounds,
  }
}
