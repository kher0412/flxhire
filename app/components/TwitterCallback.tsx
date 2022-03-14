import React from 'react'
import { PageBundlePlaceholder } from 'components'
import localStorage from 'services/localStorage'
import { KEY_TWITTER_REQUEST_TOKEN, KEY_TWITTER_VERIFIER_TOKEN } from 'services/twitter'

export default class TwitterCallback extends React.PureComponent {
  componentDidMount() {
    // this storage key is being polled for in the async request flow
    // setting it here will result in that async flow continuing with access token acquisition
    const query = new URL(window.location.href).searchParams

    localStorage.setItem(KEY_TWITTER_VERIFIER_TOKEN, query.get('oauth_verifier'))
    localStorage.setItem(KEY_TWITTER_REQUEST_TOKEN, query.get('oauth_token'))
  }

  render() {
    return <PageBundlePlaceholder />
  }
}
