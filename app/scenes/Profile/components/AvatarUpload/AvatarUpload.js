import React from 'react'
import { Button } from 'components/themed'
import { circleAvatarOptions, pickAndStore } from 'services/filestack'
import { Picture } from 'components'
import styles from './AvatarUpload.module.css'

class AvatarUpload extends React.Component {
  openDialog = () => {
    const { input: { onChange } } = this.props
    pickAndStore(circleAvatarOptions(), file => onChange(file.url))
  }

  render() {
    const { input: { value }, meta: { error, touched } } = this.props

    const buttonColor = touched && error ? 'secondary' : 'primary'
    const defaultAvatar = require('assets/images/no_avatar.png')

    return (
      <div className={styles.container}>
        <Picture className={styles.avatar} src={value || defaultAvatar} alt="Avatar" />
        <div className={styles.description}>
          <div className={styles.title}>A photo helps you add personality to your profile.</div>
          <div className={styles.error}>{touched && error}</div>
          <div className={styles['button-container']}>
            <Button onClick={this.openDialog} color={buttonColor}>
              Select File
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default AvatarUpload
