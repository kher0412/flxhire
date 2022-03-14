import React from 'react'
import {
  List, Datagrid,
  ShowButton, Show,
  ReferenceField, TextField, NumberField, DateField,
  SimpleForm, TextInput, DateInput, NumberInput,
  Edit, EditButton, BooleanInput, ReferenceInput,
  SelectInput, AutocompleteInput, Create,
  TabbedForm, FormTab, BooleanField, FunctionField,
  Filter, SelectField, FormDataConsumer, NullableBooleanInput,
} from 'react-admin'
import { useForm } from 'react-final-form'

import StatCard from '../components/StatCard'
import { toMarkup, toMargin } from '../components/CustomMargins'
import RenderMoney from '../components/RenderMoney'
import ContractPreview from './ContractPreview'

const invitationTypeChoices = [
  { name: 'Hire', id: 'hire' },
  { name: 'Invitation', id: 'invitation' },
]

const interviewSchedulingMethodChoices = [
  { name: 'Schedule via Flexhire', id: 'schedule_via_flexhire' },
  { name: 'Schedule via Calendly', id: 'schedule_via_calendly' },
]

const paymentModeChoices = [
  { name: 'Pay Work Reports', id: 'pay_work_reports' },
  { name: 'Salary', id: 'salary' },
]

const rateModeChoices = [
  { name: 'Hour', id: 'hour' },
  { name: 'Month', id: 'month' },
]

const firmRoleChoices = [
  { name: 'Manager', id: 'firm_member' },
  { name: 'Admin', id: 'firm_admin' },
]

const statusChoices = [
  { name: 'Potential', id: 'potential' },
  { name: 'Job Viewed', id: 'job_viewed' },
  { name: 'Draft Job Application', id: 'job_application_draft' },
  { name: 'Invited To Apply to Job', id: 'job_application_invited' },
  { name: 'Member not Interested', id: 'freelancer_not_interested' },
  { name: 'Applied to Job', id: 'job_application_sent' },
  { name: 'Interview Requested (Pending)', id: 'pending' },
  { name: 'Interview Accepted', id: 'interview_accepted' },
  { name: 'Interview Rejected', id: 'interview_rejected' },
  { name: 'Offer Made', id: 'offer_made' },
  { name: 'Offer Rejected', id: 'offer_rejected' },
  { name: 'Rejected', id: 'rejected' },
  { name: 'Active', id: 'active' },
  { name: 'Paused', id: 'paused' },
  { name: 'Expired', id: 'expired' },
  { name: 'Deleted', id: 'deleted' },
]

const ContractFilter = props => (
  <Filter {...props}>
    <ReferenceInput source="client_id" reference="users" filter={{ role: 'client' }} allowEmpty alwaysOn>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="freelancer_id" reference="users" filter={{ role: 'member' }} allowEmpty alwaysOn>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="job_id" reference="jobs" allowEmpty alwaysOn>
      <AutocompleteInput optionText="full_title" optionalValue="id" />
    </ReferenceInput>
    <SelectInput source="status" choices={statusChoices} />
    <SelectInput source="invitation_type" choices={invitationTypeChoices} />
    <SelectInput source="payment_mode" choices={paymentModeChoices} />
    <SelectInput source="firm_role" choices={firmRoleChoices} />
    <NullableBooleanInput source="for_manager" />
    <NullableBooleanInput source="invoice_access" />
    <ReferenceInput label="Invited by" source="invited_by_id" reference="users" link="show">
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput label="Inheritor" source="inheritor_id" reference="users" link="show">
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
)

