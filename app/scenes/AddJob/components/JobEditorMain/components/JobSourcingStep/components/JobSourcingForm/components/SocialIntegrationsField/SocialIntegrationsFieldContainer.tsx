import React from 'react'
import { trackError } from 'services/analytics'
import { acquireLinkedInAccessToken } from 'services/linkedin'
import { acquireTwitterAccessToken } from 'services/twitter'
import { FormValueInput, FormValueMeta } from 'types'
import SocialIntegrationsField from './SocialIntegrationsField'

export interface ISocialIntegrationsFieldContainerProps {
  input: FormValueInput<string[]>
  meta: FormValueMeta
}

export interface ISocialIntegrationsFieldContainerState {
  linkedInConnected?: boolean
  linkedInConnecting?: boolean
  twitterConnected?: boolean
  twitterConnecting?: boolean
  error?: any
}

export default class SocialIntegrationsFieldContainer extends React.Component<ISocialIntegrationsFieldContainerProps, ISocialIntegrationsFieldContainerState> {
  state: ISocialIntegrationsFieldContainerState = {
    linkedInConnected: undefined,
    linkedInConnecting: undefined,
    twitterConnected: undefined,
    twitterConnecting: undefined,
  }

  async componentDidMount() {
    try {
      this.setState({
        linkedInConnected: (await acquireLinkedInAccessToken(false)) ? true : false,
        twitterConnected: (await acquireTwitterAccessToken(false)) ? true : false,
      })
    } catch (err) {
      this.setState({
        error: err,
      })
    }
  }

  render() {
    const { input, meta } = this.props
    const { linkedInConnected, linkedInConnecting, twitterConnected, twitterConnecting, error } = this.state

    return (
      <SocialIntegrationsField
        input={input}
        meta={meta}
        loading={linkedInConnected === undefined}
        linkedInConnected={linkedInConnected === true}
        linkedInConnecting={linkedInConnecting}
        twitterConnected={twitterConnected === true}
        twitterConnecting={twitterConnecting}
        onConnectLinkedIn={this.handleConnectLinkedIn}
        onConnectTwitter={this.handleConnectTwitter}
        error={error?.message || error}
      />
    )
  }

  handleConnectLinkedIn = async () => {
    this.setState({
      linkedInConnecting: true,
    })

    try {
      this.setState({
        linkedInConnected: (await acquireLinkedInAccessToken()) ? true : false,
      })
    } catch (err) {
      if (err?.message !== 'canceled') {
        this.setState({
          error: err,
        })

        trackError(err)
      }
    }

    this.setState({
      linkedInConnecting: false,
    })
  }

  handleConnectTwitter = async () => {
    this.setState({
      twitterConnecting: true,
    })

    try {
      this.setState({
        twitterConnected: (await acquireTwitterAccessToken()) ? true : false,
      })
    } catch (err) {
      if (err?.message !== 'canceled') {
        this.setState({
          error: err,
        })

        trackError(err)
      }
    }

    this.setState({
      twitterConnecting: false,
    })
  }
}
