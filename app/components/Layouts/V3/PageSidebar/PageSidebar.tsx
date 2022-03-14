import React from 'react'
import { Drawer, Fade } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Suspense, SuspensePlaceholder } from 'components'
import { classList, getStandardWidth } from 'services/styles'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { Box, Button } from 'components/themed'
import { usePageState } from 'hooks/usePageState'
import styles from './PageSidebar.module.css'

export interface IPageSidebarProps {
  sticky?: boolean
  children: React.ReactNode
}

export const DRAWER_MODE_BREAKPOINT = getStandardWidth('xl')

function PageSidebar(props: IPageSidebarProps) {
  const { children, sticky, ...restProps } = props
  const { pageSidebarHidden, pageSidebarOpen, setPageSidebarOpen } = usePageState()

  if (pageSidebarHidden) {
    return (
      <Drawer open={pageSidebarOpen} onClose={() => setPageSidebarOpen(false)}>
        <Suspense fallback={<div />} ErrorFallbackComponent={errorProps => <SuspensePlaceholder {...errorProps} raised={false} flat />}>
          <div className={styles.drawerWrapper}>
            {children}
          </div>
        </Suspense>

        <Box style={{ marginTop: 'auto', textAlign: 'right' }}>
          <Button onClick={() => setPageSidebarOpen(false)} color="secondary">
            <Close /> Close
          </Button>
        </Box>
      </Drawer>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} {...restProps}>
        <div className={classList(styles.content, sticky && styles.sticky)}>
          <div>
            <Suspense fallback={<div />} ErrorFallbackComponent={errorProps => <SuspensePlaceholder {...errorProps} raised={false} flat />}>
              <Fade appear in>
                <div>
                  {children}
                </div>
              </Fade>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(PageSidebar)
