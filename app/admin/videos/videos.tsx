import React from 'react'
import {
  List, Datagrid, TextField,
  SimpleForm,
  EditButton,
  Edit,
  Show,
  DeleteButton,
  ReferenceField,
  ReferenceInput,
  AutocompleteInput,
  Filter,
  TextInput,
  SelectInput,
  NullableBooleanInput,
  BooleanField,
  SelectField,
  BooleanInput,
  DateField,
} from 'react-admin'
import VideoField from '../components/VideoField'
import LinkField from '../components/LinkField'

const typesChoices = [
  { id: 'profile', name: 'Profile' },
  { id: 'answer', name: 'Answer' },
  { id: 'blog_post', name: 'Blog Post' },
  { id: 'company', name: 'Company' },
]

const statusChoices = [
  { id: 'unprocessed', name: 'Unprocessed' },
  { id: 'processing_queued', name: 'Queued for Processing' },
  { id: 'processing', name: 'Processing Now' },
  { id: 'processing_failed', name: 'Processing Failed' },
  { id: 'processed', name: 'Processed/Available' },
]

const versionsChoices = [
  { id: 'latest_available', name: 'Latest Available Only' },
  { id: 'latest', name: 'Latest Only' },
  { id: 'older', name: 'Older Only' },
]

const VideoFilter = props => (
  <Filter {...props} filterDefaultValues={{ versions: 'latest' }}>
    <NullableBooleanInput source="public" />
    <NullableBooleanInput source="available" />
    <SelectInput source="status" choices={statusChoices} />
    <SelectInput source="versions" choices={versionsChoices} />
    <SelectInput source="video_type" choices={typesChoices} />
    <ReferenceInput source="user_id" reference="users" allowEmpty sortable={false}>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="firm_id" reference="firms" allowEmpty sortable={false}>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="question_id" reference="questions" allowEmpty sortable={false}>
      <AutocompleteInput optionText="title" />
    </ReferenceInput>
  </Filter>
)

export const VideoList = props => (
  <List
    title="Videos"
    sort={{ field: 'created_at', order: 'DESC' }}
    filters={<VideoFilter />}
    bulkActionButtons={false}
    {...props}
  >
    <Datagrid>
      <SelectField source="video_type" choices={typesChoices} />
      <SelectField source="status" choices={statusChoices} />
      <BooleanField source="available" />
      <ReferenceField source="user_id" reference="users" sortable={false}>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="firm_id" reference="firms" sortable={false}>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="question_id" reference="questions" sortable={false}>
        <TextField source="title" />
      </ReferenceField>
      <BooleanField source="public" />
      <TextField source="newer_versions_count" />
      <TextField source="older_versions_count" />
      <BooleanField source="safely_deletable" />
      <DateField showTime source="created_at" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
)

export const ShowVideo = props => (
  <Show title="View Video" {...props} undoable={false}>
    <SimpleForm>
      <VideoField source="url" label="Video" />
      <LinkField source="url" />
      <BooleanField source="public" />
      <BooleanField source="available" />
      <TextField source="newer_versions_count" />
      <TextField source="older_versions_count" />
      <BooleanField source="safely_deletable" />
      <SelectField source="video_type" choices={typesChoices} />
      <SelectField source="status" choices={statusChoices} />
      <ReferenceField source="user_id" reference="users" sortable={false}>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="firm_id" reference="firms" sortable={false}>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="question_id" reference="questions" sortable={false}>
        <TextField source="title" />
      </ReferenceField>
    </SimpleForm>
  </Show>
)

export const EditVideo = props => (
  <Edit title="Edit Video" {...props} undoable={false}>
    <SimpleForm>
      <VideoField source="url" label="Video" />
      <TextInput source="url" />
      <BooleanInput source="public" />
      <SelectInput source="video_type" choices={typesChoices} />
      <SelectInput source="status" choices={statusChoices} />
      <ReferenceInput label="User" source="user_id" reference="users" allowEmpty sortable={false}>
        <AutocompleteInput optionText="name" optionalValue="id" />
      </ReferenceInput>
      <ReferenceInput label="Question" source="question_id" reference="questions" allowEmpty sortable={false}>
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)
