import React, { useCallback, useState } from 'react'
import { Field, Fields } from 'redux-form'
import moment from 'moment'
import { ensureMoment } from 'services/formatting'
import { DialogContent, DialogActions, MenuItem, DialogTitle, Grid } from '@material-ui/core'
import { Button, SelectField, DatePicker, TextField, InfoMessage, CheckboxField, InputGroup, InputGroupConnector } from 'components/themed'
import { graphql, useFragment } from 'react-relay'
import { GridExpandable, Condition } from 'components'
import { ContractSettingsForm_Contract$key } from '__generated__/ContractSettingsForm_Contract.graphql'
import RateFields from 'scenes/InvitationTeam/components/RateFields'
import ContractBonusAmountField from 'components/themed/ContractBonusAmountField'
import { ContractSettingsForm_User$key } from '__generated__/ContractSettingsForm_User.graphql'
import { ContainerProps } from './ContractSettingsFormContainer'

export interface IContractSettingsFormProps {
  contractFragmentRef: ContractSettingsForm_Contract$key
  userFragmentRef: ContractSettingsForm_User$key
  onClose: () => void
}

const ContractSettingsForm = (props: IContractSettingsFormProps & ContainerProps) => {
  const { contractFragmentRef, userFragmentRef, currentValues, submitting, handleSubmit, onClose, submitForm } = props

  const contract = useFragment(graphql`
    fragment ContractSettingsForm_Contract on Contract {
      id
      client {
        self
      }
      freelancer {
        __typename # we only need to check existance
      }
      firm {
        users {
          id
          rawId
          name
        }
      }
      freelancerFirstName
      freelancerName
      freelancerRate {
        currency {
          code
        }
        value
      }
      rateMode
      isManager
      status
      startDate
    }
  `, contractFragmentRef)
  const user = useFragment(graphql`
    fragment ContractSettingsForm_User on User {
      id
      managerContract {
        allowManageAccess
        isFirmAdmin
      }
      configuration {
        enableAutoBonuses
      }
    }
  `, userFragmentRef)

  const [bonusPreviewLoading, setBonusPreviewLoading] = useState(false)

  const isBehind = moment().isBefore(ensureMoment(contract.startDate))
  const currentUserCanManageContract = user?.managerContract?.isFirmAdmin || contract?.client?.self

  const isManager = Boolean(contract?.isManager)
  const currentUserHasManageAccess = user?.managerContract?.allowManageAccess
  const allowGivingManageAccess = user?.managerContract?.isFirmAdmin || currentUserHasManageAccess
  const clients = contract?.firm?.users || []
  const freelancerName = contract?.freelancerName
  const freelancerFirstName = contract?.freelancerFirstName
  const showSelfInManagers = !contract?.freelancer

  let managerText = freelancerFirstName ? `${freelancerFirstName} is managed by` : 'Managed by'
  if (isManager) managerText = `Invoices ${freelancerFirstName ? `for ${freelancerFirstName} ` : ' '}are sent to`

  const handleDialogSave = useCallback((formData) => {
    submitForm(contract.id, formData)
    onClose()
  }, [contract?.id])

  return (
    <form onSubmit={handleSubmit(handleDialogSave)}>
      <DialogTitle>
        Contract settings
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Condition condition={!isManager}>
            <Grid item xs={12}>
              <Fields
                names={['client_rate', 'currency', 'rate_mode']}
                component={RateFields}
                label="Currency"
                fullWidth
                contractId={contract?.id}
                freelancerRate={contract?.freelancerRate}
                disabled={!currentUserCanManageContract}
              />
            </Grid>

            <Condition condition={user?.configuration?.enableAutoBonuses}>
              <Grid item xs={12}>
                <InputGroup>
                  <Field
                    name="bonus_client_rate"
                    component={ContractBonusAmountField}
                    nullable
                    contractId={contract?.id}
                    currency={currentValues?.currency}
                    onLoadingChange={setBonusPreviewLoading}
                  />

                  <InputGroupConnector>
                    /
                  </InputGroupConnector>

                  <Field
                    name="bonus_period"
                    component={SelectField}
                  >
                    <MenuItem value="monthly">
                      Month
                    </MenuItem>

                    <MenuItem value="yearly">
                      Year
                    </MenuItem>
                  </Field>
                </InputGroup>
              </Grid>
            </Condition>
          </Condition>

          <Grid item xs={12}>
            <Field
              name="client_id"
              component={SelectField}
              disabled={!currentUserCanManageContract}
              label={managerText}
              fullWidth
            >
              {showSelfInManagers && (
                <MenuItem value="self" data-cy="select-manager-option-self">
                  {freelancerName || 'Themselves'}
                </MenuItem>
              )}
              {clients.map(client => (
                <MenuItem key={client.id} value={client.id} data-cy={`select-manager-option-${client.rawId}`}>
                  {client.name}
                </MenuItem>
              ))}
            </Field>
          </Grid>

          <Condition condition={isManager}>
            <Grid item xs={12}>
              <Field
                name="firm_role"
                component={SelectField}
                disabled={!currentUserCanManageContract || !contract || !user?.managerContract?.isFirmAdmin}
                label="Role"
                fullWidth
              >
                <MenuItem value="firm_member">
                  Manager
                </MenuItem>

                <MenuItem value="firm_admin">
                  Admin
                </MenuItem>
              </Field>
            </Grid>

            <Condition condition={currentValues?.firm_role === 'firm_member'}>
              <Grid item xs={12}>
                <Field
                  name="allow_manage_access"
                  component={CheckboxField}
                  disabled={!currentUserCanManageContract || !contract || !allowGivingManageAccess}
                  label="Allow access to Team Management"
                  helperText={allowGivingManageAccess ? null : "You don't have permission to grant this access"}
                  fullWidth
                />
              </Grid>
            </Condition>
          </Condition>

          <Condition condition={!isManager}>
            <Grid item xs={12}>
              <Field
                name="start_date"
                component={DatePicker}
                maxDate={moment().toDate()}
                disabled={isBehind ? !currentUserCanManageContract : (!currentUserCanManageContract || contract?.status === 'paused' || contract?.status === 'active')}
                label="Contract starts on"
                fullWidth
                data-cy="datefield-start_date"
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                name="end_date"
                component={DatePicker}
                minDate={moment().toDate()}
                disabled={!currentUserCanManageContract}
                label="Contract ends on"
                fullWidth
                data-cy="datefield-end_date"
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                name="purchase_order_number"
                component={TextField}
                disabled={!currentUserCanManageContract}
                label="Purchase Order number"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                name="enable_timesheets"
                component={CheckboxField}
                disabled={!currentUserCanManageContract}
                label="Enable work reports"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                name="require_timesheet_approval_for_payments"
                component={CheckboxField}
                disabled={!currentUserCanManageContract || contract?.rateMode === 'month'}
                label="Require work report approval for payment"
                helperText={contract?.rateMode === 'month' ? 'Unavailable with a fixed salary' : undefined}
                fullWidth
              />
            </Grid>
          </Condition>

          <GridExpandable
            item
            xs={12}
            expand={!user?.managerContract?.isFirmAdmin && currentValues && currentValues?.client_id !== user.id}
            mountOnEnter
            unmountOnExit
          >
            <InfoMessage>
              You will no longer be able to edit this contract (or re-assign it to yourself) after it has been assigned to another manager.
            </InfoMessage>
          </GridExpandable>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} data-cy="cancel">
          Cancel
        </Button>

        <Button
          color="primary"
          disabled={submitting || !contract?.id || bonusPreviewLoading}
          type="submit"
          data-cy="submit"
        >
          Save
        </Button>
      </DialogActions>
    </form>
  )
}

export default ContractSettingsForm
