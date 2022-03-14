import { ComponentProps } from 'react'
import { usePreloadedQuery, graphql, PreloadedQuery } from 'react-relay'
import { CandidatesContainer_Query } from '__generated__/CandidatesContainer_Query.graphql'
import Candidates from './Candidates'

export const CandidatesQuery = graphql`
  query CandidatesContainer_Query($slug: String) {
    firm(slug: $slug) {
      ...Candidates_Firm
    }
  }
`

interface ICandidatesContainerProps extends Omit<ComponentProps<typeof Candidates>, 'firm'> {
  preloadedQuery: PreloadedQuery<CandidatesContainer_Query>
}

const CandidatesContainer = ({ preloadedQuery, ...props }: ICandidatesContainerProps) => {
  const data = usePreloadedQuery<CandidatesContainer_Query>(CandidatesQuery, preloadedQuery)
  return <Candidates firm={data?.firm} {...props} />
}

export default CandidatesContainer
