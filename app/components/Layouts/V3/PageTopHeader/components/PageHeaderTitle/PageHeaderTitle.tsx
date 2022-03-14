import React from 'react'
import clsx from 'clsx'
import { Typography } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useSelector } from 'hooks'
import { useMediaQuery } from 'hooks/useMediaQuery'

interface IPageHeaderTitleProps {
  children: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  pageTitle: {
    fontSize: '24px',
    color: '#04041e',
    fontWeight: 500,
    lineHeight: '32px',
    margin: '0px',
  },
  headerShift: {
    marginLeft: '48px',
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  headerOrigin: {
    marginLeft: '0px',
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}))

const PageHeaderTitle: React.FunctionComponent<IPageHeaderTitleProps> = (props: IPageHeaderTitleProps) => {
  const { children } = props
  const classes = useStyles()
  const isSmallScreen = useMediaQuery('(max-width: 1200px)')
  const isMobile = useMediaQuery('(max-width: 600px')
  const drawer = useSelector(state => state.layout.drawer)

  return (
    <React.Fragment>
      <Typography variant="h3" className={clsx({
        [classes.headerShift]: (!drawer.desktop && !isSmallScreen) || isSmallScreen,
      }, {
        [classes.headerOrigin]: isMobile,
      })}
      >
        {children} <div id="mobile-sidebar-button-container" style={{ marginTop: -19, marginBottom: -18, display: 'inline-block' }} />
      </Typography>
    </React.Fragment>
  )
}

export default PageHeaderTitle
