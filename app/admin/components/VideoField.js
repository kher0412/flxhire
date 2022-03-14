import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

const VideoField = ({ source, record = {} }) => {
  const video_url = get(record, source)
  return video_url ? <video controls src={video_url} /> : null
}

VideoField.propTypes = {
  addLabel: PropTypes.bool,
  elStyle: PropTypes.object,
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
}


VideoField.defaultProps = {
  addLabel: true,
}

export default VideoField
