import RenderMoney from 'admin/components/RenderMoney'
import React from 'react'
import {
  List, Datagrid, DateField,
  TextField, ReferenceField, FunctionField, BooleanField,
  Show, SimpleForm, ShowButton, Filter, ReferenceInput,
  AutocompleteInput, NullableBooleanInput, BooleanInput, Edit, Create, TextInput,
  DateInput, NumberInput, EditButton, ReferenceManyField, NumberField,
} from 'react-admin'

const PayrollItemFilter = props => (
  <Filter {...props}>
    <ReferenceInput source="user_id" reference="users" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput label="Firm" source="firm_id" reference="firms" allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="freelancer_id" reference="users" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput source="client_id" reference="users" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput source="contract_id" reference="contracts" allowEmpty>
      <AutocompleteInput optionText="title" />
    </ReferenceInput>
    <ReferenceInput source="invoice_id" reference="invoices" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <NullableBooleanInput source="invoiced" />
    <NullableBooleanInput source="paid_by_client" />
  </Filter>
)

export const PayrollItemList = props => (
  <List
    title="Payroll Items"
    {...props}
    bulkActionButtons={false}
    filters={<PayrollItemFilter />}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid>
      <ReferenceField source="contract_id" reference="contracts" link="show">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="invoice_id" reference="invoices" link="show">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="payroll_item_type" label="Type" />
      <NumberField source="item_num" />
      <DateField source="start_date" />
      <DateField source="end_date" />
      <DateField showTime source="created_at" />
      <FunctionField source="total_to_pay_freelancer" render={RenderMoney} />
      <FunctionField source="total_to_pay_client" render={RenderMoney} />
      <TextField source="currency" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowPayrollItem = (props) => {
  return (
    <Show title="Payroll Item" {...props} undoable={false}>
      <SimpleForm>
        <TextField source="title" />
        <ReferenceField source="invoice_id" reference="invoices" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="invoice_item_id" reference="invoice_items" link="show">
          <TextField source="description" />
        </ReferenceField>
        <ReferenceField source="contract_id" reference="contracts" link="show">
          <TextField source="title" />
        </ReferenceField>
        <ReferenceField source="timesheet_id" reference="timesheets" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="paycheck_id" reference="paychecks" link="show">
          <TextField source="title" />
        </ReferenceField>
        <TextField source="payroll_item_type" />
        <NumberField source="item_num" />
        <DateField source="start_date" />
        <DateField source="end_date" />
        <DateField source="salary_start_date" />
        <DateField source="salary_end_date" />
        <DateField showTime source="created_at" />
        <FunctionField source="freelancer_rate" render={RenderMoney} />
        <FunctionField source="total_to_pay_freelancer" render={RenderMoney} />
        <FunctionField source="total_to_pay_client" render={RenderMoney} />
        <TextField source="currency" />
        <TextField source="rate_mode" />
        <BooleanField source="legacy_calculation_method" />
        <BooleanField source="suspend_payout" />
        <ReferenceManyField perPage={100} reference="payouts" target="paycheck_id" label="Payouts">
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
      </SimpleForm>
    </Show>
  )
}

export const EditPayrollItem = (props) => {
  return (
    <Edit title="Payroll Item" {...props} undoable={false}>
      <SimpleForm>
        <ReferenceInput source="contract_id" reference="contracts" allowEmpty>
          <AutocompleteInput optionText="title" />
        </ReferenceInput>
        <ReferenceInput source="timesheet_id" reference="timesheets" allowEmpty>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="paycheck_id" reference="paychecks" allowEmpty>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="item_num" />
        <DateInput source="salary_start_date" />
        <DateInput source="salary_end_date" />
        <NumberInput source="salary_freelancer_rate" />
        <TextInput source="currency" />
        <TextInput source="rate_mode" />
        <BooleanInput source="legacy_calculation_method" />
        <BooleanInput source="suspend_payout" />
      </SimpleForm>
    </Edit>
  )
}

export const CreatePayrollItem = (props) => {
  return (
    <Create title="Payroll Item" {...props} undoable={false}>
      <SimpleForm>
        <ReferenceInput source="contract_id" reference="contracts" allowEmpty>
          <AutocompleteInput optionText="title" />
        </ReferenceInput>
        <ReferenceInput source="timesheet_id" reference="timesheets" allowEmpty>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="paycheck_id" reference="paychecks" allowEmpty>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="item_num" />
        <DateInput source="salary_start_date" />
        <DateInput source="salary_end_date" />
        <NumberInput source="salary_freelancer_rate" />
        <TextInput source="currency" />
        <TextInput source="rate_mode" />
        <BooleanInput source="legacy_calculation_method" />
      </SimpleForm>
    </Create>
  )
}
