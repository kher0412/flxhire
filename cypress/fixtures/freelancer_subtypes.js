import { freelancerTypes } from './freelancer_types'

export const freelancerSubtypes = [
  {
    id: 50000,
    name: 'Bot Maintenance',
    freelancer_type_id: freelancerTypes[0].id,
    slug: 'bot-maintenance',
  },
  {
    id: 50001,
    name: 'Dummy Data Generation',
    freelancer_type_id: freelancerTypes[0].id,
    screening_requires_project: true,
    slug: 'dummy-data-generation',
  },
  {
    id: 50002,
    name: 'FlexGuru',
    freelancer_type_id: freelancerTypes[0].id,
    slug: 'flexguru',
  },
]
