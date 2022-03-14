import RenderMoney from 'admin/components/RenderMoney'
import React from 'react'
import {
  List, Datagrid, TextField, NumberField, SelectField,
  Edit, SimpleForm, NumberInput, Create, AutocompleteInput,
  ReferenceInput, Filter, TextInput, SelectInput, DateField,
  ReferenceField, EditButton, DeleteButton, FunctionField, ReferenceManyField, ShowButton, Show, BooleanField,
} from 'react-admin'

const itemTypeChoices = [
  { id: 'custom', name: 'Custom' },
  { id: 'background_check', name: 'Background Check' },
  { id: 'manager_fee', name: 'Managers Fee (Legacy)' },
  { id: 'job_fee', name: 'Job Fee (Legacy)' },
  { id: 'tracking_log', name: 'Tracking Log' },
  { id: 'job_integration_activation_fee', name: 'Job Integration Activation Fee' },
  { id: 'payment_processing_fee', name: 'Payment Processing Fee' },
  { id: 'salary', name: 'Salary' },
  { id: 'timesheets', name: 'Timesheets' },
  { id: 'credit_note', name: 'Credit note' },
]

const InvoiceItemFilter = props => (
  <Filter {...props}>
    <ReferenceInput source="client_id" reference="users" filter={{ role: 'client' }} allowEmpty alwaysOn>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput source="invoice_id" reference="invoices" allowEmpty alwaysOn>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput source="job_id" reference="jobs" allowEmpty>
      <AutocompleteInput optionText="title" />
    </ReferenceInput>
    <ReferenceInput source="contract_id" reference="contracts" allowEmpty>
      <AutocompleteInput optionText="title" />
    </ReferenceInput>
    <ReferenceInput source="firm_id" reference="firms" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <SelectInput source="item_type" choices={itemTypeChoices} allowEmpty />
  </Filter>
)

export const InvoiceItemList = props => (
  <List
    title="Invoice items"
    filters={<InvoiceItemFilter />}
    {...props}
    bulkActionButtons={false}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid>
      <ReferenceField source="invoice_id" reference="invoices" link="show">
        <TextField source="name" />
      </ReferenceField>
      <SelectField source="item_type" choices={itemTypeChoices} />
      <TextField source="description" />
      <NumberField source="num_units" />
      <FunctionField source="amount_per_unit" render={RenderMoney} />
      <FunctionField source="total_amount" render={RenderMoney} />
      <FunctionField source="payout_amount" render={RenderMoney} />
      <ShowButton />
      <EditButton />
      <DeleteButton undoable={false} />
    </Datagrid>
  </List>
)

export const ShowInvoiceItem = props => (
  <Show title="Invoice item" {...props}>
    <SimpleForm>
      <ReferenceField source="invoice_id" reference="invoices" link="show">
        <TextField source="name" />
      </ReferenceField>
      <SelectField source="item_type" choices={itemTypeChoices} />
      <ReferenceField source="contract_id" reference="contracts" link="show">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="user_id" reference="users" label="Manager" link="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="job_id" reference="jobs" link="show">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="job_integration_id" reference="job_integrations" link="show">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="firm_id" reference="firms" link="show" label="Firm (for Credit Note)">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="payroll_item_id" reference="payroll_items" link="show">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="paycheck_id" reference="paychecks" link="show">
        <TextField source="title" />
      </ReferenceField>
      <TextField source="stripe_customer_id" label="Stripe Customer ID" />
      <ReferenceManyField reference="tracking_logs" target="invoice_item_id" label="Tracking Logs">
        <Datagrid>
          <TextField source="log_type" />
          <TextField source="fee_name" />
          <BooleanField source="empty_seat" />
          <DateField showTime source="published_at" />
          <DateField showTime source="unpublished_at" />
          <ShowButton />
        </Datagrid>
      </ReferenceManyField>
      <ReferenceManyField reference="payouts" target="invoice_item_id" label="Payouts">
        <Datagrid>
          <ReferenceField source="payout_method_id" reference="payout_methods" link="show">
            <TextField source="name" />
          </ReferenceField>
          <DateField showTime source="created_at" />
          <TextField source="status" />
          <FunctionField source="amount" render={RenderMoney} />
          <ShowButton />
        </Datagrid>
      </ReferenceManyField>
      <TextField source="description" />
      <TextField source="explanation" />
      <DateField source="start_date" />
      <DateField source="end_date" />
      <NumberField source="num_units" />
      <FunctionField source="amount_per_unit" render={RenderMoney} />
      <FunctionField source="total_amount" render={RenderMoney} />
      <FunctionField source="payout_amount" render={RenderMoney} />
    </SimpleForm>
  </Show>
)

export const CreateInvoiceItem = props => (
  <Create title="Invoice items" {...props}>
    <SimpleForm>
      <SelectInput source="item_type" choices={itemTypeChoices} />
      <ReferenceInput label="Invoice" source="invoice_id" reference="invoices" filter={{ status: 'active,draft' }}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="contract_id" reference="contracts" link="show" allowEmpty>
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput source="job_id" reference="jobs" label="Job (for Legacy Open Position payment)" link="show" allowEmpty>
        <AutocompleteInput optionText="full_title" />
      </ReferenceInput>
      <ReferenceInput source="user_id" reference="users" filter={{ role: 'client' }} label="User (for Legacy Manager Fee payment)" link="show" allowEmpty>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="job_integration_id" reference="job_integrations" link="show" allowEmpty>
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput source="firm_id" reference="firms" link="show" allowEmpty label="Firm (for Credit Note)">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="payroll_item_id" reference="payroll_items" link="show">
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <TextInput source="stripe_customer_id" label="Stripe Customer ID" />
      <TextInput source="description" />
      <TextInput source="explanation" />
      <DateField source="start_date" />
      <DateField source="end_date" />
      <NumberInput source="num_units" />
      <NumberInput source="amount_per_unit" />
      <TextInput source="currency" />
    </SimpleForm>
  </Create>
)

export const EditInvoiceItem = props => (
  <Edit title="Invoice items" {...props} undoable={false}>
    <SimpleForm>
      <SelectInput source="item_type" choices={itemTypeChoices} />
      <ReferenceInput label="Invoice" source="invoice_id" reference="invoices">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="contract_id" reference="contracts" link="show" allowEmpty>
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput source="job_id" reference="jobs" link="show" allowEmpty>
        <AutocompleteInput optionText="full_title" />
      </ReferenceInput>
      <ReferenceInput source="user_id" reference="users" filter={{ role: 'client' }} label="User (for Legacy Manager Fee payment)" link="show" allowEmpty>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="job_integration_id" reference="job_integrations" link="show" allowEmpty>
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput source="firm_id" reference="firms" link="show" allowEmpty label="Firm (for Credit Note)">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="payroll_item_id" reference="payroll_items" link="show">
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <TextInput source="stripe_customer_id" label="Stripe Customer ID" />
      <TextInput source="description" />
      <NumberInput source="num_units" />
      <NumberInput source="amount_per_unit" />
      <TextInput source="currency" />
    </SimpleForm>
  </Edit>
)
