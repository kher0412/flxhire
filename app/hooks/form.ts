import { useState, useCallback } from 'react'
import { FormValue } from 'types'

export function useFormValue<T>(name: string, initialValue: T = null) {
  const [value, setValueRaw] = useState<T>(initialValue)
  const [touched, setTouched] = useState(false)
  const setValue = useCallback((val: T) => {
    setValueRaw(val)
    setTouched(true)
  }, [])
  return {
    input: {
      onChange: e => setValue(e?.target ? e.target.value : e),
      value,
      name,
    },
    meta: {
      error: null,
      touched,
    },
  } as FormValue<T>
}
