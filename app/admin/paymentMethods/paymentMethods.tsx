import React from 'react'
import {
  List, Datagrid, TextField,
  AutocompleteInput, ReferenceInput, DateField,
  Filter, ReferenceField,
  SimpleForm, NumberField,
  Show, ShowButton, BooleanField,
  Edit, BooleanInput, NumberInput, TextInput,
  SelectField, SelectInput, TopToolbar, ListButton,
} from 'react-admin'
import RefreshStripeDataButton from 'admin/paymentMethods/RefreshStripeDataButton'

const paymentMethodTypeChoices = [
  { id: 'card', name: 'Card' },
  { id: 'plaid_link', name: 'Plaid Link' },
  { id: 'sepa_debit', name: 'SEPA Debit' },
  { id: 'ach_credit_transfer', name: 'ACH Transfer' },
]

const statusChoices = [
  { id: 'pending', name: 'Pending' },
  { id: 'active', name: 'Active' },
  { id: 'deleted', name: 'Deleted' },
]

const PaymentMethodFilter = props => (
  <Filter {...props}>
    <ReferenceInput label="Client" source="user_id" reference="users" filter={{ role: 'client' }} allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <SelectInput source="payment_method_type" choices={paymentMethodTypeChoices} />
    <SelectInput source="status" choices={statusChoices} />
  </Filter>
)

export const PaymentMethodList = props => (
  <List
    title="Payment Methods"
    {...props}
    filters={<PaymentMethodFilter />}
    bulkActionButtons={false}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid>
      <ReferenceField label="Client" source="user_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <TextField source="mask" />
      <SelectField source="payment_method_type" choices={paymentMethodTypeChoices} />
      <SelectField source="status" choices={statusChoices} />
      <DateField showTime source="created_at" />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowPaymentMethod = (props) => {
  return (
    <Show title="Payment Method" {...props} undoable={false}>
      <SimpleForm>
        <ReferenceField label="Client" source="user_id" reference="users">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="name" />
        <SelectField source="payment_method_type" choices={paymentMethodTypeChoices} />
        <SelectField source="status" choices={statusChoices} />
        <TextField source="customer_id" label="Stripe Customer ID" />
        <TextField source="account_id" label="Stripe Payment Method ID" />
        <TextField source="institution_name" />
        <TextField source="ach_account_number" label="ACH Account Number" />
        <TextField source="ach_routing_number" label="ACH Routing Number" />
        <TextField source="swift_code" />
        <TextField source="currency" />
        <TextField source="amount_available" />
        <TextField source="amount_received" />
        <TextField source="amount_charged" />
        <TextField source="cardholder_name" />
        <TextField source="email" />
        <NumberField source="exp_month" />
        <NumberField source="exp_year" />
        <BooleanField source="cvc_check" />
      </SimpleForm>
    </Show>
  )
}

const EditPaymentMethodActions: any = ({ basePath, data }) => (
  <TopToolbar>
    <ShowButton basePath={basePath} record={data} />
    <RefreshStripeDataButton record={data} />
    <ListButton basePath={basePath} />
  </TopToolbar>
)

export const EditPaymentMethod = (props) => {
  return (
    <Edit title="Payment Method" {...props} undoable={false} actions={<EditPaymentMethodActions />}>
      <SimpleForm>
        <ReferenceInput label="Client" source="user_id" reference="users" filter={{ role: 'client' }}>
          <AutocompleteInput optionText="name" optionalValue="id" />
        </ReferenceInput>
        <TextInput source="name" />
        <SelectInput source="payment_method_type" choices={paymentMethodTypeChoices} />
        <TextInput source="status" />
        <TextInput source="customer_id" label="Stripe Customer ID" />
        <TextInput source="account_id" label="Stripe Payment Method ID" />
        <TextInput source="institution_name" />
        <TextInput source="ach_account_number" label="ACH Account Number" />
        <TextInput source="ach_routing_number" label="ACH Routing Number" />
        <TextInput source="swift_code" />
        <TextInput source="currency" />
        <TextInput source="amount_available" />
        <TextInput source="amount_received" />
        <TextInput source="amount_charged" />
        <TextInput source="cardholder_name" />
        <TextInput source="email" />
        <NumberInput source="exp_month" />
        <NumberInput source="exp_year" />
        <BooleanInput source="cvc_check" />
      </SimpleForm>
    </Edit>
  )
}
