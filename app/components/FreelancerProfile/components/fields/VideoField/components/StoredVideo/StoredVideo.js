import React from 'react'
import { Video } from 'components'
import { ArrowDropDownCircle, InsertDriveFile, Loop } from '@material-ui/icons'
import styles from './StoredVideo.module.css'

export default class StoredVideo extends React.PureComponent {
  state = {
    isDropMode: false,
    isDropReady: false,
  }

  componentDidMount() {
    window.addEventListener('dragover', this.handleWindowDragOver)
    window.addEventListener('dragleave', this.handleWindowDragLeave)
  }

  componentWillUnmount() {
    window.removeEventListener('dragover', this.handleWindowDragOver)
    window.removeEventListener('dragleave', this.handleWindowDragLeave)
  }

  render() {
    const { editable, video, isUploading } = this.props
    const { isDropMode, isDropReady } = this.state

    return (
      <div
        className={styles.container}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
      >
        {isUploading && (
          <div className={styles['placeholder-wrapper']} data-cy="video-uploading-message">
            <div className={styles.placeholder}>
              <div style={{ transform: 'scaleX(-1)', marginBottom: 12 }}>
                <Loop className={styles.spinner} />
              </div>

              Uploading video, this may take several minutes...
            </div>
          </div>
        )}

        {video && !isUploading && !isDropMode && (
          <div className={styles['video-wrapper']} style={editable ? undefined : { marginBottom: 0 }}>
            <div className={styles['video-loader']}>
              <Loop className={styles.spinner} />
            </div>

            <Video
              video={video}
              className={styles.video}
              rounded={false}
              pictureProps={{ width: null }}
              title="Introduction video"
            />
          </div>
        )}

        {(!video || isDropMode) && !isUploading && (
          <div className={styles['placeholder-wrapper']}>
            <div className={styles.placeholder}>
              <div className={styles['placeholder-circle']} style={isDropMode ? { transform: 'scale(7, 6)', opacity: 0 } : undefined} />
              {!isDropMode && (<InsertDriveFile />)}
              {isDropMode && (<ArrowDropDownCircle className={styles.arrow} />)}
            </div>

            <div
              className={styles['placeholder-area']}
              style={{
                opacity: isDropMode ? 1 : 0,
                backgroundColor: isDropReady ? 'rgba(0, 0, 0, 0.067)' : undefined,
              }}
            />

            <div className={styles['placeholder-drop-text']} style={isDropMode ? { opacity: 1 } : undefined}>
              {video && 'Drop new video here'}
              {!video && 'Drop video here'}
            </div>
          </div>
        )}
      </div>
    )
  }

  handleDragOver = (e) => {
    const { isUploading } = this.props
    const { isDropReady } = this.state

    e.preventDefault()

    if (isUploading) return

    if (!isDropReady) {
      this.setState({
        isDropReady: true,
      })
    }
  }

  handleDrop = (e) => {
    const { isUploading } = this.props
    const { onFileDrop } = this.props

    e.preventDefault()
    e.stopPropagation()

    if (isUploading) return

    this.setState({
      isDropMode: false,
      isDropReady: false,
    })

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileDrop(e.dataTransfer.files[0])
    }
  }

  handleDragLeave = () => {
    const { isUploading } = this.props
    const { isDropReady } = this.state

    if (isUploading) return

    if (isDropReady) {
      this.setState({
        isDropReady: false,
      })
    }
  }

  handleWindowDragOver = () => {
    const { isDropMode } = this.state

    window.clearTimeout(this.disableDropModeTimeoutHandle)

    if (!isDropMode) {
      this.setState({
        isDropMode: true,
      })
    }
  }

  handleWindowDragLeave = () => {
    const { isDropMode } = this.state

    window.clearTimeout(this.disableDropModeTimeoutHandle)

    if (isDropMode) {
      this.disableDropModeTimeoutHandle = window.setTimeout(() => {
        this.setState({
          isDropMode: false,
        })
      }, 200)
    }
  }
}
