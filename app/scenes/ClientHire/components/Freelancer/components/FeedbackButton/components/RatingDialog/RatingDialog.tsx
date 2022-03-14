import React from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Grid,
  Hidden,
} from '@material-ui/core'
import { ResponsiveDialog, UserAvatar } from 'components'
import { Button } from 'components/themed'
import { IContractFeedback } from 'types'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { useCurrentUser } from 'hooks'
import { RatingDialog_Query } from '__generated__/RatingDialog_Query.graphql'
import { ThumbDown, ThumbUp } from '@material-ui/icons'
import RatingForm from './components/RatingForm'
import RatingEntry from './components/RatingEntry'
import styles from './RatingDialog.module.css'

export interface IRatingDialogProps {
  contract: {
    id: string
    rawId: number
    positiveFeedbackCount: number
    negativeFeedbackCount: number
  }
  freelancer: {
    firstName: string
    avatarUrl: string
  }
  open: boolean
  onClose: () => void
}

export interface IRatingDialogState {
  contractFeedbacks: IContractFeedback[]
  contractFeedbacksLoading: boolean
}

const RatingDialog = (props: IRatingDialogProps) => {
  const { open, freelancer, onClose, contract } = props
  const [user] = useCurrentUser()
  const data = useLazyLoadQuery<RatingDialog_Query>(graphql`
    query RatingDialog_Query($id: Int!) {
      contract(rawId: $id) {
        contractFeedbacks {
          id
          user {
            rawId
          }
          ...RatingEntry_Feedback
        } 
      }
    }
  `, {
    id: contract?.rawId,
  }, {
    fetchPolicy: 'store-and-network',
  })
  const contractFeedbacks = data?.contract?.contractFeedbacks || []

  const hasFeedbacks = contractFeedbacks.length > 0
  const hasFeedbackFromSelf = contractFeedbacks.some(feedback => feedback.user?.rawId === user?.id)

  if (!open) return null

  return (
    <ResponsiveDialog open={open} onClose={onClose} fullWidth data-cy="rating-dialog" maxWidth="md">
      <div>
        <Grid container>
          <Grid item xs={12} sm={12} md={2}>
            <Hidden smDown>
              <DialogTitle>
                <div style={{ paddingLeft: 6, paddingTop: 12 }}>
                  <UserAvatar
                    name={freelancer?.firstName}
                    url={freelancer?.avatarUrl}
                    style={{ width: 120, height: 120 }}
                  />
                </div>
              </DialogTitle>
            </Hidden>
          </Grid>

          <Grid item xs={12} sm={12} md={10}>
            <DialogTitle data-cy="dialog-title">
              <div className={styles.header}>
                <div className={styles.title}>
                  Your Team's Feedback on {freelancer?.firstName}
                </div>

                <div className={styles.sum}>
                  <div className={styles.up}>
                    <ThumbUp /> {contract?.positiveFeedbackCount || 0}
                  </div>

                  <div className={styles.down}>
                    <ThumbDown /> {contract?.negativeFeedbackCount || 0}
                  </div>
                </div>
              </div>
            </DialogTitle>

            <DialogContent>
              <RatingForm
                hasExistingFeedback={hasFeedbackFromSelf}
                freelancer={freelancer}
                contract={contract}
              />

              {hasFeedbacks && (
              <React.Fragment>
                <Divider style={{ margin: '24px 0' }} />
                {contractFeedbacks.map(feedback => (
                  <RatingEntry key={feedback.id} feedback={feedback} />
                ))}
              </React.Fragment>
              )}
            </DialogContent>
          </Grid>
        </Grid>
      </div>

      <DialogActions>
        <Button onClick={onClose} data-cy="close">Close</Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default RatingDialog
