import { Fragment, useEffect } from 'react'
import { graphql, usePaginationFragment } from 'react-relay'
import { FreelancerCardActions, Suspense } from 'components'
import { MembersList_members$key } from '__generated__/MembersList_members.graphql'
import { RelayPagination } from 'components/themed'
import Freelancer from './Freelancer'
import FreelancerActions from './FreelancerActions'
import { IMembersPipelineFilters } from '../MembersPipeline'

const MembersList = ({ query, filters }: { query: MembersList_members$key, filters: Partial<IMembersPipelineFilters> }) => {
  const { data, ...paginationData } = usePaginationFragment(graphql`
    fragment MembersList_members on Query
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 },
        cursor: { type: "String" },
        filters: { type: "MembersFilters" }
      )
      @refetchable(queryName: "MembersList_List")
      {
        members(first: $count, after: $cursor, filters: $filters) @connection(key: "MembersList_members") {
          totalCount
          edges {
            node {
              id
              ...Freelancer_FreelancerMemberPipelineFragment
              ...FreelancerActions_FreelancerMemberPipelineActionsFragment
            }
          }
        }
      }
  `, query)
  const members = data?.members?.edges?.map(edge => edge.node) || []
  return (
    <Fragment>
      {members.map(freelancer => (
        <Suspense>
          <Freelancer
            freelancer={freelancer}
            key={freelancer.id}
          >
            <FreelancerCardActions>
              <FreelancerActions
                freelancer={freelancer}
              />
            </FreelancerCardActions>
          </Freelancer>
        </Suspense>
      ))}
      <RelayPagination
        {...paginationData}
        filters={filters}
        currentCount={members.length}
        totalCount={data?.members?.totalCount}
      />
    </Fragment>
  )
  /*
      {members.length === 0 && (
        <PagePlaceholder
          title="No Results"
        />
      )}
      <PagePagination
        page={pagination.page}
        count={pagination.count}
        rowsPerPage={pagination.rowsPerPage}
        onPageChange={onPageChange}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
  */
}

export default MembersList
