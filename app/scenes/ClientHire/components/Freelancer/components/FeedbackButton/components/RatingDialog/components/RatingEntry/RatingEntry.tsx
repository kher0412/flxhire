import React from 'react'
import { Divider, Hidden } from '@material-ui/core'
import { formatAsDate } from 'services/formatting'
import { graphql, useFragment } from 'react-relay'
import { RatingEntry_Feedback$key } from '__generated__/RatingEntry_Feedback.graphql'
import { CalendarToday, ThumbDown, ThumbUp } from '@material-ui/icons'
import styles from './RatingEntry.module.css'

export interface IRatingEntryProps {
  feedback: RatingEntry_Feedback$key
}

const RatingEntry = (props: IRatingEntryProps) => {
  const feedback = useFragment(graphql`
    fragment RatingEntry_Feedback on ContractFeedback {
      user {
        rawId
        name
      }
      updatedAt
      ratingPositive
      description
    }
  `, props.feedback)

  if (!feedback) return null

  const userId = feedback?.user?.rawId

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.name}>
          {feedback?.user?.name || '<unnamed>'}
        </div>

        <div className={styles.date}>
          <Hidden xsDown>
            <CalendarToday />
          </Hidden>

          {formatAsDate(feedback.updatedAt)}
        </div>

        <div className={styles.rating}>
          {feedback.ratingPositive && (
          <ThumbUp style={{ fill: '#2ECB80' }} data-cy={`rating_entry-${userId}-value-positive`} />
          )}

          {!feedback.ratingPositive && (
          <ThumbDown data-cy={`rating_entry-${userId}-value-negative`} />
          )}
        </div>
      </div>

      <div className={styles.text} data-cy={`rating_entry-${userId}-description`}>
        {feedback.description}

        <Divider style={{ margin: '24px 0' }} />
      </div>
    </div>
  )
}

export default RatingEntry
