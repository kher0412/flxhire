import React from 'react'
import {
  Page,
  PageSidebar,
  PageContent,
  PageHeader,
  PageHeaderTitle,
  PageBody,
  Suspense,
  PagePlaceholder,
} from 'components'
import { useFilters } from 'hooks'
import { IUserStatus, IContractStatus } from 'types'
import { Card } from '@material-ui/core'
import { Button } from 'components/themed'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { MembersPipeline_Query } from '__generated__/MembersPipeline_Query.graphql'
import Sidebar from './components/Sidebar'
import FocusedFreelancer from './components/FocusedFreelancer'
import MembersList from './components/MembersList'

export interface IMembersPipelineFilters {
  actionableOnly: boolean
  name: string
  hiddenOnly: boolean
  jobTitle: string
  status: IUserStatus
  contractStatus: IContractStatus | 'screening_incomplete'
}

const MembersPipeline = () => {
  const data = useLazyLoadQuery<MembersPipeline_Query>(graphql`
    query MembersPipeline_Query {
      ...MembersList_members
    }
  `, {}, {
    fetchPolicy: 'store-and-network',
  })
  const { filters, setFilter, clearFilters } = useFilters<IMembersPipelineFilters>()

  return (
    <Page sidebar>
      {({ sidebarMode, setSidebarOpenState }) => (
        <React.Fragment>
          <PageHeader>
            <PageHeaderTitle>Members Pipeline</PageHeaderTitle>
          </PageHeader>

          <PageBody>
            <PageSidebar sticky>
              <Sidebar
                drawer={sidebarMode === 'drawer'}
                onClose={sidebarMode === 'drawer' ? (() => setSidebarOpenState(false)) : undefined}
                filters={filters}
                setFilter={setFilter}
                clearFilters={clearFilters}
              />
            </PageSidebar>

            <PageContent maxWidth="xl">
              {sidebarMode === 'drawer' && (
              <Card raised style={{ marginBottom: 12 }}>
                <Button fullWidth onClick={() => setSidebarOpenState(true)}>Open Filters</Button>
              </Card>
              )}
              <Suspense fallback={<PagePlaceholder title="Loading" />}>
                <MembersList query={data} filters={filters} />
              </Suspense>
              <Suspense>
                <FocusedFreelancer />
              </Suspense>
            </PageContent>
          </PageBody>
        </React.Fragment>
      )}
    </Page>
  )
}

export default MembersPipeline
