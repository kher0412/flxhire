import React, { useCallback, useState } from 'react'
import { CardHeader, CardContent, CardActions, Divider, Typography } from '@material-ui/core'
import { Link } from 'components'
import { Button } from 'components/themed'
import { IContractForFreelancer, ICurrentUser } from 'types'
import { CSSProperties } from '@material-ui/styles'
import { hasCodeTestRequests, hasQuestionsRequests } from 'services/contract'
import { browserHistory } from 'services/router'
import { Cancel, CheckCircle, Send } from '@material-ui/icons'
import HiringManagerChatButton from './HiringManagerChatButton'
import RejectRequestsDialog from './RejectRequestsDialog'

const linkStyle: CSSProperties = {
  color: '#017EFF',
  fontWeight: 'bold',
  cursor: 'pointer',
}

interface IAcceptRequestsFormProps {
  contract: IContractForFreelancer
  user: ICurrentUser
  goToQuestionsStep: () => void
  goToCodeTestStep: () => void
  accept: () => void
  refresh: () => void
  accepted: boolean
  rejected: boolean
  mobile?: boolean
}

const AcceptRequestsForm = ({ contract, user, goToQuestionsStep, goToCodeTestStep, accepted, rejected, accept, refresh, mobile }: IAcceptRequestsFormProps) => {
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const onReject = () => setRejectDialogOpen(true)
  const goToJob = useCallback(
    () => browserHistory.push('/[...slugs]', `/${contract.firm_slug}/${contract.job_slug}`),
    [contract.job_slug, contract.firm_slug],
  )
  const name = user.first_name
  const companyName = contract.company_name
  const jobTitle = contract.job_title
  const hiringManager = contract.client
  const hasCodeTest = hasCodeTestRequests(contract)
  const hasQuestions = hasQuestionsRequests(contract)
  const hasBoth = hasCodeTest && hasQuestions
  return (
    <React.Fragment>
      {!mobile && <CardHeader title={<Typography variant="h5">Pre-Interview Request</Typography>} />}
      <CardContent>
        <Typography gutterBottom variant="body1" color="textSecondary" component="p">
          Congratulations {name}! {companyName} liked your profile and wants to move forward with
          your application to the
          {' '}<Link onClick={goToJob} style={linkStyle}>{jobTitle}</Link>{' '}
          position. Before scheduling an in-person interview, they
          would like you to
          {hasQuestions ? (
            <React.Fragment>
              {' '}record answers to a few <Link onClick={goToQuestionsStep} style={linkStyle}>questions</Link>{' '}
            </React.Fragment>
          ) : ' '}
          {hasBoth ? 'and' : ''}
          {hasCodeTest ? (
            <React.Fragment>{' '}take a brief <Link onClick={goToCodeTestStep} style={linkStyle}>code test</Link>{' '}</React.Fragment>
          ) : ' '}
          through the Flexhire platform.
        </Typography>
        <Typography gutterBottom variant="body1" color="textSecondary" component="p">
          To notify {companyName} of your intention to answer their request, please hit "accept".
          If you'd prefer not to, please hit "no thanks" and specify a reason. {companyName} may
          still want to schedule an interview.
        </Typography>
        <Typography gutterBottom variant="body1" color="textSecondary" component="p">
          If you have any questions, you can message {hiringManager.first_name} from {hiringManager.company_name}.
        </Typography>
      </CardContent>
      {!mobile && <Divider />}
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <HiringManagerChatButton hiringManager={contract.hiring_manager || contract.client} mobile={mobile} />
        {!accepted && (
          <Button color="secondary" onClick={onReject} data-cy="reject">
            <Cancel />
            No Thanks
          </Button>
        )}
        <Button color="primary" disabled={accepted} onClick={accept} data-cy="accept">
          {accepted ? <CheckCircle /> : <Send />}
          {accepted ? 'Accepted' : 'Accept'}
        </Button>
      </CardActions>
      {rejectDialogOpen && !accepted && (
        <RejectRequestsDialog
          open
          rejected={rejected}
          contract={contract}
          refresh={refresh}
          onClose={() => setRejectDialogOpen(false)}
        />
      )}
    </React.Fragment>
  )
}

export default AcceptRequestsForm
