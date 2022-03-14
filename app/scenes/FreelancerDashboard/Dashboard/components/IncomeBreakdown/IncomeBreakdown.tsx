import React from 'react'
import MediaQuery from 'components/MediaQuery'
import Link from 'components/Link'
import moment from 'moment'
import { Card, CardHeader, MenuItem, CardActions } from '@material-ui/core'
import { Button, SelectField } from 'components/themed'
import { Line as LineChart } from 'react-chartjs'
import { Tag, Tags } from 'components'
import { getBreakdown } from 'services/timesheets'
import { DateRange } from '@material-ui/icons'
import { IncomeBreakdownContainerProps } from './IncomeBreakdownContainer'
import styles from './IncomeBreakdown.module.css'

const CHART_NUM_STEPS = 3

export interface IIncomeBreakdownProps extends IncomeBreakdownContainerProps {
}

export interface IIncomeBreakdownState {
  groupBy: 'week' | 'month'
}

export default class IncomeBreakdown extends React.Component<IIncomeBreakdownProps, IIncomeBreakdownState> {
  static defaultProps: Partial<IIncomeBreakdownProps> = {
    stats: {} as any,
  }

  constructor(props: IIncomeBreakdownProps) {
    super(props)

    this.state = {
      groupBy: 'week',
    }
  }

  render() {
    const { total_paid } = this.props.stats

    return (
      <Card className={styles.container} raised>
        <CardHeader
          title={(
            <Tags>
              <Tag>
                <MediaQuery minWidth={600}>Income breakdown</MediaQuery>
                <MediaQuery maxWidth={599}>Income</MediaQuery>
              </Tag>

              <Tag>
                <MediaQuery minWidth={600}>${Math.round(total_paid)} total earned</MediaQuery>
                <MediaQuery maxWidth={599}>${Math.round(total_paid)} earned</MediaQuery>
              </Tag>
            </Tags>
          )}
        />

        <div className={styles.chart}>
          {this.renderChart()}
        </div>

        <CardActions className={styles['bottom-bar']}>
          <SelectField value={this.state.groupBy} onChange={this.handleGroupByChange}>
            <MenuItem value="month">
              View by month
            </MenuItem>

            <MenuItem value="week">
              View by week
            </MenuItem>
          </SelectField>

          <div className={styles.actions}>
            <Link href="/member/work_reports" className={styles.link} data-cy="view-timesheets">
              <Button color="secondary">
                <DateRange style={{ marginRight: 12 }} /> View Work Reports
              </Button>
            </Link>
          </div>
        </CardActions>
      </Card>
    )
  }

  renderChart() {
    const { timesheets } = this.props

    if (timesheets && timesheets.length > 0) {
      const { chartData, scaleStep } = this.getChartData()

      return (
        <LineChart
          key={this.state.groupBy}
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
            scaleLineColor: 'rgba(0, 0, 0, 0.2)',
            scaleFontColor: 'rgba(0, 0, 0, 0.4)',
            scaleFontSize: 11,
          }}
        />
      )
    }

    return null
  }

  handleGroupByChange = (e) => {
    this.setState({
      groupBy: e.target.value,
    })
  }

  componentDidMount() {
    this.props.getTimesheets()
  }

  getTimesheetGroupStartDate(timesheet) {
    const timesheetStartDate = moment(timesheet.start_date)

    switch (this.state.groupBy) {
      case 'month':
        return timesheetStartDate.startOf('month').format('MM')

      default: // week
        return timesheetStartDate.startOf('isoWeek').format('MM-DD')
    }
  }

  getChartData() {
    const { timesheets } = this.props
    let dataValues: number[]
    let dataLimit = 0

    if (this.state.groupBy === 'month') {
      dataLimit = 6
    } else {
      dataLimit = 10
    }
    dataValues = getBreakdown(timesheets, {
      numItems: dataLimit,
      getRate: t => t.freelancer_rate,
      groupByDays: this.state.groupBy === 'month' ? 30 : 7,
    })

    const maxValue = dataValues.reduce((a, b) => Math.max(a, b), 0)
    const scaleStepRoundingUnit = this.state.groupBy === 'week' ? 100 : 500

    return {
      scaleStep: Math.ceil(maxValue / CHART_NUM_STEPS / scaleStepRoundingUnit) * scaleStepRoundingUnit,
      chartData: {
        labels: this.getDataLabels(dataValues, dataLimit).reverse(),
        datasets: [
          {
            label: 'Income',
            fillColor: 'rgba(46, 203, 128, 0.1)',
            strokeColor: 'rgba(46, 203, 128, 0.9)',
            pointColor: 'rgb(46, 203, 128)',
            pointStrokeColor: 'rgba(0, 0, 0, 0)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: dataValues.reverse(),
          },
        ],
      },
    }
  }

  getDataLabels(dataValues: number[], limit: number): string[] {
    let n = Math.min(dataValues.length, limit)
    let labels = new Array<string>(n)

    if (this.state.groupBy === 'month') {
      for (let i = 0; i < n; i++) {
        labels[i] = moment().subtract(i * 30, 'days').startOf('day').format('MMM')
      }
    } else {
      for (let i = 0; i < n; i++) {
        labels[i] = moment().subtract(i * 7, 'days').startOf('day').format('MMM/DD')
      }
    }

    return labels
  }
}
