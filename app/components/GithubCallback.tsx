import React from 'react'
import { PageBundlePlaceholder } from 'components'
import { redirectOpener } from 'services/router'

export default class GithubCallback extends React.PureComponent {
  componentDidMount() {
    redirectOpener(`${window.location.origin}/auth/provider${window.location.search}&provider=github`)
  }

  render() {
    return <PageBundlePlaceholder />
  }
}
