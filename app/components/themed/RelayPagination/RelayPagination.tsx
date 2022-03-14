import { isEqual } from 'lodash'
import { useState, useEffect, useRef } from 'react'
import { usePaginationFragment } from 'react-relay'
import { useDebouncedData } from 'hooks'
import { Collapse } from '@material-ui/core'
import { PageLoadingIndicator } from 'components/Layouts/V3'
import { Condition } from 'components'
import styles from './RelayPagination.module.css'
import Button from '../Button'

export const DEFAULT_PER_PAGE = 10

const INFINITE_SCROLL_HEIGHT_MULTIPLIER = 1.45

type PaginationFields = 'hasNext' | 'loadNext' | 'isLoadingNext' | 'isLoadingPrevious' | 'refetch'

export type RelayPaginationData = Pick<ReturnType<typeof usePaginationFragment>, PaginationFields>

export interface IRelayPaginationProps<Filters = {}> extends RelayPaginationData {
  perPage?: number
  currentCount: number
  totalCount?: number
  filters?: Filters
  noWrapFilters?: boolean
  filtersDebounce?: number
  infiniteScroll?: boolean
}

function RelayPagination<Filters>(props: IRelayPaginationProps<Filters>) {
  const { refetch, hasNext, loadNext, isLoadingNext, isLoadingPrevious, currentCount, totalCount, filters: filtersProp, perPage = DEFAULT_PER_PAGE, noWrapFilters = false, filtersDebounce = 400, infiniteScroll } = props
  const [lastUsedFilters, setLastUsedFilters] = useState(null)
  const ref = useRef<HTMLDivElement>()
  const filters = useDebouncedData(filtersProp, filtersDebounce)
  const loading = isLoadingNext || isLoadingPrevious
  const empty = !currentCount || currentCount < 0
  const moreCount = totalCount && currentCount ? (totalCount - currentCount) : null
  const nextLoadCount = moreCount ? Math.min(moreCount, perPage) : null

  // TODO: prevent refetch triggered on mount in case there are no filters
  useEffect(() => {
    if (!lastUsedFilters || !isEqual(filters, lastUsedFilters)) {
      setLastUsedFilters(filters)
      const payload = noWrapFilters ? { first: perPage, ...filters } : { first: perPage, filters }
      refetch(payload, { fetchPolicy: 'store-and-network' })
    }
  }, [filters])

  // Infinite-scrolling implementation, it simply triggers load if the button is in view (or almost in view)
  useEffect(() => {
    let boundsCheckIntervalHandle: number

    boundsCheckIntervalHandle = window.setInterval(() => {
      if (infiniteScroll && ref?.current) {
        const bounds = ref.current.getBoundingClientRect()

        if (bounds.top < window.innerHeight * INFINITE_SCROLL_HEIGHT_MULTIPLIER && hasNext && !loading) {
          loadNext(perPage)
        }
      }
    }, 100)

    return () => window.clearInterval(boundsCheckIntervalHandle)
  }, [perPage, ref, infiniteScroll, hasNext, loading, loadNext])

  if (empty && !hasNext) return null

  let text = 'No more results'
  if (hasNext) text = 'Load more'
  if (nextLoadCount) text = `Load ${nextLoadCount} more`
  if (moreCount) text = `${text} (${moreCount} left)`

  return (
    <div className={styles.container} ref={ref}>
      <Condition condition={totalCount > 0 || currentCount > 0}>
        <Collapse in={infiniteScroll && hasNext} mountOnEnter unmountOnExit>
          <PageLoadingIndicator />
        </Collapse>

        <Collapse in={!infiniteScroll || !hasNext} mountOnEnter unmountOnExit>
          <Button color="primary" onClick={() => loadNext(perPage)} disabled={!hasNext || loading || infiniteScroll}>
            {text}
          </Button>
        </Collapse>
      </Condition>
    </div>
  )
}

export default RelayPagination
