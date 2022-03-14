import React from 'react'
import { PageHeader, PageHeaderTitle, PageHeaderSubtitle, PageHeaderActions, ResponsiveButton, PageHeaderDivider, PageSidebarButton } from 'components'
import { useSelector } from 'hooks'
import { Tune } from '@material-ui/icons'
import { activeFilterCount } from '../../Manage'

const Header = ({ showFilterButton, children }: { showFilterButton?: boolean, children: any }) => {
  const filterParams = useSelector(state => state.clientManage.filterParams)
  const tab = useSelector(state => state.clientManage.tab)

  const count = activeFilterCount(filterParams, tab)

  return (
    <PageHeader compact>
      <PageHeaderTitle variant="center" style={{ marginTop: -24 }}>
        FlexManage
      </PageHeaderTitle>

      <PageHeaderSubtitle variant="center">
        Create teams. Manage work. Pay anywhere
      </PageHeaderSubtitle>

      {showFilterButton && (
      <React.Fragment>
        <PageHeaderDivider />

        <PageHeaderActions>
          <PageSidebarButton
            component={ResponsiveButton}
            iconSide="left"
            style={{ justifyContent: 'flex-start' }}
            data-cy="open-filters"
            icon={<Tune />}
            label="Filter results"
            mobileLabel="Filter"
            badgeContent={count}
            badgeProps={{ color: count > 0 ? 'secondary' : undefined }}
          />
        </PageHeaderActions>
      </React.Fragment>
      )}

      <div>
        {children}
      </div>
    </PageHeader>
  )
}

export default Header
