
import React from 'react'
import {
  List, Create, Datagrid, TextField,
  SimpleForm,
  EditButton, Edit, DeleteButton,
  TextInput, Filter,
} from 'react-admin'

const ConfigurationFilters = props => (
  <Filter {...props}>
    <TextInput source="q" label="Search" alwaysOn />
  </Filter>
)

export const ConfigurationList = props => (
  <List title="Configuration" filters={<ConfigurationFilters />} {...props} bulkActionButtons={false}>
    <Datagrid>
      <TextField label="Name" source="config_name" sortable />
      <TextField label="Value" source="config_value" />
      <TextField source="description" />
      <EditButton />
      <DeleteButton undoable={false} />
    </Datagrid>
  </List>
)

const Title = ({ record }) => record ? record.config_name : 'Configuration'

export const EditConfiguration = props => (
  <Edit title={<Title />} {...props}>
    <SimpleForm>
      <TextInput label="Name" source="config_name" />
      <TextInput multiline label="Value" source="config_value" />
      <TextInput multiline source="description" />
    </SimpleForm>
  </Edit>
)

export const CreateConfiguration = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput label="Name" source="config_name" />
      <TextInput multiline label="Value" source="config_value" />
      <TextInput multiline source="description" />
    </SimpleForm>
  </Create>
)
