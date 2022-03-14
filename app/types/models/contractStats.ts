export interface IContractStatsForClient {
  managed_by_me: {
    interviews_total_count: number
    interviews_actionable_count: number
    offers_total_count: number
    offers_actionable_count: number
  }
  whole_team: {
    interviews_total_count: number
    interviews_actionable_count: number
    offers_total_count: number
    offers_actionable_count: number
  }
}
