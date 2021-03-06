export const billing_plans = [
  {
    id: 1,
    name: 'Starter',
    internal_name: 'public_starter',
    hidden: false,
    daily_job_fee_usd: 15,
    daily_manager_fee_usd: 3,
    minimum_managers: 1,
    highlighted: false,
    allow_multiple_managers: true,
    allow_ats_job_integrations: true,
    allow_career_page_integration: true,
    allow_background_checks: true,
  },
  {
    id: 2,
    name: 'Standard',
    internal_name: 'public_standard',
    hidden: false,
    daily_job_fee_usd: 10,
    daily_manager_fee_usd: 2,
    minimum_managers: 5,
    highlighted: true,
    allow_multiple_managers: true,
    allow_ats_job_integrations: true,
    allow_career_page_integration: true,
    allow_background_checks: true,
  },
  {
    id: 3,
    name: 'Enterprise',
    internal_name: 'public_enterprise',
    hidden: false,
    daily_job_fee_usd: 5,
    daily_manager_fee_usd: 1,
    minimum_managers: 10,
    highlighted: false,
    allow_multiple_managers: true,
    allow_ats_job_integrations: true,
    allow_career_page_integration: true,
    allow_background_checks: true,
  },
]
