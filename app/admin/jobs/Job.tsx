import React from 'react'
import {
  List, Datagrid, TextField, DateField, AutocompleteArrayInput, BooleanField, BooleanInput,
  ShowButton, Show, SimpleForm, ReferenceInput, SelectInput, Edit,
  ReferenceManyField, ReferenceField, Filter, AutocompleteInput,
  TextInput, EditButton, NumberInput, ReferenceArrayInput, ReferenceArrayField,
  SingleFieldList, ChipField, SelectField, TopToolbar,
} from 'react-admin'
import LinkIcon from '@material-ui/icons/Link'
import PeopleIcon from '@material-ui/icons/People'
import { Button } from '@material-ui/core'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import EmailButton from './EmailFreelancers'

const statusChoices = [
  { id: 'draft', name: 'Draft' },
  { id: 'opened', name: 'Opened' },
  { id: 'closed', name: 'Closed' },
]

const availabilityChoices = [
  { id: 'part_time', name: 'Part Time' },
  { id: 'full_time', name: 'Full Time' },
  { id: 'on_site', name: 'On Site' },
  { id: 'contract_to_perm', name: 'Contract To Perm' },
]

const locationTypeChoices = [
  { name: 'Specific location', id: 'full_address' },
  { name: 'Specific timezone', id: 'job_timezone' },
  { name: 'Specific countries', id: 'specific_countries' },
  { name: 'Anywhere', id: 'anywhere' },
]

function openInNewTab(url) {
  const win = window.open(url, '_blank')
  win.focus()
}

const RenderLink: any = ({ record }) => (
  <span>
    <a href={record ? `/${record.firm_slug || 'job'}/${record.slug}` : ''} target="_blank" rel="noopener noreferrer">{record.slug}</a>
  </span>
)

const JobFilters = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <SelectInput source="status" choices={statusChoices} />
    <ReferenceInput reference="users" filter={{ role: 'client' }} source="user_id" link="show">
      <AutocompleteInput source="name" />
    </ReferenceInput>
    <ReferenceInput reference="users" source="hiring_manager_id" link="show">
      <AutocompleteInput source="name" />
    </ReferenceInput>
    <ReferenceInput reference="users" source="internal_recruiter_id" filter={{ role: 'recruiter' }} link="show">
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput reference="firms" source="firm_id" link="show">
      <AutocompleteInput source="name" />
    </ReferenceInput>
  </Filter>
)

