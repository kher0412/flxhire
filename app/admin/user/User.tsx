import React from 'react'
import {
  List, Datagrid, EmailField, TextField, BooleanField, TopToolbar,
  ShowButton, Show, SimpleForm, SelectArrayInput, ReferenceArrayField, ReferenceArrayInput,
  EditButton, Edit, SelectInput, SingleFieldList, ChipField,
  ReferenceManyField, NumberField, DateField, ReferenceField,
  TextInput, Filter, BooleanInput, NullableBooleanInput, AutocompleteArrayInput,
  ListButton, NumberInput, DateInput, ReferenceInput, SelectField, AutocompleteInput, FormDataConsumer, Create, FunctionField,
} from 'react-admin'
import { useForm } from 'react-final-form'
import DownloadIcon from '@material-ui/icons/CloudDownload'

import { getCountryCodes, getCountryName } from 'services/location'
import { toMargin, toMarkup } from 'admin/components/CustomMargins'
import StatList from 'admin/components/StatCard/StatList'
import SkillsChipListField, { SkillsList } from '../components/SkillsList'
import StatCard from '../components/StatCard'
import VideoField from '../components/VideoField'

import MasqButton from '../components/MasqButton/MasqButton'
import LinkField from '../components/LinkField'
import DynamicCheckboxGroupInput from '../components/DynamicCheckboxGroupInput'

import Address from '../components/Address'
import { compactTimezones } from '../../services/timeKeeping'
import ScreeningActionsButtons from './ScreeningActions/ScreeningActionsButtons'
import SendActivateAccount from './SendActivateAccount'

const roleChoices = [
  { id: 'member', name: 'Member' },
  { id: 'client', name: 'Client' },
  { id: 'sales', name: 'Sales Manager' },
  { id: 'screening', name: 'Screening Manager' },
  { id: 'admin', name: 'Administrator' },
  { id: 'customer_success_rep', name: 'Customer Success Rep' },
  { id: 'recruiter', name: 'Recruiter' },
]

const statusChoices = [
  { id: 'pending', name: 'Pending' },
  { id: 'unverified', name: 'Unverified' },
  { id: 'applying', name: 'Applying' },
  { id: 'applied', name: 'Applied' },
  { id: 'interview', name: 'Interview' },
  { id: 'accepted', name: 'Accepted' },
  { id: 'rejected', name: 'Rejected' },
  { id: 'deleted', name: 'Deleted' },
]

const timezoneChoices = compactTimezones.map(t => ({ id: t.value, name: t.title }))

const availabilityChoices = [
  { id: 'available_now', name: 'Available Now' },
  { id: 'available_soon', name: 'Available Soon' },
  { id: 'not_available', name: 'Not Available' },
]

const visibilityChoices = [
  { id: 'visibility_public', name: 'Public' },
  { id: 'visibility_clients', name: 'Clients Only' },
  { id: 'visibility_private', name: 'Private' },
]

const countryChoices = getCountryCodes().map(code => ({ id: code.toLowerCase(), name: getCountryName(code) }))

export const RolesField = props => <FunctionField label="Roles" render={record => `${record?.roles?.join(', ')}`} {...props} />

const UserFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <SelectInput source="role" choices={roleChoices} />
    <SelectArrayInput label="Status" source="status" choices={statusChoices} />
    <NullableBooleanInput source="hidden" />
    <NullableBooleanInput source="free_account" />
    <NullableBooleanInput source="allow_api_access" />
    <Address name="location" label="Location Address" source="location" types="place" />
    <TextInput label="distance - miles" source="distance" />
    <AutocompleteInput source="country" choices={countryChoices} />
    <SelectInput source="timezone" choices={timezoneChoices} />
    <NumberInput source="timezone_range" />
    <ReferenceArrayInput label="Skill" source="skill_ids" reference="skills" perPage={500}>
      <AutocompleteArrayInput optionText="name" />
    </ReferenceArrayInput>
    <ReferenceArrayInput label="Freelancer Subtype" source="freelancer_subtype_ids" reference="freelancer_subtypes" perPage={500}>
      <AutocompleteArrayInput optionText="name" />
    </ReferenceArrayInput>
    <ReferenceInput label="Freelancer Type" source="freelancer_type_id" reference="freelancer_types">
      <SelectInput />
    </ReferenceInput>
    <BooleanInput label="Background check requested" source="requested_background" />
    <BooleanInput label="Has profile video" source="has_profile_video" />
    <BooleanInput label="Open to opportunities" source="open_to_opportunities" />
    <BooleanInput label="Can be featured" source="featured" />
    <BooleanInput source="email_unreachable" />
    <BooleanInput source="has_email_complaints" />
    <ReferenceInput label="Firm" source="firm_id" reference="firms" allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput label="Account Manager" source="account_manager_id" reference="users" allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
  </Filter>
)

