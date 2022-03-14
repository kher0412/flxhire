import { Chip } from '@material-ui/core'
import React from 'react'
import {
  List, Datagrid, TextField,
  SimpleForm, Show, FunctionField,
  ShowButton, DateField, ChipField,
  Filter, TextInput, ReferenceManyField,
} from 'react-admin'

const EmailLogFilters = props => (
  <Filter {...props}>
    <TextInput source="from" />
    <TextInput source="to" alwaysOn />
    <TextInput source="subject" alwaysOn />
  </Filter>
)

export const EmailLogList = props => (
  <List
    title="Email Logs"
    filters={<EmailLogFilters />}
    sort={{ field: 'created_at', order: 'DESC' }}
    {...props}
  >
    <Datagrid>
      <ChipField source="from" />
      <FunctionField label="To" render={record => record.to?.map(x => <Chip label={x} />)} />
      <TextField source="subject" />
      <TextField source="status" />
      <DateField showTime source="created_at" />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowEmailLog = props => (
  <Show title="Show Email Log" {...props}>
    <SimpleForm>
      <ChipField source="from" />
      <FunctionField label="To" render={record => record.to?.map(x => <Chip label={x} />)} />
      <TextField source="subject" />
      <TextField source="status" />
      <DateField showTime source="created_at" />
      <TextField source="headers" />
      <TextField source="body" />
      <TextField source="body_html" />

      <ReferenceManyField reference="infrastructure_events" target="email_log_id" sort={{ field: 'created_at', order: 'desc' }}>
        <Datagrid>
          <TextField source="event_type" />
          <FunctionField label="To" render={record => record.recipients_emails?.map(x => <Chip label={x} />)} />
          <TextField source="created_at" />
          <ShowButton />
        </Datagrid>
      </ReferenceManyField>
    </SimpleForm>
  </Show>
)