export const ContractList = props => (
  <List title="Contracts" {...props} filters={<ContractFilter />} sort={{ field: 'last_interaction_at', order: 'DESC' }} bulkActionButtons={false}>
    <Datagrid>
      <ReferenceField label="Client" source="client_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Member" source="freelancer_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Job" source="job_id" reference="jobs" link="show">
        <TextField source="title" />
      </ReferenceField>
      <SelectField source="status" choices={statusChoices} />
      <SelectField source="invitation_type" choices={invitationTypeChoices} />
      <DateField showTime source="last_interaction_at" />
      <DateField source="start_date" />
      <DateField source="end_date" />
      <FunctionField source="client_rate" render={RenderMoney} />
      <FunctionField source="freelancer_rate" render={RenderMoney} />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowContract = props => (
  <div>
    <Show title="Contract" {...props}>
      <SimpleForm>

        <StatCard label="Revenue" source="stats.revenue" />
        <StatCard label="Costs" source="stats.costs" />
        <StatCard label="Profit" source="stats.profit" />

        <StatCard label="Receivables" source="stats.receivable" />
        <StatCard label="Payables" source="stats.payable" />

        <ReferenceField label="Job" source="job_id" reference="jobs" link="show">
          <TextField source="full_title" />
        </ReferenceField>

        <ReferenceField label="Client" source="client_id" reference="users" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="Member" source="freelancer_id" reference="users" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="referral_id" reference="referrals">
          <TextField source="referer_name" />
        </ReferenceField>
        <SelectField source="status" choices={statusChoices} />
        <SelectField source="previous_status" choices={statusChoices} />
        <BooleanField source="hidden" label="Hide Job Application" />
        <DateField showTime source="last_interaction_at" />
        <TextField source="applicant_source" />
        <BooleanField source="sourced_by_client" />
        <SelectField source="firm_role" choices={firmRoleChoices} />
        <BooleanField source="invoice_access" />
        <ReferenceField label="Invited by" source="invited_by_id" reference="users" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="Inheritor" source="inheritor_id" reference="users" link="show">
          <TextField source="name" />
        </ReferenceField>
        <SelectField
          source="invitation_type"
          choices={invitationTypeChoices}
        />
        <SelectField source="payment_mode" choices={paymentModeChoices} />
        <BooleanField source="enable_timesheets" />
        <BooleanField source="require_timesheet_approval_for_payments" />
        <DateField showTime source="min_date_to_generate_next_salary" />
        <DateField showTime source="next_salary_generation_date" />
        <DateField showTime source="next_salary_invoice_date" />
        <DateField showTime source="estimated_next_salary_payout_date" />
        <TextField source="freelancer_email" label="Member Email (For Invitation)" />
        <TextField source="freelancer_first_name" label="Member First Name (For Invitation)" />
        <TextField source="freelancer_last_name" label="Member Last Name (For Invitation)" />
        <SelectField source="interview_scheduling_method" choices={interviewSchedulingMethodChoices} />
        <TextField source="calendly_url" />
        <TextField source="description" />
        <BooleanField source="notify_changes" label="Send emails when the contract is edited" />

        <DateField source="start_date" />
        <TextField source="project_length_in_months" />
        <DateField source="end_date" />
        <TextField source="purchase_order_number" />

        <BooleanField source="payments_enabled" />

        <FunctionField source="client_rate" render={RenderMoney} style={{ textAlign: 'left' }} />
        <SelectField source="rate_mode" choices={rateModeChoices} />
        <BooleanField label="Disable Min USD Margin Limit" source="disable_min_usd_margin_limit" />
        <BooleanField source="hide_freelancer_rate_from_client" />
        <NumberField source="margin" style={{ textAlign: 'left' }} />
        <NumberField source="effective_margin" style={{ textAlign: 'left' }} />
        <NumberField source="markup" style={{ textAlign: 'left' }} />
        <NumberField source="effective_markup" style={{ textAlign: 'left' }} />
        <FunctionField source="profit_per_hour" render={RenderMoney} style={{ textAlign: 'left' }} />
        <FunctionField source="freelancer_rate" render={RenderMoney} style={{ textAlign: 'left' }} />
        <FunctionField source="annual_compensation" render={RenderMoney} style={{ textAlign: 'left' }} />

        <ReferenceField source="job_id" reference="jobs" link="show">
          <TextField source="full_title" />
        </ReferenceField>

        <TextField source="interviewer_email" />
        <TextField source="interviewer_name" />
        <TextField source="interviewer_role" />
        <DateField source="interview_date_1" />
        <DateField source="interview_date_2" />
        <DateField source="interview_date_3" />
        <DateField source="interview_date_4" />

        <BooleanField source="freelancer_agrees_terms" />

        <TextField source="freelancer_feedback" />
        <TextField source="freelancer_message" />
        <TextField source="freelancer_phone" />
        <TextField source="freelancer_skype" />

        <TextField source="interview_note" />
        <TextField source="offer_note" />
        <TextField source="position_type" />
      </SimpleForm>
    </Show>
  </div>
)

export const EditContract = props => (
  <Edit title="Contract" {...props} undoable={false}>
    <TabbedForm>
      <FormTab label="Basic">
        <ReferenceInput label="Client" source="client_id" reference="users" filter={{ role: 'client' }}>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Member" source="freelancer_id" reference="users" filter={{ role: 'member' }} allowEmpty>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <SelectInput source="status" choices={statusChoices} />
        <SelectInput source="previous_status" choices={statusChoices} />
        <BooleanInput source="hidden" label="Hide Job Application" />
        <DateInput showTime source="last_interaction_at" />
        <SelectInput source="firm_role" choices={firmRoleChoices} />
        <BooleanInput source="invoice_access" />
        <ReferenceInput label="Invited by" source="invited_by_id" reference="users" link="show">
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Inheritor" source="inheritor_id" reference="users" link="show">
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <SelectInput
          source="invitation_type"
          choices={invitationTypeChoices}
        />
        <SelectInput source="payment_mode" choices={paymentModeChoices} />
        <BooleanInput source="enable_timesheets" />
        <BooleanInput source="require_timesheet_approval_for_payments" />
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            formData.invitation_type === 'invitation' && (
              <React.Fragment>
                <div><TextInput source="freelancer_email" label="Member Email" {...rest} /></div>
                <div><TextInput source="freelancer_first_name" label="Member First Name" {...rest} /></div>
                <div><TextInput source="freelancer_last_name" label="Member Last Name" {...rest} /></div>
              </React.Fragment>
            )
          )}
        </FormDataConsumer>
        <SelectInput source="interview_scheduling_method" choices={interviewSchedulingMethodChoices} />
        <TextInput source="calendly_url" />
        <ReferenceInput source="referral_id" reference="referrals" allowEmpty>
          <AutocompleteInput optionText="referer_name" />
        </ReferenceInput>

        <TextInput multiline source="description" style={{ width: '50%' }} />
        <BooleanInput source="notify_changes" label="Send emails when the contract is edited" />
        <BooleanInput source="payments_enabled" />

        <BooleanInput label="Disable Min USD Margin Limit" source="disable_min_usd_margin_limit" />
        <BooleanInput source="hide_freelancer_rate_from_client" />
        <NumberField source="effective_margin" style={{ textAlign: 'left' }} />
        <NumberField source="effective_markup" style={{ textAlign: 'left' }} />
        <FunctionField source="profit_per_hour" render={RenderMoney} style={{ textAlign: 'left' }} />
        <FunctionField label="Member Rate (Current)" source="freelancer_rate" render={RenderMoney} />
        <FormDataConsumer>
          {({ formData }) => <ContractPreview data={formData} />}
        </FormDataConsumer>
        <NumberInput source="client_rate" />
        <SelectInput source="rate_mode" choices={rateModeChoices} />
        <TextInput source="currency" />
        <FormDataConsumer>
          {() => {
            const { change } = useForm()
            return (
              <NumberInput
                source="margin"
                onChange={event => change('markup', toMarkup(event.target.value))}
              />
            )
          }}
        </FormDataConsumer>
        <FormDataConsumer>
          {() => {
            const { change } = useForm()
            return (
              <NumberInput
                source="markup"
                onChange={event => change('margin', toMargin(event.target.value))}
              />
            )
          }}
        </FormDataConsumer>

        <NumberInput source="annual_compensation" />

        <DateInput source="start_date" />
        <NumberInput source="project_length_in_months" />
        <DateInput source="end_date" />
        <TextInput source="purchase_order_number" />

        <FormDataConsumer>
          {({ formData }) => (
            <ReferenceInput label="Job" source="job_id" reference="jobs" filter={{ user_id: formData.client_id }} allowEmpty>
              <AutocompleteInput optionText="full_title" />
            </ReferenceInput>
          )}
        </FormDataConsumer>
      </FormTab>

      <FormTab label="Interview">
        <TextInput source="interviewer_email" />
        <TextInput source="interviewer_name" />
        <TextInput source="interviewer_role" />
        <DateInput source="interview_date_1" />
        <DateInput source="interview_date_2" />
        <DateInput source="interview_date_3" />
        <DateInput source="interview_date_4" />
        <TextInput multiline source="interview_note" style={{ width: '50%' }} />
      </FormTab>

      <FormTab label="Offer">
        <SelectInput
          source="position_type"
          choices={[
            { name: 'Permanent', id: 'permanent' },
            { name: 'Freelance', id: 'freelancer' },
          ]}
        />

        <TextInput multiline source="offer_note" style={{ width: '50%' }} />
      </FormTab>

      <FormTab label="Member extra">
        <BooleanInput source="freelancer_agrees_terms" />
        <TextInput source="freelancer_feedback" />
        <TextInput source="freelancer_message" />
        <TextInput source="freelancer_phone" />
        <TextInput source="freelancer_skype" />
      </FormTab>
    </TabbedForm>
  </Edit>
)

