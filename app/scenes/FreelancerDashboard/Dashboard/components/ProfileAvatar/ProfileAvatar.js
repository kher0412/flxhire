import React from 'react'
import { UserAvatar } from 'components'
import styles from './ProfileAvatar.module.css'
import ProfileCompletion from './components/ProfileCompletion'

export default class ProfileAvatar extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <ProfileCompletion completion={this.getProfileLevelCompletion()} />
        {this.renderAvatar()}
      </div>
    )
  }

  renderAvatar() {
    const { user = {} } = this.props

    return (
      <UserAvatar
        url={user.avatar_url}
        name={user.first_name}
        className={styles.avatar}
      />
    )
  }

  getProfileLevelCompletion() {
    const { user } = this.props

    if (user.featured || user.feature_step_completed) {
      return 1
    }

    if (user.status === 'accepted') {
      return 0.66
    }

    return 0.33
  }
}
