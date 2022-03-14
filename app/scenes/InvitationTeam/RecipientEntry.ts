export interface IRecipientEntry {
  first_name: string
  last_name: string
  email: string
  invitation_type: 'individual' | 'manager' | 'admin'
}
