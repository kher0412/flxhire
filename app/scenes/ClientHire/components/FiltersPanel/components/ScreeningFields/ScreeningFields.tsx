import React from 'react'
import { MenuItem, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Grid } from '@material-ui/core'
import { SelectField } from 'components/themed'
import { IHireTab, HireMembersFilters } from 'scenes/ClientHire/Hire'

import styles from './ScreeningFields.module.css'

export interface IScreeningFieldsProps {
  filterParams: HireMembersFilters
  setFilterParam: (key: keyof HireMembersFilters, value: any) => void,
  tab: IHireTab
}

const ScreeningFields = (props: IScreeningFieldsProps) => {
  const { filterParams = {}, setFilterParam, tab } = props

  return (
    <Grid container spacing={2}>
      {(tab === 'screening' || tab === 'applicants') && (
        <Grid item xs={12}>
          <SelectField
            label="Team Feedback"
            fullWidth
            value={filterParams.rating || ''}
            onChange={e => setFilterParam('rating', e.target.value)}
            data-cy="select-rating"
          >
            <MenuItem value="" data-cy="any">
              Any
            </MenuItem>
            <MenuItem value="positive" data-cy="positive">
              Has Positive Feedback
            </MenuItem>
            <MenuItem value="negative" data-cy="negative">
              Has Negative Feedback
            </MenuItem>
            <MenuItem value="none" data-cy="none">
              No Feedback
            </MenuItem>
          </SelectField>
        </Grid>
      )}
      <Grid item xs={12}>
        <SelectField
          label="Status"
          fullWidth
          value={filterParams.contractStatus || ''}
          onChange={e => setFilterParam('contractStatus', e.target.value)}
          data-cy="select-contract_status"
        >
          {[
            <MenuItem value="" data-cy="all">
              All
            </MenuItem>,
            <MenuItem value="job_application_sent" data-cy="job_application_sent">
              Application Sent
            </MenuItem>,
            tab === 'screening' ? (
              <MenuItem value="screening_requested" data-cy="screening_requested">
                Screening Requested
              </MenuItem>
            ) : null,
            tab === 'screening' ? (
              <MenuItem value="screening_rejected" data-cy="screening_rejected">
                Screening Rejected
              </MenuItem>
            ) : null,
            tab === 'screening' ? (
              <MenuItem value="screening_started" data-cy="screening_started">
                Screening Started
              </MenuItem>
            ) : null,
            tab === 'screening' ? (
              <MenuItem value="screening_completed" data-cy="screening_completed">
                Screening Completed
              </MenuItem>
            ) : null,
            <MenuItem value="rejected" data-cy="rejected">
              Rejected
            </MenuItem>,
          ].filter(e => e !== null)}
        </SelectField>

        {tab === 'screening' && (
        <React.Fragment>
          <List disablePadding>
            <ListItem className={styles['toggle-list-item']}>
              <ListItemText
                primary="All Questions Answered"
                secondary="Only includes candidates that have answered all relevant Questions."
                style={{ maxWidth: '80%' }}
              />

              <ListItemSecondaryAction>
                <Checkbox
                  color="primary"
                  edge="end"
                  checked={filterParams.hasAnswers || false}
                  onChange={e => setFilterParam('hasAnswers', e.target.checked)}
                  tabIndex={-1}
                  data-cy="checkbox-has_answers"
                  inputProps={{ 'data-cy': 'checkbox-input-has_answers' } as any}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          <List disablePadding>
            <ListItem className={styles['toggle-list-item']}>
              <ListItemText
                primary="Missing Answers"
                secondary="Only includes candidates that haven't answered all relevant Questions."
                style={{ maxWidth: '80%' }}
              />

              <ListItemSecondaryAction>
                <Checkbox
                  color="primary"
                  edge="end"
                  checked={filterParams.missingAnswers || false}
                  onChange={e => setFilterParam('missingAnswers', e.target.checked)}
                  tabIndex={-1}
                  data-cy="checkbox-missing_answers"
                  inputProps={{ 'data-cy': 'checkbox-input-missing_answers' } as any}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          <List disablePadding>
            <ListItem className={styles['toggle-list-item']}>
              <ListItemText
                primary="Code Test Submitted"
                secondary="Only includes candidates that have submitted a Code Test."
                style={{ maxWidth: '80%' }}
              />

              <ListItemSecondaryAction>
                <Checkbox
                  color="primary"
                  edge="end"
                  checked={filterParams.hasProjectSubmission || false}
                  onChange={e => setFilterParam('hasProjectSubmission', e.target.checked)}
                  tabIndex={-1}
                  data-cy="checkbox-has_project_submission"
                  inputProps={{ 'data-cy': 'checkbox-input-has_project_submission' } as any}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          <List disablePadding>
            <ListItem className={styles['toggle-list-item']}>
              <ListItemText
                primary="No Code Test"
                secondary="Only includes candidates that have not submitted a Code Test."
                style={{ maxWidth: '80%' }}
              />

              <ListItemSecondaryAction>
                <Checkbox
                  color="primary"
                  edge="end"
                  checked={filterParams.missingProjectSubmission || false}
                  onChange={e => setFilterParam('missingProjectSubmission', e.target.checked)}
                  tabIndex={-1}
                  data-cy="checkbox-missing_project_submission"
                  inputProps={{ 'data-cy': 'checkbox-input-missing_project_submission' } as any}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </React.Fragment>
        )}
      </Grid>
    </Grid>
  )
}

export default ScreeningFields
