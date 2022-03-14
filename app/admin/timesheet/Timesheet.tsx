import RenderMoney from 'admin/components/RenderMoney'
import React from 'react'
import {
  List, Datagrid, TextField, DateField, NumberField,
  ShowButton, Show, SimpleForm, Filter,
  SelectInput, AutocompleteInput, NumberInput,
  TextInput, BooleanInput, EditButton, Edit, ReferenceManyField,
  DateInput, ReferenceInput, ReferenceField, TopToolbar, FunctionField,
} from 'react-admin'
import GenerateInvoices from './GenerateInvoices'

const timesheetStatusOptions = [
  { id: 'pending', name: 'Pending' },
  { id: 'submitted', name: 'Submitted' },
  { id: 'client_query', name: 'Client Query' },
  { id: 'approved', name: 'Approved' },
  { id: 'rejected', name: 'Rejected' },
  { id: 'void', name: 'Void' },
]

const TimesheetFilter = props => (
  <Filter {...props}>
    <ReferenceInput source="firm_id" reference="firms" allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="client_id" reference="users" filter={{ role: 'client' }} allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="freelancer_id" reference="users" filter={{ role: 'member' }} allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="contract_id" reference="contracts" allowEmpty>
      <AutocompleteInput optionText="title" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="invoice_id" reference="invoices" allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="paycheck_id" reference="paychecks" allowEmpty>
      <AutocompleteInput optionText="title" optionalValue="id" />
    </ReferenceInput>
    <SelectInput source="status" choices={timesheetStatusOptions} />
    <BooleanInput label="Invoiced?" source="invoiced" />
    <BooleanInput label="Ready for Invoicing?" source="ready_for_paycheck" />
  </Filter>
)

const ListActions = ({
  displayedFilters,
  filters,
  filterValues,
  resource,
  showFilter,
}: any) => (
  <TopToolbar>
    {filters && React.cloneElement(filters, {
      resource,
      showFilter,
      displayedFilters,
      filterValues,
      context: 'button',
    }) }
    <GenerateInvoices />
  </TopToolbar>
)

export const TimesheetList = props => (
  <List
    title="Timesheets"
    {...props}
    filters={<TimesheetFilter />}
    actions={<ListActions />}
    bulkActionButtons={false}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid>
      <ReferenceField label="Client" source="client_id" reference="users" link="show">
        <TextField source="name" label="Client" />
      </ReferenceField>
      <ReferenceField label="Member" source="freelancer_id" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Invoice" source="invoice_id" reference="invoices" link="show">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="status" />
      <DateField source="start_date" />
      <DateField source="end_date" />
      <DateField source="submitted_at" />
      <NumberField source="total_hours" />
      <NumberField source="total_minutes" />
      <FunctionField source="freelancer_rate" render={RenderMoney} />
      <FunctionField source="client_rate" render={RenderMoney} />
      <FunctionField source="total_to_pay_freelancer" sortable={false} render={RenderMoney} />
      <FunctionField source="total_to_pay_for_hours_client" sortable={false} render={RenderMoney} />
      <FunctionField source="total_expenses" sortable={false} render={RenderMoney} />
      <FunctionField source="total_to_pay_client" sortable={false} render={RenderMoney} />
      <DateField source="approved_at" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowTimesheet = props => (
  <Show title="Timesheet" {...props}>
    <SimpleForm>
      <TextField source="project_codes" label="Project Codes" />
      <ReferenceField label="Client" source="client_id" reference="users" link="show">
        <TextField source="name" label="Client" />
      </ReferenceField>
      <ReferenceField label="Member" source="freelancer_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Payroll Item" source="payroll_item_id" reference="payroll_items" link="show">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField label="Paycheck" source="paycheck_id" reference="paychecks" link="show">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField label="Invoice" source="invoice_id" reference="invoices" link="show">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="status" />
      <DateField source="start_date" />
      <DateField source="end_date" />
      <FunctionField source="freelancer_rate" style={{ textAlign: 'left' }} render={RenderMoney} />
      <FunctionField source="client_rate" style={{ textAlign: 'left' }} render={RenderMoney} />
      <FunctionField source="total_to_pay_freelancer" style={{ textAlign: 'left' }} render={RenderMoney} />
      <FunctionField source="total_to_pay_for_hours_client" style={{ textAlign: 'left' }} render={RenderMoney} />
      <FunctionField source="total_expenses" style={{ textAlign: 'left' }} render={RenderMoney} />
      <FunctionField source="total_to_pay_client" style={{ textAlign: 'left' }} sortable={false} render={RenderMoney} />
      <DateField showTime source="approved_at" />
      <TextField source="client_comments" />
      <ReferenceManyField reference="timesheet_entries" target="timesheet_id" label="Entries">
        <Datagrid>
          <DateField showTime source="start_time" />
          <DateField showTime source="end_time" />
          <TextField source="project_code" />
          <TextField source="expense_type" />
          <TextField source="description" />
        </Datagrid>
      </ReferenceManyField>
      <ReferenceManyField reference="expenses" target="timesheet_id" label="Expenses">
        <Datagrid>
          <DateField source="date" />
          <TextField source="amount" />
          <TextField source="project_code" />
          <TextField source="expense_type" />
          <TextField source="description" />
        </Datagrid>
      </ReferenceManyField>
    </SimpleForm>
  </Show>
)

export const EditTimesheet = props => (
  <Edit title="Timesheet" {...props} undoable={false}>
    <SimpleForm>
      <ReferenceInput label="Client" source="client_id" reference="users" filter={{ role: 'client' }}>
        <AutocompleteInput optionText="name" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput label="Member" source="freelancer_id" reference="users" filter={{ role: 'member' }}>
        <AutocompleteInput optionText="name" optionalValue="id" />
      </ReferenceInput>
      <ReferenceInput label="Payroll Item" source="paycheck_id" reference="paychecks" allowEmpty>
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <SelectInput source="status" choices={timesheetStatusOptions} />
      <DateInput source="start_date" />
      <DateInput source="end_date" />
      <DateInput source="approved_at" />
      <NumberInput source="freelancer_rate" />
      <NumberInput source="client_rate" />
      <TextInput source="currency" />
    </SimpleForm>
  </Edit>
)
