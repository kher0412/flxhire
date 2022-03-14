import React from 'react'
import { Grid, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core'
import { ICurrentUser } from 'types'
import { canAccessAdminConsole } from 'services/user'
import { HireMembersFilters } from 'scenes/ClientHire/Hire'
import styles from '../../FiltersPanel.module.css'

export interface IProfileFieldsProps {
  filterParams: HireMembersFilters
  setFilterParam: (key: keyof HireMembersFilters, value: any) => void
  tab: string
  user: ICurrentUser
}

const ProfileFields = (props: IProfileFieldsProps) => {
  const { filterParams = {}, setFilterParam, tab, user } = props
  const admin = canAccessAdminConsole(user)

  return (
    <Grid container xs={12}>
      <Grid item xs={12}>
        <List disablePadding>
          <ListItem className={styles['toggle-list-item']}>
            <ListItemText
              primary="Bookmarked"
              secondary="Show your Bookmarked potential hires only"
              style={{ maxWidth: '80%' }}
            />

            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                edge="end"
                checked={filterParams.bookmarked || false}
                onChange={e => setFilterParam('bookmarked', e.target.checked)}
                tabIndex={-1}
                data-cy="checkbox-bookmarked"
                inputProps={{ 'data-cy': 'checkbox-input-bookmarked' } as any}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
      {(tab === 'applicants' || (admin && tab === 'potential')) && (
        <Grid item xs={12}>
          <List disablePadding>
            <ListItem className={styles['toggle-list-item']}>
              <ListItemText
                primary="Verified"
                secondary="Only includes candidates Pre-Screened by Flexhire"
                style={{ maxWidth: '80%' }}
              />

              <ListItemSecondaryAction>
                <Checkbox
                  color="primary"
                  edge="end"
                  checked={filterParams.verifiedOnly || false}
                  onChange={e => setFilterParam('verifiedOnly', e.target.checked)}
                  tabIndex={-1}
                  data-cy="checkbox-verified_only"
                  inputProps={{ 'data-cy': 'checkbox-input-verified_only' } as any}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      )}

      {admin && (
        <Grid item xs={12}>
          <List disablePadding>
            <ListItem className={styles['toggle-list-item']}>
              <ListItemText
                primary="Show Only Available"
                secondary="Exclude unavailable profiles"
                style={{ maxWidth: '80%' }}
              />

              <ListItemSecondaryAction>
                <Checkbox
                  color="primary"
                  edge="end"
                  checked={filterParams.availableOnly || false}
                  onChange={e => setFilterParam('availableOnly', e.target.checked)}
                  tabIndex={-1}
                  data-cy="checkbox-available_only"
                  inputProps={{ 'data-cy': 'checkbox-input-available_only' } as any}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      )}

      {tab === 'applicants' && (
        <Grid item xs={12}>
          <List disablePadding>
            <ListItem className={styles['toggle-list-item']}>
              <ListItemText
                primary="With Video Introduction"
                secondary="Only includes candidates that have an Introduction Video."
                style={{ maxWidth: '80%' }}
              />

              <ListItemSecondaryAction>
                <Checkbox
                  color="primary"
                  edge="end"
                  checked={filterParams.hasVideoIntroduction || false}
                  onChange={e => setFilterParam('hasVideoIntroduction', e.target.checked)}
                  tabIndex={-1}
                  data-cy="checkbox-has_video_introduction"
                  inputProps={{ 'data-cy': 'checkbox-input-has_video_introduction' } as any}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      )}

      {tab === 'applicants' && (
        <Grid item xs={12}>
          <List disablePadding>
            <ListItem className={styles['toggle-list-item']}>
              <ListItemText
                primary="Without Video Introduction"
                secondary="Only includes candidates that do not have an Introduction Video."
                style={{ maxWidth: '80%' }}
              />

              <ListItemSecondaryAction>
                <Checkbox
                  color="primary"
                  edge="end"
                  checked={filterParams.missingVideoIntroduction || false}
                  onChange={e => setFilterParam('missingVideoIntroduction', e.target.checked)}
                  tabIndex={-1}
                  data-cy="checkbox-missing_video_introduction"
                  inputProps={{ 'data-cy': 'checkbox-input-missing_video_introduction' } as any}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      )}

      <Grid item xs={12}>
        <List disablePadding>
          <ListItem className={styles['toggle-list-item']}>
            <ListItemText
              primary="Can work in the US"
              secondary="Only includes candidates legally able to work on site in the US"
              style={{ maxWidth: '80%' }}
            />

            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                edge="end"
                checked={filterParams.canWorkInTheUs || false}
                onChange={e => setFilterParam('canWorkInTheUs', e.target.checked)}
                tabIndex={-1}
                data-cy="checkbox-can_work_in_the_us"
                inputProps={{ 'data-cy': 'checkbox-input-can_work_in_the_us' } as any}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  )
}

export default ProfileFields
