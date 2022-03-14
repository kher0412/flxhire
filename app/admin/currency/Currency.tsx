import React from 'react'
import {
  List, Create, Datagrid, TextField,
  ShowButton, SimpleForm,
  EditButton, Edit, Show,
  BooleanField, TextInput, BooleanInput,
} from 'react-admin'

export const CurrencyList = props => (
  <List title="Currencies" {...props} bulkActionButtons={false}>
    <Datagrid>
      <TextField source="code" sortable />
      <TextField source="symbol" sortable />
      <TextField source="icon_url" />
      <BooleanField source="conversion_fee" />
      <BooleanField source="allow_invoices" />
      <BooleanField source="allow_contracts" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowCurrency = props => (
  <Show title="Currencies" {...props}>
    <SimpleForm>
      <TextField source="code" sortable />
      <TextField source="symbol" sortable />
      <TextField source="icon_url" />
      <BooleanField source="conversion_fee" />
      <BooleanField source="allow_invoices" />
      <BooleanField source="allow_contracts" />
      <EditButton />
      <ShowButton />
    </SimpleForm>
  </Show>
)

export const EditCurrency = props => (
  <Edit title="Currency" {...props}>
    <SimpleForm>
      <TextInput source="code" />
      <TextInput source="symbol" />
      <TextInput source="icon_url" />
      <BooleanInput source="conversion_fee" />
      <BooleanInput source="allow_invoices" />
      <BooleanInput source="allow_contracts" />
    </SimpleForm>
  </Edit>
)

export const CreateCurrency = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="code" />
      <TextInput source="symbol" />
      <TextInput source="icon_url" />
      <BooleanInput source="conversion_fee" />
      <BooleanInput source="allow_invoices" />
      <BooleanInput source="allow_contracts" />
    </SimpleForm>
  </Create>
)
