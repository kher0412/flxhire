import { formatAsShortDateTime } from 'services/formatting'
import React from 'react'

interface IInterviewTimesProps {
  contract: {
    interview_scheduling_method: string
    interview_date: string
    interview_date_1: string
    interview_date_2: string
    interview_date_3: string
  }
}

export default function InterviewTimes({ contract }: IInterviewTimesProps) {
  if (contract.interview_date) {
    return (
      <React.Fragment>
        {formatAsShortDateTime(contract.interview_date)}
      </React.Fragment>
    )
  }

  if (contract.interview_scheduling_method === 'schedule_via_calendly') return <React.Fragment>Calendly link sent</React.Fragment>

  const elements = [1, 2, 3].map(i => (
    contract[`interview_date_${i}`] ? (
      <div key={i}>{formatAsShortDateTime(contract[`interview_date_${i}`])}</div>
    ) : null
  )).filter(el => Boolean(el))

  if (elements.length > 0) return <React.Fragment>{elements}</React.Fragment>

  return null
}
