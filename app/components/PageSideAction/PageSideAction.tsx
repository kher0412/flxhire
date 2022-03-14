import React from 'react'
import { Button } from 'components/themed'
import MediaQuery from 'components/MediaQuery'
import { Avatar } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import styles from './PageSideAction.module.css'

export interface IPageSideActionProps {
  show: boolean
  title?: string
  subtitle?: string
  loading?: boolean
  buttonText?: string
  loadingButtonText?: string
  disabled?: boolean
  icon?: React.ReactNode
  onConfirm: (e: React.MouseEvent<any>) => void
}

export default class PageSideAction extends React.Component<IPageSideActionProps> {
  render() {
    const {
      show,
      onConfirm,
      loading,
      icon,
      disabled,
      loadingButtonText = 'Saving...',
      buttonText = 'Save',
      title,
      subtitle,
    } = this.props

    if (!show) {
      return null
    }

    return (
      <div>
        <MediaQuery minWidth={1601}>
          <div className={styles['side-container']}>
            <div className={styles['side-content']}>
              <Card raised style={{ width: 290, margin: '0 auto' }}>
                <CardHeader
                  avatar={icon && (
                    <Avatar>
                      {icon}
                    </Avatar>
                  )}
                  title={title}
                  subheader={subtitle}
                />

                <CardActions>
                  <Button color="secondary" fullWidth onClick={onConfirm} disabled={loading || disabled}>
                    {loading && loadingButtonText}
                    {!loading && buttonText}
                  </Button>
                </CardActions>
              </Card>
            </div>
          </div>
        </MediaQuery>
      </div>
    )
  }
}
