import React from 'react'
import { Collapse, Grid, List } from '@material-ui/core'
import { Button, InfoMessage } from 'components/themed'
import { LoadingIcon, LoadingPage, GridExpandable } from 'components'
import { FormValueInput, FormValueMeta } from 'types'
import { Link } from '@material-ui/icons'
import SocialIntegration from './components/SocialIntegration'

export interface ISocialIntegrationsFieldProps {
  input: FormValueInput<string[]>
  meta: FormValueMeta
  loading: boolean
  linkedInConnecting: boolean
  linkedInConnected: boolean
  twitterConnected: boolean
  twitterConnecting: boolean
  onConnectLinkedIn: () => void
  onConnectTwitter: () => void
  error?: string
}

export interface ISocialIntegrationsFieldState {
}

export default class SocialIntegrationsField extends React.Component<ISocialIntegrationsFieldProps, ISocialIntegrationsFieldState> {
  render() {
    const {
      loading,
      linkedInConnected,
      linkedInConnecting,
      twitterConnected,
      twitterConnecting,
      onConnectLinkedIn,
      onConnectTwitter,
      input,
      error,
    } = this.props

    const connectionsAvailable = !linkedInConnected || !twitterConnected
    const connectionsEnabled = new Set(input?.value || [])

    return (
      <div>
        <Collapse in={loading} unmountOnExit mountOnEnter>
          <LoadingPage />
        </Collapse>

        <Collapse in={!loading} unmountOnExit mountOnEnter>
          <Grid container spacing={3}>
            <GridExpandable expand={error ? true : false} item xs={12}>
              <InfoMessage>
                {error}
              </InfoMessage>
            </GridExpandable>

            <GridExpandable expand={connectionsAvailable} item xs={12}>
              <div
                // vertical spanner to avoid layout suddenly collapsing
                style={{ height: 40, display: 'inline-block' }}
              />

              {!linkedInConnected && (
                <Button style={{ marginTop: 12, marginRight: 12 }} color="secondary" onClick={onConnectLinkedIn} disabled={linkedInConnecting}>
                  {linkedInConnecting ? <LoadingIcon /> : <Link />} Connect to LinkedIn
                </Button>
              )}

              {!twitterConnected && (
                <Button style={{ marginTop: 12 }} color="secondary" onClick={onConnectTwitter} disabled={twitterConnecting}>
                  {twitterConnecting ? <LoadingIcon /> : <Link />} Connect to Twitter
                </Button>
              )}
            </GridExpandable>

            <Grid item xs={12}>
              <List>
                <SocialIntegration
                  available={linkedInConnected || connectionsEnabled.has('linkedin')}
                  checked={connectionsEnabled.has('linkedin')}
                  name="linkedin"
                  title="LinkedIn"
                  description="Share this job on your LinkedIn profile"
                  onChange={this.handleConnectionToggle}
                />

                <SocialIntegration
                  available={twitterConnected || connectionsEnabled.has('twitter')}
                  checked={connectionsEnabled.has('twitter')}
                  name="twitter"
                  title="Twitter"
                  description="Tweet this job on your Twitter"
                  onChange={this.handleConnectionToggle}
                />
              </List>
            </Grid>

            <GridExpandable expand={connectionsEnabled.size > 0} item xs={12} mountOnEnter unmountOnExit>
              <InfoMessage>
                The job posting will be shared on your profile after it has been published.
              </InfoMessage>
            </GridExpandable>
          </Grid>
        </Collapse>
      </div>
    )
  }

  handleConnectionToggle = (name: string, checked: boolean) => {
    const { input } = this.props
    const connectionsEnabled = new Set(input?.value || [])

    if (checked) {
      connectionsEnabled.add(name)
    } else {
      connectionsEnabled.delete(name)
    }

    input?.onChange(Array.from(connectionsEnabled))
  }
}
