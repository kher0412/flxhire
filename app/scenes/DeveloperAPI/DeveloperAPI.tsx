import { Grid, Typography, Card, CardContent } from '@material-ui/core'
import { Page, PageBody, PageHeader, PageContent, PageHeaderTitle, ExternalLink, Condition, Suspense } from 'components'
import { InfoMessage } from 'components/themed'
import { getGraphQLBaseURL } from 'api/graphql'
import { graphql, usePreloadedQuery, PreloadedQuery } from 'react-relay'
import { DeveloperAPI_Query } from '__generated__/DeveloperAPI_Query.graphql'
import { useCurrentUser } from 'hooks'
import APIKeys from './components/APIKeys'

export const DeveloperAPIQuery = graphql`
  query DeveloperAPI_Query {
    currentUser {
      ...APIKeys_User
    }
  }
`

const DeveloperAPI = ({ preloadedQuery }: { preloadedQuery: PreloadedQuery<DeveloperAPI_Query> }) => {
  // NOTE: if you arrive here signed out and click login, for some reason the user data does not refresh
  // so we use the hook
  const [user] = useCurrentUser()
  const apiAccess = user?.api_access
  const data = usePreloadedQuery<DeveloperAPI_Query>(DeveloperAPIQuery, preloadedQuery)

  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle>Developer API</PageHeaderTitle>
      </PageHeader>

      <PageBody>
        <PageContent maxWidth="lg">
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Condition condition={apiAccess}>
                  <Grid item xs={12}>
                    <Typography>
                      To access the <ExternalLink href="https://graphql.org/" label="GraphQL" /> API, make sure you follow these directions:
                      <ol>
                        <li>Use the following URL <code>{getGraphQLBaseURL()}</code></li>
                        <li>Send a HTTP <code>POST</code> request</li>
                        <li>Set your API key into the <code>FLEXHIRE-API-KEY</code> header</li>
                        <li>
                          Optionally use our other resources:
                          <ul>
                            <li><code>{getGraphQLBaseURL()}/schema</code> to receive a copy of the GraphQL schema for the API</li>
                            <li>
                              <code>{getGraphQLBaseURL()}/introspection_query</code> to receive an introspection query. Execute this query to receive metadata about the API.
                              {' '}Common GraphQL tools should be able to collect API schema information without this.
                            </li>
                          </ul>
                        </li>
                      </ol>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <InfoMessage>
                      This is the same GraphQL API that our frontend uses. Therefore, it is continuously evolving and subject
                      to frequent breaking changes. Your API Key will have the same level of permissions and visibility that you have when logged
                      in with your account.
                    </InfoMessage>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      We recommend a GraphQL client
                      such as <ExternalLink href="https://altair.sirmuel.design/" label="Altair" />
                      {' '}or <ExternalLink label="GraphiQL" href="https://github.com/graphql/graphiql" /> for accessing the auto-generated
                      API documentation and making your first queries.
                      {' '}Our API is compatible with the <ExternalLink label="Relay" href="https://relay.dev" /> client.
                    </Typography>
                  </Grid>
                </Condition>
                <Grid item xs={12}>
                  <Suspense ssr>
                    <APIKeys user={data?.currentUser} />
                  </Suspense>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </PageContent>
      </PageBody>
    </Page>
  )
}

export default DeveloperAPI
