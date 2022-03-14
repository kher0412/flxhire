import React from 'react'
import { Chip } from '@material-ui/core'

export default function QuestionSubheader({ freelancer_types = [], freelancer_subtypes = [], skills = [], tags = [] }) {
  const chipStyle = { marginRight: 4, marginBottom: 4 }

  return (
    <React.Fragment>
      {freelancer_types.map(s => <Chip key={s.id} label={s.name} style={chipStyle} />)}
      {freelancer_subtypes.map(s => <Chip key={s.id} label={s.name} style={chipStyle} />)}
      {skills.map(s => <Chip key={s.id} label={s.name} style={chipStyle} />)}
      {tags.map(s => <Chip key={s.id} label={s.name} style={chipStyle} />)}
    </React.Fragment>
  )
}
