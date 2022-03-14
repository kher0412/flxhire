import React from 'react'
import {
  List, Datagrid, TextField,
  Show, Edit, Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  Filter,
  ReferenceField,
  UrlField,
  ShowButton, EditButton,
} from 'react-admin'

const ProjectSubmissionFilter = props => (
  <Filter {...props}>
    <ReferenceInput source="project_id" reference="projects" allowEmpty>
      <AutocompleteInput optionText="title" />
    </ReferenceInput>
    <ReferenceInput label="User" reference="users" filter={{ role: 'member' }} source="user_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
)

export const ProjectSubmissionList = props => (
  <List
    title="Project Submissions"
    filters={<ProjectSubmissionFilter />}
    {...props}
  >
    <Datagrid>
      <ReferenceField source="project_id" reference="projects" sortable={false}>
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="user_id" reference="users" sortable={false} allowEmpty>
        <TextField source="name" />
      </ReferenceField>
      <TextField source="type" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowProjectSubmission = props => (
  <Show title="Project Submission" {...props}>
    <SimpleForm>
      <ReferenceField source="project_id" reference="projects" sortable={false}>
        <TextField source="title" />
      </ReferenceField>
      <TextField source="description" />
      <UrlField label="URL" source="url" />
      <UrlField label="Screenshot URL" source="screenshot_url" />
      <ReferenceField source="user_id" reference="users" sortable={false}>
        <TextField source="name" />
      </ReferenceField>
      <TextField source="type" />
    </SimpleForm>
  </Show>
)

export const EditProjectSubmission = props => (
  <Edit title="Edit Project Submission" {...props}>
    <SimpleForm>
      <ReferenceInput source="project_id" reference="projects" sortable={false}>
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput label="User" reference="users" filter={{ role: 'member' }} source="user_id" link="show" allowEmpty>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput multiline label="Description" source="description" />
      <TextInput label="URL" source="url" />
      <TextInput label="Screenshot URL" source="screenshot_url" />
    </SimpleForm>
  </Edit>
)

export const CreateProjectSubmission = props => (
  <Create title="Create Project Submission" {...props}>
    <SimpleForm>
      <ReferenceInput source="project_id" reference="projects" sortable={false}>
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput label="User" reference="users" filter={{ role: 'member' }} source="user_id" link="show" allowEmpty>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput multiline label="Description" source="description" />
      <TextInput label="URL" source="url" />
      <TextInput label="Screenshot URL" source="screenshot_url" />
    </SimpleForm>
  </Create>
)
