import { IManageFilterParams } from 'scenes/ClientManage/ManageDucks'
import { isNumber } from 'services/numbers'
import { IContractStatus, IFirmRole } from 'types'
import { ContractsFilters } from '__generated__/TeamList_contracts.graphql'
import { TeamTab_Firm } from '__generated__/TeamTab_Firm.graphql'
import { TeamSubtabName } from './teamSubtabName'

function getFirmRoleFromInnerTab(tabName: TeamSubtabName): IFirmRole {
  switch (tabName) {
    case 'managers':
      return 'firm_member'

    case 'admins':
      return 'firm_admin'

    default:
      return undefined
  }
}

function getStatusesFromInnerTab(tabName: TeamSubtabName, statusFilter: IContractStatus): IContractStatus[] {
  switch (tabName) {
    case 'all':
      // all members with current status filter + invited
      return [statusFilter, 'offer_made', 'offer_rejected']

    case 'invited':
      return ['offer_made', 'offer_rejected']

    default:
      return [statusFilter]
  }
}

export function getQueryFiltersForTab(filterParams: IManageFilterParams, tabName: TeamSubtabName, firmData: TeamTab_Firm): ContractsFilters {
  if (!filterParams) {
    return {}
  }

  // Note: this set of filters still has support for the "all members" tab, deliberately not removed
  // TODO: remove the number check for jobId and clientId, it's used to prevent a crash while we transition to the new API
  const queryFilters: ContractsFilters = {
    statuses: getStatusesFromInnerTab(tabName, filterParams.contractsStatus),
    jobId: isNumber(filterParams.jobId) ? null : filterParams.jobId,
    clientId: filterParams.clientId ? firmData?.users?.find(u => u.rawId === filterParams.clientId)?.id : null,
    name: filterParams.name,
    stage: (tabName === 'invited') ? undefined : 'contract',
    skillsIds: filterParams.skills?.map(s => s.id),
    tagsIds: filterParams.tags?.map(t => t.id),
    firmRole: getFirmRoleFromInnerTab(tabName),
    excludeSelf: tabName === 'individuals' || tabName === 'managers', // Do not show self in individual and manager tabs
    managersOnly: tabName === 'managers' || tabName === 'admins',
    membersOnly: tabName === 'individuals',
    invitationType: tabName === 'invited' ? 'invitation' : undefined, // don't show hire offers in "invited" subtab
  }

  return queryFilters
}
