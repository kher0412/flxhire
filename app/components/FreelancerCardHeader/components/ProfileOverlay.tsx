import { memo } from 'react'
import { DialogActions } from '@material-ui/core'
import { FreelancerProfile, ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import { IFreelancer } from 'types'

const ProfileOverlay = memo(({ open, onClose, freelancer }: { open: boolean, onClose: () => void, freelancer: IFreelancer }) => (
  <ResponsiveDialog open={open} onClose={onClose} maxWidth="md" scroll="body">
    <div>
      <FreelancerProfile editable={false} freelancer={freelancer} liteMode={!freelancer.profile?.open_to_opportunities} />
    </div>

    <DialogActions>
      <Button onClick={onClose}>
        Close
      </Button>
    </DialogActions>
  </ResponsiveDialog>
))

export default ProfileOverlay
