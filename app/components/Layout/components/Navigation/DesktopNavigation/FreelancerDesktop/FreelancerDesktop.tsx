import React from 'react'
import NavLink from 'components/NavLink'
import { isFreelancerApplying } from 'services/freelancer'
import { ICurrentUser } from 'types'

const FreelancerDesktop = ({ user }: { user: ICurrentUser }) => {
  if (user.status === 'pending') {
    return (
      <React.Fragment>
        {user.integration_name && <NavLink to="/member/dashboard" label="DASHBOARD" data-cy="freelancer-navigation-dashboard" />}
        <NavLink href="/profile" label="PROFILE" data-cy="freelancer-navigation-profile" />
        <NavLink href="/account" label="ACCOUNT" data-cy="freelancer-navigation-account" />
      </React.Fragment>
    )
  }

  const isApplying = isFreelancerApplying(user.status)

  return (
    <React.Fragment>
      <NavLink to="/member/dashboard" label="DASHBOARD" data-cy="freelancer-navigation-dashboard" />
      <NavLink to="/profile" label="PROFILE" data-cy="freelancer-navigation-profile" />
      {isApplying && <NavLink to="/application" label="APPLICATION" data-cy="freelancer-navigation-application" />}
      <NavLink to="/member/work_reports" label="WORK REPORTS" data-cy="freelancer-navigation-timesheets" />
      <NavLink to="/referrals" label="REFERRALS" data-cy="freelancer-navigation-referrals" />
      <NavLink to="/account" label="ACCOUNT" data-cy="freelancer-navigation-account" />
      {process.env.FLEXHIRE_ENABLE_BLOG && (
        <NavLink to="/blog" label="BLOG" data-cy="freelancer-navigation-blog" />
      )}
    </React.Fragment>
  )
}

export default FreelancerDesktop
