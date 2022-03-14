export const managerInvitations = [
  {
    status: 'offer_made',
    invitation_type: 'invitation',
    allow_hire_access: true,
    allow_manage_access: true,
    payments_enabled: false,
    enable_timesheets: false,
  },
]

export const memberInvitations = [
  {
    id: 50000,
    status: 'sent',
    email: null, // e-mail the client will register with
    first_name: 'Ted',
    last_name: 'Invi',
    firm_id: null, // id of firm where the client will be a manager
    invitation_type: 1,
  },
]
