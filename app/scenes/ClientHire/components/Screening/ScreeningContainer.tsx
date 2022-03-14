import { ComponentProps } from 'react'
import { usePreloadedQuery, graphql, PreloadedQuery } from 'react-relay'
import { ScreeningContainer_Query } from '__generated__/ScreeningContainer_Query.graphql'
import Screening from './Screening'

export const ScreeningQuery = graphql`
  query ScreeningContainer_Query($slug: String) {
    firm(slug: $slug) {
      ...Screening_Firm
    }
  }
`

interface IScreeningContainerProps extends Omit<ComponentProps<typeof Screening>, 'firm'> {
  preloadedQuery: PreloadedQuery<ScreeningContainer_Query>
}

const ScreeningContainer = ({ preloadedQuery, ...props }: IScreeningContainerProps) => {
  const data = usePreloadedQuery<ScreeningContainer_Query>(ScreeningQuery, preloadedQuery)
  return <Screening firm={data?.firm} {...props} />
}

export default ScreeningContainer
