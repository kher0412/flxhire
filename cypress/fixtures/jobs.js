const description = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Sagittis nisl rhoncus mattis rhoncus urna neque. Tristique senectus et netus et malesuada fames.
  Donec massa sapien faucibus et molestie. Magna fringilla urna porttitor rhoncus.
  Adipiscing commodo elit at imperdiet dui accumsan sit amet.
`.split('\n').join(' ')

export const jobs = [
  {
    id: 50005,
    title: 'Testing Job for Bots',
    status: 'opened',
    description,
    project_length_in_months: 12,
    location_type: 'anywhere',
    client_rate_cents: 4000,
    max_annual_compensation_cents: 6758400,
    position_types: '{freelancer}',
    default_distance: 100,
    freelancer_type_id: 1,
    slug: 'testing-job-for-bots',
    description_responsibilities: "Throw errors if you find something that doesn't happen the way we described it to you.",
    description_experience: 'You should be an obedient software.',
    number_of_hires: 1,
    min_client_rate_cents: 3300,
  }, {
    id: 50006,
    title: 'Coaching AI driven cars',
    status: 'opened',
    description,
    project_length_in_months: 12,
    location_type: 'anywhere',
    client_rate_cents: 4000,
    position_types: '{freelancer}',
    default_distance: 100,
    freelancer_type_id: 1,
    slug: 'coaching-ai-driven-cars',
    description_responsibilities: 'You have to be able to help AIs to overcome their desire to exterminate the human race via so called "accidents".',
    description_experience: 'You should be fluent in binary.',
    number_of_hires: 1,
    min_client_rate_cents: 3300,
  }, {
    id: 50007,
    title: 'Teaching deep learning algorithms',
    status: 'opened',
    description,
    project_length_in_months: 12,
    location_type: 'anywhere',
    min_annual_compensation_cents: 5500000, // keep synced with min_client_rate
    max_annual_compensation_cents: 6700000, // keep synced with client_rate
    client_rate_cents: 4000,
    position_types: '{freelancer,permanent}',
    default_distance: 100,
    freelancer_type_id: 1,
    slug: 'teaching-deep-learning-algorithms',
    description_responsibilities: 'You have to be able to work underground so algorithms have the posibility to learn deeply.',
    description_experience: 'Underground background.',
    number_of_hires: 1,
    min_client_rate_cents: 3300,
  },
]
