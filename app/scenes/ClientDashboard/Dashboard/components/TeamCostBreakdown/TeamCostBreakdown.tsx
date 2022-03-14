import React, { useMemo } from 'react'
import Link from 'components/Link'
import moment from 'moment'
import { Card, CardContent, MenuItem, Divider, CardActions } from '@material-ui/core'
import ChartIcon from '@material-ui/icons/Assessment'
import { Line as LineChart } from 'react-chartjs'
import { Button, SelectField } from 'components/themed'
import { ITimesheetForClient } from 'types'
import { getBreakdown } from 'services/timesheets'

import { graphql, useLazyLoadQuery } from 'react-relay'
import { TeamCostBreakdown_Query } from '__generated__/TeamCostBreakdown_Query.graphql'
import styles from './TeamCostBreakdown.module.css'

const CHART_NUM_STEPS = 4

export interface ITeamCostBreakdownProps {
  timesheets: ITimesheetForClient[]
  timesheetsManagedByMe: ITimesheetForClient[]
  wholeTeam: boolean
  loading: boolean
}

const TeamCostBreakdown = (props: ITeamCostBreakdownProps) => {
  const { timesheets: allTimesheets, timesheetsManagedByMe, wholeTeam, loading } = props

  const timesheets = wholeTeam ? allTimesheets : timesheetsManagedByMe

  const [groupBy, setGroupBy] = React.useState('week' as 'week' | 'month')
  const [freelancerId, setFreelancerId] = React.useState(0)

  const data = useLazyLoadQuery<TeamCostBreakdown_Query>(graphql`
    query TeamCostBreakdown_Query {
      currentUser {
        firm {
          contracts(filters: { stage: "contract", membersOnly: true }, first: 20) {
            edges {
              node {
                freelancer {
                  id
                  rawId
                  name
                }
              }
            }
          }
        }
      }
    }
  `, {}, {
    fetchPolicy: 'store-and-network',
  })
  const freelancers = data?.currentUser?.firm?.contracts?.edges?.map(e => e.node.freelancer)?.filter(f => Boolean(f)) || []

  const { chartData, scaleStep, showChart } = useMemo(() => {
    let dataValues: number[]
    let dataLimit = groupBy === 'month' ? 6 : 20

    if (groupBy === 'month') {
      dataLimit = 6
    } else {
      dataLimit = 20
    }
    dataValues = getBreakdown(timesheets, {
      numItems: dataLimit,
      getRate: t => t.client_rate,
      groupByDays: groupBy === 'month' ? 30 : 7,
      filter: freelancerId ? timesheet => timesheet.freelancer_id === freelancerId : null,
    })

    const maxValue = dataValues.reduce((a, b) => Math.max(a, b), 0) * 1.1
    const scaleStepRoundingUnit = 100

    let n = Math.min(dataValues.length, dataLimit)
    let labels = new Array<string>(n)

    if (groupBy === 'month') {
      for (let i = 0; i < n; i++) {
        labels[i] = moment().subtract(i * 30, 'days').startOf('day').format('MMM')
      }
    } else {
      for (let i = 0; i < n; i++) {
        labels[i] = moment().subtract(i * 7, 'days').startOf('day').format('MMM/DD')
      }
    }

    return {
      showChart: Boolean(n > 0 && timesheets.length && !loading),
      scaleStep: Math.ceil(maxValue / CHART_NUM_STEPS / scaleStepRoundingUnit) * scaleStepRoundingUnit,
      chartData: {
        labels: labels.reverse(),
        datasets: [
          {
            label: 'Team Cost',
            fillColor: 'rgba(46, 203, 128, 0.08)',
            strokeColor: 'rgba(46, 203, 128, 0.7)',
            pointColor: 'rgb(46, 203, 128)',
            pointStrokeColor: '#fff',
            pointHighlightStroke: 'rgba(255,255,255,1)',
            data: dataValues.reverse(),
          },
        ],
      },
    }
  }, [timesheets, groupBy, loading, freelancerId])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          Team Cost (USD)
        </div>
      </div>

      <Card raised className={styles.card}>
        <CardContent className={styles.content}>
          <div className={styles.chart}>
            {!showChart && (
              <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <ChartIcon />
                <span>No Data</span>
              </div>
            )}
            {showChart && (
              <LineChart
                key={groupBy}
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  showScale: true,
                  scaleOverride: true,
                  scaleStartValue: 0,
                  scaleSteps: CHART_NUM_STEPS,
                  scaleStepWidth: scaleStep,
                  scaleShowVerticalLines: false,
                  scaleLineColor: 'rgba(177,197,218,0.4)',
                }}
              />
            )}
          </div>
        </CardContent>

        <Divider />

        <CardActions className={styles['bottom-bar']} disableSpacing>
          <SelectField
            value={groupBy}
            onChange={e => setGroupBy(e.target.value)}
            label="View by"
          >
            <MenuItem value="month">
              View by month
            </MenuItem>

            <MenuItem value="week">
              View by week
            </MenuItem>
          </SelectField>
          <SelectField
            value={freelancerId}
            onChange={e => setFreelancerId(e.target.value)}
            label="Team Member"
            style={{ marginLeft: 12 }}
          >
            <MenuItem value={0}>
              Everyone
            </MenuItem>

            {freelancers.map(f => (
              <MenuItem value={f.rawId} key={f.id}>
                {f.name}
              </MenuItem>
            ))}
          </SelectField>

          <div className={styles.actions}>
            <Button muiComponent={Link} color="primary" href="/client/manage" as="/client/manage?tab=work" className={styles.link}>
              View Work Reports
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  )
}

export default TeamCostBreakdown
