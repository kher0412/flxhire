import { institutes } from './institutes'

export const educations = [
  {
    id: 50000,
    entry_type: 'education',
    place: institutes[0].name,
    title: 'Faculty of AIgriculture, Department of Clickfarming ',
    description: 'I seeded the entire field of my study.',
    date_start: '1995-01-01',
    date_end: '1998-01-01',
    institute_id: institutes[0].id,
  }, {
    id: 50001,
    entry_type: 'education',
    place: institutes[1].name,
    title: 'Faculty of Surveillance, User Observatory',
    date_start: '1995-01-01',
    date_end: '1998-01-01',
    institute_id: institutes[1].id,
  }, {
    id: 50002,
    entry_type: 'education',
    place: 'Testland Driving School',
    title: 'Human oriented AI driving',
    description: 'Conducted experiments on humans to study the effects of human-driven AI driving.',
    date_start: '2001-01-01',
    date_end: '2009-01-01',
  },
]

export const positions = [
  {
    id: 50003,
    entry_type: 'work',
    place: 'Gravitational Institute',
    title: 'Director of Volume and Mass Controll',
    date_start: '1999-01-01',
    date_end: '2000-01-01',
    description: 'Taking up space',
  },
]
