import { useMediaQuery as useMUIMediaQuery, Theme } from '@material-ui/core' // eslint-disable-line no-restricted-imports
import { useIsPrerendering } from 'hooks'

export interface IMediaQueryHookOptions {
  defaultMatches?: boolean
}

/**
 * Enhanced version of useMediaQuery, with improved support for SSR.
 * During SSR, the media query always evaluates to the defaultMatches value specified in options.
 * Initial rendering will match this behavior, so that hydration will work correctly, and re-render if the query mismatches.
 *
 * @param query The media query to test for match.
 * @param options Additional options.
 * @returns A boolean indicating whether the provided media query evaluates to true.
 */
export function useMediaQuery(query: string | ((theme: Theme) => string), options?: IMediaQueryHookOptions): boolean {
  const isSSR = useIsPrerendering()
  const match = useMUIMediaQuery(query, options)

  if (isSSR) {
    return options?.defaultMatches || false
  }

  return match
}
