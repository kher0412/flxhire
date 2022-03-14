import { CardActions } from '@material-ui/core'
import { Button } from 'components/themed'
import { IChatMessage, ICurrentUser } from 'types'
import { browserHistory } from 'services/router'
import { trackError } from 'services/analytics'
import { isClient, isMember } from 'services/user'
import { OpenInNew } from '@material-ui/icons'

const getChatActionName = (message: IChatMessage) => {
  if (message.contract_status === 'interview_rejected') return 'Reschedule'
  return 'Review'
}

const getHirePipelineLink = (message: IChatMessage) => `/client/hire?tab=applicants&company=${message.firm_slug}&job=${message.job_slug}&focus=${message.contract_freelancer_slug}`

const focusContract = (message: IChatMessage) => {
  browserHistory.push(getHirePipelineLink(message))
}

interface IChatMessageActionsProps {
  message: IChatMessage
  user: ICurrentUser
  onAction?: () => void
}

export default function ChatMessageActions({ message, user, onAction }: IChatMessageActionsProps) {
  if (!message.contract_id) return null

  const onClick = () => {
    try {
      if (isClient(user)) {
        focusContract(message)
      } else if (isMember(user)) {
        if (message.contract_status === 'job_application_sent' && ['started', 'pending'].indexOf(message.contract_requests_status) >= 0) {
          browserHistory.push('/pre_interview_questions/[id]', `/pre_interview_questions/${message.contract_id}`)
        } else {
          browserHistory.push('/freelancer/dashboard')
        }
      }
      if (typeof onAction === 'function') onAction()
    } catch (error) {
      trackError(error)
    }
  }

  return (
    <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={onClick} color="primary">
        <OpenInNew />
        {getChatActionName(message)}
      </Button>
    </CardActions>
  )
}
