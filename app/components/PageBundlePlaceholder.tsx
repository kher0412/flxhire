import React from 'react'
import { PageHeader as PageHeaderV3, PageHeaderTitle as PageHeaderTitleV3, PageHeaderDescription as PageHeaderDescriptionV3 } from 'components/Layouts/V3'
import { useCurrentUser } from 'hooks'
import { isClient } from 'services/user'
import PageHeader from './PageHeader'
import PagePlaceholder from './PagePlaceholder'
import PageHeaderTitle from './PageHeaderTitle'

interface IPageBundlePlaceholderProps {
  error?: string
}

const PageBundlePlaceholder = ({ error }: IPageBundlePlaceholderProps) => {
  const [user] = useCurrentUser()
  const enableSidebarLayout = isClient(user)

  if (enableSidebarLayout) {
    return (
      <PageHeaderV3 data-cy="page-bundle-placeholder">
        <PageHeaderTitleV3>
          {error ? 'Load Error' : 'Loading Page...'}
        </PageHeaderTitleV3>

        <PageHeaderDescriptionV3>
          {error ? error : 'Loading Page...'}
        </PageHeaderDescriptionV3>
      </PageHeaderV3>
    )
  }

  return (
    <PageHeader autoCompact autoAlternative data-cy="page-bundle-placeholder">
      {!error && (
        <PageHeaderTitle>
          ...
        </PageHeaderTitle>
      )}
      {error && (
        <PagePlaceholder
          title="Error"
          subtitle={error}
        />
      )}
    </PageHeader>
  )
}

export default PageBundlePlaceholder