export const UserList = ({ permissions, ...props }) => (
  <List title="Users" {...props} filters={<UserFilter />} bulkActionButtons={false} sort={{ field: 'last_seen_at', order: 'DESC' }}>
    <Datagrid>
      <TextField label="First Name" source="first_name" sortable />
      <TextField label="Last Name" source="last_name" sortable />
      <LinkField label="Vanity URL" source="profile.slug" sortable={false} />
      <EmailField source="email" />
      <RolesField source="roles" />
      <SelectField source="status" choices={statusChoices} />
      <ShowButton />
      {['admin', 'screening', 'sales'].includes(permissions) && <EditButton />}
    </Datagrid>
  </List>
)

const EditActions: any = ({ basePath, data }) => (
  <TopToolbar>
    <ShowButton basePath={basePath} record={data} />
    <MasqButton record={data} />
    <ScreeningActionsButtons record={data} />
    <SendActivateAccount record={data} />
    <ListButton basePath={basePath} />
  </TopToolbar>
)

export const ShowUser = ({ permissions, ...props }) => (
  <Show title="User" {...props}>
    <SimpleForm>
      {permissions === 'admin' && [
        <StatList source="stats" />,
        <StatCard label="Revenue" source="stats.revenue" />,
        <StatCard label="Costs" source="stats.costs" />,
        <StatCard label="Profit" source="stats.profit" />,
        <StatCard label="Receivables" source="stats.receivable" />,
        <StatCard label="Payables" source="stats.payable" />,
        <StatCard label="Invoiced" source="stats.invoiced" />,
        <StatCard label="Uninvoiced" source="stats.uninvoiced" />,
        <StatCard label="Total Paid" source="stats.total_paid" />,
        <StatCard label="Revenue" source="stats.total_revenue" />,
      ]}

      <RolesField source="roles" />
      <TextField label="First Name" source="first_name" />
      <TextField label="Last Name" source="last_name" />
      <TextField source="status" />
      <TextField label="Screening Feedback" source="profile.screening_feedback" />
      <BooleanField label="Allow Screening" source="profile.allow_screening" />
      <BooleanField label="Hidden from site" source="hidden" />
      <BooleanField source="free_account" />
      <BooleanField source="allow_api_access" />
      <SelectField label="Availability" source="profile.availability" choices={availabilityChoices} />
      <SelectField label="Visibility" source="profile.visibility" choices={visibilityChoices} />
      <BooleanField source="has_active_payout_method" />
      <EmailField source="email" />
      <EmailField source="unconfirmed_email" />
      <BooleanField source="has_email_complaints" />
      <BooleanField source="email_unreachable" />
      <BooleanField source="password_setup_required" label="Password Setup Required" />
      <DateField source="confirmed_at" label="Email Confirmed At" />
      <TextField source="timezone_name" />
      <NumberField source="timezone_offset" />

      <TextField source="additional_invoice_text" />
      <TextField source="purchase_order_number" />
      <TextField source="calendly_url" />
      <ReferenceField label="Firm" source="firm_id" reference="firms" link="show">
        <TextField source="name" />
      </ReferenceField>
      <BooleanField label="Redirect Emails to Account Manager" source="email_account_manager" />

      {permissions === 'admin' && [
        <h4>Activity</h4>,
        <ReferenceManyField label="Member Contracts" reference="contracts" target="freelancer_id">
          <Datagrid>
            <ReferenceField label="Client" source="client_id" reference="users" link="show">
              <TextField source="name" />
            </ReferenceField>

            <TextField source="status" />
            <TextField source="project_length" />
            <DateField source="start_date" />
            <DateField source="end_date" />
            <NumberField source="client_rate" />
            <DateField source="profile.applied_at" sortable label="Applied at" />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>,
        <ReferenceManyField label="Client Contracts" reference="contracts" target="client_id">
          <Datagrid>
            <ReferenceField label="Member" source="freelancer_id" reference="users" link="show">
              <TextField source="name" />
            </ReferenceField>
            <TextField source="status" />
            <TextField source="project_length" />
            <DateField source="start_date" />
            <DateField source="end_date" />
            <NumberField source="client_rate" />
            <NumberField source="freelancer_rate" />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>,
        <ReferenceManyField label="Invoices" reference="invoices" target="user_id">
          <Datagrid>
            <TextField source="invoice_num" />
            <DateField source="invoice_date" />
            <NumberField source="total_to_pay_client" label="Client total" />
            <NumberField source="total_hours" />
            <NumberField source="total_minutes" />
            <DateField source="due_date" />
            <DateField source="paid" label="payment received on" />
            <DateField source="freelancers_paid_out_at" />
            <DateField source="last_freelancers_payout_failure_at" />
            <ShowButton label="Details" />
            <EditButton label="Edit" />
            <LinkField label="PDF" source="pdf_url" text={<DownloadIcon />} />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>,
      ]}

      <h4>Other</h4>
      <BooleanField source="contract_signed" />
      <BooleanField label="Featured on homepage" source="featured" />
      <DynamicCheckboxGroupInput
        label="Featured in skill"
        source="featured_in"
        choicesSource="featured_in_choices"
        options={{ disabled: true }}
      />

      <h4>Profile</h4>
      <LinkField label="Vanity URL" source="profile.slug" />
      <TextField label="Freelancer rate" source="profile.freelancer_rate" />

      <ReferenceField label="Freelancer Type" source="profile.freelancer_type_id" reference="freelancer_types" link="show">
        <TextField source="name" />
      </ReferenceField>

      <ReferenceArrayField label="Freelancer Subtypes" source="profile.freelancer_subtype_ids" reference="freelancer_subtypes">
        <SingleFieldList><ChipField source="name" /></SingleFieldList>
      </ReferenceArrayField>

      <SkillsChipListField source="user_skills" />

      <BooleanField label="Open to opportunities" source="profile.open_to_opportunities" />

      <h4>Screening</h4>
      <VideoField label="Video" source="video.url" />

      <ReferenceManyField label="References" reference="references" target="user_id">
        <Datagrid>
          <TextField source="name" />
          <TextField source="relation" />
          <TextField source="status" />
          <ShowButton />
        </Datagrid>
      </ReferenceManyField>

      <ReferenceManyField label="Projects" reference="project_submissions" target="user_id">
        <Datagrid>
          <ReferenceField source="project_id" reference="projects">
            <TextField source="title" />
          </ReferenceField>
          <ShowButton />
        </Datagrid>
      </ReferenceManyField>

      <ReferenceManyField label="Videos" reference="videos" target="user_id">
        <Datagrid>
          <ReferenceField source="question_id" reference="questions" link="show">
            <TextField source="title" />
          </ReferenceField>
          <DateField source="created_at" />
          <ShowButton />
        </Datagrid>
      </ReferenceManyField>

      <ReferenceManyField label="Screening Interviews" reference="screening_interviews" target="user_id">
        <Datagrid>
          <DateField source="datetime" showTime />
          <TextField source="status" />
          <EditButton />
        </Datagrid>
      </ReferenceManyField>

      <BooleanField label="background check requested" source="profile.request_background" />
      <BooleanField label="Background check completed" source="profile.background_check_completed" />

      <TextField source="allowed_payout_method_types" />
    </SimpleForm>
  </Show>
)

