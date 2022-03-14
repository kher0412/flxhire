import { connect, ConnectedProps } from 'react-redux'
import { createAction } from 'redux-actions'
import { reduxForm, InjectedFormProps, getFormValues, ConfigProps } from 'redux-form'
import { TOGGLE_SNACKBAR } from 'reducers/Common'
import { trackError } from 'services/analytics'
import { RootState } from 'reducers'
import { commitMutation } from 'api/graphql'
import { graphql } from 'relay-runtime'
import { ContractSettingsFormContainer_UpdateContractMutation, MoneyInput } from '__generated__/ContractSettingsFormContainer_UpdateContractMutation.graphql'
import { ensureDateAsString } from 'services/formatting'
import moment from 'moment'
import { getErrorText } from 'services/error'
import { FormErrors, IFirmRole, RateMode } from 'types'
import ContractSettingsForm, { IContractSettingsFormProps } from './ContractSettingsForm'

export interface ContractSettingsFormFields {
  rate_mode: RateMode
  require_timesheet_approval_for_payments: boolean
  start_date: string
  end_date: string
  client_rate: number
  currency: string
  client_id: string
  enable_timesheets: boolean
  purchase_order_number: string
  firm_role: IFirmRole | 'individual'
  allow_manage_access: boolean
  bonus_period: 'monthly' | 'yearly'
  bonus_client_rate: number
}

const form: ConfigProps<ContractSettingsFormFields, IContractSettingsFormProps> = {
  form: 'contractSettingsMobileForm',
  enableReinitialize: true,
  validate: (values: ContractSettingsFormFields) => {
    const errors: FormErrors<ContractSettingsFormFields> = {}

    if (values.rate_mode === 'month' && values.require_timesheet_approval_for_payments) {
      errors.require_timesheet_approval_for_payments = 'Cannot be used with a fixed salary'
    } else if (values.require_timesheet_approval_for_payments && !values.enable_timesheets) {
      errors.require_timesheet_approval_for_payments = 'Requires "Enable Work Reports" to be on'
    } else if (moment(values.start_date).isAfter(values.end_date)) {
      errors.start_date = 'Start date cannot be after end date.'
    }

    if (values.bonus_client_rate < 0) {
      errors.bonus_client_rate = 'If set, must be >= 0'
    }

    return errors
  },
}

const mapStateToProps = (state: RootState) => ({
  currentValues: getFormValues(form.form)(state) as ContractSettingsFormFields,
})

const mapDispatchToProps = dispatch => ({
  submitForm: async (contractId: string, data: ContractSettingsFormFields) => {
    try {
      const isFirmAdmin = data.firm_role === 'firm_admin'
      const isManager = isFirmAdmin || data.firm_role === 'firm_member'
      await commitMutation<ContractSettingsFormContainer_UpdateContractMutation>({
        mutation: graphql`
          mutation ContractSettingsFormContainer_UpdateContractMutation($input: UpdateContractInput!) {
            updateContract(input: $input) {
              contract {
                status
                lastInteractionAt
                clientRate {
                  currency {
                    code
                  }
                  value
                }
                freelancerRate {
                  currency {
                    code
                  }
                  value
                }
                currency {
                  code
                }
                enableTimesheets
                rateMode
                isManager
                isFirmAdmin
                allowHireAccess
                allowManageAccess
                requireTimesheetApprovalForPayments
                purchaseOrderNumber
                client {
                  rawId
                  name
                }
                startDate
                endDate
                tags {
                  rawId
                  name
                }
                bonusClientRate {
                  currency {
                    code
                  }
                  value
                }
                bonusPeriod
              }
            }
          }
        `,
        variables: {
          input: {
            contractId: contractId,
            clientId: data.client_id === 'self' ? null : data.client_id,
            clientRate: { value: data.client_rate || 0, currencyCode: data.currency },
            currency: data.currency,
            enableTimesheets: data.enable_timesheets,
            rateMode: data.rate_mode,
            requireTimesheetApprovalForPayments: data.require_timesheet_approval_for_payments,
            purchaseOrderNumber: data.purchase_order_number,
            startDate: ensureDateAsString(data.start_date),
            endDate: ensureDateAsString(data.end_date),
            isFirmAdmin: isFirmAdmin,
            allowHireAccess: isManager,
            allowManageAccess: data.allow_manage_access,
            bonusPeriod: data.bonus_period,
            bonusClientRate: { value: data.bonus_client_rate || 0, currencyCode: data.currency },
          },
        },
      })
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: 'Contract successfully updated' }))
    } catch (err) {
      trackError(err)
      dispatch(createAction(TOGGLE_SNACKBAR)({ message: getErrorText(err) }))
    }
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

export type ContainerProps = ConnectedProps<typeof connector> & InjectedFormProps<ContractSettingsFormFields, IContractSettingsFormProps>

export default connector(reduxForm<ContractSettingsFormFields, IContractSettingsFormProps>(form)(ContractSettingsForm))
