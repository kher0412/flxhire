import React from 'react'
import ScriptedTour from 'components/ScriptedTour'
import { tourSteps } from './tourSteps'

export interface ITourGuideProps {
  open: boolean
  onClose: () => void
}

export interface ITourGuideState {
}

export default class TourGuide extends React.Component<ITourGuideProps, ITourGuideState> {
  render() {
    return (
      <ScriptedTour
        steps={tourSteps}
        open={this.props.open}
        onClose={this.props.onClose}
      />
    )
  }
}