export const EditUser = props => (
  <Edit title="User" {...props} actions={<EditActions />} undoable={false}>
    <SimpleForm>
      <TextInput source="roles" />
      <TextInput label="First Name" source="first_name" sortable={false} />
      <TextInput label="Last Name" source="last_name" defaultValue="" />
      <TextInput label="Vanity URL" source="profile.slug" sortable={false} />
      <SelectInput
        source="status"
        choices={statusChoices}
      />
      <TextInput source="calendly_url" />
      <TextInput label="Screening Feedback" source="profile.screening_feedback" />
      <BooleanInput label="Allow Screening" source="profile.allow_screening" />
      <BooleanInput label="Open to opportunities" source="profile.open_to_opportunities" />
      <BooleanInput label="Hide from site" source="hidden" />
      <BooleanInput source="free_account" />
      <BooleanInput source="allow_api_access" />
      <SelectInput
        label="Visibility"
        source="profile.visibility"
        choices={visibilityChoices}
      />
      <SelectInput
        label="Availability"
        source="profile.availability"
        choices={availabilityChoices}
      />
      <NumberInput label="Freelancer rate" source="profile.freelancer_rate" />
      <NumberField label="Client Rate" source="profile.client_rate" />
      <DateInput label="Applied At" source="profile.applied_at" />

      <ReferenceInput label="Freelancer Type" source="profile.freelancer_type_id" reference="freelancer_types">
        <SelectInput source="name" />
      </ReferenceInput>

      <ReferenceArrayInput label="Freelancer Subtypes" source="profile.freelancer_subtype_ids" reference="freelancer_subtypes" allowEmpty>
        <SelectArrayInput source="name" />
      </ReferenceArrayInput>

      <TextInput source="email" defaultValue="" />
      <TextInput source="unconfirmed_email" defaultValue="" />
      <BooleanInput source="has_email_complaints" />
      <BooleanInput source="email_unreachable" />
      <DateInput source="confirmed_at" label="Email Confirmed At" />
      <TextInput source="timezone_name" />
      <NumberInput source="timezone_offset" />
      <BooleanInput source="password_setup_required" />
      <SkillsChipListField source="user_skills" />
      <BooleanInput label="Featured on homepage" source="featured" />
      <BooleanInput label="Background check completed" source="profile.background_check_completed" />
      <BooleanInput label="background check requested" source="profile.request_background" />

      <DynamicCheckboxGroupInput
        label="Featured in skill"
        source="featured_in_skills"
        choicesSource="user_skills"
      />

      <DynamicCheckboxGroupInput
        label="Featured in subtype"
        source="featured_in_subtypes"
        choicesSource="freelancer_subtypes"
      />

      <LinkField label="Vanity URL" source="profile.slug" />

      <TextInput source="remote_debug_code" />

      <TextInput source="additional_invoice_text" />
      <TextInput source="purchase_order_number" />

      <FormDataConsumer>
        {() => {
          const { change } = useForm()
          return (
            <NumberInput
              source="invite_margin"
              onChange={event => change('invite_markup', toMarkup(event.target.value))}
            />
          )
        }}
      </FormDataConsumer>
      <FormDataConsumer>
        {() => {
          const { change } = useForm()
          return (
            <NumberInput
              source="hire_margin"
              onChange={event => change('hire_markup', toMarkup(event.target.value))}
            />
          )
        }}
      </FormDataConsumer>
      <FormDataConsumer>
        {() => {
          const { change } = useForm()
          return (
            <NumberInput
              source="invite_markup"
              onChange={event => change('invite_margin', toMargin(event.target.value))}
            />
          )
        }}
      </FormDataConsumer>
      <FormDataConsumer>
        {() => {
          const { change } = useForm()
          return (
            <NumberInput
              source="hire_markup"
              onChange={event => change('hire_margin', toMargin(event.target.value))}
            />
          )
        }}
      </FormDataConsumer>
      <ReferenceInput label="Firm" source="firm_id" reference="firms" allowEmpty>
        <AutocompleteInput optionText="name" optionalValue="id" />
      </ReferenceInput>
      <BooleanInput source="send_timesheet_reminders" />
      <ReferenceInput label="Invoice Manager" source="invoice_manager_id" reference="users" filter={{ role: 'client' }} allowEmpty>
        <AutocompleteInput optionText="name" optionalValue="id" />
      </ReferenceInput>
      <ReferenceInput label="Account Manager" source="account_manager_id" reference="users" allowEmpty>
        <AutocompleteInput optionText="name" optionalValue="id" />
      </ReferenceInput>
      <BooleanInput label="Redirect Emails to Account Manager" source="email_account_manager" />

      <TextInput source="allowed_payout_method_types" />
    </SimpleForm>
  </Edit>
)

