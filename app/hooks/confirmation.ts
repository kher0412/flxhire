import { useState, useCallback } from 'react'

interface useActionConfirmationOptions {
  skipConfirm?: boolean
}

export function useActionConfirmation(action: () => void, options: useActionConfirmationOptions = {}) {
  const [confirming, setConfirming] = useState(false)
  const cancel = useCallback(() => setConfirming(false), [])
  const perform = useCallback(() => {
    if (confirming || options.skipConfirm) {
      action()
      cancel()
    } else {
      setConfirming(true)
    }
  }, [confirming, action, cancel, options?.skipConfirm])
  return {
    confirming,
    cancel,
    perform,
  }
}
