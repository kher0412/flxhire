import React from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { PageBundlePlaceholder, PageHeader, PagePlaceholder } from 'components'
import { extractQueryParams } from 'services/router'
import { ContainerProps } from './ProviderContainer'

export default class Provider extends React.PureComponent<ContainerProps> {
  componentDidMount() {
    const { startAuth, router } = this.props
    startAuth(router.query.provider as string, router.query.user_type as string, router.query.code as string)
  }

  render() {
    const { provider, status, error } = this.props
    const inProgress = status === 'in_progress'

    if (!status) return <PageBundlePlaceholder />

    let icon
    if (provider === 'linkedin') icon = <FaLinkedin />

    return (
      <PageHeader autoCompact autoAlternative data-cy="page-bundle-placeholder">
        <PagePlaceholder
          icon={icon}
          title={inProgress ? 'Authenticating...' : 'Error'}
          subtitle={inProgress ? 'Please wait' : (error || 'Something went wrong')}
        />
      </PageHeader>
    )
  }
}