export const CreateUser = props => (
  <Create title="Create User" {...props} undoable={false}>
    <SimpleForm initialValues={{ email_account_manager: true, roles: 'client', free_account: false }}>
      <TextInput source="roles" />
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="email" />
      <SelectInput
        source="status"
        choices={statusChoices}
      />
      <BooleanInput source="free_account" />
      <BooleanInput source="allow_api_access" />
      <FormDataConsumer>
        {() => {
          const { change } = useForm()
          return (
            <NumberInput
              source="invite_margin"
              onChange={event => change('invite_markup', toMarkup(event.target.value))}
            />
          )
        }}
      </FormDataConsumer>
      <FormDataConsumer>
        {() => {
          const { change } = useForm()
          return (
            <NumberInput
              source="hire_margin"
              onChange={event => change('hire_markup', toMarkup(event.target.value))}
            />
          )
        }}
      </FormDataConsumer>
      <FormDataConsumer>
        {() => {
          const { change } = useForm()
          return (
            <NumberInput
              source="invite_markup"
              onChange={event => change('invite_margin', toMargin(event.target.value))}
            />
          )
        }}
      </FormDataConsumer>
      <FormDataConsumer>
        {() => {
          const { change } = useForm()
          return (
            <NumberInput
              source="hire_markup"
              onChange={event => change('hire_margin', toMargin(event.target.value))}
            />
          )
        }}
      </FormDataConsumer>
      <ReferenceInput label="Existing Firm" source="firm_id" reference="firms" allowEmpty>
        <AutocompleteInput optionText="name" optionalValue="id" />
      </ReferenceInput>
      <ReferenceInput label="Account Manager" source="account_manager_id" reference="users" allowEmpty>
        <AutocompleteInput optionText="name" optionalValue="id" />
      </ReferenceInput>
      <BooleanInput label="Redirect Emails to Account Manager" source="email_account_manager" />
    </SimpleForm>
  </Create>
)