export const JobList = props => (
  <List title="Jobs" {...props} filters={<JobFilters />} bulkActionButtons={false} sort={{ field: 'created_at', order: 'DESC' }}>
    <Datagrid>
      <TextField source="title" />
      <ReferenceField reference="users" source="user_id" link="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference="firms" source="firm_id" link="show">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="created_at" sortable />
      <RenderLink label="Link" />
      <TextField source="status" />
      <TextField source="freelancer_type.name" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

const JobActions: any = ({ basePath, data, resource }) => (
  <TopToolbar>
    <EmailButton record={data} />
    <Button
      onClick={() => openInNewTab(`/client/hire?job=${data.slug}&tab=potential`)}
      variant="contained"
      color="primary"
    >
      <PeopleIcon style={{ marginRight: 15 }} />
      Candidates
    </Button>
    <CopyToClipboard
      text={data && `${process.env.ROOT_URL}/login?token=${data.token}&email=${data.email}&url=/client/hire/${data.slug}`}
      onCopy={() => alert('Copied to Clipboard')}
    >
      <Button disabled={!data || !data.token} variant="contained" color="secondary">
        <LinkIcon style={{ marginRight: 15 }} />
        Copy Candidates URL
      </Button>
    </CopyToClipboard>
  </TopToolbar>
)

export const ShowJob = props => (
  <div>
    <Show title="Jobs" actions={<JobActions />} {...props}>
      <SimpleForm>
        <RenderLink label="link" />
        <ReferenceField label="Client" reference="users" source="user_id" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField reference="users" source="hiring_manager_id" link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField reference="firms" source="firm_id" link="show">
          <TextField source="name" />
        </ReferenceField>
        <TextField label="Title" source="title" />
        <SelectField label="Status" source="status" choices={statusChoices} />
        <BooleanField source="auto_renew" />
        <TextField label="Description" source="description" />
        <ReferenceField label="Freelancer Type" source="freelancer_type_id" reference="freelancer_types">
          <TextField source="name" />
        </ReferenceField>
        <TextField label="Project Length in Months" source="project_length_in_months" />
        <SelectField source="availability_type" choices={availabilityChoices} />
        <TextField label="Full Address" source="full_address" />
        <TextField label="Region" source="region" />
        <TextField label="Country" source="country" />
        <TextField label="City" source="city" />
        <SelectField label="Location Type" source="location_type" choices={locationTypeChoices} />
        <TextField label="Client Rate" source="client_rate" />
        <ReferenceArrayField label="Skills" source="skills_ids" reference="skills">
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
        <ReferenceField label="Code test" source="project_id" reference="projects">
          <SingleFieldList>
            <ChipField source="title" />
          </SingleFieldList>
        </ReferenceField>
        <ReferenceField reference="users" source="internal_recruiter_id">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceManyField label="Contracts" reference="contracts" target="job_id">
          <Datagrid>
            <ReferenceField label="Member" source="freelancer_id" reference="users" link="show">
              <TextField source="name" />
            </ReferenceField>
            <TextField label="Status" source="status" />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField label="User Skips" reference="skips" target="job_id" filter={{ not_system_only: true }}>
          <Datagrid>
            <ReferenceField source="freelancer_id" reference="users" link="show">
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Client" source="company_id" reference="users" link="show">
              <TextField source="name" />
            </ReferenceField>
          </Datagrid>
        </ReferenceManyField>
      </SimpleForm>
    </Show>
  </div>
)

export const EditJob = props => (
  <Edit title="Edit Job" actions={<JobActions />} {...props}>
    <SimpleForm>
      <ReferenceInput label="Client" reference="users" filter={{ role: 'client' }} source="user_id" link="show">
        <AutocompleteInput source="name" />
      </ReferenceInput>
      <ReferenceInput reference="users" source="hiring_manager_id" link="show">
        <AutocompleteInput source="name" />
      </ReferenceInput>
      <TextInput label="Title" source="title" />
      <TextInput label="Slug" source="slug" />
      <SelectInput label="Status" source="status" choices={statusChoices} />
      <BooleanInput source="auto_renew" />
      <TextInput label="Description" source="description" />
      <ReferenceInput label="Freelancer Type" source="freelancer_type_id" reference="freelancer_types" allowEmpty>
        <SelectInput source="name" />
      </ReferenceInput>
      <ReferenceArrayInput label="Freelancer Subtypes" source="freelancer_subtype_ids" reference="freelancer_subtypes">
        <AutocompleteArrayInput optionText="name" optionalValue="id" />
      </ReferenceArrayInput>
      <NumberInput source="project_length_in_months" />
      <SelectInput source="availability_type" choices={availabilityChoices} allowEmpty />
      <TextField label="Full Address" source="full_address" />
      <TextField label="Region" source="region" />
      <TextField label="Country" source="country" />
      <TextField label="City" source="city" />
      <SelectInput label="Location Type" source="location_type" choices={locationTypeChoices} />
      <NumberInput label="Client Rate" source="client_rate" />
      <ReferenceArrayInput label="Skills" source="skills_ids" reference="skills">
        <AutocompleteArrayInput optionText="name" optionalValue="id" />
      </ReferenceArrayInput>
      <ReferenceInput label="Code test" source="project_id" reference="projects" allowEmpty>
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
      <ReferenceInput reference="users" source="internal_recruiter_id" filter={{ role: 'recruiter' }}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)
