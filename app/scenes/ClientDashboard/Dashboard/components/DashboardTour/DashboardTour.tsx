import React from 'react'
import TourGuide from './components/TourGuide'
import { DashboardTourContainerProps } from './DashboardTourContainer'

export interface IDashboardTourProps {
}

export interface IDashboardTourState {
}

export default class DashboardTour extends React.PureComponent<IDashboardTourProps & DashboardTourContainerProps, IDashboardTourState> {
  render() {
    const { isOpen, onClose } = this.props

    if (isOpen) {
      return (
        <TourGuide open onClose={onClose} />
      )
    }

    return null
  }
}
