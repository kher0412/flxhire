import { Card } from '@material-ui/core'
import { graphql, useFragment } from 'react-relay'
import { ManageSidebar_Firm$key } from '__generated__/ManageSidebar_Firm.graphql'
import ManageFiltersPanel from '../ManageFiltersPanel'
import styles from './ManageSidebar.module.css'
import { IManageFiltersPanelProps } from '../ManageFiltersPanel/ManageFiltersPanel'

export interface IManageSidebarProps {
  onClose: () => void
  disableStatusFilter?: boolean
  firm: ManageSidebar_Firm$key
}

export default function Sidebar({ onClose, firm: firmProp, disableStatusFilter, ...otherProps }: IManageSidebarProps & Omit<IManageFiltersPanelProps, 'firm'>) {
  const firm = useFragment(graphql`
    fragment ManageSidebar_Firm on Firm {
      ...ManageFiltersPanel_Firm
    }
  `, firmProp)

  if (onClose) {
    return (
      <div className={styles.container} style={{ marginTop: 12 }}>
        <ManageFiltersPanel disableStatusFilter={disableStatusFilter} firm={firm} {...otherProps} onClose={onClose} />
      </div>
    )
  }

  return (
    <ManageFiltersPanel disableStatusFilter={disableStatusFilter} firm={firm} {...otherProps} onClose={onClose} />
  )
}
