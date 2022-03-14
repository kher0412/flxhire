import React from 'react'
import {
  List, TextField, NumberField,
  Edit, ShowButton, Show, EditButton,
  SimpleForm, SelectField, FormDataConsumer,
  Create, Filter, BooleanField, BooleanInput,
  Datagrid, TextInput, NumberInput, AutocompleteInput,
  ReferenceArrayInput, ReferenceField, ReferenceInput,
  SelectInput, SingleFieldList, ChipField, DateField, DateInput,
  ReferenceArrayField, SelectArrayInput, DateTimeInput, TopToolbar, ListButton,
} from 'react-admin'
import { useForm } from 'react-final-form'
import { toMarkup, toMargin } from '../components/CustomMargins'
import LinkField from '../components/LinkField'
import GenerateInvoicesButton from './GenerateInvoices'

const payoutModes = [
  { id: 'wait_for_invoice_payment', name: 'Wait for Payment' },
  { id: 'skip_waiting_for_invoice_payment', name: 'Skip Wait for Payment' },
]

const invoiceScheduleChoices = [
  { id: 'weekly', name: 'Weekly' },
  { id: 'monthly', name: 'Monthly' },
  { id: 'biweekly', name: 'Bi-Weekly' },
]

const FirmEditActions: any = ({ basePath, data }) => (
  <TopToolbar>
    <ShowButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} />
    <GenerateInvoicesButton record={data} />
  </TopToolbar>
)

const FirmFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <SelectInput source="payout_mode" choices={payoutModes} />
    <SelectInput source="invoice_schedule" choices={invoiceScheduleChoices} />
    <ReferenceInput reference="billing_plans" source="billing_plan_id">
      <AutocompleteInput optionText="internal_name" />
    </ReferenceInput>
    <ReferenceInput reference="users" source="internal_recruiter_id" filter={{ role: 'recruiter' }}>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <BooleanInput source="legacy_billing" />
    <BooleanInput source="allow_invoice_auto_charge" />
    <BooleanInput source="allow_jobs_with_no_rates" />
    <BooleanInput source="separate_invoices_by_purchase_order_number" />
    <BooleanInput source="allow_no_payment_method" />
    <BooleanInput source="allow_api_access" />
    <BooleanInput source="ready_for_invoice_generation" />
  </Filter>
)

