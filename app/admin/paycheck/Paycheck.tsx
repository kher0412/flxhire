import RenderMoney from 'admin/components/RenderMoney'
import React from 'react'
import {
  List, Datagrid, DateField,
  TextField, ReferenceField, FunctionField,
  Show, SimpleForm, ShowButton, Filter, ReferenceInput,
  AutocompleteInput, NullableBooleanInput, Edit, Create, TextInput,
  NumberInput, EditButton, ReferenceManyField, SelectInput, SelectField,
  BooleanInput, BooleanField, DateTimeInput,
} from 'react-admin'

const statusChoices = [
  { id: 'pending', name: 'Pending' },
  { id: 'ready', name: 'Ready' },
  { id: 'paid', name: 'Paid' },
  { id: 'failed', name: 'Failed' },
]

const PaycheckFilter = props => (
  <Filter {...props}>
    <ReferenceInput source="user_id" reference="users" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput source="invoice_id" reference="invoices" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <SelectInput source="status" choices={statusChoices} />
    <NullableBooleanInput source="invoiced" />
    <NullableBooleanInput source="paid_by_client" />
    <BooleanInput source="ready_for_auto_payout" />
  </Filter>
)

export const PaycheckList = props => (
  <List
    title="Paychecks"
    {...props}
    bulkActionButtons={false}
    filters={<PaycheckFilter />}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid>
      <ReferenceField source="user_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="invoice_id" reference="invoices" link="show">
        <TextField source="name" />
      </ReferenceField>
      <SelectField source="status" choices={statusChoices} />
      <DateField showTime source="created_at" />
      <FunctionField source="total_to_pay_freelancer" render={RenderMoney} />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowPaycheck = (props) => {
  return (
    <Show title="Paycheck" {...props} undoable={false}>
      <SimpleForm>
        <ReferenceField source="user_id" reference="users" link="show">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="title" />
        <ReferenceField source="invoice_id" reference="invoices" link="show">
          <TextField source="name" />
        </ReferenceField>
        <SelectField source="status" choices={statusChoices} />
        <DateField showTime source="created_at" />
        <FunctionField source="total_to_pay_freelancer" render={RenderMoney} />
        <TextField source="currency" />
        <DateField showTime source="paid_out_at" />
        <DateField showTime source="last_payout_failure_at" />
        <BooleanField source="ready_for_auto_payout" />
        <BooleanField source="synced_with_invoice" />
        <BooleanField source="payout_blocked" />
        <BooleanField source="suspend_payout" />
        <ReferenceManyField reference="timesheets" target="paycheck_id" label="Timesheets">
          <Datagrid>
            <DateField source="start_date" />
            <DateField source="end_date" />
            <TextField source="status" />
            <FunctionField source="total_to_pay_freelancer" render={RenderMoney} />
            <FunctionField source="total_to_pay_client" render={RenderMoney} />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
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

export const EditPaycheck = (props) => {
  return (
    <Edit title="Paycheck" {...props} undoable={false}>
      <SimpleForm>
        <ReferenceInput source="user_id" reference="users" allowEmpty>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="invoice_id" reference="invoices" allowEmpty>
          <AutocompleteInput optionText="title" />
        </ReferenceInput>
        <SelectInput source="status" choices={statusChoices} />
        <NumberInput source="total_to_pay_freelancer" />
        <TextInput source="currency" />
        <DateTimeInput source="paid_out_at" />
        <DateTimeInput source="last_payout_failure_at" />
        <BooleanInput source="suspend_payout" />
      </SimpleForm>
    </Edit>
  )
}

export const CreatePaycheck = (props) => {
  return (
    <Create title="Paycheck" {...props} undoable={false}>
      <SimpleForm>
        <ReferenceInput source="user_id" reference="users" allowEmpty>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="invoice_id" reference="invoices" allowEmpty>
          <AutocompleteInput optionText="title" />
        </ReferenceInput>
        <SelectInput source="status" choices={statusChoices} />
        <NumberInput source="total_to_pay_freelancer" />
        <TextInput source="currency" />
      </SimpleForm>
    </Create>
  )
}
