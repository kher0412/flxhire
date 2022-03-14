export type TeamSubtabName = 'all' | 'individuals' | 'managers' | 'admins' | 'invited'

export function isValidTeamSubtabName(tabName: string): tabName is TeamSubtabName {
  return ['all', 'individuals', 'managers', 'admins', 'invited'].includes(tabName)
}
