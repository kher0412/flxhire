import React from 'react'
import { PageHeader, PageHeaderTitle, PageHeaderSubtitle, PageHeaderActions, ResponsiveButton, PageSidebarButton } from 'components'
import { IHireTab, HireMembersFilters } from 'scenes/ClientHire/Hire'
import { useFragment, graphql } from 'react-relay'
import { Header_Firm$key } from '__generated__/Header_Firm.graphql'
import { Tune } from '@material-ui/icons'
import { getTotalFiltersCount } from '../FiltersPanel/FiltersPanel'

interface IHeaderProps {
  firm: Header_Firm$key
  showFirm?: boolean
  showFilterButton?: boolean
  tab: IHireTab
  children?: any
  filterParams: HireMembersFilters
}

const Header = (props: IHeaderProps) => {
  const { firm: firmProp, showFirm, showFilterButton, filterParams, tab, children } = props

  const firm = useFragment(graphql`
    fragment Header_Firm on Firm {
      name
    }
  `, firmProp)

  return (
    <PageHeader wide>
      <PageHeaderTitle variant="center">
        FlexHire - Your Hiring Pipeline{showFirm && firm?.name ? ` (${firm?.name})` : ''}
      </PageHeaderTitle>

      <PageHeaderSubtitle variant="center">
        Create jobs. Review, screen, interview & hire
      </PageHeaderSubtitle>

      {showFilterButton && (
        <React.Fragment>
          <PageHeaderActions style={{ paddingBottom: 12, marginTop: -12 }}>
            <PageSidebarButton
              component={ResponsiveButton}
              iconSide="left"
              style={{ justifyContent: 'flex-start' }}
              data-cy="open-filters"
              icon={<Tune />}
              badgeContent={getTotalFiltersCount(filterParams, tab)}
              badgeProps={{ color: 'secondary' }}
              label="Filter results"
              mobileLabel="Filter"
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
