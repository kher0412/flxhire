import React from 'react'
import {
  List, Datagrid, TextField,
  SimpleForm, TextInput,
  Filter,
  ReferenceField,
  ReferenceInput,
  AutocompleteInput, BooleanInput,
  Edit, Create, EditButton,
  DateField, DateInput,
} from 'react-admin'

const SkipFilter = props => (
  <Filter {...props}>
    <BooleanInput source="system_only" />
    <BooleanInput source="not_system_only" label="User Only" />
    <ReferenceInput label="Client" reference="users" filter={{ role: 'client' }} source="company_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput reference="users" filter={{ role: 'member' }} source="freelancer_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput reference="jobs" source="job_id" allowEmpty>
      <AutocompleteInput optionText="full_title" />
    </ReferenceInput>
  </Filter>
)

export const SkipList = props => (
  <List
    title="Skips"
    filters={<SkipFilter />}
    {...props}
  >
    <Datagrid>
      <ReferenceField label="Client" source="company_id" reference="users" sortable={false} link="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="freelancer_id" reference="users" sortable={false} link="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="job_id" reference="jobs" sortable={false} link="show">
        <TextField source="full_title" />
      </ReferenceField>
      <DateField source="created_at" />
      <DateField source="system_skipped_at" />
      <TextField source="reason" />
      <TextField source="comments" />
      <EditButton />
    </Datagrid>
  </List>
)

export const EditSkip = props => (
  <Edit title="Edit Skip" {...props} undoable={false}>
    <SimpleForm>
      <ReferenceInput label="Client" source="company_id" reference="users" filter={{ role: 'client' }}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="freelancer_id" reference="users" filter={{ role: 'member' }}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="job_id" reference="jobs" allowEmpty>
        <AutocompleteInput optionText="full_title" />
      </ReferenceInput>
      <DateInput showTime source="system_skipped_at" />
      <TextInput source="reason" />
      <TextInput source="comments" />
    </SimpleForm>
  </Edit>
)

export const CreateSkip = props => (
  <Create title="Create Skip" {...props}>
    <SimpleForm>
      <ReferenceField label="Client" source="company_id" reference="users" link="show">
        <AutocompleteInput optionText="name" />
      </ReferenceField>
      <ReferenceField source="freelancer_id" reference="users" link="show">
        <AutocompleteInput optionText="name" />
      </ReferenceField>
      <ReferenceInput source="job_id" reference="jobs" link="show" allowEmpty>
        <AutocompleteInput optionText="full_title" />
      </ReferenceInput>
      <DateInput showTime source="system_skipped_at" />
      <TextInput source="reason" />
      <TextInput source="comments" />
    </SimpleForm>
  </Create>
)
