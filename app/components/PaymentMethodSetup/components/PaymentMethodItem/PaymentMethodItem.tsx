import React from 'react'
import { Typography, Card } from '@material-ui/core'
import { Button } from 'components/themed'
import { classList } from 'services/styles'
import { AddCircle } from '@material-ui/icons'
import styles from './PaymentMethodItem.module.css'

export interface IPaymentMethodItemProps {
  icon: React.ReactNode
  title: React.ReactNode
  text: React.ReactNode
  addText?: React.ReactNode
  unavailableText?: React.ReactNode
  available?: boolean
  pending?: boolean
  onClick: () => void
  'data-cy'?: string
}

function PaymentMethodItem(props: IPaymentMethodItemProps) {
  const { icon, title, text, available = true, onClick, addText, unavailableText, pending = false } = props

  return (
    <Card raised className={classList(styles.container, available ? styles.pending : styles.disabled)}>
      {available && !pending && (
        <div className={styles.overlay} onClick={onClick} role="button" data-cy={props['data-cy']}>
          <AddCircle color="primary" />
        </div>
      )}

      <div className={styles.iconWrapper}>
        <div className={styles.icon}>
          {icon}
        </div>
      </div>

      <div className={styles.title}>
        <Typography variant="h4">
          {title}
        </Typography>
      </div>

      <div className={styles.text}>
        <Typography variant="caption">
          {text}
        </Typography>
      </div>

      <div className={styles.action}>
        {available && (
          <Button onClick={onClick} color="secondary">
            <AddCircle /> {addText || 'Add'}
          </Button>
        )}

        {!available && (
          <Button disabled>
            {unavailableText || 'Unavailable'}
          </Button>
        )}
      </div>
    </Card>
  )
}

export default React.memo(PaymentMethodItem)
