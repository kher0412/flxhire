import { Fragment } from 'react'
import { Suspense, PagePlaceholder } from 'components'
import { graphql, usePaginationFragment } from 'react-relay'
import { Offers_Firm$key } from '__generated__/Offers_Firm.graphql'
import { RelayPagination, Box } from 'components/themed'
import Application from '../Application'

interface IOffersProps {
  firm: Offers_Firm$key
  selectedJob?: { id: string }
  adminMode?: boolean
}

const Offers = ({ firm, selectedJob, adminMode }: IOffersProps) => {
  const { data, ...pagination } = usePaginationFragment(graphql`
    fragment Offers_Firm on Firm
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 },
        cursor: { type: "String" },
        jobId: { type: "ID" }
      )
      @refetchable(queryName: "Offers_offers")
      {
        offers: contracts(first: $count, after: $cursor, filters: { stage: "offer", jobId: $jobId, membersOnly: true }) @connection(key: "Offers_offers") {
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

  const results = data?.offers?.edges?.map(e => e.node) || []
  const hasContent = results?.length > 0

  return (
    <Fragment>
      <div data-cy="result-list">
        {results.map(item => (
          <Suspense key={item.id}>
            <Application
              contract={item}
              filteredOut={false}
              connectionId={data?.offers?.__id}
              hideJob={Boolean(selectedJob)}
              adminMode={adminMode}
            />
          </Suspense>
        ))}
      </div>

      {!hasContent && (
        <PagePlaceholder
          raised
          title="No offers yet"
          subtitle="You can make your offer after interviewing or directly on a Member's profile page."
        />
      )}

      <Box>
        <RelayPagination
          perPage={25}
          currentCount={results?.length || 0}
          totalCount={data?.offers?.totalCount}
          filters={{ jobId: selectedJob?.id }}
          noWrapFilters
          {...pagination}
        />
      </Box>
    </Fragment>
  )
}

export default Offers
