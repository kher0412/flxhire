import React, { Fragment } from 'react'
import Divider from '@material-ui/core/Divider'
import { getYear, addYears, format, isThisYear, isSameYear } from 'date-fns'
import { SelectableCell } from '../SelectableCell'
import { Text } from '../Text'
import { Row } from '../Row'

function getSurroundingYears(date, amount = 8, dateFormat = 'YYYY') {
  const result = []
  const selectedYearIndex = getYear(date) % amount
  for (let year = 0; year < amount; year++) {
    const dateValue = addYears(date, year - selectedYearIndex)
    result.push({ dateValue, label: format(dateValue, dateFormat) })
  }
  return result
}

class YearSelect extends React.PureComponent {
  render() {
    const { setDate, date } = this.props

    return (
      <Fragment>
        <Divider style={{ margin: '8px -8px 8px' }} />
        <Row data-cy="years">
          {getSurroundingYears(date).map(year => (
            <SelectableCell
              key={year.label}
              onClick={() => setDate(year.dateValue)}
              isSelected={isSameYear(year.dateValue, date)}
              isCurrent={isThisYear(year.dateValue)}
              widthPercentage={1 / 4}
              horizontalSpacing
              data-cy={year.label}
            >
              <Text>{year.label}</Text>
            </SelectableCell>
          ))}
        </Row>
      </Fragment>
    )
  }
}

export default YearSelect
