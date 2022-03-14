import React from 'react'
import {
  List, Datagrid, TextField,
  SimpleForm,
  TextInput,
  Filter,
  ReferenceField,
  ReferenceInput,
  AutocompleteInput,
  Edit, ShowButton,
} from 'react-admin'

const UserIntegrationFilter = props => (
  <Filter {...props}>
    <ReferenceInput reference="users" filter={{ role: 'member' }} source="user_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput reference="jobs" source="job_id" allowEmpty>
      <AutocompleteInput optionText="full_title" />
    </ReferenceInput>
    <TextInput source="integration_name" />
  </Filter>
)

export const UserIntegrationList = props => (
  <List
    title="User Integrations"
    filters={<UserIntegrationFilter />}
    {...props}
  >
    <Datagrid>
      <ReferenceField reference="users" source="user_id" allowEmpty>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="jobs" source="job_id" allowEmpty>
        <TextField source="full_title" />
      </ReferenceField>
      <ReferenceField reference="contracts" source="contract_id" allowEmpty>
        <TextField source="title" />
      </ReferenceField>
      <TextField source="integration_name" label="Service" />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowUserIntegration = props => (
  <Edit title="Show User Integration" {...props}>
    <SimpleForm>
      <ReferenceField reference="users" source="user_id" allowEmpty>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="jobs" source="job_id" allowEmpty>
        <TextField source="full_title" />
      </ReferenceField>
      <ReferenceField reference="contracts" source="contract_id" allowEmpty>
        <TextField source="title" />
      </ReferenceField>
      <TextField source="integration_name" label="Service" />
      <TextField source="integration_data" label="Integration Data" />
    </SimpleForm>
  </Edit>
)
