import React from 'react'
import { Drawer } from '@material-ui/core'
import styles from './BulkActions.module.css'

export interface IBulkActionsProps {
  children: React.ReactNode
  selectionLabel: React.ReactNode
  drawerOpen: boolean
}

function BulkActions(props: IBulkActionsProps) {
  const { children, drawerOpen, selectionLabel } = props

  return (
    <Drawer
      anchor="bottom"
      open={drawerOpen}
      disableAutoFocus
      disableBackdropClick
      disableEnforceFocus
      disableRestoreFocus
      disableScrollLock
      hideBackdrop
      ModalProps={{ style: { pointerEvents: 'none' } }}
      data-cy="bulk-actions"
    >
      <div className={styles.container}>
        <div className={styles['left-area']}>
          <div className={styles.title} data-cy="num-selected-items">
            {selectionLabel}
          </div>
        </div>

        <div className={styles.wrapper}>
          <div>
            {children}
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default BulkActions
