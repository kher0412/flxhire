import { PureComponent } from 'react'
import { Avatar } from '@material-ui/core'
import { Fab } from 'components/themed'
import { circleAvatarOptions, pickAndStore } from 'services/filestack'
import { FormValue } from 'types'
import { Create } from '@material-ui/icons'
import styles from './AvatarField.module.css'

export default class AvatarField extends PureComponent<{ editable: boolean} & FormValue<string>> {
  render() {
    const { editable, input: { value: avatarUrl }, meta } = this.props
    const hasError = meta.touched && meta.error

    return (
      <div className={styles.container}>
        <Avatar
          // eslint-disable-next-line global-require
          src={avatarUrl || require('assets/images/no_avatar.png')}
          className={styles.avatar}
        />

        {editable && (
          <Fab
            color={hasError ? 'secondary' : 'primary'}
            className={styles.fab}
            onClick={this.handleAvatarClick}
            data-cy="edit-avatar"
          >
            <Create />
          </Fab>
        )}

        {hasError && (
          <div className={styles.error}>
            {meta.error}
          </div>
        )}
      </div>
    )
  }

  handleAvatarClick = () => {
    const { input: { onChange } } = this.props

    pickAndStore(circleAvatarOptions(), file => onChange(file.url))
  }
}
