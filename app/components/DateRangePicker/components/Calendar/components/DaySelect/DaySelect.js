import React, { Fragment, Component } from 'react'
import Divider from '@material-ui/core/Divider'
import { isSameMonth, isWithinRange, isSameDay, isToday } from 'date-fns'
import { Header } from '../Header'
import { Text } from '../Text'
import { Row } from '../Row'
import { DayCell } from './components/DayCell'

const dateIsInRange = (date, fromDate, toDate) => fromDate && toDate && isWithinRange(date, fromDate, toDate)

const isSelected = (date, compareDate) => compareDate && isSameDay(date, compareDate)

class DaySelect extends Component {
  render() {
    const {
      fromDate,
      toDate,
      getWeeksInMonth,
      getDayLabelsInWeek,
      date,
    } = this.props

    const weeksInMonth = getWeeksInMonth()
    const isInOtherMonth = dateValue => !isSameMonth(date, dateValue)
    return (
      <Fragment>
        <Row style={{ flexWrap: 'nowrap' }}>
          {getDayLabelsInWeek('dd').map(day => (
            <Header key={day}>
              <Text>{day}</Text>
            </Header>
          ))}
        </Row>
        <Divider style={{ margin: '8px -8px 8px' }} />
        <Row data-cy="days">
          {weeksInMonth.map(week => week.map((day) => {
            const isFromDate = isSelected(day.dateValue, fromDate)
            const isToDate = isSelected(day.dateValue, toDate)
            return (
              <DayCell
                setSelectedDate={this.props.setSelectedDate}
                key={day.label}
                item={day.dateValue}
                isLessImportant={isInOtherMonth(day.dateValue)}
                isRangeStart={isFromDate && toDate}
                isInRange={dateIsInRange(day.dateValue, fromDate, toDate)}
                isRangeEnd={isToDate && fromDate}
                isSelected={isFromDate || isToDate}
                isCurrent={isToday(day.dateValue)}
                data-cy={day.label}
              >
                <Text>{day.label}</Text>
              </DayCell>
            )
          }))}
        </Row>
      </Fragment>
    )
  }
}

export default DaySelect
