import React from 'react'
import {
  List, Datagrid, TextField,
  Show,
  SimpleForm,
  TextInput,
  Filter,
  ReferenceField,
  ReferenceInput,
  SelectField,
  SelectInput,
  AutocompleteInput, BooleanInput,
  Edit, Create, ShowButton, EditButton,
  NumberField, ReferenceManyField,
} from 'react-admin'

const statusChoices = [
  { id: 'private', name: 'Private' },
  { id: 'public', name: 'Public' },
]

const typeChoices = [
  { id: 'custom_screening', name: 'Custom Screening' },
  { id: 'screening', name: 'Screening' },
  { id: 'code_test', name: 'Code Test' },
]

const ProjectFilter = props => (
  <Filter {...props}>
    <TextInput label="Title" source="q" alwaysOn />
    <SelectInput source="status" choices={statusChoices} alwaysOn />
    <ReferenceInput label="Creator" reference="users" source="user_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
)

export const ProjectList = props => (
  <List
    title="Projects"
    filters={<ProjectFilter />}
    {...props}
  >
    <Datagrid>
      <TextField label="Title" source="title" />
      <ReferenceField label="Creator" source="user_id" reference="users" sortable={false} allowEmpty>
        <TextField source="name" />
      </ReferenceField>
      <SelectField source="status" choices={statusChoices} />
      <SelectField source="type" choices={typeChoices} />
      <NumberField source="submissions_count" />
      <NumberField source="jobs_count" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowProject = props => (
    <Show title="Project" {...props}>
      <SimpleForm>
        <TextField label="Title" source="title" />
        <ReferenceField label="Creator" source="user_id" reference="users" sortable={false}>
          <TextField source="name" />
        </ReferenceField>
        <TextField label="Description" source="description" />
        <SelectField source="status" choices={statusChoices} />
        <SelectField source="type" choices={typeChoices} />
        <NumberField source="submissions_count" />
        <ReferenceManyField reference="jobs" target="project_id">
          <Datagrid>
            <ReferenceField source="user_id" reference="users" filter={{ role: 'client' }} sortable={false}>
              <TextField source="name" />
            </ReferenceField>
            <TextField source="title" />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField reference="project_submissions" target="project_id">
          <Datagrid>
            <ReferenceField source="user_id" reference="users" filter={{ role: 'member' }} sortable={false}>
              <TextField source="name" />
            </ReferenceField>
            <TextField source="description" />
            <TextField source="url" />
            <TextField source="screenshot_url" />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
        <NumberField source="jobs_count" />
      </SimpleForm>
    </Show>
)

export const EditProject = props => (
  <Edit title="Edit Project" {...props} undoable={false}>
    <SimpleForm>
      <ReferenceInput label="Creator" reference="users" source="user_id" link="show" allowEmpty>
        <AutocompleteInput source="name" />
      </ReferenceInput>
      <TextInput label="Title" source="title" />
      <BooleanInput source="screening" />
      <SelectInput label="Status" source="status" choices={statusChoices} />
      <TextInput label="Description" source="description" />
    </SimpleForm>
  </Edit>
)

const projectDefaults = {
  status: 'public',
}

export const CreateProject = props => (
  <Create title="Create Project" {...props} defaultValue={projectDefaults}>
    <SimpleForm>
      <ReferenceInput label="Creator" reference="users" source="user_id" link="show" allowEmpty>
        <AutocompleteInput source="name" />
      </ReferenceInput>
      <TextInput label="Title" source="title" />
      <BooleanInput source="screening" />
      <SelectInput label="Status" source="status" choices={statusChoices} />
      <TextInput label="Description" source="description" />
    </SimpleForm>
  </Create>
)
