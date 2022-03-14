import { useOnMount } from 'hooks'
import { trackEvent } from 'services/analytics'

export function useTrackEventOnMount(event: string, condition: boolean = true) {
  return useOnMount(() => {
    if (condition) trackEvent(event)
  })
}
