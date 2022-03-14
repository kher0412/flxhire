import React from 'react'
import moment from 'moment'
import { Button } from 'components/themed'
import {
  Menu,
  MenuItem,
} from '@material-ui/core'
import { CalendarToday } from '@material-ui/icons'
import { isMobile } from 'services/browserAgent'

interface IAddToCalendarProps extends React.ComponentProps<typeof Button> {
  title: string
  description: string
  startTime: Date
  endTime: Date
  email?: string
}

interface IAddToCalendarState {
  isCrappyIE: boolean
  open: boolean
}

type CalendarType = 'google' | 'yahoo' | 'outlookcom'

class AddToCalendar extends React.PureComponent<IAddToCalendarProps, IAddToCalendarState> {
  state = {
    isCrappyIE: false,
    open: false,
  }

  anchorEl = React.createRef<Element>()

  render() {
    const {
      title,
      description,
      startTime,
      endTime,
      ...props
    } = this.props

    return (
      <React.Fragment>
        <Button
          responsive
          onClick={this.handleClick}
          ref={this.anchorEl}
          {...props}
        >
          <CalendarToday />
          Add to Calendar
        </Button>
        <Menu
          anchorEl={this.anchorEl.current}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.openCalendar()}>
            Apple (iCalendar)
          </MenuItem>
          <MenuItem onClick={this.openCalendar('google')}>
            Google
          </MenuItem>
          <MenuItem onClick={this.openCalendar('yahoo')}>
            Yahoo
          </MenuItem>
          <MenuItem onClick={this.openCalendar('outlookcom')}>
            Outlook
          </MenuItem>
        </Menu>
      </React.Fragment>
    )
  }

  handleClick = () => {
    this.setState(state => ({
      open: !state.open,
    }))
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentDidMount() {
    this.detectAndPolyfillOldBrowsers()
  }

  // Code below here copied and adapted
  // from https://github.com/jasonsalzman/react-add-to-calendar/blob/master/src/ReactAddToCalendar.js
  // this is because there was no clean way to import it and we had to rewrite this
  // component to be able to integrate it with material-ui

  detectAndPolyfillOldBrowsers = () => {
    let isCrappyIE = false
    if (
      typeof window !== 'undefined' &&
      (window.navigator as any).msSaveOrOpenBlob &&
      window.Blob
    ) {
      isCrappyIE = true
    }

    this.setState({ isCrappyIE })
  }

  openCalendar = (type?: CalendarType) => () => {
    const url = this.buildUrl(type)
    if (
      !isMobile() &&
      (url.indexOf('data') === 0 || url.indexOf('BEGIN') === 0)
    ) {
      let filename = 'download.ics'
      let blob = new Blob([url], { type: 'text/calendar;charset=utf-8' })

      if (this.state.isCrappyIE) {
        (window.navigator as any).msSaveOrOpenBlob(blob, filename)
      } else {
        /** **************************************************************
        // many browsers do not properly support downloading data URIs
        // (even with "download" attribute in use) so this solution
        // ensures the event will download cross-browser
        *************************************************************** */
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } else {
      window.open(url, '_blank')
    }
    this.setState({ open: false })
  }

  // Code below here copied and adapted
  // from https://github.com/jasonsalzman/react-add-to-calendar/blob/master/src/helpers/index.js
  // this is because there was no clean way to import it and we had to rewrite this
  // component to be able to integrate it with material-ui

  formatTime(date) {
    let formattedDate = moment.utc(date).format('YYYYMMDDTHHmmssZ')
    return formattedDate.replace('+00:00', 'Z')
  }

  calculateDuration(startTime, endTime) {
    // snag parameters and format properly in UTC
    let end = moment.utc(endTime).format('DD/MM/YYYY HH:mm:ss')
    let start = moment.utc(startTime).format('DD/MM/YYYY HH:mm:ss')

    // calculate the difference in milliseconds between the start and end times
    let difference = moment(end, 'DD/MM/YYYY HH:mm:ss').diff(
      moment(start, 'DD/MM/YYYY HH:mm:ss'),
    )

    // convert difference from above to a proper momentJs duration object
    let duration = moment.duration(difference)

    return (
      Math.floor(duration.asHours()) + moment.utc(difference).format(':mm')
    )
  }

  buildUrl(type?: CalendarType) {
    const {
      title,
      description,
      startTime,
      endTime,
    } = this.props
    const { isCrappyIE } = this.state
    const event = {
      title,
      description,
      startTime,
      endTime,
      location: '', // otherwise it sends 'undefined' into the Google form
    }
    let calendarUrl = ''

    // allow mobile browsers to open the gmail data URI within native calendar app
    // type = (type == "google" && this.isMobile()) ? "outlook" : type;

    switch (type) {
      case 'google':
        calendarUrl = 'https://calendar.google.com/calendar/render'
        calendarUrl += '?action=TEMPLATE'
        calendarUrl += `&dates=${this.formatTime(event.startTime)}`
        calendarUrl += `/${this.formatTime(event.endTime)}`
        calendarUrl += `&location=${encodeURIComponent(event.location)}`
        calendarUrl += `&text=${encodeURIComponent(event.title)}`
        calendarUrl += `&details=${encodeURIComponent(event.description)}`
        if (this.props.email) {
          calendarUrl += `&add=${this.props.email}`
        }
        break

      case 'yahoo':
        // yahoo doesn't utilize endTime so we need to calulate duration
        let duration = this.calculateDuration(event.startTime, event.endTime)
        calendarUrl = 'https://calendar.yahoo.com/?v=60&view=d&type=20'
        calendarUrl += `&title=${encodeURIComponent(event.title)}`
        calendarUrl += `&st=${this.formatTime(event.startTime)}`
        calendarUrl += `&dur=${duration}`
        calendarUrl += `&desc=${encodeURIComponent(event.description)}`
        calendarUrl += `&in_loc=${encodeURIComponent(event.location)}`
        if (this.props.email) {
          calendarUrl += `&inv_list=${this.props.email}`
        }
        break

      case 'outlookcom':
        calendarUrl = 'https://outlook.live.com/owa/?rru=addevent'
        calendarUrl += `&startdt=${this.formatTime(event.startTime)}`
        calendarUrl += `&enddt=${this.formatTime(event.endTime)}`
        calendarUrl += `&subject=${encodeURIComponent(event.title)}`
        calendarUrl += `&location=${encodeURIComponent(event.location)}`
        calendarUrl += `&body=${encodeURIComponent(event.description)}`
        calendarUrl += '&allday=false'
        calendarUrl += `&uid=${this.getRandomKey()}`
        calendarUrl += '&path=/calendar/view/Month'
        if (this.props.email) {
          calendarUrl += `&to=${this.props.email}`
        }
        break

      default:
        calendarUrl = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'BEGIN:VEVENT',
          `URL:${document.URL}`,
          `DTSTART:${this.formatTime(event.startTime)}`,
          `DTEND:${this.formatTime(event.endTime)}`,
          `SUMMARY:${event.title}`,
          `DESCRIPTION:${event.description}`,
          `LOCATION:${event.location}`,
          'END:VEVENT',
          'END:VCALENDAR',
        ].join('\n')

        if (!isCrappyIE && isMobile()) {
          calendarUrl = encodeURI(
            `data:text/calendar;charset=utf8,${calendarUrl}`,
          )
        }
    }

    return calendarUrl
  }

  getRandomKey() {
    let n = Math.floor(Math.random() * 999999999999).toString()
    return `${new Date().getTime().toString()}_${n}`
  }
}

export default AddToCalendar
