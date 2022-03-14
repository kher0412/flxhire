# VideoRecorder

Full-screen video recorder component with teleprompter and direct file opening support.

## How to use

When rendered, the VideoRecorder creates a full-screen, fixed positioned overlay on which the video feed is displayed.

Once a new video is recorded, or a video file is opened from the user's computer, the VideoRecorder provides the result as a File which can then be uploaded for permanent storage, or handled in some similar fashion (e.g. storing in local IndexedDB). The VideoRecorder logic is entirely self-contained and does not rely on any external services by itself.

### Acquiring the recording

The VideoRecorder component has a non-required `onVideoAvailable` prop, accepting a callback function which is invoked with a `File` object representing the recorded (or manually opened) video. No distinction is made between recording in-browser or opening a file from the user's computer.

It is up to the consumer code to handle the acquired video file, e.g. to upload it:

```js
render() {
  const { uploadVideo } = this.props

  return (
    <VideoRecorder
      onVideoAvailable={videoFile => uploadVideo(videoFile)}
      ...
    />
  )

  ...
}
```

### Specifying a default video

Often the VideoRecorder is used in a scenario where a video has already been recorded previously, and the VideoRecorder is being utilized to _replace_ the previous recording. For this, the VideoRecorder accepts a non-required `defaultVideo` prop, which can be used to specify the URL to the already existing video, e.g.:

```js
render() {
  const { video } = this.props

  return (
    <VideoRecorder
      defaultVideoURL={video && video.url}
      ...
    />
  )

  ...
}
```

### Configuring the animation

The VideoRecorder has an expanding open animation which looks best when it "opens from" the button which was clicked to open it; this can be achieved by specifying the `transformOrigin` style, for example:

```js
render() {
  const { isOpen, originX, originY } = this.state

  if (isOpen) {
    return (
      <VideoRecorder
        style={{ transformOrigin: `${originX} ${originY}` }}
        ...
      />
    )
  }

  ...
}

handleVideoRecorderOpen = (e) => {
  this.setState({
    originX: e.clientX,
    originY: e.clientY,
    isOpen: true,
  })
}
```
