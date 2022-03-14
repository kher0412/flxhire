import { Fragment } from 'react'
import { FreelancerCardInfoItem, MoreButtonCard } from 'components'
import { Today } from '@material-ui/icons'
import InterviewTimes from 'components/InterviewTimes'
import AddToCalendar from 'components/AddToCalendar'
import moment from 'moment'
import { formatAsShortDateTime } from 'services/formatting'
import { graphql, useFragment } from 'react-relay'
import { FreelancerInterviewTimes_Contract$key } from '__generated__/FreelancerInterviewTimes_Contract.graphql'
import { FreelancerInterviewTimes_Freelancer$key } from '__generated__/FreelancerInterviewTimes_Freelancer.graphql'

interface IFreelancerInterviewTimesProps {
  contract: FreelancerInterviewTimes_Contract$key
  freelancer: FreelancerInterviewTimes_Freelancer$key
}

const FreelancerInterviewTimes = ({ freelancer: freelancerProp, contract: contractProp }: IFreelancerInterviewTimesProps) => {
  const freelancer = useFragment(graphql`
      fragment FreelancerInterviewTimes_Freelancer on User {
        firstName
        lastName
      }
    `, freelancerProp)
  const contract = useFragment(graphql`
      fragment FreelancerInterviewTimes_Contract on Contract {
        status
        freelancerTimezoneName
        freelancerContactEmail
        interviewSchedulingMethod
        interviewDate
        interviewDate1
        interviewDate2
        interviewDate3
      }
    `, contractProp)

  if (!freelancer || !contract) return null

  if (contract?.status !== 'interview_accepted' && contract?.status !== 'pending') return null

  const interviewAccepted = contract?.status === 'interview_accepted'
  const interviewTime = formatAsShortDateTime(contract.interviewDate)
  const interviewTime1 = formatAsShortDateTime(moment(contract.interviewDate1))
  const interviewTime2 = formatAsShortDateTime(moment(contract.interviewDate2))
  const interviewTime3 = formatAsShortDateTime(moment(contract.interviewDate3))
  const tz = contract.freelancerTimezoneName
  const interviewTimeFreelancer = tz && contract.interviewDate ? formatAsShortDateTime(moment(contract.interviewDate).tz(tz)) : null
  const interviewTime1Freelancer = tz && contract.interviewDate1 ? formatAsShortDateTime(moment(contract.interviewDate1).tz(tz)) : null
  const interviewTime2Freelancer = tz && contract.interviewDate2 ? formatAsShortDateTime(moment(contract.interviewDate2).tz(tz)) : null
  const interviewTime3Freelancer = tz && contract.interviewDate3 ? formatAsShortDateTime(moment(contract.interviewDate3).tz(tz)) : null
  let interviewTimeSame = true
  if (interviewAccepted) {
    if (interviewTimeFreelancer && interviewTime && interviewTimeFreelancer !== interviewTime) interviewTimeSame = false
  } else {
    if (interviewTime1Freelancer && interviewTime1Freelancer !== interviewTime1) {
      interviewTimeSame = false
    } else if (interviewTime2Freelancer && interviewTime2Freelancer !== interviewTime2) {
      interviewTimeSame = false
    } else if (interviewTime3Freelancer && interviewTime3Freelancer !== interviewTime3) {
      interviewTimeSame = false
    }
  }

  return (
    <MoreButtonCard
      component={props => (
        <FreelancerCardInfoItem
          {...props}
          button
          icon={<Today />}
          primary={(
            <InterviewTimes
              contract={{
                interview_scheduling_method: contract?.interviewSchedulingMethod,
                interview_date: contract?.interviewDate as string,
                interview_date_1: contract?.interviewDate1 as string,
                interview_date_2: contract?.interviewDate2 as string,
                interview_date_3: contract?.interviewDate3 as string,
              }}
            />
          )}
          secondary={interviewAccepted ? 'Interview Time' : 'Interview Times'}
          data-cy="interview-date"
        />
      )}
    >
      {interviewAccepted && (
      <Fragment>
        <div style={{ paddingBottom: 24, maxWidth: 400 }}>
          The interview is set at {interviewTime}
          {' '}
          {interviewTimeSame ? `in yours and ${freelancer.firstName}'s local time.` : 'in your local time.'}
        </div>
        {!interviewTimeSame && (
        <div style={{ paddingBottom: 24, maxWidth: 400 }}>
          For {freelancer.firstName}, the interview is set at {interviewTimeFreelancer} due to {freelancer.firstName}'s local time difference.
        </div>
        )}
        <AddToCalendar
          title={`Job Interview with ${freelancer.firstName} ${freelancer.lastName || ''}`.trim()}
          description="From Flexhire.com"
          startTime={moment(contract.interviewDate).toDate()}
          endTime={moment(contract.interviewDate).add(1, 'hours').toDate()}
          email={contract?.freelancerContactEmail}
        />
      </Fragment>
      )}
      {!interviewAccepted && contract.interviewSchedulingMethod !== 'schedule_via_calendly' && (
      <Fragment>
        <div style={{ paddingBottom: 24, maxWidth: 400 }}>
          The proposed interview times are {[interviewTime1, interviewTime2, interviewTime3].filter(v => Boolean(v)).join(', ')}
          {' '}
          {interviewTimeSame ? `in yours and ${freelancer.firstName}'s local time.` : 'in your local time.'}
        </div>
        {!interviewTimeSame && (
        <div style={{ paddingBottom: 24, maxWidth: 400 }}>
          For {freelancer.firstName}, the proposed interview times are
          {' '}
          {[interviewTime1Freelancer, interviewTime2Freelancer, interviewTime3Freelancer].filter(v => Boolean(v)).join(', ')}
          {' '}
          due to {freelancer.firstName}'s local time difference.
        </div>
        )}
      </Fragment>
      )}
      {!interviewAccepted && contract.interviewSchedulingMethod === 'schedule_via_calendly' && (
        <div style={{ paddingBottom: 24, maxWidth: 400 }}>
          {freelancer.firstName} has received your Calendly link and will schedule the interview through Calendly.
          Once scheduled, the interview time will appear here.
        </div>
      )}
    </MoreButtonCard>
  )
}

export default FreelancerInterviewTimes
