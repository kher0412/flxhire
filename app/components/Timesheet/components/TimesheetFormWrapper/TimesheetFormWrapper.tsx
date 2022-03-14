import React from 'react'
import { ContainerProps } from './TimesheetFormWrapperContainer'

export default class TimesheetFormWrapper extends React.PureComponent<ContainerProps & { children: any }> {
  render() {
    const { children } = this.props

    return (
      <form>
        {children}
      </form>
    )
  }
}