export const FirmList = props => (
  <List title="Firms" {...props} filters={<FirmFilter />} bulkActionButtons={false}>
    <Datagrid>
      <TextField source="name" />
      <LinkField source="website" />
      <NumberField source="payment_net_terms_for_non_payroll" label="Payment net terms for non payroll (days)" />
      <NumberField source="payment_net_terms_for_payroll" label="Payment net terms for payroll (days)" />
      <DateField source="next_auto_invoice_date" />
      <SelectField source="payout_mode" choices={payoutModes} />
      <ReferenceField reference="billing_plans" source="billing_plan_id">
        <TextField source="internal_name" />
      </ReferenceField>
      <BooleanField source="legacy_billing" />
      <BooleanField source="enable_overdue_notices" />
      <BooleanField source="instant_background_check_payment" />
      <ReferenceArrayField label="Firm admins" source="godfather_ids" reference="users" filter={{ role: 'client' }} perPage={200}>
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const EditFirm = props => (
  <Edit {...props} undoable={false} actions={<FirmEditActions />}>
    <SimpleForm initialValues={{ godfather_ids: [] }}>
      <TextInput source="name" />
      <TextInput source="logo_url" label="Full Sized Logo" />
      <TextInput source="avatar_url" label="Square/Circle Avatar (Optional)" />
      <TextInput source="website" />
      <TextInput multiline source="description" />
      <TextInput multiline source="additional_invoice_text" />
      <TextInput label="Vanity URL" source="slug" sortable={false} />
      <NumberInput source="payment_net_terms_for_non_payroll" label="Payment net terms for non payroll (days)" />
      <NumberInput source="payment_net_terms_for_payroll" label="Payment net terms for payroll (days)" />
      <SelectInput source="payout_mode" choices={payoutModes} />
      <ReferenceInput reference="billing_plans" source="billing_plan_id">
        <AutocompleteInput optionText="internal_name" />
      </ReferenceInput>
      <BooleanInput source="legacy_billing" />
      <DateTimeInput source="billing_plan_started_at" />
      <TextInput source="currency" />
      <SelectInput source="invoice_schedule" choices={invoiceScheduleChoices} />
      <DateInput source="next_auto_invoice_date" />
      <DateTimeInput source="last_auto_invoice_generation_at" />
      <BooleanInput source="allow_invoice_auto_charge" />
      <BooleanInput source="allow_invoice_emails" />
      <BooleanInput source="separate_invoices_by_purchase_order_number" />
      <BooleanInput source="allow_no_payment_method" />
      <BooleanInput source="allow_api_access" />
      <BooleanInput source="allow_jobs_with_no_rates" />
      <BooleanInput source="unify_invoices_in_preferred_currency" />
      <BooleanInput source="use_legacy_csv_format" />
      <TextInput source="disabled_payment_methods" />
      <TextInput source="emails_for_invoices" label="Additional email recipients (comma separated)" />
      <ReferenceInput reference="users" source="customer_success_rep_id">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput reference="users" source="manager_for_non_payroll_fees_id">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <FormDataConsumer>
        {() => {
          const { change } = useForm()
          return (
            <NumberInput
              source="invite_margin"
              onChange={event => change('invite_markup', toMarkup(event.target.value))}
            />
          )
        }}
      </FormDataConsumer>
      <FormDataConsumer>
        {() => {
          const { change } = useForm()
          return (
            <NumberInput
              source="hire_margin"
              onChange={event => change('hire_markup', toMarkup(event.target.value))}
            />
          )
        }}
      </FormDataConsumer>
      <FormDataConsumer>
        {() => {
          const { change } = useForm()
          return (
            <NumberInput
              source="invite_markup"
              onChange={event => change('invite_margin', toMargin(event.target.value))}
            />
          )
        }}
      </FormDataConsumer>
      <FormDataConsumer>
        {() => {
          const { change } = useForm()
          return (
            <NumberInput
              source="hire_markup"
              onChange={event => change('hire_margin', toMargin(event.target.value))}
            />
          )
        }}
      </FormDataConsumer>
      <NumberInput source="jobs_min_client_rate_usd" />
      <NumberInput source="jobs_min_annual_compensation_usd" />
      <NumberInput source="contracts_min_margin_usd" />
      <NumberInput source="invitation_min_client_rate_usd" />
      <NumberInput source="manager_fee_usd" />
      <NumberInput source="manager_fee_duration_days" />
      <NumberInput source="role_fee_usd" />
      <NumberInput source="role_duration_days" />
      <BooleanInput source="enable_overdue_notices" />
      <BooleanInput source="instant_background_check_payment" />
      <TextInput source="purchase_order_number_for_non_payroll_fees" />
      <BooleanInput source="suspend_invoice_creation" />
      <BooleanInput source="allow_display_applicant_source" />
      <BooleanInput source="disable_referral_opportunity_emails" />
      <FormDataConsumer>
        {({ formData, ...rest }) => (
          <ReferenceArrayInput
            label="Firm admins"
            source="godfather_ids"
            reference="users"
            allowEmpty
            filter={{ firm_id: formData.id, role: 'client' }}
            {...rest}
          >
            <SelectArrayInput optionText="name" />
          </ReferenceArrayInput>
        )}
      </FormDataConsumer>
      <ReferenceInput reference="users" source="internal_recruiter_id" filter={{ role: 'recruiter' }}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

const firmDefaults = {
  godfather_ids: [],
  instant_background_check_payment: true,
  enable_overdue_notices: true,
  allow_invoice_emails: true,
  allow_invoice_auto_charge: true,
  unify_invoices_in_preferred_currency: true,
  currency: 'USD',
  payout_mode: 'wait_for_invoice_payment',
}

export const CreateFirm = props => (
  <Create {...props}>
    <SimpleForm initialValues={firmDefaults}>
      <TextInput source="name" />
      <TextInput source="logo_url" label="Full Sized Logo" />
      <TextInput source="avatar_url" label="Square/Circle Avatar (Optional)" />
      <TextInput source="website" />
      <TextInput multiline source="description" />
      <TextInput multiline source="additional_invoice_text" />
      <TextInput source="emails_for_invoices" label="Additional email recipients (comma separated)" />
      <NumberInput source="payment_net_terms_for_non_payroll" label="Payment net terms for non payroll (days)" />
      <NumberInput source="payment_net_terms_for_payroll" label="Payment net terms for payroll (days)" />
      <SelectInput source="payout_mode" choices={payoutModes} />
      <ReferenceInput reference="billing_plans" source="billing_plan_id">
        <AutocompleteInput optionText="internal_name" />
      </ReferenceInput>
      <BooleanInput source="legacy_billing" />
      <DateTimeInput source="billing_plan_started_at" />
      <TextInput source="currency" />
      <SelectInput source="invoice_schedule" choices={invoiceScheduleChoices} />
      <DateInput source="next_auto_invoice_date" />
      <DateTimeInput source="last_auto_invoice_generation_at" />
      <BooleanInput source="allow_invoice_auto_charge" />
      <BooleanInput source="allow_invoice_emails" />
      <BooleanInput source="separate_invoices_by_purchase_order_number" />
      <BooleanInput source="allow_no_payment_method" />
      <BooleanInput source="allow_api_access" />
      <BooleanInput source="allow_jobs_with_no_rates" />
      <BooleanInput source="unify_invoices_in_preferred_currency" />
      <BooleanInput source="use_legacy_csv_format" />
      <NumberInput source="invite_margin" />
      <NumberInput source="hire_margin" />
      <NumberInput source="jobs_min_client_rate_usd" />
      <NumberInput source="jobs_min_annual_compensation_usd" />
      <NumberInput source="contracts_min_margin_usd" />
      <NumberInput source="invitation_min_client_rate_usd" />
      <NumberInput source="manager_fee_usd" />
      <NumberInput source="manager_fee_duration_days" />
      <NumberInput source="role_fee_usd" />
      <NumberInput source="role_duration_days" />
      <BooleanInput source="enable_overdue_notices" />
      <BooleanInput source="instant_background_check_payment" />
      <TextInput source="purchase_order_number_for_non_payroll_fees" />
      <BooleanInput source="suspend_invoice_creation" />
      <BooleanInput source="allow_display_applicant_source" />
      <BooleanInput source="disable_referral_opportunity_emails" />
      <ReferenceInput reference="users" source="internal_recruiter_id" filter={{ role: 'recruiter' }}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)

export const ShowFirm = props => (
  <Show {...props}>
    <SimpleForm>
      <TextField source="name" />
      <LinkField source="logo_url" label="Full Sized Logo" />
      <LinkField source="avatar_url" label="Square/Circle Avatar (Optional)" />
      <TextField source="website" />
      <TextField source="description" />
      <TextField source="additional_invoice_text" />
      <NumberField source="payment_net_terms_for_payroll" label="Payment net terms for payroll (days)" style={{ textAlign: 'left' }} />
      <NumberField source="payment_net_terms_for_non_payroll" label="Payment net terms for non payroll (days)" style={{ textAlign: 'left' }} />
      <SelectField source="payout_mode" choices={payoutModes} />
      <ReferenceField reference="billing_plans" source="billing_plan_id">
        <TextField source="internal_name" />
      </ReferenceField>
      <BooleanField source="legacy_billing" />
      <DateField showTime source="billing_plan_started_at" />
      <TextField source="currency" />
      <SelectField source="invoice_schedule" choices={invoiceScheduleChoices} />
      <DateField showTime source="next_auto_invoice_date" />
      <DateField showTime source="last_auto_invoice_generation_at" />
      <BooleanField source="allow_invoice_auto_charge" />
      <BooleanField source="allow_invoice_emails" />
      <BooleanField source="separate_invoices_by_purchase_order_number" />
      <BooleanField source="allow_no_payment_method" />
      <BooleanField source="allow_api_access" />
      <BooleanField source="allow_jobs_with_no_rates" />
      <BooleanField source="unify_invoices_in_preferred_currency" />
      <BooleanField source="use_legacy_csv_format" />
      <ReferenceField reference="users" source="customer_success_rep_id">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="users" source="manager_for_non_payroll_fees_id">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="emails_for_invoices" label="Additional email recipients (comma separated)" />
      <NumberField source="invite_margin" />
      <NumberField source="hire_margin" />
      <NumberField source="invite_markup" />
      <NumberField source="hire_markup" />
      <NumberField source="jobs_min_client_rate_usd" />
      <NumberField source="jobs_min_annual_compensation_usd" />
      <NumberField source="contracts_min_margin_usd" />
      <NumberField source="invitation_min_client_rate_usd" />
      <NumberField source="manager_fee_usd" />
      <NumberField source="manager_fee_duration_days" />
      <NumberField source="role_fee_usd" />
      <NumberField source="role_duration_days" />
      <BooleanField source="enable_overdue_notices" />
      <BooleanField source="instant_background_check_payment" />
      <TextField source="purchase_order_number_for_non_payroll_fees" />
      <BooleanField source="suspend_invoice_creation" />
      <BooleanField source="allow_display_applicant_source" />
      <BooleanField source="disable_referral_opportunity_emails" />
      <ReferenceArrayField label="Firm admins" source="godfather_ids" reference="users">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceField reference="users" source="internal_recruiter_id">
        <TextField source="name" />
      </ReferenceField>
    </SimpleForm>
  </Show>
)
