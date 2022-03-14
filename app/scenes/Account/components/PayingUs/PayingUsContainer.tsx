import { PreloadedQuery, usePreloadedQuery, graphql } from 'react-relay'
import { PayingUsContainer_Query } from '__generated__/PayingUsContainer_Query.graphql'
import PayingUs, { IPayingUsProps } from './PayingUs'

export const PayingUsContainerQuery = graphql`
  query PayingUsContainer_Query {
    currentUser {
      firm {
        ...PayingUs_Firm
      }
    }
  }
`

function PayingUsContainer({ preloadedQuery, ...props }: { preloadedQuery: PreloadedQuery<PayingUsContainer_Query> } & Omit<IPayingUsProps, 'firm'>) {
  const data = usePreloadedQuery(PayingUsContainerQuery, preloadedQuery)
  return <PayingUs firm={data?.currentUser?.firm} {...props} />
}

export default PayingUsContainer
