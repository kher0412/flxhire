import React from 'react'
import { Checkbox, Collapse, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

export interface ISocialIntegrationProps {
  title: string
  description: string
  name: string
  checked: boolean
  available: boolean
  onChange: (name: string, checked: boolean) => void
}

const SocialIntegration = React.memo((props: ISocialIntegrationProps) => (
  <Collapse in={props.available} mountOnEnter>
    <ListItem alignItems="flex-start">
      <ListItemIcon>
        <Checkbox
          color="primary"
          checked={props.checked}
          onChange={(e, checked) => props.onChange(props.name, checked)}
        />
      </ListItemIcon>

      <ListItemText
        primary={props.title}
        secondary={props.description}
      />
    </ListItem>
  </Collapse>
))

export default SocialIntegration
