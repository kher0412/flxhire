import RenderMoney from 'admin/components/RenderMoney'
import React from 'react'
import {
  List, Datagrid, DateField,
  TextField, ReferenceField, FunctionField,
  Show, SimpleForm, Filter, SelectInput,
  ReferenceInput, AutocompleteInput, ShowButton,
  TextInput, NumberInput, Edit, DateTimeInput, EditButton,
  Create, SelectField, TopToolbar, ListButton,
} from 'react-admin'
import PerformPayoutButton from './PerformPayoutButton'

const payoutMethodTypeChoices = [
  { name: 'Payoneer', id: 'payoneer' },
  { name: 'Stripe', id: 'stripe_connect' },
]

const statusChoices = [
  { name: 'Pending', id: 'pending' },
  { name: 'Successful', id: 'successful' },
  { name: 'Failed', id: 'failed' },
]

const payoutTypeChoices = [
  { name: 'Timesheets', id: 'timesheets' },
  { name: 'Salary', id: 'salary' },
  { name: 'Referral (Flexhire)', id: 'referral' },
  { name: 'Referral Boost', id: 'referral_boost' },
]

const PayoutFilters = props => (
  <Filter {...props}>
    <SelectInput source="status" choices={statusChoices} />
    <SelectInput source="payout_method_type" choices={payoutMethodTypeChoices} />
    <ReferenceInput reference="users" source="user_id" link="show">
      <AutocompleteInput source="name" />
    </ReferenceInput>
    <ReferenceInput reference="invoices" source="invoice_id" link="show">
      <AutocompleteInput source="title" />
    </ReferenceInput>
    <ReferenceInput reference="paychecks" source="paycheck_id" link="show">
      <AutocompleteInput source="title" />
    </ReferenceInput>
  </Filter>
)

export const PayoutList = props => (
  <List
    title="Payouts"
    {...props}
    bulkActionButtons={false}
    filters={<PayoutFilters />}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid>
      <ReferenceField source="invoice_id" reference="invoices" link="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="payout_method_id" reference="payout_methods" link="show">
        <TextField source="name" />
      </ReferenceField>
      <DateField showTime source="created_at" />
      <SelectField source="status" choices={statusChoices} />
      <SelectField source="payout_type" choices={payoutTypeChoices} />
      <FunctionField source="amount" render={RenderMoney} />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowPayout = (props) => {
  return (
    <Show title="Payout" {...props} undoable={false}>
      <SimpleForm>
        <ReferenceField source="invoice_id" reference="invoices" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="invoice_item_id" reference="invoice_items" link="show">
          <TextField source="description" />
        </ReferenceField>
        <ReferenceField source="payout_method_id" reference="payout_methods" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="User" source="user_id" reference="users" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="Referral User" source="referral_user_id" reference="users" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="paycheck_id" reference="paychecks" link="show">
          <TextField source="title" />
        </ReferenceField>
        <DateField showTime source="created_at" />
        <SelectField source="status" choices={statusChoices} />
        <SelectField source="payout_type" choices={payoutTypeChoices} />
        <TextField source="description" />
        <TextField source="payment_id" label="Unique Payment ID" />
        <TextField source="external_payment_id" label="External ID" />
        <FunctionField source="amount" render={RenderMoney} />
        <FunctionField source="fee" render={RenderMoney} />
        <TextField source="currency" />

      </SimpleForm>
    </Show>
  )
}

const PayoutEditActions: any = ({ basePath, data }) => (
  <TopToolbar>
    <PerformPayoutButton record={data} />
    <ShowButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} />
  </TopToolbar>
)

export const EditPayout = (props) => {
  return (
    <Edit title="Payout" actions={<PayoutEditActions />} {...props} undoable={false}>
      <SimpleForm>
        <ReferenceInput source="invoice_id" reference="invoices" link="show">
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="invoice_item_id" reference="invoice_items" link="show">
          <AutocompleteInput optionText="description" />
        </ReferenceInput>
        <ReferenceInput source="payout_method_id" reference="payout_methods" link="show">
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Referral User" source="referral_user_id" reference="users" link="show">
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="paycheck_id" reference="paychecks" link="show">
          <AutocompleteInput optionText="title" />
        </ReferenceInput>
        <DateTimeInput source="created_at" />
        <SelectInput source="status" choices={statusChoices} />
        <SelectInput source="payout_type" choices={payoutTypeChoices} />
        <TextInput source="description" />
        <TextInput source="payment_id" label="Unique Payment ID" />
        <TextInput source="external_payment_id" label="External ID" />
        <NumberInput source="amount" />
        <NumberInput source="fee" />
        <TextInput source="currency" />
      </SimpleForm>
    </Edit>
  )
}

export const CreatePayout = (props) => {
  return (
    <Create title="Payout" {...props} undoable={false}>
      <SimpleForm>
        <ReferenceInput source="invoice_id" reference="invoices" link="show">
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="invoice_item_id" reference="invoice_items" link="show">
          <AutocompleteInput optionText="description" />
        </ReferenceInput>
        <ReferenceInput source="payout_method_id" reference="payout_methods" link="show">
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Referral User" source="referral_user_id" reference="users" link="show">
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput source="paycheck_id" reference="paychecks" link="show">
          <AutocompleteInput optionText="title" />
        </ReferenceInput>
        <DateTimeInput source="created_at" />
        <SelectInput source="status" choices={statusChoices} />
        <SelectInput source="payout_type" choices={payoutTypeChoices} />
        <TextInput source="description" />
        <TextInput source="payment_id" label="Unique Payment ID" />
        <TextInput source="external_payment_id" label="External ID" />
        <NumberInput source="amount" />
        <NumberInput source="fee" />
        <TextInput source="currency" />
      </SimpleForm>
    </Create>
  )
}
