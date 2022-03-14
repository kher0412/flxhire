import React from 'react'
import {
  List, Datagrid, Show, SimpleForm,
  TextField, ReferenceField, BooleanField,
  ShowButton, Filter, ReferenceInput, AutocompleteInput,
} from 'react-admin'

const ReferenceFilter = props => (
  <Filter {...props}>
    <ReferenceInput label="Member" reference="users" filter={{ role: 'member' }} source="user_id" allowEmpty alwaysOn>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
)

export const ReferenceList = props => (
  <List
    title="References"
    filters={<ReferenceFilter />}
    bulkActionButtons={false}
    {...props}
  >
    <Datagrid>
      <ReferenceField label="Member" source="user_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="relation" />
      <TextField source="status" />
      <TextField source="rating_professional" />
      <BooleanField source="would_recommend" />
      <TextField source="rating_overall" />
      <TextField source="rating_expert" />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowReference = props => (
  <Show title="Reference" {...props}>
    <SimpleForm>
      <ReferenceField label="Member" source="user_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="complete_reference_token" />
      <TextField source="relation" />
      <TextField source="status" />
      <TextField source="rating_professional" />
      <TextField source="comments" />
      <BooleanField source="would_recommend" />
      <TextField source="rating_overall" />
      <TextField source="rating_expert" />
    </SimpleForm>
  </Show>
)
