import React from 'react'
import { MenuItem, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, FormLabel, FormGroup, FormControlLabel } from '@material-ui/core'
import { SelectField } from 'components/themed'
import { HireMembersFilters, ManagedTeamSize } from 'scenes/ClientHire/Hire'
import styles from '../../FiltersPanel.module.css'

export interface IExperienceFieldsProps {
  filterParams: HireMembersFilters
  setFilterParam: (key: keyof HireMembersFilters, value: any) => void
  disabled?: boolean
}

const ExperienceFields = (props: IExperienceFieldsProps) => {
  const { filterParams = {}, setFilterParam } = props

  const setManagedTeamSizesFilterParam = React.useCallback((value: ManagedTeamSize, isChecked: boolean) => {
    let nextManagedTeamSizes = filterParams.managedTeamSizes?.slice() || []

    if (isChecked && !nextManagedTeamSizes?.includes(value)) {
      nextManagedTeamSizes.push(value)
    }

    if (!isChecked && nextManagedTeamSizes.length > 1) {
      nextManagedTeamSizes = nextManagedTeamSizes.filter(teamSize => teamSize !== value)
    }

    setFilterParam('managedTeamSizes', nextManagedTeamSizes)
  }, [filterParams?.managedTeamSizes, setFilterParam])

  return (
    <React.Fragment>
      <SelectField
        fullWidth
        label="Years of experience"
        value={filterParams.experience || ''}
        onChange={e => setFilterParam('experience', e.target.value)}
        data-cy="select-years-of-experience"
      >
        <MenuItem value={0} data-cy="any">Any</MenuItem>
        <MenuItem value={1} data-cy="1-years">At least 1 Year</MenuItem>
        <MenuItem value={2} data-cy="2-years">At least 2 Years</MenuItem>
        <MenuItem value={3} data-cy="3-years">At least 3 Years</MenuItem>
        <MenuItem value={4} data-cy="4-years">At least 4 Years</MenuItem>
        <MenuItem value={5} data-cy="5-years">At least 5 Years</MenuItem>
        <MenuItem value={6} data-cy="6-years">At least 6 Years</MenuItem>
        <MenuItem value={7} data-cy="7-years">At least 7 Years</MenuItem>
        <MenuItem value={8} data-cy="8-years">At least 8 Years</MenuItem>
        <MenuItem value={9} data-cy="9-years">At least 9 Years</MenuItem>
        <MenuItem value={10} data-cy="10-years">At least 10 Years</MenuItem>
        <MenuItem value={11} data-cy="more-than-10-years">More than 10 Years</MenuItem>
      </SelectField>

      <List disablePadding>
        <ListItem className={styles['toggle-list-item']}>
          <ListItemText
            primary="Management experience"
            secondary="Includes candidates that have team leadership/management experience"
            style={{ maxWidth: '80%' }}
          />

          <ListItemSecondaryAction>
            <Checkbox
              color="primary"
              edge="end"
              checked={filterParams.managedTeams || false}
              onChange={e => setFilterParam('managedTeams', e.target.checked)}
              tabIndex={-1}
              data-cy="checkbox-managed_teams"
              inputProps={{ 'data-cy': 'checkbox-input-managed_teams' } as any}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>

      {filterParams.managedTeams && (
        <React.Fragment>
          <FormLabel component="legend">
            Managed Team Size
          </FormLabel>

          <FormGroup>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={filterParams.managedTeamSizes?.includes('1-4')}
                  onChange={e => setManagedTeamSizesFilterParam('1-4', e.target.checked)}
                  value="1-4"
                  data-cy="1-4"
                  inputProps={{ 'data-cy': 'managed_team_sizes-option-1-4' } as any}
                />
              )}
              label="<5"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  checked={filterParams.managedTeamSizes?.includes('5-10')}
                  onChange={e => setManagedTeamSizesFilterParam('5-10', e.target.checked)}
                  value="5-10"
                  data-cy="5-10"
                  inputProps={{ 'data-cy': 'managed_team_sizes-option-5-10' } as any}
                />
              )}
              label="5-10"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  checked={filterParams.managedTeamSizes?.includes('10-x')}
                  onChange={e => setManagedTeamSizesFilterParam('10-x', e.target.checked)}
                  value="10-x"
                  data-cy="10-x"
                  inputProps={{ 'data-cy': 'managed_team_sizes-option-10-x' } as any}
                />
              )}
              label="10-x"
            />
          </FormGroup>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default ExperienceFields
