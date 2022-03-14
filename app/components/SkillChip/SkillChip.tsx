import React, { CSSProperties, ComponentProps } from 'react'
import { Tooltip, Chip } from '@material-ui/core'
import styles from './SkillChip.module.css'

interface ISkillChipProps {
  skill_experience: { experience?: number, name: string, id?: number, required_years?: number }
  icon?: ComponentProps<typeof Chip>['icon']
  required?: boolean
  animated?: boolean
  focused?: boolean
  flat?: boolean
  hideExperience?: boolean
}

class SkillChip extends React.PureComponent<ISkillChipProps> {
  render() {
    // eslint-disable-next-line camelcase
    const { skill_experience, animated = true, icon, required, hideExperience, focused, flat } = this.props

    const title = [skill_experience.name]
    let style: CSSProperties = {}

    if (required) {
      title.push('(required)')
    }

    if (!hideExperience) {
      title.push(this.renderWholeExperience())
    }

    if (!animated) {
      style.animation = 'none'
    }

    return (
      <div
        className={styles.skill}
        key={skill_experience.id || skill_experience.name}
        data-cy={`freelancer-chip-skill-${skill_experience.name}`}
        style={style}
      >
        <Tooltip title={flat ? '' : title.join(' ')}>
          <Chip
            icon={icon}
            style={focused ? { background: '#2ECB80', color: '#fff' } : (flat ? { background: 'none' } : undefined)}
            label={(
              <span className={styles['skill-content']}>
                {skill_experience.name} {this.renderExperience()}
              </span>
            )}
          />
        </Tooltip>
      </div>
    )
  }

  renderExperience() {
    // eslint-disable-next-line camelcase
    const { skill_experience, hideExperience, required } = this.props

    if (required) {
      if (skill_experience.required_years > 0) {
        return `(${skill_experience.required_years}+ years)`
      }

      return ''
    }

    if (!hideExperience && skill_experience.experience) {
      return `${skill_experience.experience}+ yrs`
    }

    return ''
  }

  renderRequiredLabel() {
    if (this.props.required) {
      return ' (required)'
    }

    return null
  }

  renderWholeExperience() {
    // eslint-disable-next-line camelcase
    const { skill_experience, hideExperience } = this.props

    if (hideExperience) {
      return ''
    }

    if (!skill_experience.experience) {
      return '(skill)'
    }

    if (skill_experience.experience === 1) {
      return '(skill, 1+ year experience)'
    }

    return `(skill, ${skill_experience.experience}+ years experience)`
  }
}

export default SkillChip
