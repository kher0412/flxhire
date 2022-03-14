import React, { useState } from 'react'
import { browserHistory } from 'services/router'
import { JobStatus } from 'types'
import {
  Divider,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  ListItem,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
} from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import { Assignment, Delete, OpenInNew, People } from '@material-ui/icons'
import { ContainerProps } from './ExistingJobButtonsContainer'

interface IExistingJobButtonsProps extends ContainerProps {
  jobId: string | number
  firmSlug: string
  status: JobStatus
}

export default function ExistingJobButtons({ jobId, firmSlug, deleteJob, status } : IExistingJobButtonsProps) {
  const [confirmingAction, setConfirmingAction] = useState(null)

  if (!jobId || status === 'closed') return null

  // Note: we return an array because this is passed as children to MoreButtonMenu,
  // and thus is passed as children to MUI's Menu, which does not accept fragments.
  // They suggest arrays, so here we are
  return [
    <ListItem
      button
      onClick={() => browserHistory.push('/client/hire', `/client/hire?company=${firmSlug}&job=${jobId}&tab=potential`)}
      data-cy="view-candidates"
    >
      <ListItemIcon style={{ minWidth: 40 }}>
        <People />
      </ListItemIcon>

      <ListItemText primary="View job candidates" />

      <ListItemSecondaryAction style={{ right: 0 }}>
        <IconButton>
          <OpenInNew />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>,

    <ListItem
      button
      onClick={() => browserHistory.push(firmSlug ? '/[...slugs]' : '/job/[id]', `/${firmSlug || 'job'}/${jobId}`)}
      data-cy="view-job"
    >
      <ListItemIcon style={{ minWidth: 40 }}>
        <Assignment />
      </ListItemIcon>

      <ListItemText primary="View job posting" />

      <ListItemSecondaryAction style={{ right: 0 }}>
        <IconButton onClick={() => window.open(`/${firmSlug || 'job'}/${jobId}`)}>
          <OpenInNew />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>,

    <Divider style={{ margin: '6px 0' }} />,

    <ListItem
      button
      onClick={() => setConfirmingAction('close')}
      data-cy="delete-job"
    >
      <ListItemIcon style={{ minWidth: 40 }}>
        <Delete />
      </ListItemIcon>

      <ListItemText primary="Close job" />

      {confirmingAction === 'close' && (
      <ResponsiveDialog open>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Closing the job will prevent potential new applicants from submitting their application.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmingAction(null)}>Cancel</Button>
          <Button onClick={deleteJob} color="primary" data-cy="confirm-dialog-confirm">Confirm</Button>
        </DialogActions>
      </ResponsiveDialog>
      )}
    </ListItem>,
  ]
}
