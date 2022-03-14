import React from 'react'
import { Grid, MenuItem } from '@material-ui/core'
import { SelectTimeZone } from 'components'
import { DateTimePicker, TextField, SelectField } from 'components/themed'
import { FormValue, IContract, IFreelancer } from 'types'
import { setUTCOffset } from 'services/timeKeeping'
import { isNumber } from 'services/numbers'
import moment from 'moment'
import { DATE_TIME_FORMAT_SHORT } from 'services/formatting'
import { useCurrentUser } from 'hooks'

interface IInterviewRowProps {
  field: FormValue<string>
  id: number
  freelancer: Pick<IFreelancer, 'timezone_offset' | 'first_name'>
  timezoneOffset: number
}

const InterviewRow = ({ field, id, freelancer, timezoneOffset }: IInterviewRowProps) => {
  const rawValue = (field.input.value || null) as any
  const value = rawValue ? moment(rawValue) : null
  let label = value?.format(DATE_TIME_FORMAT_SHORT) || ''
  if (label && isNumber(timezoneOffset) && isNumber(freelancer.timezone_offset)) {
    const rawDate = moment(value).clone()
    const date = setUTCOffset(rawDate, timezoneOffset).utcOffset(freelancer.timezone_offset, false)
    const formattedDate = date.format(DATE_TIME_FORMAT_SHORT)
    if (label === formattedDate) {
      label += ` | Same for ${freelancer.first_name}`
    } else {
      label += ` | ${formattedDate} for ${freelancer.first_name}`
    }
  }
  return (
    <DateTimePicker
      name={field.input.name}
      label={`Interview time option ${id}`}
      labelRenderer={() => label}
      fullWidth
      disablePast
      onChange={field.input.onChange}
      value={value}
      helperText={field.meta.touched && field.meta.error ? field.meta.error : null}
      data-cy={`textfield-input-interview_date_${id}`}
    />
  )
}

interface IInterviewDateFieldsProps {
  timezone_offset: FormValue<number>
  interview_date_1: FormValue<string>
  interview_date_2: FormValue<string>
  interview_date_3: FormValue<string>
  calendly_url: FormValue<string>
  interview_scheduling_method: FormValue<IContract['interview_scheduling_method']>
  freelancer: IFreelancer
  userTimezone: number
}

export const InterviewDateFields = (props: IInterviewDateFieldsProps) => {
  const { timezone_offset, interview_date_1, interview_date_2, interview_date_3, freelancer, userTimezone, calendly_url, interview_scheduling_method } = props
  const [user] = useCurrentUser()
  const enableCalendly = Boolean(user?.configuration?.enable_calendly || user?.calendly_url)
  const timezonesSecondaryText = {}
  if (isNumber(userTimezone)) timezonesSecondaryText[userTimezone] = 'Your current timezone'

  if (isNumber(freelancer.timezone_offset)) {
    const v = timezonesSecondaryText[freelancer.timezone_offset]
    if (v) {
      timezonesSecondaryText[freelancer.timezone_offset] = `${v} | ${freelancer.first_name}'s Timezone`
    } else {
      timezonesSecondaryText[freelancer.timezone_offset] = `${freelancer.first_name}'s Timezone`
    }
  }

  const useCalendly = interview_scheduling_method.input.value === 'schedule_via_calendly'

  return (
    <React.Fragment>
      {enableCalendly && (
        <Grid item xs={12} md={12}>
          <SelectField
            input={interview_scheduling_method.input}
            meta={interview_scheduling_method.meta}
            label="Scheduling Method"
            fullWidth
          >
            <MenuItem value="schedule_via_calendly" data-cy="calendly">Schedule via Calendly</MenuItem>
            <MenuItem value="schedule_via_flexhire" data-cy="flexhire">Schedule on Flexhire</MenuItem>
          </SelectField>
        </Grid>
      )}

      {!useCalendly && (
        <React.Fragment>
          <Grid item xs={12} md={12}>
            <SelectTimeZone
              name="timezone_offset"
              label="Timezone"
              input={timezone_offset.input}
              meta={timezone_offset.meta}
              fullWidth
              compact
              timezonesSecondaryText={timezonesSecondaryText}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <InterviewRow
              field={interview_date_1}
              id={1}
              freelancer={freelancer}
              timezoneOffset={timezone_offset.input.value}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <InterviewRow
              field={interview_date_2}
              id={2}
              freelancer={freelancer}
              timezoneOffset={timezone_offset.input.value}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <InterviewRow
              field={interview_date_3}
              id={3}
              freelancer={freelancer}
              timezoneOffset={timezone_offset.input.value}
            />
          </Grid>
        </React.Fragment>
      )}
      {useCalendly && (
        <Grid item xs={12}>
          <TextField
            input={calendly_url.input}
            meta={calendly_url.meta}
            label="Calendly Link"
            placeholder="Paste your Calendly link here"
            fullWidth
          />
        </Grid>
      )}
    </React.Fragment>
  )
}
