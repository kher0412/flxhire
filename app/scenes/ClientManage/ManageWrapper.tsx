import React from 'react'
import { Page, PageHeader, PageHeaderBreadcrumbs, PageHeaderDescription, PageHeaderTitle, PageLoadingIndicator } from 'components/Layouts/V3'
import { Suspense } from 'components'
import { ContainerProps } from './ManageContainer'
import Manage, { TabTitlesMap, TabDescriptionsMap, DEFAULT_TAB } from './Manage'

function ManageWrapper(props: ContainerProps) {
  const { tab = DEFAULT_TAB } = props

  const breadcrumbsProps = React.useMemo(() => [
    { id: 1, name: 'Team Management', href: '/client/manage' },
    { id: 2, name: TabTitlesMap[tab], href: '/client/manage', as: `/client/manage?tab=${tab}` },
  ], [tab])

  return (
    <Page data-cy="page-manage">
      <PageHeader>
        <PageHeaderTitle>{TabTitlesMap[tab]}</PageHeaderTitle>
        <PageHeaderDescription>{TabDescriptionsMap[tab]}</PageHeaderDescription>
        <PageHeaderBreadcrumbs breadcrumbs={breadcrumbsProps} />
      </PageHeader>

      <Suspense fallback={<PageLoadingIndicator />}>
        <Manage {...props} />
      </Suspense>
    </Page>
  )
}

export default React.memo(ManageWrapper)
