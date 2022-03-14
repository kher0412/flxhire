import React from 'react'
import { MenuItem } from '@material-ui/core'
import BlockIcon from '@material-ui/icons/Block'
import CreateIcon from '@material-ui/icons/Create'
import { MoreButtonMenu } from 'components'
import { Beenhere } from '@material-ui/icons'
import styles from './USWorkField.module.css'

export default class USWorkField extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        {this.renderAvailability()}
      </React.Fragment>
    )
  }

  renderAvailability() {
    const { editable, input } = this.props
    const canWorkInUS = input.value

    return (
      <div className={canWorkInUS ? styles.enabled : styles.disabled} data-cy="working">
        {canWorkInUS && (
          <React.Fragment>
            <Beenhere className={styles.icon} /> US-eligible
          </React.Fragment>
        )}

        {!canWorkInUS && editable && (
          <React.Fragment>
            <BlockIcon className={styles.icon} /> US-eligible
          </React.Fragment>
        )}

        {editable && (
          <MoreButtonMenu className={styles.editButton} icon={<CreateIcon />} data-cy="profile-us-work">
            <MenuItem onClick={() => input.onChange(true)} data-cy="profile-us-work-yes">
              I can work in the US
            </MenuItem>

            <MenuItem onClick={() => input.onChange(false)} data-cy="profile-us-work-no">
              I cannot work in the US
            </MenuItem>
          </MoreButtonMenu>
        )}
      </div>
    )
  }
}
