export const interviews = [
  {
    job_id: 50000, // Need to be in sync with flexhire-rails/db/seeds.rb
    status: 'pending',
    interview_date_1: '2019-03-28 12:00:00',
    interview_date_2: '2019-03-29 14:00:00',
    interview_date_3: '2019-03-31 18:00:00',
    interview_note: 'Please join to channel 3!',
    freelancer_rate_cents: 4000,
    project_length_in_months: 6,
    availability_type: '{full_time}',
    position_types: '{freelancer}',
  }, {
    job_id: 50001, // Need to be in sync with flexhire-rails/db/seeds.rb
    status: 'pending',
    interview_date_1: '2019-03-28 12:00:00',
    interview_date_2: '2019-03-29 14:00:00',
    interview_date_3: '2019-03-31 18:00:00',
    interview_note: 'Please prepare a pen for the interview!',
    freelancer_rate_cents: 6000,
    annual_compensation_cents: 12000000,
    project_length_in_months: 12,
    availability_type: '{full_time}',
    position_types: '{permanent,freelancer}',
  }, {
    // Not created via seeds.rb!
    id: 50000,
    interviewer_name: 'Mr. Quest\'n You',
    interviewer_email: 'quest.test@flexhire.com',
    interviewer_role: 'Interviewer',
    description: 'Outstanding offer',
    status: 'pending',
    interview_date_1: '2019-03-28 12:00:00',
    interview_date_2: '2019-03-29 14:00:00',
    interview_date_3: '2019-03-31 18:00:00',
    availability_type: '{full_time}',
    freelancer_rate_cents: 3200,
    client_rate_cents: 4000,
    client_agrees_terms: false,
    freelancer_agrees_terms: false,
    project_length_in_months: 12,
    annual_compensation_cents: 5000000,
    location_type: 'anywhere',
    position_types: '{permanent,freelancer}',
    default_distance: 100,
    interview_note: 'You have to be able to autonomously navigate yourself to the interview!',
    request_background: false,
    invitation_type: 0,
    payments_enabled: true,
  }, {
    // Not created via seeds.rb!
    interviewer_name: 'Mr. Quest\'n You',
    interviewer_email: 'quest.test@flexhire.com',
    interviewer_role: 'Interviewer',
    description: 'Perfect job for a candidate like you!',
    status: 'pending',
    interview_date_1: '2019-03-28 12:00:00',
    interview_date_2: '2019-03-29 14:00:00',
    interview_date_3: '2019-03-31 18:00:00',
    availability_type: '{full_time}',
    freelancer_rate_cents: 6400,
    client_rate_cents: 8000,
    client_agrees_terms: false,
    freelancer_agrees_terms: false,
    project_length_in_months: 12,
    location_type: 'anywhere',
    position_types: '{freelancer}',
    default_distance: 100,
    interview_note: 'Please prepare a pen for the interview!',
    request_background: false,
    invitation_type: 0,
    payments_enabled: true,
  },
]

export const acceptedInterviews = [
  {
    ...interviews[0],
    status: 'interview_accepted',
    interview_date: '2019-03-28 12:00:00',
    updated_at: '2019-03-25 18:00:00',
  }, {
    ...interviews[1],
    status: 'interview_accepted',
    interview_date: '2019-03-29 14:00:00',
    updated_at: '2019-03-26 12:00:00',
  }, {
    ...interviews[2],
    status: 'interview_accepted',
    interview_date: '2019-03-31 18:00:00',
    updated_at: '2019-03-27 22:30:01',
  }, {
    ...interviews[3],
    status: 'interview_accepted',
    interview_date: '2019-03-31 18:00:00',
    updated_at: '2019-03-27 23:30:00',
  },
]

export const rejectedInterviews = [
  {
    ...interviews[0],
    status: 'interview_rejected',
    freelancer_feedback: 'I\'m just a test fixture in an e2e framework. How do you expect me to give feedbacks? Wait.',
    updated_at: '2019-03-25 04:40:00',
  }, {
    ...interviews[1],
    status: 'interview_rejected',
    freelancer_feedback: 'Sadly, I don\'t have a pen.',
    updated_at: '2019-03-26 12:00:00',
  }, {
    ...interviews[2],
    status: 'interview_rejected',
    freelancer_feedback: 'I already navigated myself to another job.',
    updated_at: '2019-03-27 22:00:00',
  }, {
    ...interviews[3],
    status: 'interview_rejected',
    freelancer_feedback: 'I heard employees are treated like machines!',
    updated_at: '2019-03-27 22:00:00',
  },
]

export const offers = [
  {
    ...acceptedInterviews[0],
    start_date: '2019-03-29',
    end_date: '2050-01-01',
    status: 'offer_made',
    updated_at: '2019-03-28 18:00:00',
    offer_note: 'We also have 10Gb internet!',
    payments_enabled: true,
  }, {
    ...acceptedInterviews[1],
    start_date: '2019-03-30',
    end_date: '2050-01-02',
    status: 'offer_made',
    updated_at: '2019-03-29 17:45:00',
    offer_note: 'Offer also contains monthly algorithm checks for artifical intelligences.',
    payments_enabled: true,
  }, {
    ...acceptedInterviews[2],
    start_date: '2019-04-01',
    end_date: '2050-04-01',
    status: 'offer_made',
    updated_at: '2019-03-31 20:00:00',
    offer_note: 'We provide cars for self-driving artifical intelligences.',
    payments_enabled: true,
  }, {
    ...acceptedInterviews[3],
    start_date: '2019-04-01',
    end_date: '2050-04-01',
    status: 'offer_made',
    updated_at: '2019-03-31 22:00:00',
    offer_note: 'We provide trucks for self-driving artifical intelligences.',
    payments_enabled: true,
  },
]

export const invitationOffers = [
  {
    ...offers[0],
    freelancer_rate_cents: 3000,
    client_rate_cents: 5000,
    freelancer_first_name: 'Invited',
    freelancer_last_name: 'Guy',
    freelancer_email: 'invited.guy@email.com',
  },
]

export const rejectedOffers = [
  {
    ...offers[0],
    status: 'offer_rejected',
    freelancer_feedback: 'I already work 24/7.',
  }, {
    ...offers[1],
    status: 'offer_rejected',
    freelancer_feedback: 'I need a less human environment.',
  }, {
    ...offers[2],
    status: 'offer_rejected',
    freelancer_feedback: 'I can\'t even afford a WinRAR licens with that rate.',
  }, {
    ...offers[3],
    status: 'offer_rejected',
    freelancer_feedback: 'My drivers don\t support these kind of trucks.',
  },
]

export const activeContracts = [
  {
    ...offers[0],
    status: 'active',
    client_agrees_terms: true,
    freelancer_agrees_terms: true,
  }, {
    ...offers[1],
    status: 'active',
    client_agrees_terms: true,
    freelancer_agrees_terms: true,
  }, {
    ...offers[2],
    status: 'active',
    client_agrees_terms: true,
    freelancer_agrees_terms: true,
  }, {
    ...offers[3],
    status: 'active',
    client_agrees_terms: true,
    freelancer_agrees_terms: true,
  },
]

export const jobApplications = [
  {
    id: 60000,
    status: 'job_application_sent',
  },
  {
    id: 60001,
    status: 'job_application_sent',
  },
  {
    id: 60002,
    status: 'job_application_sent',
  },
]
