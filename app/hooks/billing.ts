import { useEffect } from 'react'
import { setAvoidBillingSetupDialog as setAvoidBillingSetupDialogAction } from 'reducers/Common'
import { useDispatchAction } from './redux'

export function useAvoidBillingSetupDialog() {
  const setAvoidBillingSetupDialog = useDispatchAction((avoid: boolean) => setAvoidBillingSetupDialogAction(avoid), [])
  useEffect(() => {
    setAvoidBillingSetupDialog(true)
    return () => setAvoidBillingSetupDialog(false)
  })
}
