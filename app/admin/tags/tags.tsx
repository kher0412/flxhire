import React from 'react'
import {
  List, Datagrid, TextField,
  SimpleForm, Filter,
  EditButton, Edit,
  TextInput, Create,
} from 'react-admin'

const TagFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
)

export const TagList = props => (
  <List title="Tags" {...props} filters={<TagFilter />} bulkActionButtons={false}>
    <Datagrid>
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
)

export const EditTag = (props) => {
  return (
    <Edit title="Tag" {...props} undoable={false}>
      <SimpleForm>
        <TextInput source="name" />
      </SimpleForm>
    </Edit>
  )
}

export const CreateTag = (props) => {
  return (
    <Create title="Tag" {...props}>
      <SimpleForm redirect="list">
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  )
}
