import React from 'react'
import HelpOutline from '@material-ui/icons/HelpOutline'
import { MoreButtonCard } from 'components'
import { getRateText } from 'services/job'
import { IJob } from 'types'

export interface IRateExplanationProps {
  job: IJob
  style?: React.CSSProperties
  className?: string
}

export default function RateExplanation({ job, style, className }: IRateExplanationProps) {
  const minRate = job?.min_freelancer_rate
  const maxRate = job?.freelancer_rate
  const hasClientRate = Boolean(job?.min_client_rate || job?.client_rate)
  const hasFreelancerRate = Boolean(minRate || maxRate)

  if (!hasClientRate || !hasFreelancerRate) return null

  const format = job?.position_types?.includes('permanent') ? 'year' : 'day'
  const freelanceRateText = getRateText(minRate, maxRate, format)

  return (
    <MoreButtonCard tooltip="About rates" icon={<HelpOutline />} style={style} className={className}>
      Note: for freelance contracts resulting from hires for this position, Flexhire charges the maximum
      <br />between a margin of {job?.margin}% on the hourly rate and ${job?.min_margin_usd || 0}/hr
      <br />for contract management, 1099 taxation handling and payment distribution;
      <br />thus, the displayed rates will instead publicly appear as "{freelanceRateText}".
      <br /><br />
      The rates for all potential hires shown in the Hire Pipeline are displayed with the Flexhire margin included.
    </MoreButtonCard>
  )
}
