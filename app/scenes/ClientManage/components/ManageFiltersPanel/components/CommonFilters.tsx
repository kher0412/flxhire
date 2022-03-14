import { Grid } from '@material-ui/core'
import { TextField } from 'components/themed'
import { IManageFilterParams, IManageTab } from 'scenes/ClientManage/ManageDucks'
import { SetManageFilter } from '../ManageFiltersPanelContainer'

interface ICommonFiltersProps {
  setFilter: SetManageFilter
  filterParams: IManageFilterParams
  tab: IManageTab
}

export default function CommonFilters({ filterParams, setFilter, tab }: ICommonFiltersProps) {
  if (tab === 'invoices') return null

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        value={filterParams.name || '' /* NOTE: clearing the filter breaks if we remove the || '' */}
        onChange={event => setFilter('name', event.target.value)}
        label="Name"
        name="filter-by-name"
      />
    </Grid>
  )
}
