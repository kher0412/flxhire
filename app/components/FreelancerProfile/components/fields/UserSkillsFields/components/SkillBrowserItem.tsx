import { ListItem, ListItemIcon, Checkbox, ListItemText } from '@material-ui/core'
import React from 'react'
import { ISkill } from 'types'

export interface ISkillBrowserItemProps {
  skill: ISkill
  checked: boolean
  onToggle: (skill: ISkill) => void
}

export interface ISkillBrowserItemState {
}

export default class SkillBrowserItem extends React.PureComponent<ISkillBrowserItemProps, ISkillBrowserItemState> {
  render() {
    const { skill, checked, onToggle } = this.props

    return (
      <ListItem button onClick={() => onToggle(skill)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            color="primary"
          />
        </ListItemIcon>

        <ListItemText primary={skill.name} />
      </ListItem>
    )
  }
}
