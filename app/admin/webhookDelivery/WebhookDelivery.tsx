import React from 'react'
import {
  List, TextField,
  Edit, ShowButton, Show, EditButton,
  SimpleForm,
  Create, Filter, NumberInput, NumberField,
  Datagrid, TextInput, AutocompleteInput,
  ReferenceField, ReferenceInput,
  DateField, NullableBooleanInput,
} from 'react-admin'

const WebhookDeliveryFilter = props => (
  <Filter {...props}>
    <NullableBooleanInput source="enabled" />
    <TextInput source="status" />
    <ReferenceInput reference="users" source="user_id">
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput reference="firms" source="firm_id">
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
)

export const WebhookDeliveryList = props => (
  <List title="Webhook deliveries" {...props} filters={<WebhookDeliveryFilter />} bulkActionButtons={false} sort={{ field: 'created_at', order: 'DESC' }}>
    <Datagrid>
      <TextField source="event_name" />
      <TextField source="status" />
      <TextField source="records" />
      <NumberField source="delivery_attempts" />
      <ReferenceField reference="webhooks" source="webhook_id">
        <TextField source="url" />
      </ReferenceField>
      <DateField showTime source="created_at" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const EditWebhookDelivery = props => (
  <Edit {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="event_name" />
      <TextInput source="status" />
      <TextInput source="records" />
      <NumberInput source="delivery_attempts" />
      <ReferenceInput reference="webhooks" source="webhook_id">
        <AutocompleteInput optionText="url" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const CreateWebhookDelivery = props => (
  <Create {...props} defaultValues={{ enabled: true }}>
    <SimpleForm>
      <TextInput source="event_name" />
      <TextInput source="status" />
      <TextInput source="records" />
      <NumberInput source="delivery_attempts" />
      <ReferenceInput reference="webhooks" source="webhook_id">
        <AutocompleteInput optionText="url" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)

export const ShowWebhookDelivery = props => (
  <Show {...props}>
    <SimpleForm>
      <TextField source="event_name" />
      <TextField source="status" />
      <TextField source="records" />
      <NumberField source="delivery_attempts" />
      <ReferenceField reference="webhooks" source="webhook_id">
        <TextField source="url" />
      </ReferenceField>
      <DateField showTime source="created_at" />
      <TextField source="response" />
    </SimpleForm>
  </Show>
)
