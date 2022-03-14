import React from 'react'
import {
  List, TextField, NumberField,
  Edit, ShowButton, Show, EditButton,
  SimpleForm, Create, BooleanField,
  BooleanInput, Datagrid, TextInput, NumberInput,
} from 'react-admin'

export const BillingPlanList = props => (
  <List title="Billing Plans" {...props} bulkActionButtons={false}>
    <Datagrid>
      <TextField source="name" />
      <TextField source="internal_name" />
      <BooleanField source="hidden" />
      <BooleanField source="in_use" />
      <BooleanField source="highlighted" />
      <NumberField source="minimum_managers" />
      <NumberField source="firms_count" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const EditBillingPlan = props => (
  <Edit {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="internal_name" />
      <BooleanInput source="hidden" />
      <BooleanInput source="highlighted" />
      <NumberInput source="daily_plan_fee_usd" />
      <NumberInput source="daily_job_fee_usd" />
      <NumberInput source="daily_manager_fee_usd" />
      <NumberInput source="daily_sourced_by_client_hire_contract_fee_usd" />
      <NumberInput source="daily_sourced_by_flexhire_hire_contract_fee_usd" />
      <NumberInput source="daily_payments_disabled_contract_fee_usd" />
      <NumberInput source="daily_invite_contract_fee_usd" />
      <NumberInput source="daily_flexhire_recruiter_per_job_fee_usd" />
      <NumberInput source="free_payments_disabled_contracts_limit" />
      <NumberInput source="max_candidates" />
      <NumberInput source="contracts_invitation_margin" />
      <NumberInput source="contracts_hire_sourced_by_client_margin" />
      <NumberInput source="contracts_hire_sourced_by_flexhire_margin" />
      <NumberInput source="contracts_hire_min_margin_usd" />
      <NumberInput source="minimum_managers" />
      <BooleanInput source="allow_multiple_managers" />
      <BooleanInput source="allow_ats_job_integrations" />
      <BooleanInput source="allow_career_page_integration" />
      <BooleanInput source="allow_background_checks" />
      <BooleanInput source="allow_flexhire_recruiters" />
      <BooleanInput source="allow_payments_disabled_contracts" />
      <BooleanInput source="customer_success_rep" />
      <TextInput source="payment_method_types" />

    </SimpleForm>
  </Edit>
)

export const CreateBillingPlan = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="internal_name" />
      <BooleanInput source="hidden" />
    </SimpleForm>
  </Create>
)

export const ShowBillingPlan = props => (
  <Show {...props}>
    <SimpleForm>
      <TextField source="name" />
      <TextField source="internal_name" />
      <BooleanField source="hidden" />
      <BooleanField source="in_use" />
      <BooleanField source="highlighted" />
      <NumberField source="firms_count" />
      <NumberField source="daily_plan_fee_usd" />
      <NumberField source="daily_job_fee_usd" />
      <NumberField source="daily_manager_fee_usd" />
      <NumberField source="daily_sourced_by_client_hire_contract_fee_usd" />
      <NumberField source="daily_sourced_by_flexhire_hire_contract_fee_usd" />
      <NumberField source="daily_payments_disabled_contract_fee_usd" />
      <NumberField source="daily_invite_contract_fee_usd" />
      <NumberField source="daily_flexhire_recruiter_per_job_fee_usd" />
      <NumberField source="free_payments_disabled_contracts_limit" />
      <NumberField source="max_candidates" />
      <NumberField source="contracts_invitation_margin" />
      <NumberField source="contracts_hire_sourced_by_client_margin" />
      <NumberField source="contracts_hire_sourced_by_flexhire_margin" />
      <NumberField source="contracts_hire_min_margin_usd" />
      <NumberField source="minimum_managers" />
      <BooleanField source="allow_multiple_managers" />
      <BooleanField source="allow_ats_job_integrations" />
      <BooleanField source="allow_career_page_integration" />
      <BooleanField source="allow_background_checks" />
      <BooleanField source="allow_flexhire_recruiters" />
      <BooleanField source="allow_payments_disabled_contracts" />
      <BooleanField source="customer_success_rep" />
      <TextField source="payment_method_types" />
    </SimpleForm>
  </Show>
)
