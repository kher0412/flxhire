import { ComponentProps } from 'react'
import { usePreloadedQuery, graphql, PreloadedQuery } from 'react-relay'
import { ApplicationsContainer_Query } from '__generated__/ApplicationsContainer_Query.graphql'
import Applications from './Applications'

export const ApplicationsQuery = graphql`
  query ApplicationsContainer_Query($slug: String) {
    firm(slug: $slug) {
      ...Applications_Firm
    }
  }
`

interface IApplicationsContainerProps extends Omit<ComponentProps<typeof Applications>, 'firm'> {
  preloadedQuery: PreloadedQuery<ApplicationsContainer_Query>
}

const ApplicationsContainer = ({ preloadedQuery, ...props }: IApplicationsContainerProps) => {
  const data = usePreloadedQuery<ApplicationsContainer_Query>(ApplicationsQuery, preloadedQuery)
  return <Applications firm={data?.firm} {...props} />
}

export default ApplicationsContainer
