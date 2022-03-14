import React, { ComponentProps } from 'react'
import { circleAvatarOptions, pickAndStore } from 'services/filestack'
import { Avatar } from '@material-ui/core'
import { FormValueMeta, FormValueInput } from 'types'
import { Picture } from 'components'
import { Button } from 'components/themed'
import styles from './FileUpload.module.css'

interface IFileUploadProps extends ComponentProps<typeof Button> {
  meta?: FormValueMeta
  input: FormValueInput<string>
  title?: string
  label?: string
  avatar?: boolean
  color?: 'default' | 'secondary' | 'primary'
}

interface IFileUploadState {
  isPickerOpen: boolean
}

class FileUpload extends React.PureComponent<IFileUploadProps, IFileUploadState> {
  state = {
    isPickerOpen: false,
  }

  render() {
    const { input: { value }, title, label, ...otherProps } = this.props
    const { isPickerOpen } = this.state

    return (
      <div className={styles.container}>
        {this.renderAvatar(value)}

        <div className={styles.description}>
          {this.renderTitle(title)}

          <Button
            disabled={isPickerOpen}
            color="primary"
            className={styles.button}
            onClick={this.handleOpenClick}
            {...otherProps}
          >
            {label || 'SELECT FILE'}
          </Button>

          {this.renderError()}
        </div>
      </div>
    )
  }

  renderAvatar(value) {
    if (value) {
      return <Avatar className={styles.avatar}><Picture src={value} style={{ width: '100%' }} /></Avatar>
    }

    return null
  }

  renderTitle(title) {
    if (title) {
      return (
        <div className={styles.title}>
          {title}
        </div>
      )
    }

    return null
  }

  renderError() {
    const { meta: { touched, error } = {} } = this.props

    if (touched && error) {
      return (
        <div className={styles.error}>
          {error}
        </div>
      )
    }

    return null
  }

  handleOpenClick = () => {
    const { input: { onChange }, avatar } = this.props

    this.setState({
      isPickerOpen: true,
    })

    const options = {
      onClose: () => {
        this.setState({
          isPickerOpen: false,
        })
      },
      ...(avatar ? circleAvatarOptions() : {}),
    }

    pickAndStore(options, file => onChange(file.url))
  }
}

export default FileUpload
