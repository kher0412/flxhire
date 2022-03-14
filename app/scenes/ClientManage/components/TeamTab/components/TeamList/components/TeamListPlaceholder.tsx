import React from 'react'
import { Link, PagePlaceholder } from 'components'
import { Button } from 'components/themed'
import { AddCircle, MeetingRoom } from '@material-ui/icons'
import { TeamSubtabName } from '../../../teamSubtabName'

export interface ITeamListPlaceholderProps {
  filtering: boolean
  innerTab: TeamSubtabName
}

const tabNameToFilteredOutName = new Map<TeamSubtabName, string>([
  ['invited', 'invitations'],
  ['managers', 'managers'],
  ['admins', 'admins'],
  ['individuals', 'members'],
  ['all', 'members'],
])

function TeamListPlaceholder(props: ITeamListPlaceholderProps) {
  const { filtering, innerTab } = props
  const tabNameDisplay = tabNameToFilteredOutName.get(innerTab) || innerTab

  if (filtering) {
    return (
      <PagePlaceholder
        flat
        title="No matches"
        subtitle={`No ${tabNameDisplay} match the currently configured filters.`}
      />
    )
  }

  switch (innerTab) {
    case 'all':
    case 'individuals':
      return (
        <PagePlaceholder
          flat
          title="No team members"
          subtitle="Hire someone using our Hire Pipeline, or invite existing colleagues to join your team."
          action={(
            <div>
              <Button
                color="primary"
                muiComponent={Link}
                href="/client/hire"
                style={{ textDecoration: 'none', marginRight: 12 }}
              >
                <MeetingRoom /> Hire Pipeline
              </Button>

              <Button
                color="primary"
                muiComponent={Link}
                as="/client/invitation_team?role=individual"
                href="/client/invitation_team"
                style={{ textDecoration: 'none' }}
              >
                <AddCircle /> Invite Someone
              </Button>
            </div>
          )}
        />
      )

    case 'managers':
    case 'admins':
      return (
        <PagePlaceholder
          flat
          title={`No ${tabNameDisplay}`}
          subtitle="Invite existing colleagues to join your team's management on Flexhire."
          action={(
            <Button
              color="primary"
              muiComponent={Link}
              as={`/client/invitation_team?role=${(innerTab === 'admins') ? 'admin' : 'manager'}`}
              href="/client/invitation_team"
              style={{ textDecoration: 'none' }}
            >
              <AddCircle /> Invite Someone
            </Button>
          )}
        />
      )

    case 'invited':
      return (
        <PagePlaceholder
          flat
          title="No active invitations"
          subtitle="Invite existing colleagues to join your team on Flexhire."
          action={(
            <Button
              color="primary"
              muiComponent={Link}
              href="/client/invitation_team"
              style={{ textDecoration: 'none' }}
            >
              <AddCircle /> Invite Someone
            </Button>
          )}
        />
      )

    default:
      return null
  }
}

export default React.memo(TeamListPlaceholder)
