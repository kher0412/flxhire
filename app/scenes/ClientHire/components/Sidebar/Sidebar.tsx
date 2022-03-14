import React from 'react'
import { ResponsiveButton } from 'components'
import { graphql, useFragment } from 'react-relay'
import { Sidebar_Job$key } from '__generated__/Sidebar_Job.graphql'
import { Sidebar_Firm$key } from '__generated__/Sidebar_Firm.graphql'
import { ChevronLeft, ClearAll, SettingsBackupRestore } from '@material-ui/icons'
import FiltersPanel from '../FiltersPanel'
import { IFiltersPanelProps } from '../FiltersPanel/FiltersPanel'
import styles from './Sidebar.module.css'

type ISidebarProps = Omit<IFiltersPanelProps, 'job' | 'firm'> & {
  job: Sidebar_Job$key
  firm: Sidebar_Firm$key
  hideFilters?: boolean
  disabled?: boolean
  clearFilterParams: () => void
  resetFilterParams: () => void
}

const Sidebar = (props: ISidebarProps) => {
  const { hideFilters, clearFilterParams, resetFilterParams, firm: firmProp, job: jobProp, ...otherProps } = props
  const firm = useFragment(graphql`
    fragment Sidebar_Firm on Firm {
      ...FiltersPanel_Firm
    }
  `, firmProp)
  const job = useFragment(graphql`
    fragment Sidebar_Job on Job {
      ...FiltersPanel_Job
    }
  `, jobProp)

  if (hideFilters) return null

  return (
    <div>
      <FiltersPanel firm={firm} job={job} {...otherProps} />

      <div className={styles.buttons}>
        <ResponsiveButton
          onClick={clearFilterParams}
          data-cy="clear-filters"
          icon={<ClearAll />}
          label="Clear All"
          mobileLabel="Clear"
          fullWidth
        />

        <ResponsiveButton
          onClick={resetFilterParams}
          data-cy="reset-filters"
          icon={<SettingsBackupRestore />}
          label="Set Defaults"
          mobileLabel="Defaults"
          fullWidth
        />
      </div>
    </div>
  )
}

export default Sidebar
