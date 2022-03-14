import React from 'react'
import {
  List, Datagrid, TextField, BooleanField,
  SimpleForm,
  TextInput,
  Filter, ArrayField, SingleFieldList, ChipField,
  ReferenceField, TopToolbar,
  ReferenceInput, DateField, DateTimeInput,
  AutocompleteInput, SelectField, UrlField, BooleanInput,
  Edit, Create, EditButton, SelectInput, ShowButton,
} from 'react-admin'
import PublishPostingButton from './PublishPostingButton'
import RemovePostingButton from './RemovePostingButton'

const statusChoices = [
  { id: 'pending', name: 'Pending' },
  { id: 'published', name: 'Published' },
  { id: 'removed', name: 'Removed' },
]

const nameChoices = [
  { id: 'twitter', name: 'Twitter' },
  { id: 'linkedin', name: 'LinkedIn' },
]

const JobSocialIntegrationFilter = props => (
  <Filter {...props}>
    <ReferenceInput reference="firms" source="firm_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput reference="jobs" source="job_id" allowEmpty>
      <AutocompleteInput optionText="title" />
    </ReferenceInput>
    <ReferenceInput reference="users" source="user_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <SelectInput source="name" choices={nameChoices} />
    <SelectInput source="status" choices={statusChoices} />
  </Filter>
)

export const JobSocialIntegrationList = props => (
  <List
    title="Job Social Integrations"
    filters={<JobSocialIntegrationFilter />}
    bulkActionButtons={false}
    {...props}
  >
    <Datagrid>
      <ReferenceField reference="firms" source="firm_id" linkType="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="jobs" source="job_id">
        <TextField source="title" />
      </ReferenceField>
      <TextField source="name" label="Service" />
      <ReferenceField reference="users" source="user_id">
        <TextField source="name" />
      </ReferenceField>
      <SelectField source="status" choices={statusChoices} />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

const JobSocialIntegrationEditActions = ({ data }: { data?: any }) => (
  <TopToolbar>
    <RemovePostingButton record={data} />
    <PublishPostingButton record={data} />
  </TopToolbar>
)

export const ShowJobSocialIntegration = props => (
  <Edit title="Show Job Social Integration" {...props}>
    <SimpleForm>
      <ReferenceField reference="firms" source="firm_id" linkType="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="jobs" source="job_id">
        <TextField source="title" />
      </ReferenceField>
      <TextField source="name" label="Service" />
      <ReferenceField reference="users" source="user_id">
        <TextField source="name" />
      </ReferenceField>
      <SelectField source="status" choices={statusChoices} />
    </SimpleForm>
  </Edit>
)

export const EditJobSocialIntegration = props => (
  <Edit title="Edit Job Social Integration" actions={<JobSocialIntegrationEditActions />} {...props} undoable={false}>
    <SimpleForm>
      <ReferenceInput reference="jobs" source="job_id" allowEmpty>
        <AutocompleteInput optionText="full_title" />
      </ReferenceInput>
      <SelectInput source="name" choices={nameChoices} />
      <ReferenceInput reference="users" source="user_id">
        <TextField source="name" />
      </ReferenceInput>
      <SelectInput source="status" choices={statusChoices} />
    </SimpleForm>
  </Edit>
)

export const CreateJobSocialIntegration = props => (
  <Create title="Create Job Social Integration" {...props}>
    <SimpleForm>
      <ReferenceInput reference="jobs" source="job_id" allowEmpty>
        <AutocompleteInput optionText="full_title" />
      </ReferenceInput>
      <SelectInput source="name" choices={nameChoices} />
      <ReferenceInput reference="users" source="user_id">
        <TextField source="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