const contractFormDefaults = {
  status: 'active',
  invitation_type: 'hire',
  enable_timesheets: true,
  require_timesheet_approval_for_payments: true,
  rate_mode: 'hour',
  payment_mode: 'pay_work_reports',
}

export const CreateContract = props => (
  <Create title="Contract" {...props}>
    <TabbedForm initialValues={contractFormDefaults}>
      <FormTab label="Basic">
        <ReferenceInput label="Client" source="client_id" reference="users" filter={{ role: 'client' }}>
          <AutocompleteInput optionText="name" optionalValue="id" />
        </ReferenceInput>
        <ReferenceInput label="Member" source="freelancer_id" reference="users" filter={{ role: 'member' }} allowEmpty>
          <AutocompleteInput optionText="name" optionalValue="id" />
        </ReferenceInput>
        <SelectInput
          source="status"
          choices={statusChoices}
        />
        <BooleanInput source="hidden" label="Hide Job Application" />
        <ReferenceInput source="referral_id" reference="referrals" allowEmpty>
          <AutocompleteInput optionText="referer_name" />
        </ReferenceInput>
        <SelectInput source="firm_role" choices={firmRoleChoices} />
        <BooleanInput source="invoice_access" />
        <ReferenceInput label="Invited by" source="invited_by_id" reference="users" link="show">
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Inheritor" source="inheritor_id" reference="users" link="show">
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <SelectInput
          source="invitation_type"
          choices={invitationTypeChoices}
        />
        <SelectInput source="payment_mode" choices={paymentModeChoices} />
        <BooleanInput source="enable_timesheets" />
        <BooleanInput source="require_timesheet_approval_for_payments" />
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            formData.invitation_type === 'invitation' && (
              <React.Fragment>
                <TextInput source="freelancer_email" label="Member Email" {...rest} />
                <TextInput source="freelancer_first_name" label="Member First Name" {...rest} />
                <TextInput source="freelancer_last_name" label="Member Last Name" {...rest} />
              </React.Fragment>
            )
          )}
        </FormDataConsumer>

        <TextInput multiline source="description" />
        <BooleanInput source="payments_enabled" />

        <NumberInput source="client_rate" />
        <SelectInput source="rate_mode" choices={rateModeChoices} />
        <NumberInput source="margin" label="Margin (Percentage)" />
        <BooleanInput label="Disable Min USD Margin Limit" source="disable_min_usd_margin_limit" />
        <BooleanInput source="hide_freelancer_rate_from_client" />

        <NumberInput source="annual_compensation" />

        <DateInput source="start_date" />
        <NumberInput source="project_length_in_months" />
        <DateInput source="end_date" />

        <TextInput source="purchase_order_number" />

        <FormDataConsumer>
          {({ formData }) => (
            <ReferenceInput label="Job" source="job_id" reference="jobs" filter={{ user_id: formData.client_id }} allowEmpty>
              <AutocompleteInput optionText="full_title" optionalValue="id" />
            </ReferenceInput>
          )}
        </FormDataConsumer>
      </FormTab>

      <FormTab label="Interview">

        <TextInput source="interviewer_email" />
        <TextInput source="interviewer_name" />
        <TextInput source="interviewer_role" />
        <DateInput source="interview_date_1" />
        <DateInput source="interview_date_2" />
        <DateInput source="interview_date_3" />
        <DateInput source="interview_date_4" />
      </FormTab>

      <FormTab label="Member extra">

        <BooleanInput source="freelancer_agrees_terms" />
        <TextInput source="freelancer_feedback" />
        <TextInput source="freelancer_message" />
        <TextInput source="freelancer_phone" />
        <TextInput source="freelancer_skype" />
      </FormTab>

    </TabbedForm>
  </Create>
)
