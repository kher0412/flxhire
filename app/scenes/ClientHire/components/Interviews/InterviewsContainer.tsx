import { ComponentProps } from 'react'
import { usePreloadedQuery, graphql, PreloadedQuery } from 'react-relay'
import { InterviewsContainer_Query } from '__generated__/InterviewsContainer_Query.graphql'
import Interviews from './Interviews'

export const InterviewsQuery = graphql`
  query InterviewsContainer_Query($slug: String) {
    firm(slug: $slug) {
      ...Interviews_Firm
    }
  }
`

interface IInterviewsContainerProps extends Omit<ComponentProps<typeof Interviews>, 'firm'> {
  preloadedQuery: PreloadedQuery<InterviewsContainer_Query>
}

const InterviewsContainer = ({ preloadedQuery, ...props }: IInterviewsContainerProps) => {
  const data = usePreloadedQuery<InterviewsContainer_Query>(InterviewsQuery, preloadedQuery)
  return <Interviews firm={data?.firm} {...props} />
}

export default InterviewsContainer
