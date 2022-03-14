import React from 'react'
import { List, ListItem, ListItemText, Grid, Hidden } from '@material-ui/core'
import styles from './Rating.module.css'

const SCORE_ENUM = {
  '-1': 'Hoped you could have done better',
  0: 'Thought you did a good job!',
  1: 'Thought you did excellent work!',
  2: 'None',
}

export default class Rating extends React.Component {
  render() {
    const { timesheet } = this.props

    return (
      <div className={styles.container}>
        <Grid container>
          <Grid item xs={12} sm={6} md={4}>
            <h2 className={styles.h2}>
              Client feedback for this report:
            </h2>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <div className={styles['h2-sub']}>
              {SCORE_ENUM[timesheet.client_rating_score]}
            </div>
          </Grid>

          <Hidden mdDown>
            <Grid item xs={12} md={2} />
          </Hidden>

          <Grid item xs={12}>
            <div className={styles['section-specific']}>
              Specific Feedback - Stop, Start, Continue Methodology
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <div className={styles['section-h']}>
              Stop - What the client did not like
            </div>

            <List>
              <ListItem className={styles['list-item']}>
                <ListItemText
                  secondary={timesheet.client_rating_feedback_stop || 'No additional feedback'}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <div className={styles['section-h']}>
              Start - What the client would like to see
            </div>

            <List>
              <ListItem className={styles['list-item']}>
                <ListItemText
                  secondary={timesheet.client_rating_feedback_start || 'No additional feedback'}
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <div className={styles['section-h']}>
              Continue - What the client liked
            </div>

            <List>
              <ListItem className={styles['list-item']}>
                <ListItemText
                  secondary={timesheet.client_rating_feedback_continue || 'No additional feedback'}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    )
  }
}
