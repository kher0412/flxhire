import React from 'react'
import {
  List, Datagrid, TextField,
  Show,
  SimpleForm,
  Filter,
  ReferenceField,
  ReferenceInput,
  SelectField,
  SelectInput,
  BooleanInput,
  BooleanField, NullableBooleanInput,
  AutocompleteInput, DateField, TextInput,
  Edit, Create, ShowButton, EditButton,
} from 'react-admin'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import LinkField from '../components/LinkField'

const statusChoices = [
  { id: 'unprocessed', name: 'Unprocessed' },
  { id: 'processing_queued', name: 'Queued for Processing' },
  { id: 'processing', name: 'Processing Now' },
  { id: 'processing_failed', name: 'Processing Failed' },
  { id: 'processed', name: 'Processed/Available' },
]

const ResumeFilter = props => (
  <Filter {...props}>
    <SelectInput source="status" choices={statusChoices} alwaysOn />
    <TextInput source="parsing_tool" />
    <TextInput source="filename" />
    <TextInput source="mimetype" />
    <NullableBooleanInput source="success" />
    <ReferenceInput reference="users" source="user_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
)

export const ResumeList = props => (
  <List
    title="Resumes / CVs"
    filters={<ResumeFilter />}
    sort={{ field: 'created_at', order: 'DESC' }}
    {...props}
  >
    <Datagrid>
      <TextField source="url" />
      <ReferenceField source="user_id" reference="users" sortable={false}>
        <TextField source="name" />
      </ReferenceField>
      <SelectField source="status" choices={statusChoices} />
      <BooleanField source="success" />
      <TextField source="parsing_tool" />
      <DateField showTime source="created_at" />
      <LinkField label="View/Download" source="url" text={<DownloadIcon />} />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowResume = props => (
  <Show title="Resume / CV" {...props}>
    <SimpleForm>
      <TextField source="url" />
      <ReferenceField source="user_id" reference="users" sortable={false}>
        <TextField source="name" />
      </ReferenceField>
      <SelectField source="status" choices={statusChoices} />
      <BooleanField source="success" />
      <TextField source="error" />
      <TextField source="request_id" />
      <TextField source="parsing_tool" />
      <TextField source="filename" />
      <TextField source="mimetype" />
      <TextField source="content_hash" />
      <TextField source="parsed_data" />
      <TextField source="extracted_data" />
      <DateField showTime source="processing_enqueued_at" />
      <DateField showTime source="processing_started_at" />
      <DateField showTime source="processing_ended_at" />
      <DateField showTime source="created_at" />
      <DateField showTime source="updated_at" />
    </SimpleForm>
  </Show>
)

export const EditResume = props => (
  <Edit title="Edit Resume / CV" {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="url" />
      <ReferenceInput reference="users" source="user_id" link="show" allowEmpty>
        <AutocompleteInput source="name" />
      </ReferenceInput>
      <SelectInput label="Status" source="status" choices={statusChoices} />
      <BooleanInput source="success" />
      <TextInput source="parsing_tool" />
      <TextInput source="filename" />
      <TextInput source="mimetype" />
      <TextInput source="content_hash" />
    </SimpleForm>
  </Edit>
)

export const CreateResume = props => (
  <Create title="Create Resume / CV" {...props}>
    <SimpleForm>
      <TextInput source="url" />
      <ReferenceInput reference="users" source="user_id" link="show" allowEmpty>
        <AutocompleteInput source="name" />
      </ReferenceInput>
      <TextInput source="parsing_tool" />
      <TextInput source="filename" />
      <TextInput source="mimetype" />
    </SimpleForm>
  </Create>
)
