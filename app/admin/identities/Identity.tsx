import React from 'react'
import {
  List, Datagrid, TextField,
  AutocompleteInput, ReferenceInput,
  Filter, ReferenceField, TextInput,
} from 'react-admin'

const IdentityFilter = props => (
  <Filter {...props}>
    <ReferenceInput source="user_id" reference="users" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <TextInput source="provider" />
  </Filter>
)

export const IdentityList = props => (
  <List
    title="Identities"
    {...props}
    filters={<IdentityFilter />}
    bulkActionButtons={false}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid>
      <ReferenceField source="user_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="provider" />
    </Datagrid>
  </List>
)
