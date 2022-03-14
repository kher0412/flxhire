import { Button, InfoMessage } from 'components/themed'
import { Clear } from '@material-ui/icons'
import styles from '../Hire.module.css'

interface IFilteredOutInfoProps {
  clearFilters: () => void
  filteredOutCount: number
  totalCount: number
}

const FilteredOutInfo = ({ clearFilters, filteredOutCount, totalCount }: IFilteredOutInfoProps) => {
  return (filteredOutCount > 0 && totalCount > 0) && (
    <div style={{ marginBottom: 24 }}>
      <InfoMessage>
        <div style={{ display: 'flex' }}>
          {totalCount - filteredOutCount} of {totalCount} results match the selected filters.
          Non-matching results have been moved to the bottom of the list.

          <Button
            variant="outlined"
            className={styles['clear-filters-button']}
            onClick={clearFilters}
            data-cy="clear-filters"
            color="secondary"
          >
            <Clear style={{ marginRight: 12 }} /> Clear filters
          </Button>
        </div>
      </InfoMessage>
    </div>
  )
}

export default FilteredOutInfo
