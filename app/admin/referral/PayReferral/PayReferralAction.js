import { UPDATE } from 'react-admin'

export const PAY_INVOICE = 'PAY_INVOICE'

export const payReferralAction = id => ({
  type: PAY_INVOICE,
  payload: { id, data: { pay_now: true } },
  meta: { resource: 'referrals', fetch: UPDATE, cancelPrevious: false },
})
