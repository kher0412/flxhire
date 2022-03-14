import Account, { AccountQuery } from 'scenes/Account'
import { withLayoutAndPreloadedQuery } from 'withLayout'

export default withLayoutAndPreloadedQuery(Account, AccountQuery, { name: 'Account' })
