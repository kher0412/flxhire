
import React from 'react'
import {
  List, TextField,
  Edit, ShowButton, Show, EditButton,
  SimpleForm,
  Create, Filter,
  Datagrid, TextInput, AutocompleteInput,
  ReferenceField, ReferenceInput,
  DateField,
} from 'react-admin'

const ApiKeyFilter = props => (
  <Filter {...props}>
    <TextInput source="key" />
    <ReferenceInput reference="users" source="user_id">
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
)

export const ApiKeyList = props => (
  <List title="Api Keys" {...props} filters={<ApiKeyFilter />} bulkActionButtons={false}>
    <Datagrid>
      <TextField source="key_slice" label="First 4 characters" />
      <ReferenceField reference="users" source="user_id">
        <TextField source="name" />
      </ReferenceField>
      <DateField showTime source="last_used_at" />
      <DateField showTime source="created_at" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const EditApiKey = props => (
  <Edit {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="key" />
      <ReferenceInput reference="users" source="user_id">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const CreateApiKey = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="key" />
      <ReferenceInput reference="users" source="user_id">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)

export const ShowApiKey = props => (
  <Show {...props}>
    <SimpleForm>
      <TextField source="key" />
      <ReferenceField reference="users" source="user_id">
        <TextField source="name" />
      </ReferenceField>
      <DateField showTime source="last_used_at" />
      <DateField showTime source="created_at" />
    </SimpleForm>
  </Show>
)
