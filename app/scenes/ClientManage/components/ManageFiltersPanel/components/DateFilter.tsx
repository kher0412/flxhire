import { Grid } from '@material-ui/core'
import { DateRangePicker } from 'components'
import { IManageFilterParams, IManageTab } from 'scenes/ClientManage/ManageDucks'
import { DATE_FORMAT_INTERNAL } from 'services/formatting'
import moment from 'moment'
import { SetManageFilter } from '../ManageFiltersPanelContainer'

interface IFilters {
  fromDate?: Date
  toDate?: Date
}

interface IDateFilterProps {
  setFilters: (values: IFilters) => void
  filterParams: IFilters
  tab: IManageTab
}

const DateFilter = ({ filterParams, setFilters, tab }: IDateFilterProps) => {
  const isTimesheets = tab === 'work'

  return (
    <Grid item xs={12}>
      <DateRangePicker
        fullWidth
        name="date-filter"
        fromDate={filterParams.fromDate}
        toDate={filterParams.toDate}
        onChange={({ fromDate, toDate }) => {
          setFilters({ fromDate, toDate })
        }}
        format="Y MMM D"
        label={isTimesheets ? 'Start Date' : 'Date'}
      />
    </Grid>
  )
}

export default DateFilter
