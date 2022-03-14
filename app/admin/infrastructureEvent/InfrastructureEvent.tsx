import LinkField from 'admin/components/LinkField'
import React from 'react'
import { ExitToApp } from '@material-ui/icons'
import { Chip } from '@material-ui/core'
import {
  List, Datagrid, TextField, FunctionField,
  SimpleForm, Show,
  ShowButton, DateField, ReferenceField,
} from 'react-admin'

export const InfrastructureEventList = props => (
  <List
    title="Infrastructure Events"
    sort={{ field: 'created_at', order: 'DESC' }}
    {...props}
  >
    <Datagrid>
      <TextField source="event_type" />
      <ReferenceField label="Email" source="email_log_id" reference="email_logs" link="show">
        <TextField source="subject" />
      </ReferenceField>
      <ReferenceField label="User" source="user_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <FunctionField label="To" render={record => record.recipients_emails?.map(x => <Chip label={x} />)} />
      <TextField source="message" />
      <DateField showTime source="created_at" />
      <LinkField label="Subscribe URL" source="subscribe_url" text={<ExitToApp />} />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowInfrastructureEvent = props => (
  <Show title="Show Infrastructure Event" {...props}>
    <SimpleForm>
      <TextField source="event_type" />
      <ReferenceField label="Email" source="email_log_id" reference="email_logs" link="show">
        <TextField source="subject" />
      </ReferenceField>
      <ReferenceField label="User" source="user_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <FunctionField label="To" render={record => record.recipients_emails?.map(x => <Chip label={x} />)} />
      <TextField source="message" />
      <TextField source="complained_recipients" />
      <TextField source="bounced_recipients" />
      <TextField source="clicked_link" />
      <TextField source="mail_headers" />
      <DateField showTime source="created_at" />
      <TextField source="subscribe_url" />
      <TextField source="data" />
    </SimpleForm>
  </Show>
)
