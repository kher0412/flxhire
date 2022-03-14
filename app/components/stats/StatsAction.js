import { GET } from 'react-admin'

export const LOAD_STATS = 'LOAD_STATS'

export const loadStats = () => ({
  type: LOAD_STATS,
  payload: {id: 100},
  meta: { resource: 'stats', fetch: GET, cancelPrevious: true },
})
