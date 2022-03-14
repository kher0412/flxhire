import React, { ComponentProps } from 'react'
import { pickAndStore } from 'services/filestack'
import { Button } from 'components/themed'
import { Picture } from 'components'
import { FormValueInput, FormValueMeta } from 'types'
import { AddAPhoto } from '@material-ui/icons'
import styles from './ScreenshotUpload.module.css'

interface IScreenshotUploadProps extends ComponentProps<typeof Button> {
  input: FormValueInput<string>
  meta: FormValueMeta
  title?: string
}

interface IScreenshotUploadState {
  isPickerOpen: boolean
}

export default class ScreenshotUpload extends React.Component<IScreenshotUploadProps, IScreenshotUploadState> {
  state = {
    isPickerOpen: false,
  }

  render() {
    const { input: { value }, meta, title, ...otherProps } = this.props
    const { isPickerOpen } = this.state

    return (
      <div className={styles.container}>
        {this.renderImage(value)}

        <div className={styles.description}>
          {this.renderTitle(title)}

          <Button
            disabled={isPickerOpen}
            color="primary"
            className={styles.button}
            onClick={this.handleOpenClick}
            {...otherProps}
          >
            <AddAPhoto className={styles['button-icon']} />

            <span className={styles['button-label']}>
              {value ? 'Replace project screenshot' : 'Add project screenshot'}
            </span>
          </Button>

          {this.renderError()}
        </div>
      </div>
    )
  }

  renderImage(value) {
    if (value) {
      return <Picture src={value} alt="Screenshot" className={styles.image} />
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
    const { input: { onChange } } = this.props

    this.setState({
      isPickerOpen: true,
    })

    const options = {
      onClose: () => {
        this.setState({
          isPickerOpen: false,
        })
      },
    }

    pickAndStore(options, file => onChange(file.url))
  }
}
