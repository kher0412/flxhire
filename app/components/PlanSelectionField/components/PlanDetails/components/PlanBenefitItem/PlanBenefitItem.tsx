import React from 'react'
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import styles from './PlanBenefitItem.module.css'

export interface IPlanBenefitItemProps {
  text: string
  enabled: boolean
  style?: React.CSSProperties
}

export interface IPlanBenefitItemState {
}

export default class PlanBenefitItem extends React.PureComponent<IPlanBenefitItemProps, IPlanBenefitItemState> {
  render() {
    const { text, enabled, style = {} } = this.props

    return (
      <ListItem disableGutters disabled={!enabled} style={style} className={styles.container}>
        <ListItemText primary={text} style={{ marginRight: 'auto' }} />

        <ListItemIcon style={{ minWidth: 24, marginLeft: 24 }}>
          <CheckCircle
            color={enabled ? 'primary' : 'disabled'}
            style={style}
          />
        </ListItemIcon>
      </ListItem>
    )
  }
}
