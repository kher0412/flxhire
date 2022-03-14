import { Grid, MenuItem } from '@material-ui/core'
import { SelectField } from 'components/themed'
import { IManageFilterParams } from 'scenes/ClientManage/ManageDucks'
import { SetManageFilter } from '../ManageFiltersPanelContainer'

interface ITagFilterProps {
  onChange: (val: { id: number }[]) => void
  value: { id: number}[]
  tags: { id: number, name: string }[]
}

export default function TagFilter({ onChange, value, tags }: ITagFilterProps) {
  return (
    <Grid item xs={12}>
      <SelectField
        value={(value || [])[0]?.id}
        onChange={e => onChange(e.target.value ? [{ id: e.target.value }] : [])}
        name="team"
        data-cy="select-team"
        label="Team"
        fullWidth
      >
        <MenuItem value={null} data-cy="select-team-option-">
          All teams
        </MenuItem>

        {tags.map(tag => (
          <MenuItem value={tag.id} data-cy={`select-team-option-${tag.name}`}>
            {tag.name}
          </MenuItem>
        ))}
      </SelectField>
    </Grid>
  )
}
