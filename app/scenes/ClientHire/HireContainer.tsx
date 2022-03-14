import { ComponentProps } from 'react'
import { Suspense, ClientPagePlaceholder } from 'components'
import Hire from './Hire'

// TODO: this should be removed and replaced with SSR loading of GraphQL data to avoid suspense on first render
const HireContainer = (props: ComponentProps<typeof Hire>) => (
  <Suspense
    fallback={<ClientPagePlaceholder />}
    ErrorFallbackComponent={errorProps => <ClientPagePlaceholder {...errorProps} />}
  >
    <Hire {...props} />
  </Suspense>
)

export default HireContainer
