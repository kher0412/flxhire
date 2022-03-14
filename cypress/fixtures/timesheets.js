const moment = require('moment')

const commonTimesheetProperties = (startDate) => {
  const FORMAT = 'YYYY-MM-DD'
  const day = moment(startDate, FORMAT).startOf('day')
  return {
    status: 'pending',
    freelancer_rate_cents: 6400,
    client_rate_cents: 8000,
    timesheet_entries: [
      {
        start_time: `${day.format(FORMAT)} 09:11`,
        description: 'TS1 Monday.',
        end_time: `${day.format(FORMAT)} 10:41`,
      },
      {
        start_time: `${day.clone().add(1, 'days').format(FORMAT)} 09:00`,
        description: 'TS1 Tuesday.',
        end_time: `${day.clone().add(1, 'days').format(FORMAT)} 17:00`,
      },
      {
        start_time: `${day.clone().add(2, 'days').format(FORMAT)} 09:00`,
        description: 'TS1 Wednesday.',
        end_time: `${day.clone().add(2, 'days').format(FORMAT)} 17:00`,
      },
      {
        start_time: `${day.clone().add(3, 'days').format(FORMAT)} 09:00`,
        description: 'TS1 Thursday.',
        end_time: `${day.clone().add(3, 'days').format(FORMAT)} 17:00`,
      },
      {
        start_time: `${day.clone().add(4, 'days').format(FORMAT)} 09:00`,
        description: 'TS1 Friday.',
        end_time: `${day.clone().add(4, 'days').format(FORMAT)} 17:00`,
      },
    ],
  }
}

export const timesheets = [
  {
    id: 90000,
    start_date: '2019-01-07',
    end_date: '2019-01-13',
    status: 'pending',
    freelancer_rate_cents: 6400,
    client_rate_cents: 8000,
    timesheet_entries: [
      {
        start_time: '2019-01-07 09:11',
        description: 'Writing e2e test specification.',
        project_code: '123 Testing',
        end_time: '2019-01-07 10:41',
      },
    ],
  }, {
    id: 90001,
    start_date: '2019-01-14',
    end_date: '2019-01-20',
    status: 'pending',
    freelancer_rate_cents: 6400,
    client_rate_cents: 8000,
    timesheet_entries: [
      {
        start_time: '2019-01-14 09:11',
        description: 'Writing e2e test specification.',
        project_code: '123 Testing',
        end_time: '2019-01-14 10:41am',
      },
      {
        start_time: '2019-01-14 09:00am',
        description: 'Writing e2e tests.',
        end_time: '2019-01-14 05:00pm',
      },
      {
        start_time: '2019-01-18 09:00am',
        description: 'Documenting e2e tests.',
        end_time: '2019-01-18 05:00pm',
      },
    ],
  }, {
    id: 90002,
    start_date: '2019-01-21',
    end_date: '2019-01-27',
    ...commonTimesheetProperties('2019-01-21'),
  }, {
    id: 90003,
    start_date: '2019-01-28',
    end_date: '2019-02-03',
    ...commonTimesheetProperties('2019-01-28'),
  }, {
    id: 90004,
    start_date: '2019-02-04',
    end_date: '2019-02-10',
    ...commonTimesheetProperties('2019-02-04'),
  }, {
    id: 90005,
    start_date: '2019-02-11',
    end_date: '2019-02-17',
    ...commonTimesheetProperties('2019-02-11'),
  }, {
    id: 90006,
    start_date: '2019-02-18',
    end_date: '2019-02-24',
    ...commonTimesheetProperties('2019-02-18'),
  }, {
    id: 90007,
    start_date: '2019-02-25',
    end_date: '2019-03-03',
    ...commonTimesheetProperties('2019-02-25'),
  }, {
    id: 90008,
    start_date: '2019-03-04',
    end_date: '2019-03-10',
    ...commonTimesheetProperties('2019-03-04'),
  }, {
    id: 90009,
    start_date: '2019-03-11',
    end_date: '2019-03-17',
    ...commonTimesheetProperties('2019-03-11'),
  }, {
    id: 90010,
    start_date: '2019-03-18',
    end_date: '2019-03-24',
    ...commonTimesheetProperties('2019-03-18'),
  }, {
    id: 90011,
    start_date: '2019-03-25',
    end_date: '2019-03-31',
    ...commonTimesheetProperties('2019-03-25'),
    timesheet_entries: [
      {
        start_time: '2019-03-25 09:11',
        description: 'I started my PC.',
        project_code: '123 Testing',
        end_time: '2019-03-25 09:12',
      },
    ],
  },
]

export const submittedTimesheets = [
  {
    ...timesheets[0],
    status: 'submitted',
    submitted_at: '2019-03-24 07:22:11.321339',
  }, {
    ...timesheets[1],
    status: 'submitted',
    submitted_at: '2019-03-24 07:22:11.321339',
  }, {
    ...timesheets[2],
    status: 'submitted',
    submitted_at: '2019-03-24 07:22:11.321339',
  }, {
    ...timesheets[3],
    status: 'submitted',
    submitted_at: '2019-03-24 07:22:11.321339',
  }, {
    ...timesheets[4],
    status: 'submitted',
    submitted_at: '2019-03-24 07:22:11.321339',
  }, {
    ...timesheets[5],
    status: 'submitted',
    submitted_at: '2019-03-24 07:22:11.321339',
  }, {
    ...timesheets[6],
    status: 'submitted',
    submitted_at: '2019-03-24 07:22:11.321339',
  }, {
    ...timesheets[7],
    status: 'submitted',
    submitted_at: '2019-03-24 07:22:11.321339',
  }, {
    ...timesheets[8],
    status: 'submitted',
    submitted_at: '2019-03-11 03:29:39.432403',
  }, {
    ...timesheets[9],
    status: 'submitted',
    submitted_at: '2019-03-18 07:22:11.321339',
  }, {
    ...timesheets[10],
    status: 'submitted',
    submitted_at: '2019-03-24 07:22:11.321339',
  },
]

const commonTimesheetExpenseProperties = {
  project_code: 'PR0J3C7 C0D3Z',
  receipt_url: 'https://cdn.filestackcontent.com/GfAZ144sSMShl9hUhKL7',
  currency: 'USD',
}

export const timesheetExpenses = [
  {
    timesheet_id: timesheets[0].id,
    description: 'Software license',
    expense_date: '2019-01-10 23:00:00',
    amount_cents: 10000,
    ...commonTimesheetExpenseProperties,
  }, {
    timesheet_id: timesheets[1].id,
    description: 'Software license',
    expense_date: '2019-01-15 23:00:00',
    amount_cents: 10000,
    ...commonTimesheetExpenseProperties,
  }, {
    timesheet_id: timesheets[1].id,
    description: 'Software license',
    expense_date: '2019-01-19 23:00:00',
    amount_cents: 10000,
    ...commonTimesheetExpenseProperties,
  },
]
