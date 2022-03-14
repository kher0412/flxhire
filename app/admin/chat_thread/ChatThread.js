import React from 'react'
import {
  List, Datagrid, TextField,
  Show,
  SimpleForm,
  Filter,
  ReferenceField,
  ReferenceInput,
  SelectField,
  SelectInput,
  AutocompleteInput, DateField,
  ShowButton,
  BooleanField,
} from 'react-admin'

const typeChoices = [
  { id: 'profile_feedback', name: 'Profile Feedback' },
  { id: 'contract', name: 'Contract' },
]

const ChatThreadFilter = props => (
  <Filter {...props}>
    <SelectInput source="thread_type" choices={typeChoices} alwaysOn />
    <ReferenceInput reference="users" source="user_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput reference="contracts" source="contract_id" allowEmpty>
      <AutocompleteInput optionText="title" />
    </ReferenceInput>
  </Filter>
)

export const ChatThreadList = props => (
  <List
    title="Chat Threads"
    filters={<ChatThreadFilter />}
    sort={{ field: 'created_at', order: 'DESC' }}
    {...props}
  >
    <Datagrid>
      <ReferenceField source="user_id" reference="users" sortable={false} allowEmpty>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="contract_id" reference="contracts" sortable={false}>
        <TextField source="title" />
      </ReferenceField>
      <SelectField source="thread_type" choices={typeChoices} />
      <BooleanField source="hidden" />
      <DateField showTime source="created_at" />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowChatThread = props => (
  <Show title="Chat Thread" {...props}>
    <SimpleForm>
      <ReferenceField source="user_id" reference="users" sortable={false}>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="contract_id" reference="contracts" sortable={false}>
        <TextField source="title" />
      </ReferenceField>
      <SelectField source="thread_type" choices={typeChoices} />
      <BooleanField source="hidden" />
      <DateField showTime source="created_at" />
      <DateField showTime source="updated_at" />
    </SimpleForm>
  </Show>
)
