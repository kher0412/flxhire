import { getGraphQLBaseURL } from 'api/graphql'

const GraphiQL = () => {
  const api = encodeURIComponent(getGraphQLBaseURL())
  const src = `https://embed.graphql.com/embed?endpointURL=%22${api}%22&query=%22%7B%5Cn%20%20feed%20(type%3A%20NEW%2C%20limit%3A%205)%20%7B%5Cn%20%20%20%20repository%20%7B%5Cn%20%20%20%20%20%20owner%20%7B%20login%20%7D%5Cn%20%20%20%20%20%20name%5Cn%20%20%20%20%7D%5Cn%5Cn%20%20%20%20postedBy%20%7B%20login%20%7D%5Cn%20%20%7D%5Cn%7D%5Cn%22&variables=%22%22&response=%22Hit%20run!%5Cn%22&history=false&prettify=false&docs=false`
  return (
    <iframe
      title="GraphiQL"
      width="100%"
      height="100%"
      src={src}
    />
  )
}

GraphiQL.getInitialProps = () => {
  return {
    // Disable app layout when using graphiql
    disableLayout: true,
  }
}

export default GraphiQL
