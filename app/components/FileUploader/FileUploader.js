import React from 'react'
import PropTypes from 'prop-types'
import { Grid, FormHelperText, CircularProgress } from '@material-ui/core'
import { Button } from 'components/themed'
import CloudUpload from '@material-ui/icons/CloudUpload'
import { formatAsReadableFileSize } from 'services/formatting'
import { trackError } from 'services/analytics'
import styles from './FileUploader.module.css'

class FileUploader extends React.Component {
  static propTypes = {
    uploadApiCall: PropTypes.func.isRequired,
    guideMessage: PropTypes.string,
    validation: PropTypes.shape({
      maxDurationInSec: PropTypes.number,
      maxSizeInBytes: PropTypes.number,
    }),
    onUploadSuccess: PropTypes.func,
  }

  static defaultProps = {
    guideMessage: '',
  }

  state = {
    isPreviewShown: false,
    isLoading: false,
    isMetadataFetched: false,
    file: null,
    fileObjectUrl: null,
    fileDuration: null,
    errors: [],
  }

  constructor(props) {
    super(props)
    this.inputElement = React.createRef()
  }

  render() {
    return (
      <div>
        {this.renderDropAreaOrSpinner()}
        {this.state.fileObjectUrl && (
          <Grid container direction="column" alignItems="center" style={{ marginTop: 20 }}>
            {this.state.errors.map(error => (
              <FormHelperText error key={error}>
                {error}
              </FormHelperText>
            ))}
            <Button variant="contained" onClick={this.handleUploadClick} style={{ marginTop: 20 }}>
              Upload selected file
            </Button>
          </Grid>
        )}
      </div>
    )
  }

  renderDropAreaOrSpinner = () => {
    if (this.state.isLoading) {
      return (
        <div className={styles['loading-area']}>
          <CircularProgress />
        </div>
      )
    }
    return (
      <label
        id="name-drop-area"
        className={styles['file-upload-drop-area']}
        onDragEnter={this.preventDefault}
        onDragOver={this.preventDefault}
        onDrop={this.handleAreaDrop}
      >
        <input type="file" id="name" ref={this.inputElement} onChange={this.handleInputChange} />
        {this.renderPreviewOrGuide()}
      </label>
    )
  }

  renderPreviewOrGuide = () => {
    if (this.state.isPreviewShown) {
      return (
        <div className={styles.previewer}>
          <div>
            {this.state.fileObjectUrl && (
              <video
                controls
                src={this.state.fileObjectUrl}
                className={styles['video-preview']}
                onLoadedMetadata={e => this.setState({ isMetadataFetched: true, fileDuration: e.currentTarget.duration })}
              />
            )}
          </div>
          <p className={styles.reset} onClick={this.handleResetClick}>
            Remove file
          </p>
        </div>
      )
    }
    return (
      <div className={styles.guide}>
        <CloudUpload className={styles['cloud-upload']} />
        <p>
            Drag a file or click
        </p>
        <div>{this.props.guideMessage}</div>
      </div>
    )
  }

  handleUploadClick = async () => {
    const { onUploadSuccess, validation: { maxDurationInSec, maxSizeInBytes } } = this.props

    const errors = []
    if (this.state.isMetadataFetched) {
      if (this.state.fileDuration > maxDurationInSec) {
        errors.push(`Duration can't be more than ${maxDurationInSec} seconds.`)
      }
      if (this.state.file.size > maxSizeInBytes) {
        errors.push(`File size can't be more than ${formatAsReadableFileSize(maxSizeInBytes)}.`)
      }
    } else {
      errors.push("Metadata hasn't been processed yet or this file type is not supported. Wait a few seconds then try again.")
    }
    if (errors.length > 0) {
      this.setState({ errors })
    } else {
      this.setState({ isLoading: true })
      const formData = new FormData()
      formData.append('file', this.state.file)
      try {
        const result = await this.props.uploadApiCall(formData)
        this.props.showSnackbarMessage('Your file was successfully uploaded.')
        this.reset()
        if (onUploadSuccess) {
          onUploadSuccess(result)
        }
      } catch (error) {
        this.props.showSnackbarMessage('Video upload failed.')
        console.log(error)
        trackError(error)
        this.reset()
      }
    }
  }

  handleInputChange = (event) => {
    this.reset()
    if (event.target.files && event.target.files[0]) {
      this.setState({
        file: event.target.files[0],
        fileObjectUrl: URL.createObjectURL(event.target.files[0]),
        isPreviewShown: true,
      })
    }
  }

  handleResetClick = (event) => {
    event.preventDefault()
    this.reset()
  }

  handleAreaDrop = (event) => {
    event.preventDefault()
    this.inputElement.current.files = event.dataTransfer.files
    this.inputElement.current.dispatchEvent(new Event('change'))
  }

  reset = () => {
    if (this.state.file) {
      URL.revokeObjectURL(this.state.file)
    }
    this.setState({
      isPreviewShown: false,
      isLoading: false,
      isMetadataFetched: false,
      file: null,
      fileObjectUrl: null,
      fileDuration: null,
      errors: [],
    })
  }

  preventDefault = (event) => {
    event.preventDefault()
  }
}

export default FileUploader
