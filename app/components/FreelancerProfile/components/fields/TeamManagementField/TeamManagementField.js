import React from 'react'
import { MenuItem, ListSubheader } from '@material-ui/core'
import BlockIcon from '@material-ui/icons/Block'
import CreateIcon from '@material-ui/icons/Create'
import { MoreButtonMenu } from 'components'
import { SupervisedUserCircle } from '@material-ui/icons'
import styles from './TeamManagementField.module.css'

const MANAGED_TEAM_SIZE = {
  none: 'None',
  '1-4': '<5',
  '5-10': '5-10',
  '10-x': '10+',
}

export default class TeamManagementField extends React.Component {
  render() {
    const { editable, input } = this.props
    const managedTeamSize = input.value
    const userManagedTeam = (managedTeamSize && managedTeamSize !== 'none')

    if (!editable && !userManagedTeam) {
      return false
    }

    return (
      <div className={userManagedTeam ? styles.enabled : styles.disabled} data-cy="managed-team-size">
        {userManagedTeam && (
          <React.Fragment>
            <SupervisedUserCircle className={styles.icon} /> Management ({MANAGED_TEAM_SIZE[managedTeamSize]})
          </React.Fragment>
        )}

        {!userManagedTeam && (
          <React.Fragment>
            <BlockIcon className={styles.icon} /> Management
          </React.Fragment>
        )}

        {editable && (
        <React.Fragment>
          <MoreButtonMenu className={styles.editButton} icon={<CreateIcon />} data-cy="profile-management">
            <ListSubheader>
              Largest team you managed?
            </ListSubheader>

            {Object.keys(MANAGED_TEAM_SIZE).map(value => (
              <MenuItem
                value={value}
                key={value}
                data-cy={`managed_team_size-option-${value}`}
                onClick={() => input.onChange(value)}
              >
                {MANAGED_TEAM_SIZE[value]}
              </MenuItem>
            ))}
          </MoreButtonMenu>
          {this.renderErrors()}
        </React.Fragment>
        )}
      </div>
    )
  }

  renderErrors() {
    const { meta } = this.props
    if (meta?.error && meta?.touched) {
      return <span className={styles.error}>{meta.error}</span>
    }
    return null
  }
}
