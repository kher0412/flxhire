import { ComponentProps } from 'react'
import { usePreloadedQuery, graphql, PreloadedQuery } from 'react-relay'
import { OffersContainer_Query } from '__generated__/OffersContainer_Query.graphql'
import Offers from './Offers'

export const OffersQuery = graphql`
  query OffersContainer_Query($slug: String) {
    firm(slug: $slug) {
      ...Offers_Firm
    }
  }
`

interface IOffersContainerProps extends Omit<ComponentProps<typeof Offers>, 'firm'> {
  preloadedQuery: PreloadedQuery<OffersContainer_Query>
}

const OffersContainer = ({ preloadedQuery, ...props }: IOffersContainerProps) => {
  const data = usePreloadedQuery<OffersContainer_Query>(OffersQuery, preloadedQuery)
  return <Offers firm={data?.firm} {...props} />
}

export default OffersContainer
