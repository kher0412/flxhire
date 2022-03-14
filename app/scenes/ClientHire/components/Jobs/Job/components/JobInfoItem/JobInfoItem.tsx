import React, { ComponentProps } from 'react'
import { Grid, List, ListItem, ListItemText } from '@material-ui/core'
import styles from './JobInfoItem.module.css'

interface IJobInfoItemProps extends ComponentProps<typeof ListItemText> {
  primary?: React.ReactNode
  secondary?: React.ReactNode
}

export default function JobInfoItem(props: IJobInfoItemProps) {
  const { primary, secondary, ...restProps } = props

  return (
    <Grid item xs={12} md={2}>
      <List disablePadding>
        <ListItem style={{ padding: '6px 9px' }}>
          <ListItemText
            primary={primary && (
              <span className={styles.text} title={typeof primary === 'string' ? primary : undefined}>
                {primary}
              </span>
            )}
            secondary={secondary && (
              <span className={styles.text} title={typeof secondary === 'string' ? secondary : undefined}>
                {secondary}
              </span>
            )}
            {...restProps}
          />
        </ListItem>
      </List>
    </Grid>
  )
}
