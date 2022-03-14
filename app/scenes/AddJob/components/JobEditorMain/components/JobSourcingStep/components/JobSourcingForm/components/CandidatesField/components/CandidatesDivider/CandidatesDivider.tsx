import React from 'react'
import { DialogContentText } from '@material-ui/core'
import { MediaQuery, MoreButtonDialog } from 'components'
import { Info } from '@material-ui/icons'
import styles from './CandidatesDivider.module.css'

export interface ICandidatesDividerProps {

}

function CandidatesDivider(props: ICandidatesDividerProps) {
  const { } = props

  return (
    <div className={styles.divider} data-cy="sourcing-candidates-divider">
      <div className={styles.dividerLine} />

      <div className={styles.dividerInner}>
        <div className={styles.dividerInner2}>
          <MediaQuery minWidth={801}>
            Members who don't exactly match all your requirements
          </MediaQuery>

          <MediaQuery maxWidth={800}>
            Similar members (partial match)
          </MediaQuery>

          <MoreButtonDialog dialogTitle="Additional members" icon={<Info />} className={styles.dividerButton}>
            <DialogContentText>
              The following existing Flexhire members' profiles are very similar to your job's requirements,
              but don't exactly match all filters, and are thus not preselected by default.
              <br /><br />
              Disable "Let Flexhire automatically notify the best matches" to manually select which potential members you want to notify,
              or alternatively, try reducing the number of required skills, widen your location targeting,
              or increase your offered rate to see more exact matches.
            </DialogContentText>
          </MoreButtonDialog>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CandidatesDivider)
