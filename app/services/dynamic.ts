import nextDynamic, { DynamicOptions } from 'next/dynamic'
import { trackError } from 'services/analytics'

export default function dynamic(fn: () => Promise<any>, options?: DynamicOptions) : ReturnType<typeof nextDynamic> {
  const handler = async () => {
    let retryCount: number = 0
    let result
    let error: Error
    do {
      try {
        result = await fn()
      } catch (err) {
        error = err
      }
    } while (!result && retryCount < 2)
    if (error) trackError(error)
    return result
  }
  return nextDynamic(handler, options)
}
