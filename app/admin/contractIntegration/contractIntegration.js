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

const ContractIntegrationFilter = props => (
  <Filter {...props}>
    <ReferenceInput reference="contracts" source="contract_id" allowEmpty>
      <AutocompleteInput optionText="title" />
    </ReferenceInput>
    <ReferenceInput reference="jobs" source="job_id" allowEmpty>
      <AutocompleteInput optionText="full_title" />
    </ReferenceInput>
    <TextInput source="integration_name" />
  </Filter>
)

export const ContractIntegrationList = props => (
  <List
    title="Contract Integrations"
    filters={<ContractIntegrationFilter />}
    {...props}
  >
    <Datagrid>
      <ReferenceField reference="contracts" source="contract_id" allowEmpty>
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField reference="jobs" source="job_id" allowEmpty>
        <TextField source="full_title" />
      </ReferenceField>
      <ReferenceField reference="users" source="freelancer_id" allowEmpty>
        <TextField source="name" />
      </ReferenceField>
      <TextField source="integration_name" label="Service" />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowContractIntegration = props => (
  <Edit title="Show Contract Integration" {...props}>
    <SimpleForm>
      <ReferenceField reference="contracts" source="contract_id" allowEmpty>
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField reference="jobs" source="job_id" allowEmpty>
        <TextField source="full_title" />
      </ReferenceField>
      <ReferenceField reference="users" source="freelancer_id" allowEmpty>
        <TextField source="name" />
      </ReferenceField>
      <TextField source="integration_name" label="Service" />
      <TextField source="integration_data" label="Integration Data" />
    </SimpleForm>
  </Edit>
)