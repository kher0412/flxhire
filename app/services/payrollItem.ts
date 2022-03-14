import { formatAsDate } from './formatting'

export function getFormattedApprovalDate(autoApproved: boolean, approvedOnDate: string) {
  if (autoApproved) {
    return 'Auto-approved'
  }

  if (approvedOnDate) {
    return formatAsDate(approvedOnDate)
  }

  return '-'
}
