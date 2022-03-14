import React from 'react'
import { Tab, TabProps } from '@material-ui/core'
import { withStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Link } from 'components'
import styles from './PageTab.module.css'

export type IPageTabTypes = {
  label: React.ReactNode
  dataCy: string
  value: string
  href: string
  as?: string
}

const tabStyles = ((theme: Theme) => createStyles({
  selected: {},
  root: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    borderBottom: '1px solid #E0E9F2',
    minWidth: 'fit-content',
  },
}))

const PageTab = withStyles(tabStyles)((props: TabProps & IPageTabTypes) => {
  const { href, as = href, label, dataCy, value, ...rest } = props

  return (
    <Link href={href} as={as} className={styles.tabLink} shallow>
      <Tab
        label={label}
        value={value}
        data-cy={dataCy}
        className={styles.tab}
        {...rest}
      />
    </Link>
  )
})

export default PageTab
