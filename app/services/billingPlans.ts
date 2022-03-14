import { IBillingPlan, IJob } from 'types'
import { formatAsCurrency } from './formatting'

export function periodicBillsPreview(billingPlan: IBillingPlan, job: Pick<IJob, 'job_integrations'>) {
  if (!billingPlan) return []

  let bills = []

  if (billingPlan.daily_manager_fee_usd > 0) {
    let managersCount = billingPlan.minimum_managers
    if (managersCount < 1) managersCount = 1
    bills.push({
      name: `Manager fee (${managersCount} manager${managersCount > 1 ? 's' : ''})`,
      amount: `${formatAsCurrency(billingPlan.daily_manager_fee_usd * 30 * managersCount, { currency: 'USD' })} per month`,
    })
  }

  if (billingPlan.daily_job_fee_usd > 0) {
    bills.push({
      name: 'Open Position fee (1 Job)',
      amount: `${formatAsCurrency(billingPlan.daily_job_fee_usd * 30, { currency: 'USD' })} per month`,
    })
  }

  if (job?.job_integrations) {
    job.job_integrations.forEach((integration) => {
      if (integration.enabled_by_user && integration.daily_fee_usd > 0) {
        bills.push({
          name: `${integration.integration_name} Monthly Fee`,
          amount: `${formatAsCurrency(integration.daily_fee_usd * 30, { currency: 'USD' })} per month`,
        })
      }
    })
  }

  return bills
}

export function activationBillsPreview(job: Pick<IJob, 'job_integrations'>) {
  let bills = []

  if (job?.job_integrations) {
    job.job_integrations.forEach((integration) => {
      if (integration.enabled_by_user && integration.activation_fee_usd > 0) {
        bills.push({
          name: `${integration.integration_name} Activation Fee`,
          amount: formatAsCurrency(integration.activation_fee_usd, { currency: 'USD' }),
        })
      }
    })
  }

  return bills
}
