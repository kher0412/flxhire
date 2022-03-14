import React from 'react'
// import { Slider } from '@material-ui/core'
import { MoreButtonCard } from 'components'
import { VolumeUp } from '@material-ui/icons'

export default class VolumeButton extends React.Component {
  render() {
    return (
      <MoreButtonCard icon={<VolumeUp style={{ width: 32, height: 32, color: '#fff' }} />}>
        <div>
          {/* <Slider min={0} max={100} /> */}
          TODO: volume control
        </div>
      </MoreButtonCard>
    )
  }
}
