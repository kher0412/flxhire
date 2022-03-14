import { useState, useCallback } from 'react'
import {
  DialogContentText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
} from '@material-ui/core'
import { Link } from 'components'
import { browserHistory } from 'services/router'
import { IFreelancer } from 'types'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { useDispatch } from 'hooks'
import { createAction } from 'redux-actions'
import { SEND_NOTIFICATION } from 'scenes/ClientHire/HireDucks'
import { NotifyAboutJob_JobsQuery } from '__generated__/NotifyAboutJob_JobsQuery.graphql'

interface INotifyAboutJobProps {
  open: boolean
  freelancer: IFreelancer
  onClose: () => void
  afterSend?: () => void
}

const NotifyAboutJob = (props: INotifyAboutJobProps) => {
  const { open, onClose, freelancer, afterSend } = props
  const [jobId, setJobId] = useState(0)

  const data = useLazyLoadQuery<NotifyAboutJob_JobsQuery>(graphql`
    query NotifyAboutJob_JobsQuery {
      currentUser {
        firm {
          jobs(first: 20, filters: { status: opened }) {
            edges {
              node {
                rawId
                title
              }
            }
          }
        }
      }
    }
  `, {}, {
    fetchPolicy: 'store-and-network',
  })
  const jobs = data?.currentUser?.firm?.jobs?.edges?.map(e => e.node) || []

  const dispatch = useDispatch()
  const notify = useCallback(() => {
    if (jobId > 0) {
      dispatch(createAction(SEND_NOTIFICATION)({ jobId, freelancerId: freelancer.id || freelancer.profile?.slug }))
    } else {
      browserHistory.push('/client/job/add_job/job')
    }
    onClose()
    if (afterSend) afterSend()
  }, [jobId, freelancer?.id, freelancer?.profile?.slug, afterSend, onClose])

  return (
    <Dialog open={open} onClose={onClose} data-cy="notify-freelancer-dialog">
      <DialogTitle>Notify {freelancer?.first_name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Choose a Job. {freelancer?.first_name} will be notified about it and invited to send a job application.
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        {jobs.length > 0 && (
        <Select value={jobId} onChange={e => setJobId(e.target.value as number)} fullWidth data-cy="select-job">
          {jobs.length === 0 && (
          <MenuItem value={0}>
            ...
          </MenuItem>
          )}
          {jobs.map(job => (
            <MenuItem value={job.rawId} key={job.rawId} data-cy={`job-${job.rawId}`}>
              {job.title}
            </MenuItem>
          ))}
        </Select>
        )}
        <Button
          fullWidth
          variant="outlined"
          component={Link}
          href="/client/job/add_job/job"
          style={{ marginTop: 12 }}
        >
          Create New Job
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} data-cy="close">Close</Button>
        <Button variant="contained" color="primary" onClick={notify} disabled={!jobId} data-cy="notify">Notify</Button>
      </DialogActions>
    </Dialog>
  )
}
export default NotifyAboutJob
