import React from 'react'
import {
  List, Datagrid, TextField,
  SimpleForm,
  TextInput,
  Filter, Show,
  ReferenceField,
  ReferenceInput,
  AutocompleteInput, BooleanField, DateField,
  Edit, Create, EditButton, BooleanInput, ShowButton,
} from 'react-admin'

const LinkFilter = props => (
  <Filter {...props}>
    <TextInput source="token" />
    <ReferenceInput reference="users" source="user_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput reference="users" source="freelancer_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput reference="jobs" source="job_id" allowEmpty>
      <AutocompleteInput optionText="full_title" />
    </ReferenceInput>
    <ReferenceInput reference="chat_threads" source="chat_thread_id" allowEmpty>
      <AutocompleteInput optionText="default_title" />
    </ReferenceInput>
    <BooleanInput source="login_only" />
    <BooleanInput source="permanent" />
  </Filter>
)

export const LinkList = props => (
  <List
    title="Links"
    filters={<LinkFilter />}
    {...props}
  >
    <Datagrid>
      <TextField source="token" />
      <TextField source="type" />
      <ReferenceField reference="users" source="user_id">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="users" source="freelancer_id">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="jobs" source="job_id">
        <TextField source="full_title" />
      </ReferenceField>
      <ReferenceField reference="chat_threads" source="chat_thread_id">
        <TextField source="default_title" />
      </ReferenceField>
      <ReferenceField label="Chat User" reference="users" source="chat_user_id">
        <TextField source="name" />
      </ReferenceField>
      <BooleanField source="auto_login" />
      <DateField source="expiration_date" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowLink = props => (
  <Show title="Show Link" {...props}>
    <SimpleForm>
      <TextField source="token" />
      <TextField source="type" />
      <ReferenceField reference="users" source="user_id">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="users" source="freelancer_id">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="jobs" source="job_id">
        <TextField source="full_title" />
      </ReferenceField>
      <ReferenceField reference="chat_threads" source="chat_thread_id">
        <TextField source="default_title" />
      </ReferenceField>
      <ReferenceField label="Chat User" reference="users" source="chat_user_id">
        <TextField source="name" />
      </ReferenceField>
      <BooleanField source="auto_login" />
      <BooleanField source="login_only" />
      <BooleanField source="permanent" />
      <BooleanField source="expired" />
      <DateField source="expiration_date" />
    </SimpleForm>
  </Show>
)

export const EditLink = props => (
  <Edit title="Edit Link" {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="token" />
      <ReferenceInput reference="users" source="user_id" allowEmpty>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput reference="users" filter={{ role: 'member' }} source="freelancer_id" allowEmpty>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput reference="jobs" source="job_id" allowEmpty>
        <AutocompleteInput optionText="full_title" />
      </ReferenceInput>
      <ReferenceInput reference="chat_threads" source="chat_thread_id" allowEmpty>
        <AutocompleteInput optionText="default_title" />
      </ReferenceInput>
      <ReferenceInput reference="users" source="chat_user_id" allowEmpty>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <BooleanInput source="login_only" />
      <BooleanInput source="permanent" />
    </SimpleForm>
  </Edit>
)

export const CreateLink = props => (
  <Create title="Create Link" {...props}>
    <SimpleForm>
      <TextInput source="token" />
      <ReferenceInput reference="users" source="user_id" allowEmpty>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput reference="users" filter={{ role: 'member' }} source="freelancer_id" allowEmpty>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput reference="jobs" source="job_id" allowEmpty>
        <AutocompleteInput optionText="full_title" />
      </ReferenceInput>
      <ReferenceInput reference="chat_threads" source="chat_thread_id" allowEmpty>
        <AutocompleteInput optionText="id" />
      </ReferenceInput>
      <BooleanInput source="login_only" />
      <BooleanInput source="permanent" />
    </SimpleForm>
  </Create>
)
