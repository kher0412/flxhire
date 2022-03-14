import watchManage from 'scenes/ClientManage/ManageSagas'
import watchSubmitInvitationTeam from 'scenes/InvitationTeam/InvitationTeamSaga'

import watchNavigation from 'components/Layout/components/Navigation/NavigationSaga'
import watchGetManagers from 'components/ClientPageTitle/ClientPageTitleSaga'
import watchClientHire from 'scenes/ClientHire/HireSagas'

const sagas = [
  watchManage(),
  watchNavigation(),
  watchGetManagers(),
  watchSubmitInvitationTeam(),
  watchClientHire(),
]

export default sagas
