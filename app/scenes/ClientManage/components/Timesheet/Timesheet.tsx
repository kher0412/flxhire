import React, { useCallback, useMemo } from 'react'
import moment from 'moment'
import { Timesheet as TimesheetView, Link, Condition, Suspense } from 'components'
import { Page, PageHeader, PageHeaderTitle, PageHeaderDescription, PageHeaderBreadcrumbs, PageBody, PageContent, PageActionBar } from 'components/Layouts/V3'
import { DATE_FORMAT, formatAsShortDateRange } from 'services/formatting'
import { getPaymentDueDate } from 'services/timesheets'
import { Card, Grid } from '@material-ui/core'
import TimesheetActions from 'scenes/ClientManage/components/Timesheet/components/TimesheetActions'
import { useRouter } from 'next/router'
import { useCurrentUser, useDispatch, useOnMount, useSelector } from 'hooks'
import { createAction } from 'redux-actions'
import { SET_TIMESHEET } from 'scenes/ClientManage/ManageDucks'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import Rating from '../Rating'

const Timesheet = () => {
  const router = useRouter()
  const [user] = useCurrentUser()
  const dispatch = useDispatch()
  const timesheet = useSelector(state => state.clientManage.timesheets.timesheet)

  const getTimesheet = useCallback(async (id) => {
    try {
      dispatch(createAction(SET_TIMESHEET)({ timesheet: await getAPIClient().getTimesheet(id) }))
    } catch (error) {
      trackError(error)
    }
  }, [])

  useOnMount(() => {
    getTimesheet(router.query.id)
  })

  const breadcrumbsProps = useMemo(() => [
    { id: 1, name: 'Team Management', href: '/client/manage' },
    { id: 2, name: 'Work Reports', href: '/client/manage', as: '/client/manage?tab=work' },
    { id: 2, name: timesheet.id?.toString(), href: '/client/work_reports/[id]', as: `/client/work_reports/${timesheet.id}` },
  ], [timesheet.id])

  const datesRange = formatAsShortDateRange(timesheet.start_date, timesheet.end_date)

  let clients = []
  if (timesheet?.client_id) clients = [{ client: { id: timesheet.client_id, name: timesheet.client_name } }]

  let paymentAt = getPaymentDueDate(timesheet, user)
  let paymentAtDate = null

  if (paymentAt) {
    paymentAtDate = moment(paymentAt).add(1, 'day')
  }

  paymentAt = paymentAtDate ? paymentAtDate.format(DATE_FORMAT) : undefined

  return (
    <Page>
      <PageHeader>
        <PageHeaderTitle>
          Work Report
        </PageHeaderTitle>

        <PageHeaderDescription>
          View Work Report for <Link href="/[...slugs]" as={`/${timesheet.freelancer_slug}`}>{timesheet.freelancer_name}</Link> for {datesRange}

          <Condition condition={Boolean(paymentAt)}>
            {' '}(payment due on: {paymentAt})
          </Condition>
        </PageHeaderDescription>

        <PageHeaderBreadcrumbs breadcrumbs={breadcrumbsProps} />
      </PageHeader>

      <PageActionBar>
        <Suspense>
          <TimesheetActions timesheet={timesheet} />
        </Suspense>
      </PageActionBar>

      <PageBody>
        <PageContent maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TimesheetView
                timesheet={timesheet}
                contracts={clients}
                disableCardBorders={false} // TODO: can be cleaned up once the member-side is on the V3 layout
                actions={(
                  <Suspense>
                    <TimesheetActions timesheet={timesheet} />
                  </Suspense>
                )}
              />
            </Grid>

            <Condition condition={timesheet.status === 'approved' || timesheet.status === 'rejected'}>
              <Grid item xs={12}>
                <Card variant="outlined" elevation={0}>
                  <Rating timesheet={timesheet} />
                </Card>
              </Grid>
            </Condition>
          </Grid>
        </PageContent>
      </PageBody>
    </Page>
  )
}

export default Timesheet
