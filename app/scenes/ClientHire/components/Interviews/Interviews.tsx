import React from 'react'
import { Suspense, PagePlaceholder } from 'components'
import { graphql, usePaginationFragment } from 'react-relay'
import { Interviews_Firm$key } from '__generated__/Interviews_Firm.graphql'
import { Box, RelayPagination } from 'components/themed'
import Application from '../Application'

interface IInterviewsProps {
  firm: Interviews_Firm$key
  selectedJob?: { id: string }
  adminMode?: boolean
}

const Interviews = ({ firm, selectedJob, adminMode }: IInterviewsProps) => {
  const { data, ...pagination } = usePaginationFragment(graphql`
    fragment Interviews_Firm on Firm
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 },
        cursor: { type: "String" },
        jobId: { type: "ID" }
      )
      @refetchable(queryName: "Interviews_interviews")
      {
        interviews: contracts(first: $count, after: $cursor, filters: { stage: "interview", jobId: $jobId }) @connection(key: "Interviews_interviews") {
          __id
          totalCount
          edges {
            node {
              id
              ...Application_Contract
            }
          }
        }
      }
  `, firm)

  const results = data?.interviews?.edges?.map(e => e.node) || []
  const hasContent = results?.length > 0

  return (
    <React.Fragment>
      <div data-cy="result-list">
        {results.map(item => (
          <Suspense key={item.id}>
            <Application
              contract={item}
              filteredOut={false}
              connectionId={data?.interviews?.__id}
              hideJob={Boolean(selectedJob)}
              adminMode={adminMode}
            />
          </Suspense>
        ))}
      </div>

      {!hasContent && (
        <PagePlaceholder
          raised
          title="No interviews yet"
          subtitle="You can request an interview with any applicant or directly on a Member's profile page."
        />
      )}

      <Box>
        <RelayPagination
          perPage={25}
          currentCount={results?.length || 0}
          totalCount={data?.interviews?.totalCount}
          filters={{ jobId: selectedJob?.id }}
          noWrapFilters
          {...pagination}
        />
      </Box>
    </React.Fragment>
  )
}

export default Interviews
