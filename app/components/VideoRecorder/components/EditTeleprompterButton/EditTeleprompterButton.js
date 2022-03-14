import React from 'react'
import PropTypes from 'prop-types'
import { MoreButtonCard, TextArea } from 'components'
import { Subtitles } from '@material-ui/icons'

export default class EditTeleprompterButton extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    onChange: PropTypes.func,
    isRecordingStarted: PropTypes.bool,
  }

  render() {
    const { text, isRecordingStarted, disabled, maxDuration, style } = this.props

    return (
      <MoreButtonCard
        responsive
        tooltip="Configure teleprompter"
        icon={<Subtitles />}
        disabled={isRecordingStarted || disabled}
        mobileLabel="Teleprompter"
        style={style}
      >
        <div>
          Configure teleprompter
        </div>

        <div onKeyDown={this.stopPropagation} onKeyUp={this.stopPropagation} onKeyPress={this.stopPropagation} role="none">
          <TextArea input={{ value: text, onChange: this.handleChange }} />
        </div>

        <div style={{ maxWidth: 500 }}>
          The text will appear and scroll on screen during recording.
          You can record an unlimited number of videos, but the maximum recording duration of a single take is {maxDuration} seconds.
        </div>
      </MoreButtonCard>
    )
  }

  handleChange = (e) => {
    const { onChange } = this.props

    // Prevent SPACE button from starting recording.
    e.stopPropagation()

    if (onChange) {
      onChange(e)
    }
  }

  stopPropagation = (e) => {
    e.stopPropagation()
  }
}
