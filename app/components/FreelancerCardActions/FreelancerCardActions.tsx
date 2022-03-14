import React from 'react'
import { Divider, CardActions } from '@material-ui/core'
import styles from './FreelancerCardActions.module.css'

interface IFreelancerCardActionsProps {
  children?: any
  noDivider?: boolean
}

export default class FreelancerCardActions extends React.PureComponent<IFreelancerCardActionsProps> {
  render() {
    const { children, noDivider = false } = this.props

    return (
      <React.Fragment>
        {!noDivider && <Divider className={styles.divider} />}

        <CardActions className={styles.actions}>
          {children}
        </CardActions>
      </React.Fragment>
    )
  }
}
