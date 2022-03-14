import React from 'react'
import { Field } from 'redux-form'
import { Button, TextArea } from 'components/themed'
import { Grid } from '@material-ui/core'
import RatingField from '../RatingField'
import styles from './RatingForm.module.css'

export interface IRatingFormProps {
  freelancer: {
    firstName: string
    avatarUrl: string
  }
  contract: {
    id: string
  }
  handleSubmit?: (formData: any) => void
  afterSend?: () => void
  submitting?: boolean
  isRatingSelected: boolean
  hasExistingFeedback: boolean
}

const RatingForm = (props: IRatingFormProps) => {
  const { submitting, freelancer, handleSubmit, hasExistingFeedback } = props

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            name="rating_positive"
            component={RatingField}
            freelancer={freelancer}
          />
        </Grid>

        <Grid item xs={12}>
          <Field
            component={TextArea}
            name="description"
            label="Internal team feedback"
            placeholder={`Write your internal team feedback on ${freelancer?.firstName} here. Your feedback will not be shared with ${freelancer?.firstName} but will be visible to other members of your team once they also submit their feedback.`}
          />
        </Grid>

        <Grid item xs={12}>
          <div className={styles.actions}>
            <Button onClick={handleSubmit} disabled={submitting} color="primary" data-cy="submit-feedback">
              {hasExistingFeedback ? 'Update Your Feedback' : 'Save Your Feedback'}
            </Button>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default RatingForm
