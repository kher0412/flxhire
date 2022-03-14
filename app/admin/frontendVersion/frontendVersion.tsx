import React from 'react'
import {
  List, Datagrid, TextField, Create,
  DateField, SimpleForm, Show, ShowButton,
  Edit, TextInput, DateTimeInput, EditButton,
} from 'react-admin'

export const FrontendVersionList = props => (
  <List
    title="Frontend Versions"
    {...props}
    bulkActionButtons={false}
    sort={{ field: 'deployed_at', order: 'DESC' }}
  >
    <Datagrid>
      <TextField source="build_id" />
      <DateField showTime source="deployed_at" />
      <DateField showTime source="created_at" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowFrontendVersion = (props) => {
  return (
    <Show title="Frontend Versions" {...props} undoable={false}>
      <SimpleForm>
        <TextInput source="build_id" />
        <DateTimeInput source="deployed_at" />
      </SimpleForm>
    </Show>
  )
}

export const EditFrontendVersion = (props) => {
  return (
    <Edit title="Frontend Version" {...props} undoable={false}>
      <SimpleForm>
        <TextInput source="build_id" />
        <DateTimeInput source="deployed_at" />
      </SimpleForm>
    </Edit>
  )
}

export const CreateFrontendVersion = (props) => {
  return (
    <Create title="Frontend Version" {...props} undoable={false}>
      <SimpleForm>
        <TextInput source="build_id" />
        <DateTimeInput source="deployed_at" />
      </SimpleForm>
    </Create>
  )
}
