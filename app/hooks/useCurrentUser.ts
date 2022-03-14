import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'reducers'
import { getCurrentUser } from 'reducers/Auth'
import { ICurrentUser } from 'types'

export function useCurrentUser(): [ICurrentUser, () => void] {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.currentUser)
  const refresh = useCallback(() => { dispatch(getCurrentUser()) }, [])
  return [user, refresh]
}
