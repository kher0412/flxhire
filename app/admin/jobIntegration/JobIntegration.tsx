import React from 'react'
import {
  List, Datagrid, TextField, BooleanField,
  SimpleForm, TextInput, Filter,
  ArrayField, SingleFieldList, ChipField,
  ReferenceField, TopToolbar,
  ReferenceInput, DateField, DateTimeInput,
  AutocompleteInput, SelectField, UrlField, BooleanInput,
  Edit, Create, EditButton, SelectInput,
  ShowButton, NullableBooleanInput, CreateButton, ExportButton,
} from 'react-admin'
import JobIntegrationXML from 'admin/jobIntegration/JobIntegrationXML'
import PublishPostingButton from './PublishPostingButton'
import RemovePostingButton from './RemovePostingButton'
import RotateJobs from './RotateJobs'

const statusChoices = [
  { id: 'pending', name: 'Pending' },
  { id: 'published', name: 'Published' },
  { id: 'waiting', name: 'Waiting' },
  { id: 'removed', name: 'Removed' },
]
const ListActions: any = ({
  displayedFilters,
  filters,
  filterValues,
  resource,
  showFilter,
  basePath,
}) => (
  <TopToolbar>
    {React.cloneElement(filters, {
      resource,
      showFilter,
      displayedFilters,
      filterValues,
      context: 'button',
    })}
    <CreateButton basePath={basePath} />
    <RotateJobs />
    <JobIntegrationXML />
  </TopToolbar>
)

const JobIntegrationFilter = props => (
  <Filter {...props}>
    <ReferenceInput reference="firms" source="firm_id" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput reference="jobs" source="job_id" allowEmpty>
      <AutocompleteInput optionText="title" />
    </ReferenceInput>
    <ReferenceInput label="Service" source="integration_name" reference="job_integration_providers">
      <SelectInput optionText="name" />
    </ReferenceInput>
    <SelectInput source="posting_status" choices={statusChoices} />
    <BooleanInput source="enabled_by_user" />
    <NullableBooleanInput source="active" />
  </Filter>
)

export const JobIntegrationList = props => (
  <List
    title="Job Integrations"
    filters={<JobIntegrationFilter />}
    actions={<ListActions />}
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
      <TextField source="integration_name" label="Service" />
      <BooleanField source="enabled_by_user" />
      <SelectField source="posting_status" choices={statusChoices} />
      <UrlField source="published_job_url" label="URL" />
      <DateField showTime source="published_at" />
      <DateField showTime source="unpublished_at" />
      <TextField source="queue_position" label="Est. Queue Pos." sortable={false} />
      <TextField source="estimated_rotate_in_time" label="Est. Wait" sortable={false} />
      <DateField showTime source="publication_expires" label="Slot Expires" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

const JobIntegrationEditActions = ({ data }: { data?: any }) => (
  <TopToolbar>
    <RemovePostingButton record={data} />
    <PublishPostingButton record={data} />
  </TopToolbar>
)

export const ShowJobIntegration = props => (
  <Edit title="Show Job Integration" {...props}>
    <SimpleForm>
      <ReferenceField reference="jobs" source="job_id">
        <TextField source="full_title" />
      </ReferenceField>
      <TextField source="integration_name" label="Service" />
      <ArrayField source="supported_actions">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <BooleanField source="enabled_by_user" />
      <SelectField source="posting_status" choices={statusChoices} />
      <TextField source="published_job_id" label="Published Job ID" />
      <UrlField source="published_job_url" label="Published Job URL" />
      <DateField showTime source="published_at" />
      <DateField showTime source="unpublished_at" />
      <TextField source="queue_position" label="Est. Queue Position" sortable={false} />
      <TextField source="estimated_rotate_in_time" label="Est. Wait until next publication" sortable={false} />
      <TextField source="estimated_visibility_duration" label="Est. visibility duration in days when published" sortable={false} />
      <TextField source="estimated_visibility_month" label="Est. days of visibility per month" sortable={false} />
      <TextField source="estimated_average_wait_time" label="Est. days spent waiting between publications" sortable={false} />
      <TextField source="total_visibility_days" label="Total time spent published in days" sortable={false} />
      <DateField showTime source="publication_expires" label="Slot Expires" />
      <TextField source="integration_data" label="Integration Data" />
    </SimpleForm>
  </Edit>
)

export const EditJobIntegration = props => (
  <Edit title="Edit Job Integration" actions={<JobIntegrationEditActions />} {...props} undoable={false}>
    <SimpleForm>
      <ReferenceInput reference="jobs" source="job_id" allowEmpty>
        <AutocompleteInput optionText="full_title" />
      </ReferenceInput>
      <ReferenceInput label="Service" source="integration_name" reference="job_integration_providers">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <BooleanInput source="enabled_by_user" />
      <SelectInput source="posting_status" choices={statusChoices} />
      <TextInput source="published_job_id" label="Published Job ID" />
      <TextInput source="published_job_url" label="Published Job URL" />
      <DateTimeInput source="published_at" />
      <DateTimeInput source="unpublished_at" />
      <DateTimeInput source="publication_expires" label="Slot Expires" />
    </SimpleForm>
  </Edit>
)

export const CreateJobIntegration = props => (
  <Create title="Create Job Integration" {...props}>
    <SimpleForm>
      <ReferenceInput reference="jobs" source="job_id" allowEmpty>
        <AutocompleteInput optionText="full_title" />
      </ReferenceInput>
      <ReferenceInput label="Service" source="integration_name" reference="job_integration_providers">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <BooleanInput source="enabled_by_user" />
    </SimpleForm>
  </Create>
)
