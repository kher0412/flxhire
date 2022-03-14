import React from 'react'
import { withLayout } from 'withLayout'

class Component extends React.Component {
  componentDidMount() {
    // throw new Error('Test error on mount')
  }

  render() {
    throw new Error('Test error on render')
    return '...'
  }
}

export default withLayout(Component)
