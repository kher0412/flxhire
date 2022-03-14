import ClientDashboard from 'scenes/ClientDashboard'
import { withLayout } from 'withLayout'
import { getDashboardInitialData } from 'scenes/ClientDashboard/Dashboard/DashboardContainer'
import { INextPageContext } from 'types'

(ClientDashboard as any).getInitialProps = async (ctx: INextPageContext) => {
  await getDashboardInitialData(ctx.store.getState(), ctx.store.dispatch, ctx.currentUser, ctx.api)
}

export default withLayout(ClientDashboard, { name: 'ClientDashboard' })
