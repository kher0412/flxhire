import React from 'react'
import {
  List, Datagrid, TextField,
  SimpleForm, BooleanField,
  Filter, NumberField, NumberInput,
  ReferenceField, SelectField, BooleanInput,
  ReferenceInput, DateField, DateTimeInput,
  AutocompleteInput, FunctionField, SelectInput,
  Edit, Create, EditButton, ShowButton, Show,
} from 'react-admin'
import moment from 'moment'

const logTypeChoices = [
  { id: 'job_integration', name: 'Job Int.' },
  { id: 'job', name: 'Open Job' },
  { id: 'user', name: 'Active Manager' },
  { id: 'contract', name: 'Active Contract' },
  { id: 'firm', name: 'Firm Plan' },
  { id: 'recruiter', name: 'Recruiter' },
]

const TrackingLogFilter = props => (
  <Filter {...props}>
    <SelectInput source="log_type" label="Type" choices={logTypeChoices} />
    <BooleanInput source="invoiced" />
    <BooleanInput source="payments_enabled" />
    <BooleanInput source="payments_disabled" />
    <BooleanInput source="active" />
    <BooleanInput source="inactive" />
    <BooleanInput source="empty" label="Empty Seat" />
    <BooleanInput source="not_empty" label="Not Empty Seat" />
    <ReferenceInput reference="firms" source="firm_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput reference="jobs" source="job_id" allowEmpty>
      <AutocompleteInput optionText="title" />
    </ReferenceInput>
    <ReferenceInput reference="job_integrations" source="job_integration_id" allowEmpty>
      <AutocompleteInput optionText="title" />
    </ReferenceInput>
    <ReferenceInput reference="users" source="user_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
)

export const TrackingLogList = props => (
  <List
    title="Tracking Logs"
    filters={<TrackingLogFilter />}
    sort={{ field: 'published_at', order: 'DESC' }}
    {...props}
  >
    <Datagrid>
      <SelectField source="log_type" label="Type" choices={logTypeChoices} />
      <ReferenceField reference="firms" source="firm_id">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="jobs" source="job_id">
        <TextField source="full_title" />
      </ReferenceField>
      <ReferenceField reference="job_integrations" source="job_integration_id" label="Job Int.">
        <TextField source="integration_name" />
      </ReferenceField>
      <ReferenceField reference="users" source="user_id" label="Manager">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="contracts" source="contract_id">
        <TextField source="title" />
      </ReferenceField>
      <FunctionField render={record => record.duration ? moment.duration(record.duration, 'seconds').humanize() : ''} label="Duration" />
      <BooleanField source="empty_seat" label="Empty" />
      <NumberField source="item_index" label="N." />
      <BooleanField source="to_invoice" label="Pay" />
      <BooleanField source="invoiced" />
      <NumberField source="estimated_total_to_pay_client" label="Estimated Total" />
      <DateField showTime source="published_at" />
      <DateField showTime source="unpublished_at" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowTrackingLog = props => (
  <Show title="Show Tracking Log" {...props}>
    <SimpleForm>
      <SelectField source="log_type" label="Type" choices={logTypeChoices} />
      <ReferenceField reference="firms" source="firm_id">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="jobs" source="job_id">
        <TextField source="full_title" />
      </ReferenceField>
      <ReferenceField reference="job_integrations" source="job_integration_id">
        <TextField source="integration_name" />
      </ReferenceField>
      <ReferenceField reference="users" source="user_id" label="Manager">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="contracts" source="contract_id">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField reference="invoice_items" source="invoice_item_id">
        <TextField source="description" />
      </ReferenceField>
      <ReferenceField reference="invoices" source="invoice_id">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="billing_plans" source="billing_plan_id">
        <TextField source="internal_name" />
      </ReferenceField>
      <BooleanField source="empty_seat" />
      <NumberField source="item_index" />
      <BooleanField source="to_invoice" />
      <NumberField source="daily_amount_to_pay_client" />
      <NumberField source="estimated_total_to_pay_client" />
      <FunctionField render={record => record.duration ? moment.duration(record.duration, 'seconds').humanize() : ''} label="Duration" />
      <DateField showTime source="published_at" />
      <DateField showTime source="unpublished_at" />
    </SimpleForm>
  </Show>
)

export const EditTrackingLog = props => (
  <Edit title="Edit Tracking Log" {...props} undoable={false}>
    <SimpleForm>
      <SelectInput source="log_type" label="Type" choices={logTypeChoices} />
      <ReferenceInput reference="firms" source="firm_id">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput reference="job_integrations" source="job_integration_id">
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput reference="jobs" source="job_id">
        <AutocompleteInput optionText="full_title" />
      </ReferenceInput>
      <ReferenceInput reference="users" filter={{ role: 'client' }} source="user_id">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput reference="contracts" source="contract_id">
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput reference="billing_plans" source="billing_plan_id">
        <AutocompleteInput optionText="internal_name" />
      </ReferenceInput>
      <BooleanInput source="empty_seat" />
      <NumberInput source="item_index" />
      <NumberInput source="daily_amount_to_pay_client" />
      <DateTimeInput source="published_at" />
      <DateTimeInput source="unpublished_at" />
    </SimpleForm>
  </Edit>
)

export const CreateTrackingLog = props => (
  <Create title="Create Tracking Log" {...props}>
    <SimpleForm>
      <ReferenceInput reference="firms" source="firm_id">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput reference="job_integrations" source="job_integration_id">
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput reference="jobs" source="job_id">
        <AutocompleteInput optionText="full_title" />
      </ReferenceInput>
      <ReferenceInput reference="users" filter={{ role: 'client' }} source="user_id">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput reference="contracts" source="contract_id">
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput reference="billing_plan" source="billing_plan_id">
        <AutocompleteInput optionText="internal_name" />
      </ReferenceInput>
      <BooleanInput source="empty_seat" />
      <NumberInput source="item_index" />
      <NumberInput source="daily_amount_to_pay_client" />
      <DateTimeInput source="published_at" />
      <DateTimeInput source="unpublished_at" />
    </SimpleForm>
  </Create>
)
