import { ComponentProps } from 'react'
import { usePreloadedQuery, graphql, PreloadedQuery } from 'react-relay'
import { JobsContainer_Query } from '__generated__/JobsContainer_Query.graphql'
import Jobs from './Jobs'

export const JobsQuery = graphql`
  query JobsContainer_Query($slug: String) {
    firm(slug: $slug) {
      ...Jobs_Firm
    }
  }
`

interface IJobsContainerProps extends Omit<ComponentProps<typeof Jobs>, 'firm'> {
  preloadedQuery: PreloadedQuery<JobsContainer_Query>
}

const JobsContainer = ({ preloadedQuery, ...props }: IJobsContainerProps) => {
  const data = usePreloadedQuery<JobsContainer_Query>(JobsQuery, preloadedQuery)
  return <Jobs firm={data?.firm} {...props} />
}

export default JobsContainer
