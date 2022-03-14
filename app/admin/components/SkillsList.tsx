import React, { CSSProperties } from 'react'
import { Chip } from '@material-ui/core'

const styles: { [label: string]: CSSProperties } = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}

export const SkillsList = props => (
  <span style={{ padding: '3px' }}>{(props.record?.user_skills || []).map(s => s.name).join(', ')}</span>
)

interface ISkillsChipListFieldProps {
  record?: any
  source: string
  attribute?: string
}

const SkillsChipListField = ({ source, record, attribute = 'name' }: ISkillsChipListFieldProps) => (
  <span style={styles.wrapper}>
    {(record?.[source] || []).map((s) => {
      if (s.experience) {
        const label = `${s[attribute]} (${s.experience}+ yrs)`
        return (
          <Chip style={styles.chip} key={s.id} label={label} />
        )
      }
      return <Chip style={styles.chip} key={s.id} label={s[attribute]} />
    })}
  </span>
)

export default SkillsChipListField
