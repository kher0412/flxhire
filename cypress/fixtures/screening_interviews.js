import moment from 'moment'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

const today = moment().startOf('day')

export const screeningInterviews = [
  {
    id: 90000,
    datetime: moment(today).add(3, 'days').format(DATE_TIME_FORMAT),
    status: 'available',
    reason: null,
    internal_reason: null,
  }, {
    id: 90001,
    datetime: moment(today).add(4, 'days').format(DATE_TIME_FORMAT),
    status: 'available',
    reason: null,
    internal_reason: null,
  }, {
    id: 90002,
    datetime: moment(today).add(5, 'days').format(DATE_TIME_FORMAT),
    status: 'available',
    reason: null,
    internal_reason: null,
  },
]
