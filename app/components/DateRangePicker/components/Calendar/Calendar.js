import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import Cancel from '@material-ui/icons/Cancel'
import Card from '@material-ui/core/Card'
import { DaySelect } from './components/DaySelect'
import { MonthSelect } from './components/MonthSelect'
import { Row } from './components/Row'
import { Cell } from './components/Cell'

const cardStyle = {
  width: '325px',
  minWidth: '310px',
  zIndex: 1,
  flexDirection: 'row',
  padding: '8px',
}

const monthSelectorStyle = {
  fontWeight: 600,
  fontSize: '14px',
}

const monthButtonStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
}

export default class Calendar extends PureComponent {
  state = { monthSelectOpen: false }

  render() {
    const { getFormattedDate, setDateNextMonth, setDatePrevMonth, clearDateRange } = this.props
    const { monthSelectOpen } = this.state
    return (
      <Card
        raised
        onMouseDown={this.preventInputLosingFocus}
        style={cardStyle}
      >
        <Row style={{ flexWrap: 'nowrap' }}>
          <Button
            size="small"
            onClick={this.handleMonthTextClick}
            style={monthSelectorStyle}
            data-cy="select-month"
          >
            {getFormattedDate('MMM YYYY')}
            {monthSelectOpen ? <ArrowDropUp /> : <ArrowDropDown />}
          </Button>
          <div style={{ flex: 1 }} role="none" />
          <Cell>
            <IconButton onClick={clearDateRange} aria-label="Clear selection" style={monthButtonStyle} data-cy="clear-selection">
              <Cancel />
            </IconButton>
          </Cell>
          <Cell>
            <IconButton onClick={setDatePrevMonth} aria-label="Previous month" style={monthButtonStyle} data-cy="previous-month">
              <NavigateBefore />
            </IconButton>
          </Cell>
          <Cell>
            <IconButton onClick={setDateNextMonth} aria-label="Next month" style={monthButtonStyle} data-cy="next-month">
              <NavigateNext />
            </IconButton>
          </Cell>
        </Row>
        {monthSelectOpen ? <MonthSelect {...this.props} /> : <DaySelect {...this.props} />}
      </Card>
    )
  }

  handleMonthTextClick = () => this.setState(({ monthSelectOpen }) => ({ monthSelectOpen: !monthSelectOpen }))

  preventInputLosingFocus = e => e.preventDefault()
}
