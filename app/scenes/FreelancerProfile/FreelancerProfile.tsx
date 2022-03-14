import React from 'react'
import { Helmet } from 'react-helmet'
import { getBaseURL, buildQueryParams, browserHistory, extractQueryParams } from 'services/router'
import { Card, ListItemText, List, ListItem } from '@material-ui/core'
import { PageContainer, PageWrapper, PageHeader, ResponsiveButton, InfoMessage, ExternalLink, Link, MediaQuery, Suspense } from 'components'
import FreelancerProfileComponent from 'components/FreelancerProfile'
import { IFreelancer } from 'types'
import moment from 'moment'
import { getContractStatus } from 'services/contract'
import { isClient } from 'services/user'
import { Create } from '@material-ui/icons'
import styles from './FreelancerProfile.module.css'
import { ContainerProps } from './FreelancerProfileContainer'
import ProfileActions from './components/ProfileActions'

interface IFreelancerProfileProps extends ContainerProps {
  freelancer: IFreelancer
}

interface IFreelancerProfileState {
  editing: boolean
  isInSignupFlow: boolean
}

class FreelancerProfile extends React.Component<IFreelancerProfileProps, IFreelancerProfileState> {
  state = {
    editing: false,
    isInSignupFlow: false,
  }

  componentDidMount() {
    const { user, getContracts, router, refresh } = this.props

    // Refresh on mount to clear stale SSR cache and similar issues
    // This refresh won't block rendering the page
    refresh()

    if (isClient(user)) getContracts()

    if (extractQueryParams(router.asPath).action === 'signup') {
      this.setState({
        isInSignupFlow: true,
      })
    }
  }

  render() {
    const { user, freelancer, refresh, getContracts, contacts, contracts } = this.props
    const { editing, isInSignupFlow } = this.state
    const editable = user?.profile?.slug === freelancer?.profile?.slug && freelancer?.profile?.slug

    return (
      <div>
        {this.renderHead()}

        <PageHeader compact />

        <PageContainer className={styles.page}>
          {this.renderEditButton()}

          <PageWrapper withoutCard noAnim cardStyle={{ overflow: 'visible' }}>
            <Card raised>
              <FreelancerProfileComponent
                liteMode={!freelancer.profile?.open_to_opportunities}
                freelancer={freelancer}
                editable={editable && editing}
              >
                <Suspense>
                  <ProfileActions
                    isInSignupFlow={isInSignupFlow}
                    refresh={() => {
                      refresh()
                      getContracts()
                    }}
                    freelancer={freelancer}
                    contracts={contracts}
                    contacts={contacts}
                  />
                </Suspense>
              </FreelancerProfileComponent>
            </Card>
          </PageWrapper>

          {this.renderVanityURL()}
        </PageContainer>
      </div>
    )
  }

  renderEditButton() {
    const { user, freelancer } = this.props

    if (user?.profile?.slug === freelancer?.profile?.slug) {
      return (
        <div className={styles.buttons}>
          <MediaQuery maxWidth={600}>
            <ResponsiveButton
              mobileLabel=""
              label=""
              icon={<Create />}
              component={Link}
              to="/profile"
              className={styles.button}
            />
          </MediaQuery>

          <MediaQuery minWidth={601}>
            <ResponsiveButton
              mobileLabel="Edit"
              label="Edit Profile"
              icon={<Create />}
              component={Link}
              to="/profile"
              variant="outlined"
              className={styles.button}
            />
          </MediaQuery>
        </div>
      )
    }

    return null
  }

  renderVanityURL() {
    const { user, freelancer } = this.props
    const isPending = freelancer?.status === 'pending'
    const isSelf = user?.profile && (user?.profile?.slug === freelancer?.profile?.slug || user?.id === freelancer?.id)

    if (isSelf) {
      if (isPending) {
        return (
          <InfoMessage data-cy="private-profile">
            Your profile will not be publicly visible until you submit it
          </InfoMessage>
        )
      }

      if (this.props.freelancer.profile.open_to_opportunities) {
        return (
          <InfoMessage data-cy="public-profile">
            Share your profile with the world at <ExternalLink href={`flexhire.com/${this.props.freelancer.profile.slug}`} />
          </InfoMessage>
        )
      }

      return null
    }

    return null
  }

  renderJobApplications() {
    const { contracts } = this.props
    return (
      <List>
        {contracts.map(contract => (
          <ListItem button onClick={() => this.focusContract(contract.job_slug)}>
            <ListItemText
              primary={contract.job_title}
              secondary={`${getContractStatus(contract)} ${contract.last_interaction_at ? moment(contract.last_interaction_at).fromNow() : ''}`.trim()}
            />
          </ListItem>
        ))}
      </List>
    )
  }

  renderHead() {
    const { freelancer } = this.props
    if (!freelancer?.profile) return null

    const profile = freelancer.profile
    const name = freelancer.first_name
    const url = `${getBaseURL()}/${profile.slug}`
    let title = `${name} on Flexhire`
    if (profile.freelancer_type) {
      title = `${name} - ${profile.freelancer_type} expert on Flexhire`
    }
    return (
      <Helmet titleTemplate="%s">
        <title>{title}</title>
        <meta name="description" content={profile.text_introduction} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={profile.text_introduction} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'Person',
            name: `${freelancer.first_name} ${freelancer.last_name}`.trim(),
            description: profile.text_introduction,
            image: freelancer.avatar_url,
            jobTitle: profile.freelancer_type,
            email: freelancer.email,
            ...(profile.phone && { telephone: profile.phone }),
            address: {
              '@type': 'PostalAddress',
              streetAddress: profile.full_address,
              addressLocality: profile.city,
              addressRegion: profile.region,
              ...(profile.zip && { postalCode: profile.zip }),
              addressCountry: profile.country,
            },
            url,
          })}
        </script>
      </Helmet>
    )
  }

  focusContract = (jobSlug) => {
    const params = {
      job: jobSlug,
      focus: this.props.freelancer.profile.slug,
    }
    browserHistory.push(`/client/hire?${buildQueryParams(params)}`)
  }
}

export default FreelancerProfile
