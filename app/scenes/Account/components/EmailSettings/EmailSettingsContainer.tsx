import { PreloadedQuery, usePreloadedQuery, graphql } from 'react-relay'
import { EmailSettingsContainer_Query } from '__generated__/EmailSettingsContainer_Query.graphql'
import EmailSettings from './EmailSettings'

export const EmailSettingsContainerQuery = graphql`
  query EmailSettingsContainer_Query {
    currentUser {
      ...EmailSettings_User
    }
  }
`

function EmailSettingsContainer({ preloadedQuery }: { preloadedQuery: PreloadedQuery<EmailSettingsContainer_Query>}) {
  const data = usePreloadedQuery(EmailSettingsContainerQuery, preloadedQuery)
  return <EmailSettings user={data?.currentUser} />
}

export default EmailSettingsContainer
