import React from 'react'
import { DATE_PATTERN } from 'services/timeKeeping'
import { Grid } from '@material-ui/core'
import { TextField, DatePicker } from 'components/themed'
import moment from 'moment'
import { FormValue } from 'types'

const TIME_FORMAT = 'HH:mm'

interface FormTimesheetEntry {
  start_time: FormValue<string>
  end_time: FormValue<string>
}

interface ITimeFieldsProps {
  timesheet_entries: FormTimesheetEntry[]
}

const useContainer = ({ timesheet_entries }: ITimeFieldsProps) => {
  // Redux-form will give an array of entries, but only populate the entry which we are actually editing, the rest is undefined.
  const entry = timesheet_entries.find(e => !!e)

  const handleDayChange = (event) => {
    const value = event
    // Value is YYYY-MM-DD string
    // This method picks the new day chosen by the user and applies it to start_time and end_time
    const currentStart = moment(entry.start_time.input.value)
    const currentStartObject = currentStart.toObject()
    const newStart = moment(value, DATE_PATTERN).clone()
      .startOf('day')
      .add(currentStartObject.hours, 'hours')
      .add(currentStartObject.minutes, 'minutes')
    const currentEnd = moment(entry.end_time.input.value)
    const currentEndObject = currentEnd.toObject()
    const newEnd = moment(value, DATE_PATTERN)
      .startOf('day')
      .add(currentEndObject.hours, 'hours')
      .add(currentEndObject.minutes, 'minutes')
    entry.start_time.input.onChange(newStart.format())
    entry.end_time.input.onChange(newEnd.format())
  }

  const updateTime = name => (event) => {
    const value = event.target.value
    // Value format: '17:00'
    // This method picks the new time chosen by the user and applies it to start_time or end_time
    const current = moment(entry[name].input.value)
    const time = moment(value, 'HH:mm').toObject()
    const newValue = current.clone()
      .startOf('day')
      .add(time.hours, 'hours')
      .add(time.minutes, 'minutes')
    entry[name].input.onChange(newValue.format())
  }

  return {
    workEntry: entry,
    handleDayChange,
    updateTime,
  }
}

const TimeFields = (props: ITimeFieldsProps) => {
  const { workEntry, handleDayChange, updateTime } = useContainer(props)

  if (workEntry) {
    let { start_time, end_time } = workEntry
    const timeStarted = moment(start_time.input.value)
    const timeEnded = moment(end_time.input.value)
    const day = moment(start_time.input.value || end_time.input.value)

    const hoursStarted = timeStarted.format(TIME_FORMAT)
    const hoursEnded = timeEnded.format(TIME_FORMAT)

    const hours = timeEnded && timeStarted ? moment(timeEnded).diff(timeStarted, 'hours') : 0
    const minutes = timeEnded && timeStarted ? moment(timeEnded).diff(timeStarted, 'minutes') - (hours * 60) : 0

    return (
      <React.Fragment>
        <Grid item xs={12}>
          <DatePicker
            value={day}
            onChange={handleDayChange}
            label="Date"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            input={{
              name: 'start_time',
              value: hoursStarted,
              onChange: updateTime('start_time'),
            }}
            meta={start_time.meta}
            type="time"
            label="Time Started"
            inputProps={{ step: 300 }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            input={{
              name: 'end_time',
              value: hoursEnded,
              onChange: updateTime('end_time'),
            }}
            meta={end_time.meta}
            type="time"
            label="Time Ended"
            inputProps={{ step: 300, 'data-cy': 'textfield-input-end_time' }}
          />
        </Grid>

        <div data-cy="total-time" style={{ display: 'flex', alignItems: 'center' }}>
          {hours} hour(s) {minutes} minutes
        </div>
      </React.Fragment>
    )
  }

  return null
}

export default TimeFields
