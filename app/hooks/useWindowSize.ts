import React from 'react'

export interface IWindowSize {
  innerWidth: number
  innerHeight: number
}

/**
 * React hook to read window dimensions and react to their change.
 * @returns An object with the window's innerWidth and innerHeight; initially (and during SSR) both are zero.
 */
export function useWindowSize(): IWindowSize {
  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)

  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    setWidth(window.innerWidth)
    setHeight(window.innerHeight)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    innerWidth: width,
    innerHeight: height,
  }
}
