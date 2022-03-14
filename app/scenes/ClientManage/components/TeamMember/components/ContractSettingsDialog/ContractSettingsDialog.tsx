import React from 'react'
import { Condition, ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay'
import { ContractSettingsDialog_Contract$key } from '__generated__/ContractSettingsDialog_Contract.graphql'
import { Edit } from '@material-ui/icons'
import { ContractSettingsDialog_UserQuery } from '__generated__/ContractSettingsDialog_UserQuery.graphql'
import ContractSettingsForm from './components/ContractSettingsForm'

interface IContractSettingsDialogProps {
  contract: ContractSettingsDialog_Contract$key
  show: boolean
}

const ContractSettingsDialog = (props: IContractSettingsDialogProps) => {
  const { contract: contractProp, show } = props
  const userData = useLazyLoadQuery<ContractSettingsDialog_UserQuery>(graphql`
    query ContractSettingsDialog_UserQuery {
      currentUser {
        id
        managerContract {
          isFirmAdmin
        }
        ...ContractSettingsForm_User
      }
    }
  `, {}, {
    fetchPolicy: 'store-and-network',
  })
  const user = userData?.currentUser
  const contract = useFragment(graphql`
    fragment ContractSettingsDialog_Contract on Contract {
      id
      endDate
      startDate
      currency {
        code
      }
      clientRate {
        currency {
          code
        }
        value
      }
      rateMode
      freelancerRate {
        currency {
          code
        }
        value
      }
      enableTimesheets
      allowManageAccess
      requireTimesheetApprovalForPayments
      purchaseOrderNumber
      isManager
      isFirmAdmin
      client {
        id
        rawId
      }
      bonusPeriod
      bonusClientRate {
        currency {
          code
        }
        value
      }
      ...ContractSettingsForm_Contract
    }
  `, contractProp)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  let firmRole: 'firm_member' | 'firm_admin' | 'individual' = contract?.isManager ? 'firm_member' : 'individual'
  if (contract?.isFirmAdmin) firmRole = 'firm_admin'

  if (!show) {
    return null
  }

  const visible = (user?.managerContract?.isFirmAdmin || contract?.client?.id === user?.id)

  if (visible) {
    return (
      <React.Fragment>
        <Button
          onClick={() => setDialogOpen(true)}
          data-cy="edit-contract"
          color="secondary"
          responsive
        >
          <Edit /> Edit Contract
        </Button>

        <Condition condition={dialogOpen && !!contract?.id}>
          <ResponsiveDialog open onClose={() => setDialogOpen(false)} data-cy="contact-settings-dialog">
            <ContractSettingsForm
              userFragmentRef={user}
              contractFragmentRef={contract}
              initialValues={{
                client_id: contract?.client?.id || 'self',
                start_date: contract?.startDate,
                currency: contract?.currency?.code || 'USD',
                end_date: contract?.endDate,
                client_rate: contract?.clientRate?.value,
                rate_mode: contract?.rateMode,
                enable_timesheets: contract?.enableTimesheets,
                allow_manage_access: contract?.allowManageAccess,
                firm_role: firmRole,
                bonus_period: contract?.bonusPeriod || 'yearly',
                bonus_client_rate: contract?.bonusClientRate?.value,
                require_timesheet_approval_for_payments: contract?.requireTimesheetApprovalForPayments,
                purchase_order_number: contract?.purchaseOrderNumber,
              }}
              onClose={() => setDialogOpen(false)}
            />
          </ResponsiveDialog>
        </Condition>
      </React.Fragment>
    )
  }

  return null
}

export default ContractSettingsDialog
