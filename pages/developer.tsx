import DeveloperAPI, { DeveloperAPIQuery } from 'scenes/DeveloperAPI'
import { withLayoutAndPreloadedQuery } from 'withLayout'

export default withLayoutAndPreloadedQuery(DeveloperAPI, DeveloperAPIQuery, { name: 'DeveloperAPI' })
