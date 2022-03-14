import React from 'react'
import moment from 'moment'
import { Line as LineChart } from 'react-chartjs'
import { getDay, getTotalHours, getTotalMinutes } from 'services/timesheets'
import { ITimesheetEntry } from 'types'
import { DATE_PATTERN } from 'services/timeKeeping'
import { isNumber } from 'services/numbers'

export interface ITimeWorkedChartProps {
  timesheetEntries: ITimesheetEntry[]
}

function buildOrderedActivities(timesheetEntries: ITimesheetEntry[]) {
  let result = timesheetEntries.map(activity => ({
    ...activity,
    day: moment(activity.start_time || activity.end_time).format(DATE_PATTERN),
    hours: getTotalHours([activity]),
    minutes: getTotalMinutes([activity]),
  }))
  return result.sort((a, b) => (moment(a.day).isBefore(moment(b.day))) ? -1 : 1)
}

function getChartData(timesheetEntries: ITimesheetEntry[]) {
  const hoursByDay = buildOrderedActivities(timesheetEntries || [])
  const dataPoints: { [date: string]: number } = {}

  hoursByDay.forEach((hbd) => {
    const hours = (hbd.hours || 0) + (hbd.minutes || 0) / 60.0
    if (!isNumber(dataPoints[hbd.day])) dataPoints[hbd.day] = 0
    dataPoints[hbd.day] += hours
  })

  return {
    labels: Object.keys(dataPoints).map(k => getDay(k)),
    datasets: [
      {
        label: 'Work hours',
        fillColor: 'rgba(0, 87, 255, 0.1)',
        strokeColor: 'rgb(0, 87, 255)',
        pointColor: 'rgb(0, 87, 255)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: Object.values(dataPoints).map(d => Math.round(d * 100) / 100),
      },
    ],
  }
}

function TimeWorkedChart(props: ITimeWorkedChartProps) {
  const { timesheetEntries } = props

  const containerRef = React.useRef(null)

  const width = containerRef.current?.clientWidth || 1
  const height = 300

  return (
    <div ref={containerRef} style={{ width: '100%', overflow: 'hidden' }}>
      <div style={{ width: '100%', overflow: 'hidden' }}>
        {timesheetEntries?.length > 0 && (
          <LineChart
            data={getChartData(timesheetEntries)}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              showScale: true,
              scaleShowVerticalLines: false,
              scaleLineColor: 'rgba(0,0,0,0.08)',
            }}
            width={width}
            height={height}
            style={{ width: width, height: height }}
          />
        )}
      </div>
    </div>
  )
}

export default React.memo(TimeWorkedChart)
