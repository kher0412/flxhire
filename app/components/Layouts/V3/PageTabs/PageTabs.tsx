import React from 'react'
import { Tabs } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import styles from './PageTabs.module.css'

export interface IPageTabsProps {
  value: string
  onChange: (event: React.ChangeEvent<{}>, newTab: string) => void
  indicatorColor: 'primary' | 'secondary'
  variant: 'scrollable' | 'standard' | 'fullWidth'
  scrollButtons: 'on' | 'off' | 'auto' | 'desktop'
}

const PageTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 100,
      width: '100%',
      backgroundColor: '#2ECB80',
    },
  },
  scrollButtons: {
    width: 24,
  },
})((props: IPageTabsProps) => {
  return (
    <div className={styles.container}>
      <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
    </div>
  )
})

export default PageTabs
