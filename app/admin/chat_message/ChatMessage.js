import React from 'react'
import {
  List, Datagrid, TextField,
  Show,
  SimpleForm,
  Filter,
  ReferenceField,
  ReferenceInput,
  AutocompleteInput, DateField,
  ShowButton,
} from 'react-admin'

const ChatMessageFilter = props => (
  <Filter {...props}>
    <ReferenceInput reference="chat_threads" source="chat_thread_id" allowEmpty>
      <AutocompleteInput optionText="id" />
    </ReferenceInput>
    <ReferenceInput reference="users" source="user_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
)

export const ChatMessageList = props => (
  <List
    title="Chat Messages"
    filters={<ChatMessageFilter />}
    sort={{ field: 'created_at', order: 'DESC' }}
    {...props}
  >
    <Datagrid>
      <ReferenceField source="chat_thread_id" reference="chat_threads" sortable={false} allowEmpty>
        <TextField source="id" />
      </ReferenceField>
      <ReferenceField source="user_id" reference="users" sortable={false} allowEmpty>
        <TextField source="name" />
      </ReferenceField>
      <TextField source="message" />
      <DateField showTime source="created_at" />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowChatMessage = props => (
  <Show title="Chat Message" {...props}>
    <SimpleForm>
      <ReferenceField source="chat_thread_id" reference="chat_threads" sortable={false} allowEmpty>
        <TextField source="id" />
      </ReferenceField>
      <ReferenceField source="user_id" reference="users" sortable={false} allowEmpty>
        <TextField source="name" />
      </ReferenceField>
      <TextField source="message" />
      <DateField showTime source="created_at" />
    </SimpleForm>
  </Show>
)
