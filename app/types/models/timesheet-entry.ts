/* eslint-disable camelcase */

/**
 * @see backend/app/serializers/timesheet_entry_serializer.rb
 */
export interface ITimesheetEntry {
  id: number
  timesheet_id: number
  start_time: string
  end_time: string
  description: string
  project_code: number
  expense_type: string
}
