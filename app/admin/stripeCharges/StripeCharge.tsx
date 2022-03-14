import RenderMoney from 'admin/components/RenderMoney'
import React from 'react'
import moment from 'moment'
import {
  List, Datagrid, TextField, SelectField,
  AutocompleteInput, ReferenceInput, DateField,
  Filter, ReferenceField, FunctionField, SelectInput,
  Edit, NumberInput, TextInput, Create, SimpleForm,
  Show, EditButton, ShowButton, DateTimeInput,
} from 'react-admin'

const statusChoices = [
  { id: 'pending', name: 'Pending' },
  { id: 'processing', name: 'Processing' },
  { id: 'paid', name: 'Paid' },
  { id: 'failed', name: 'Failed' },
]

const StripeChargeFilter = props => (
  <Filter {...props}>
    <ReferenceInput label="Client" source="user_id" reference="users" filter={{ role: 'client' }} allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="invoice_id" reference="invoices" allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <SelectInput source="status" choices={statusChoices} />
  </Filter>
)

export const StripeChargeList = props => (
  <List
    title="Stripe charges"
    {...props}
    filters={<StripeChargeFilter />}
    bulkActionButtons={false}
    sort={{ field: 'created', order: 'DESC' }}
  >
    <Datagrid>
      <ReferenceField label="Client" source="user_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="invoice_id" reference="invoices" link="show">
        <TextField source="name" />
      </ReferenceField>
      <SelectField source="status" choices={statusChoices} />
      <DateField showTime source="processing_completed_at" />
      <FunctionField source="amount" render={RenderMoney} />
      <FunctionField source="fee" render={RenderMoney} />
      <DateField showTime source="created" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowStripeCharge = (props) => {
  return (
    <Show title="Stripe Charge" {...props} undoable={false}>
      <SimpleForm>
        <ReferenceField label="Client" source="user_id" reference="users">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="invoice_id" reference="invoices">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="payment_method_id" reference="payment_methods">
          <TextField source="name" />
        </ReferenceField>
        <SelectField source="status" choices={statusChoices} />
        <DateField showTime source="created" />
        <DateField showTime source="processing_completed_at" />
        <DateField showTime source="funds_available_on" />
        <FunctionField
          render={record => record.processing_time_seconds ? moment.duration(record.processing_time_seconds, 'seconds').humanize() : ''}
          label="Processing Time"
        />
        <FunctionField source="amount" render={RenderMoney} />
        <FunctionField source="fee" render={RenderMoney} />
        <TextField source="currency" />
        <TextField source="charge_id" label="Stripe Charge ID" />
        <TextField source="intent_id" label="Stripe Payment Intent ID" />
      </SimpleForm>
    </Show>
  )
}

export const EditStripeCharge = (props) => {
  return (
    <Edit title="Stripe Charge" {...props} undoable={false}>
      <SimpleForm>
        <ReferenceInput label="Client" source="user_id" reference="users" filter={{ role: 'client' }} allowEmpty>
          <AutocompleteInput optionText="name" optionalValue="id" />
        </ReferenceInput>
        <ReferenceInput source="invoice_id" reference="invoices" allowEmpty>
          <AutocompleteInput optionText="name" optionalValue="id" />
        </ReferenceInput>
        <SelectInput source="status" choices={statusChoices} />
        <DateTimeInput source="processing_completed_at" />
        <DateTimeInput source="funds_available_on" />
        <NumberInput source="amount" />
        <NumberInput source="fee" />
        <TextInput source="currency" />
        <TextInput source="charge_id" label="Stripe Charge ID" />
        <TextInput source="intent_id" label="Stripe Payment Intent ID" />
      </SimpleForm>
    </Edit>
  )
}

export const CreateStripeCharge = (props) => {
  return (
    <Create title="Stripe Charge" {...props}>
      <SimpleForm>
        <ReferenceInput label="Client" source="user_id" reference="users" filter={{ role: 'client' }} allowEmpty>
          <AutocompleteInput optionText="name" optionalValue="id" />
        </ReferenceInput>
        <ReferenceInput source="invoice_id" reference="invoices" allowEmpty>
          <AutocompleteInput optionText="name" optionalValue="id" />
        </ReferenceInput>
        <SelectInput source="status" choices={statusChoices} />
        <NumberInput source="amount" />
        <TextInput source="currency" />
        <TextInput source="charge_id" label="Stripe Charge ID" />
        <TextInput source="intent_id" label="Stripe Payment Intent ID" />
      </SimpleForm>
    </Create>
  )
}
