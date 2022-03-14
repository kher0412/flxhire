import React, { Fragment } from 'react'
import Divider from '@material-ui/core/Divider'
import { isSameMonth, getMonth, addMonths, format, isThisMonth } from 'date-fns'
import { Header } from '../Header'
import { SelectableCell } from '../SelectableCell'
import { YearSelect } from '../YearSelect'
import { Text } from '../Text'
import { Row } from '../Row'

function getMonthsInYear(date, dateFormat = 'MMM') {
  const result = []
  const selectedMonth = getMonth(date)
  for (let month = 0; month < 12; month++) {
    const dateValue = addMonths(date, month - selectedMonth)
    result.push({ dateValue, label: format(dateValue, dateFormat) })
  }
  return result
}

function MonthSelect(props) {
  const { setDate, date } = props

  return (
    <Fragment>
      <Header widthPercentage={1}>
        <Text>Month & Year</Text>
      </Header>
      <Divider style={{ margin: '0px -8px 8px' }} />
      <Row data-cy="months">
        {getMonthsInYear(date).map(month => (
          <SelectableCell
            key={month.label}
            onClick={() => setDate(month.dateValue)}
            isSelected={isSameMonth(month.dateValue, date)}
            isCurrent={isThisMonth(month.dateValue)}
            widthPercentage={1 / 4}
            horizontalSpacing
            data-cy={month.label}
          >
            <Text>{month.label}</Text>
          </SelectableCell>
        ))}
      </Row>
      <YearSelect {...props} />
    </Fragment>
  )
}

export default MonthSelect
