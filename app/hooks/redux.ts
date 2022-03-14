import { useCallback } from 'react'
// eslint-disable-next-line no-restricted-imports
import { useDispatch as useDispatchOriginal, useSelector as useSelectorOriginal, TypedUseSelectorHook } from 'react-redux'
import { RootState } from 'reducers'
import { toggleSnackbar } from 'reducers/Common'

// TODO: add type parameter to useDispatchOriginal by importing Actions which is defined near RootState
// I am not doing it now because it errors out
export const useDispatch = () => useDispatchOriginal()

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorOriginal

export function useSnackbar() {
  const dispatch = useDispatch()
  return useCallback((message: string) => { dispatch(toggleSnackbar({ message })) }, [])
}

export function useDispatchAction(callback: (...args: any[]) => any, deps: any[] = []) {
  const dispatch = useDispatch()
  return useCallback((...args) => dispatch(callback(...args)), deps)
}
