import React from 'react'

export default class JobFormWrapper extends React.Component {
  render() {
    const { children } = this.props

    return (
      <form>
        {children}
      </form>
    )
  }
}
