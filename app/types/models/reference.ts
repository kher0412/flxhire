
export interface IReference {
  id: number
  name: string
  email: string
  relation: 'friend' | 'coworker' | 'classmate' | 'client' | 'other'
  status: 'pending' | 'completed'
  created_at: string
  updated_at: string
  other_relation: string
  comments: string
}
