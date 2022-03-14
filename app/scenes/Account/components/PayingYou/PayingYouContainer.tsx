import { PreloadedQuery, usePreloadedQuery, graphql } from 'react-relay'
import { PayingYouContainer_Query } from '__generated__/PayingYouContainer_Query.graphql'
import PayingYou from './PayingYou'

export const PayingYouContainerQuery = graphql`
  query PayingYouContainer_Query {
    currentUser {
      ...PayingYou_User
    }
  }
`

function PayingYouContainer({ preloadedQuery }: { preloadedQuery: PreloadedQuery<PayingYouContainer_Query>}) {
  const data = usePreloadedQuery(PayingYouContainerQuery, preloadedQuery)
  return <PayingYou user={data?.currentUser} />
}

export default PayingYouContainer
