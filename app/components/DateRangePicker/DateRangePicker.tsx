import React from 'react'
import { isSameDay, isAfter, isBefore } from 'date-fns'
import moment from 'moment'
import Kalendaryo from 'kalendaryo'
import { Dialog } from '@material-ui/core'
import { TextField } from 'components/themed'
import { Calendar } from './components/Calendar'

const renderCalendar = props => <Calendar {...props} />

interface IDateRangePickerProps {
  name: string
  onChange: (value: { fromDate: Date, toDate: Date }) => void
  placeholder?: string
  emptyLabel?: string
  fromDate?: Date
  toDate?: Date
  format?: string
  autoOk?: boolean
  formatInputValue?: (props: IDateRangePickerProps) => string
}

interface IDateRangePickerState {
  isOpen: boolean
  openedThroughFocus: boolean
}

class DateRangePicker extends React.PureComponent<IDateRangePickerProps & Omit<React.ComponentProps<typeof TextField>, 'onChange'>, IDateRangePickerState> {
  closeTime = performance.now()

  state = {
    isOpen: false,
    openedThroughFocus: false,
  }

  static defaultProps = {
    fromDate: null,
    toDate: null,
    format: 'YYYY-MM-DD',
    placeholder: '',
    emptyLabel: '',
  }

  render() {
    const { name, placeholder, fromDate, toDate, format, formatInputValue, onChange, ...otherProps } = this.props

    return (
      <React.Fragment>
        <TextField
          label={placeholder}
          fullWidth
          value={formatInputValue ? formatInputValue(this.props) : this.formatInputValue()}
          onClick={this.onOpen(true)}
          onFocus={this.onOpen()}
          onBlur={this.clearOpenThroughFocus}
          name={name ? `date-range-picker-${name}` : undefined}
          {...otherProps}
        />

        {this.state.isOpen ? (
          // NOTE: do not use a responsive dialog here
          <Dialog
            onClose={this.onClose}
            onBackdropClick={this.onClose}
            onEscapeKeyDown={this.onClose}
            open
            data-cy={`date-range-picker-${name}`}
          >
            <Kalendaryo
              startCurrentDateAt={fromDate}
              fromDate={fromDate}
              toDate={toDate}
              clearDateRange={this.clearDateRange}
              startWeekAt={1}
              defaultFormat={format}
              onSelectedChange={this.setDateRange}
              render={renderCalendar}
            />
          </Dialog>
        ) : null}
      </React.Fragment>
    )
  }

  setDateRange = (selectedDate) => {
    const { fromDate, toDate, onChange, autoOk } = this.props

    // Reset the state if the selected date is equal
    if (toDate && isSameDay(selectedDate, toDate)) {
      onChange({ fromDate, toDate: null })
      return
    }
    if (fromDate && isSameDay(selectedDate, fromDate)) {
      onChange({ fromDate: null, toDate })
      return
    }

    // Starting date got deselected and the newly selected date is after the currently selected date.
    if (!fromDate && toDate && isAfter(selectedDate, toDate)) {
      onChange({ fromDate: toDate, toDate: selectedDate })
      return
    }

    // Nothing was selected or the starting date got de and reselected before the currently selected date.
    if (!fromDate) {
      onChange({ fromDate: selectedDate, toDate })
    } else {
      // Selecting an ending date for a starting date
      if (isAfter(selectedDate, fromDate)) {
        onChange({ fromDate, toDate: selectedDate })
      // Extending range before the starting date
      } else if (toDate && isBefore(selectedDate, fromDate)) {
        onChange({ fromDate: selectedDate, toDate })
      // We had a selected date and the one selected next is before it.
      } else if (isBefore(selectedDate, fromDate)) {
        onChange({ fromDate: selectedDate, toDate: fromDate })
      }

      // Both dates are selected if we get here
      if (autoOk) {
        this.setState({ isOpen: false })
      }
    }
  }

  formatInputValue() {
    const { fromDate, toDate, format, emptyLabel } = this.props
    if (fromDate && toDate) return `${moment(fromDate).format(format)} - ${moment(toDate).format(format)}`
    if (fromDate) return `After ${moment(fromDate).format(format)}`
    if (toDate) return `Before ${moment(toDate).format(format)}`
    return emptyLabel
  }

  clearDateRange = () => this.props.onChange({ fromDate: null, toDate: null })

  onOpen = (force = false) => () => {
    if (performance.now() - this.closeTime < 200) return

    if (!this.state.openedThroughFocus || force) {
      this.setState({ isOpen: true, openedThroughFocus: true })
    }
  }

  onClose = () => {
    this.closeTime = performance.now()

    this.setState({
      isOpen: false,
    })

    // When the calendar dialog closes, the outside input gains focus unintentionally.
    // Manually blurring works around this problem.
    window.setTimeout(() => {
      if (document.activeElement) {
        (document.activeElement as any).blur()
      }
    }, 0)
  }

  clearOpenThroughFocus = () => this.setState({ openedThroughFocus: false })
}

export default DateRangePicker
