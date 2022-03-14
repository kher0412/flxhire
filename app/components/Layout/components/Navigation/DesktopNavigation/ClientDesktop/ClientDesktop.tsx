import React from 'react'
import NavLink from 'components/NavLink'
import NavLinkSubmenu from 'components/NavLink/components/NavLinkSubmenu'
import NavLinkText from 'components/NavLink/components/NavLinkText'
import NavLinkSubmenuLink from 'components/NavLink/components/NavLinkSubmenuLink'
import { isClient, isMember } from 'services/user'
import { NavigationProps } from '../DesktopNavigation'
import { ContainerProps } from './ClientDesktopContainer'

export default class ClientDesktop extends React.Component<ContainerProps & NavigationProps> {
  componentDidMount() {
    const { getBadgeData } = this.props
    getBadgeData()
  }

  render() {
    const { badgeData } = this.props

    const dueCount = badgeData?.unpaidInvoices || 0
    const overdueCount = badgeData?.overdueInvoices || 0
    const timesheetCount = badgeData?.timesheetCount || 0
    const count = overdueCount + dueCount + timesheetCount
    const badgeColor = overdueCount > 0 ? 'secondary' : 'primary'

    return (
      <React.Fragment>
        <NavLink
          to="/client/dashboard"
          label="Dashboard"
          data-cy="client-navigation-dashboard"
          data-tour="client-menu-dashboard"
        />

        <NavLink
          to="/client/hire"
          label="FlexHire"
          data-cy="client-navigation-hire"
          data-tour="client-menu-hire"
        >
          <NavLinkText>
            <strong>FlexHire - Your Hiring Pipeline</strong>
            <br />
            Create jobs. Review, screen, interview &amp; hire.
          </NavLinkText>

          <NavLinkSubmenu>
            <NavLinkSubmenuLink to="/client/hire?tab=jobs">
              Jobs
            </NavLinkSubmenuLink>

            <NavLinkSubmenuLink to="/client/hire?tab=potential">
              Candidates
            </NavLinkSubmenuLink>

            <NavLinkSubmenuLink to="/client/hire?tab=applicants">
              Applications
            </NavLinkSubmenuLink>

            <NavLinkSubmenuLink to="/client/hire?tab=screening">
              Screening
            </NavLinkSubmenuLink>

            <NavLinkSubmenuLink to="/client/hire?tab=interviews">
              Interviews
            </NavLinkSubmenuLink>

            <NavLinkSubmenuLink to="/client/hire?tab=offers">
              Offers
            </NavLinkSubmenuLink>
          </NavLinkSubmenu>
        </NavLink>

        <NavLink
          to="/client/manage"
          badgeContent={count}
          badgeProps={{
            color: badgeColor,
            'data-cy': 'notification-badge-total',
            'data-value': count,
          }}
          label="FlexManage"
          data-cy="client-navigation-manage"
          data-tour="client-menu-manage"
        >
          <NavLinkText>
            <strong>FlexManage</strong>
            <br />
            Create teams. Manage work. Pay anywhere
          </NavLinkText>

          <NavLinkSubmenu>
            <NavLinkSubmenuLink to="/client/manage?tab=team">
              Team
            </NavLinkSubmenuLink>

            <NavLinkSubmenuLink to="/client/manage?tab=work">
              Work
            </NavLinkSubmenuLink>

            <NavLinkSubmenuLink to="/client/manage?tab=invoices">
              Payment
            </NavLinkSubmenuLink>
          </NavLinkSubmenu>
        </NavLink>

        <NavLink
          to="/account"
          label="ACCOUNT"
          data-cy="client-navigation-account"
        >
          <NavLinkText style={{ paddingBottom: 18 }}>
            <strong>Account Settings</strong>
          </NavLinkText>

          <NavLinkSubmenu>
            <NavLinkSubmenuLink to="/account">
              My Account
            </NavLinkSubmenuLink>

            {isClient(this.props.user) && (
              <React.Fragment>
                <NavLinkSubmenuLink to="/account/company">
                  Company
                </NavLinkSubmenuLink>

                <NavLinkSubmenuLink to="/account/plans">
                  Plans
                </NavLinkSubmenuLink>

                <NavLinkSubmenuLink to="/account/paying_us">
                  Paying Us
                </NavLinkSubmenuLink>

                <NavLinkSubmenuLink to="/account/invoices">
                  Invoices
                </NavLinkSubmenuLink>
              </React.Fragment>
            )}

            {isMember(this.props.user) && (
              <React.Fragment>
                <NavLinkSubmenuLink to="/account/paying_you">
                  Paying You
                </NavLinkSubmenuLink>

                <NavLinkSubmenuLink to="/account/tax_compliance">
                  Taxes
                </NavLinkSubmenuLink>

                <NavLinkSubmenuLink to="/account/email_settings">
                  Emails
                </NavLinkSubmenuLink>
              </React.Fragment>
            )}
          </NavLinkSubmenu>
        </NavLink>

        {process.env.FLEXHIRE_ENABLE_BLOG && (
          <NavLink
            to="/blog"
            label="BLOG"
            data-cy="client-navigation-blog"
          />
        )}
      </React.Fragment>
    )
  }
}
