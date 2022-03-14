import moment from 'moment'

const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

const today = moment().startOf('day')

export const invoices = [
  {
    id: 50000,
    status: 'active',
    invoice_date: today.add(2, 'days').add(4, 'hours').format(DATE_TIME_FORMAT),
    due_date: today.add(9, 'days').format(DATE_FORMAT),
    emailed_at: today.add(2, 'days').add(12, 'hours').format(DATE_TIME_FORMAT),
    emailed_to: 'brock.keeper@flexhire.com',
    payout_due_date: today.add(13, 'days').format(DATE_FORMAT),
    currency: 'USD',
    token: 'invoice-token-0',
  }, {
    id: 50001,
    status: 'active',
    invoice_date: today.add(2, 'days').add(4, 'hours').format(DATE_TIME_FORMAT),
    due_date: today.add(9, 'days').format(DATE_FORMAT),
    emailed_at: today.add(2, 'days').add(12, 'hours').format(DATE_TIME_FORMAT),
    emailed_to: 'brock.keeper@flexhire.com',
    payout_due_date: today.add(13, 'days').format(DATE_FORMAT),
    currency: 'USD',
    token: 'invoice-token-1'
  },
]

// Dates after this line doesn't have to be dynamic just in the past.

export const paidInvoices = [
  {
    ...invoices[0],
    client_paid_at: '2019-05-07 18:18:54',
  }, {
    ...invoices[1],
    client_paid_at: '2019-05-07 18:18:54',
  },
]

export const overdueInvoices = [
  {
    ...invoices[0],
    invoice_date: '2019-05-01 04:00:00',
    due_date: '2019-05-08',
    emailed_at: '2019-05-01 12:00:00',
    payout_due_date: '2019-05-11',
  }, {
    ...invoices[1],
    invoice_date: '2019-05-01 04:00:00',
    due_date: '2019-05-08',
    emailed_at: '2019-05-01 12:00:00',
    payout_due_date: '2019-05-11',
  },
]
