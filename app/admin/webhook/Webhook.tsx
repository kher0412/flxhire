import React from 'react'
import {
  List, TextField,
  Edit, ShowButton, Show, EditButton,
  SimpleForm,
  Create, Filter,
  Datagrid, TextInput, AutocompleteInput,
  ReferenceField, ReferenceInput,
  DateField, NullableBooleanInput,
  BooleanField, BooleanInput,
} from 'react-admin'

const WebhookFilter = props => (
  <Filter {...props}>
    <TextInput source="url" />
    <NullableBooleanInput source="enabled" />
    <ReferenceInput reference="users" source="user_id">
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput reference="firms" source="firm_id">
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
)

export const WebhookList = props => (
  <List title="Webhooks" {...props} filters={<WebhookFilter />} bulkActionButtons={false} sort={{ field: 'created_at', order: 'DESC' }}>
    <Datagrid>
      <TextField source="url" />
      <BooleanField source="enabled" />
      <ReferenceField reference="users" source="user_id">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="firms" source="firm_id">
        <TextField source="name" />
      </ReferenceField>
      <BooleanField source="authentication_header_present" />
      <DateField showTime source="created_at" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const EditWebhook = props => (
  <Edit {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="url" />
      <BooleanInput source="enabled" />
      <TextInput source="authentication_header_name" />
      <TextInput source="authentication_header_value" />
      <ReferenceInput reference="users" source="user_id">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const CreateWebhook = props => (
  <Create {...props} defaultValues={{ enabled: true }}>
    <SimpleForm>
      <TextInput source="url" />
      <BooleanInput source="enabled" />
      <TextInput source="authentication_header_name" />
      <TextInput source="authentication_header_value" />
      <ReferenceInput reference="users" source="user_id">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)

export const ShowWebhook = props => (
  <Show {...props}>
    <SimpleForm>
      <TextField source="url" />
      <BooleanField source="enabled" />
      <TextField source="authentication_header_name" />
      <TextField source="authentication_header_value" />
      <ReferenceField reference="users" source="user_id">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="firms" source="firm_id">
        <TextField source="name" />
      </ReferenceField>
      <DateField showTime source="created_at" />
    </SimpleForm>
  </Show>
)
