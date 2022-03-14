import React from 'react'
import {
  List, Datagrid, TextField,
  BooleanField, SimpleForm, TopToolbar,
  EditButton, Edit, SelectInput,
  BooleanInput, Filter, ReferenceField,
  ReferenceInput, AutocompleteInput, DateField,
} from 'react-admin'
import RefreshSubscriptions from './RefreshSubscriptions'
import DeliverEmails from './DeliverEmails'

const subscriptions = [
  { id: 'job_opportunity', name: 'Job Opportunity' },
  { id: 'freelancer_incomplete', name: 'Incomplete Freelancer' },
  { id: 'timesheet_reminders', name: 'Timesheet Reminders' },
]

const SubscriptionFilters = props => (
  <Filter {...props}>
    <ReferenceInput label="User" source="user_id" reference="users" alwaysOn>
      <AutocompleteInput optionText={v => v.name || v.email} />
    </ReferenceInput>
    <SelectInput label="Name" source="subscription_name" choices={subscriptions} />
    <BooleanInput label="Active Only" source="active" />
  </Filter>
)

const ListActions = ({
  displayedFilters,
  filters,
  filterValues,
  resource,
  showFilter,
}) => (
  <TopToolbar>
    {filters && React.cloneElement(filters, {
      resource,
      showFilter,
      displayedFilters,
      filterValues,
      context: 'button',
    }) }
    <RefreshSubscriptions />
    <DeliverEmails />
  </TopToolbar>
)

export const SubscriptionList = props => (
  <List title="Email Subscriptions" {...props} actions={<ListActions />} filters={<SubscriptionFilters />} bulkActionButtons={false}>
    <Datagrid>
      <TextField label="Name" source="subscription_name" />
      <ReferenceField reference="users" source="user_id" link="show">
        <TextField source="name" />
      </ReferenceField>
      <BooleanField label="Visible to User" source="enabled" />
      <BooleanField label="Enabled by User" source="user_enabled" />
      <BooleanField label="Active (Receives Emails)" source="active" />
      <DateField label="Last Sent at" source="last_email_sent_at" />
      <EditButton />
    </Datagrid>
  </List>
)

export const EditSubscription = props => (
  <Edit title="Email Subscription" {...props}>
    <SimpleForm>
      <TextField label="Name" source="subscription_name" />
      <ReferenceField reference="users" source="user_id" link="show">
        <TextField source="name" />
      </ReferenceField>
      <BooleanField label="Visible to User" source="enabled" />
      <BooleanInput label="Enabled by User" source="user_enabled" />
      <BooleanField label="Active (Receives Emails)" source="active" />
      <DateField label="Last Sent at" source="last_email_sent_at" />
    </SimpleForm>
  </Edit>
)
