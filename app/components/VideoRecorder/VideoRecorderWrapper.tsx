import React from 'react'
import ReactDOM from 'react-dom'
import { createAction } from 'redux-actions'
import { ConnectedProps, connect } from 'react-redux'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import VideoRecorder, { IVideoRecorderComponentProps } from './VideoRecorder'

const componentInstances: VideoRecorderWrapper[] = []

export interface IVideoRecorderWrapperState {
  open: boolean
  portalContainerReady: boolean
}

const PORTAL_CONTAINER_ID = 'video-recorder-portal'

class VideoRecorderWrapper extends React.Component<IVideoRecorderComponentProps, IVideoRecorderWrapperState> {
  state: IVideoRecorderWrapperState = {
    open: true,
    portalContainerReady: false,
  }

  requestClose() {
    this.setState({
      open: false,
    })
  }

  requestOpen() {
    this.setState({
      open: true,
    })
  }

  componentDidMount() {
    // Close all other components first.
    for (const videoRecorder of componentInstances) {
      videoRecorder.requestClose()
    }

    componentInstances.push(this)

    if (!document.getElementById(PORTAL_CONTAINER_ID)) {
      const videoRecorderPortal = document.createElement('div')
      videoRecorderPortal.id = PORTAL_CONTAINER_ID
      document.body.appendChild(videoRecorderPortal)
    }

    this.setState({
      portalContainerReady: true,
    })
  }

  componentWillUnmount() {
    componentInstances.splice(componentInstances.indexOf(this), 1)

    if (componentInstances.length > 0) {
      componentInstances[componentInstances.length - 1].requestOpen()
    }
  }

  render() {
    const { open, portalContainerReady } = this.state

    if (!open || !portalContainerReady) {
      return false
    }

    return ReactDOM.createPortal(<VideoRecorder {...this.props} />, document.getElementById(PORTAL_CONTAINER_ID))
  }
}

const mapDispatchToProps = dispatch => ({
  showSnackbarMessage: message => dispatch(createAction(TOGGLE_SNACKBAR)({ message })),
})

const connector = connect(null, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector>

export default connector(VideoRecorderWrapper)
