import React from 'react'
import { DialogContentText } from '@material-ui/core'
import { MoreButtonDialog } from 'components'
import { Help } from '@material-ui/icons'
import InputGroupConnector from '../InputGroupConnector'
import styles from './InputGroupButton.module.css'

export interface IInputGroupHelpButtonProps {
  title?: string
  children?: React.ReactNode
  'data-cy'?: string
}

function InputGroupHelpButton(props: IInputGroupHelpButtonProps) {
  const { children, title } = props

  return (
    <InputGroupConnector className={styles.connector}>
      <div>
        <MoreButtonDialog
          icon={<Help htmlColor="#96ADC6" />}
          style={{ marginLeft: -16, marginRight: -16 }}
          dialogTitle={title}
          data-cy={props['data-cy'] || 'info-button'}
        >
          <DialogContentText data-cy="info-button-content">
            {children}
          </DialogContentText>
        </MoreButtonDialog>
      </div>
    </InputGroupConnector>
  )
}

export default React.memo(InputGroupHelpButton)
