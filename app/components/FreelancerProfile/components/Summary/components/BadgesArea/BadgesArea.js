import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { Field, Fields } from 'redux-form'
import { MoreButtonCard } from 'components'
import { Badge } from '@material-ui/core'
import { Style, VerifiedUser } from '@material-ui/icons'
import StatusField from '../../../fields/StatusField'
import AvailabilityAndPositionTypeFields from '../../../fields/AvailabilityAndPositionTypeFields'
import TeamManagementField from '../../../fields/TeamManagementField'
import USWorkField from '../../../fields/USWorkField'
import styles from './BadgesArea.module.css'

export default class BadgesArea extends React.Component {
  render() {
    const { backgroundCheckCompleted, managed_team_size, status, availability, availability_type, can_work_in_the_us } = this.props

    let count = 0

    if (backgroundCheckCompleted) count++
    if (managed_team_size?.input?.value && managed_team_size?.input?.value !== 'none') count++
    if (status?.input?.value === 'verified') count++
    if (availability?.input?.value) count++
    if (can_work_in_the_us?.input?.value) count++

    const hasErrors = [
      managed_team_size?.meta?.touched && managed_team_size?.meta?.error,
      availability?.meta?.touched && availability?.meta?.error,
      availability_type?.meta?.touched && availability_type?.meta?.error,
    ].some(x => !!x)
    const color = hasErrors ? 'secondary' : 'primary'

    return (
      <div className={styles['badge-area']}>
        <MediaQuery minWidth={501}>
          {this.renderBadgesArea()}
        </MediaQuery>

        <MediaQuery maxWidth={500}>
          <Badge
            style={{ transform: 'translate(-9px, 9px)' }}
            badgeContent={count || ''}
            color={color}
          >
            <div style={{ transform: 'translate(9px, -9px)' }}>
              <MoreButtonCard icon={<Style />}>
                <div style={{ padding: 12 }}>
                  {this.renderBadgesArea()}
                </div>
              </MoreButtonCard>
            </div>
          </Badge>
          {hasErrors && <span className={styles.error}>Missing Info</span>}
        </MediaQuery>
      </div>
    )
  }

  renderBadgesArea() {
    const { editable, backgroundCheckCompleted, timezone } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.status}>
          <Field
            name="status"
            component={StatusField}
            editable={editable}
          />
        </div>

        {backgroundCheckCompleted && (
          <div className={styles.status}>
            <div className={styles.verified} data-cy="verification-badge-verified">
              <VerifiedUser className={styles['status-icon']} /> Background Check
            </div>
          </div>
        )}

        <div className={styles.availability}>
          <div>
            <Fields
              names={['availability', 'availability_type', 'available_at']}
              component={AvailabilityAndPositionTypeFields}
              editable={editable}
              timezone={timezone}
            />
          </div>
        </div>

        <div className={styles.status}>
          <Field
            name="managed_team_size"
            component={TeamManagementField}
            editable={editable}
          />
        </div>

        <div className={styles.status}>
          <Field
            name="can_work_in_the_us"
            component={USWorkField}
            editable={editable}
          />
        </div>
      </div>
    )
  }
}
