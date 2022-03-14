import { graphql, useFragment } from 'react-relay'
import { IContractStatus } from 'types'
import moment from 'moment'
import { AddToCalendar } from 'components'
import { isPastInterview } from 'services/contract'
import { AddToCalendarButton_Freelancer$key } from '__generated__/AddToCalendarButton_Freelancer.graphql'
import { AddToCalendarButton_Contract$key } from '__generated__/AddToCalendarButton_Contract.graphql'

interface IAddToCalendarButtonProps {
  freelancer: AddToCalendarButton_Freelancer$key
  contract: AddToCalendarButton_Contract$key
}

const AddToCalendarButton = (props: IAddToCalendarButtonProps) => {
  const { contract: contractProp, freelancer: freelancerProp } = props
  const freelancer = useFragment(graphql`
    fragment AddToCalendarButton_Freelancer on User {
      firstName
      lastName
    }
    `, freelancerProp)
  const contract = useFragment(graphql`
    fragment AddToCalendarButton_Contract on Contract {
      interviewDate
      status
      freelancerContactEmail
      freelancer {
        firstName
        lastName
      }
    }
  `, contractProp)
  const show = contract?.status === 'interview_accepted' && contract?.interviewDate
  const interviewPast = isPastInterview({ status: contract?.status as IContractStatus, interview_date: contract?.interviewDate as string })

  if (!show || interviewPast) return null

  return (
    <AddToCalendar
      title={`Job Interview with ${freelancer.firstName} ${freelancer.lastName || ''}`.trim()}
      description="From Flexhire.com"
      startTime={moment(contract.interviewDate).toDate()}
      endTime={moment(contract.interviewDate).add(1, 'hours').toDate()}
      email={contract?.freelancerContactEmail}
    />
  )
}

export default AddToCalendarButton
