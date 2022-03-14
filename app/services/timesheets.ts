import { startCase } from 'lodash'
import moment from 'moment'
import { ITimesheetEntry, IExpense, ITimesheetForFreelancer, ITimesheet, ICurrentUser, ITimesheetForClient } from 'types'
import { formatAsShortDate } from './formatting'
import { getNextPayoutMoment } from './invoice'

// Total Calculation utils

export const getTotalHours = (activities: ITimesheetEntry[]) => {
  if (!Array.isArray(activities)) return 0
  return Math.floor(activities
    .filter(activity => activity?.start_time && activity?.end_time)
    .map(activity => moment(activity.end_time).diff(moment(activity.start_time), 'minutes'))
    .reduce((a, b) => a + b, 0) / 60)
}

export const getTotalMinutes = (activities: ITimesheetEntry[]) => {
  if (!Array.isArray(activities)) return 0
  return activities
    .filter(activity => activity?.start_time && activity?.end_time)
    .map(activity => moment(activity.end_time).diff(moment(activity.start_time), 'minutes'))
    .reduce((a, b) => a + b, 0) - getTotalHours(activities) * 60
}

export const getTotalTimeInHours = (activities: ITimesheetEntry[]) => {
  if (!Array.isArray(activities)) return 0
  return getTotalMinutes(activities) / 60.0 + getTotalHours(activities)
}

export const getTotalCostForHours = (activities: ITimesheetEntry[], rate: number) => {
  if (!Array.isArray(activities) || !(rate > 0)) return 0
  return getTotalTimeInHours(activities) * rate
}

export const getTotalCostForExpenses = (expenses: IExpense[]) => {
  if (!Array.isArray(expenses)) return 0
  return expenses.map(e => e?.amount).reduce((acc, v) => parseFloat((v || 0) as any) + acc, 0)
}

export function getPaymentAt(timesheet: ITimesheetForFreelancer) {
  const paymentAt = timesheet.paid_at || timesheet.payout_due_date || timesheet.assumed_payout_due_date
  return paymentAt ? moment(paymentAt).add(1, 'day') : null
}

export const getPayoutsWaitForDate = (user: ICurrentUser) => {
  return user?.configuration?.payouts_wait_for_payout_due_date
}

export const getTimesheetPayoutDeadline = (timesheet: Pick<ITimesheet, 'payout_due_date' | 'assumed_payout_due_date'>) => {
  if (timesheet.payout_due_date) return moment(timesheet.payout_due_date)
  if (timesheet.assumed_payout_due_date) return moment(timesheet.assumed_payout_due_date).startOf('day')

  return null
}

export function getPaymentDueDate(timesheet: ITimesheet, user: ICurrentUser) {
  return timesheet.client_paid_at && !getPayoutsWaitForDate(user) ? getNextPayoutMoment().toDate().toString() : getTimesheetPayoutDeadline(timesheet)
}

export function getStatusForFreelancer(timesheet: ITimesheetForFreelancer) {
  if (!timesheet?.status) return null

  if (timesheet.freelancer_status !== 'paid' && timesheet.payable) {
    const paymentDate = getPaymentAt(timesheet)
    if (paymentDate && paymentDate.isBefore(moment())) {
      return 'Overdue'
    }
  }
  if (timesheet.status === 'pending') return 'Draft'
  return startCase(timesheet.client_status)
}

export function getStatusForClient(timesheet: Pick<ITimesheetForClient, 'status'>) {
  if (!timesheet?.status) return null

  if (timesheet.status === 'pending') return 'Draft'
  return startCase(timesheet.status)
}

// Validator utils

export const isValidPeriod = (values: Partial<ITimesheetEntry>) => {
  if (values?.start_time && values?.end_time) {
    const timeStarted = moment(values.start_time)
    const timeEnded = moment(values.end_time)
    return moment(timeStarted).isBefore(timeEnded)
  }
  return false
}

// Time display utils

export function formatTime(time) {
  if (!time) return time
  return moment(time).format('h:mm A')
}

export function getDay(time) {
  if (!time) return time
  return moment(time).format('ddd, MMM Do')
}

// Merged charts

interface BreakdownOptions<T extends ITimesheet> {
  getRate?: (timesheet: T) => number
  filter?: (timesheet: T) => boolean
  numItems: number
  groupByDays: number
}

export function getBreakdown<T extends ITimesheet>(timesheets: T[], options: BreakdownOptions<T>): number[] {
  const numDays = options.numItems * (options.groupByDays || 1)
  const dailySlots = new Float64Array(numDays)

  for (let timesheet of timesheets) {
    if (typeof options.filter !== 'function' || options.filter(timesheet)) {
      for (let entry of timesheet.timesheet_entries) {
        let entryStart = moment(entry.start_time)
        let entryEnd = moment(entry.end_time)
        let entryIndex = moment().diff(entryEnd, 'days')

        if (entryIndex < numDays && entryIndex >= 0) {
          const multiplier = typeof options.getRate === 'function' ? options.getRate(timesheet) : 1
          dailySlots[entryIndex] += (entryEnd.diff(entryStart) / 1000 / 60 / 60) * multiplier
        }
      }
    }
  }

  const dailySlotsArray = Array.from(dailySlots)

  if (options.groupByDays) {
    const groupedSlots = new Float64Array(options.numItems)

    for (let i = 0; i < numDays; i++) {
      const slot = Math.floor(i / options.groupByDays)
      groupedSlots[slot] += dailySlotsArray[i]
    }

    return Array.from(groupedSlots)
  }

  return dailySlotsArray
}
