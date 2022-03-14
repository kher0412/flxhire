import React from 'react'

export default class FreelancerProfileFormWrapper extends React.Component {
  render() {
    const { children } = this.props

    return (
      <form>
        {children}
      </form>
    )
  }
}
