import React from 'react'
import {
  List, Datagrid, TextField,
  AutocompleteInput, ReferenceInput, DateField,
  Filter, ReferenceField, BooleanField,
  SimpleForm, Show, ShowButton,
} from 'react-admin'

const PayoutMethodFilter = props => (
  <Filter {...props}>
    <ReferenceInput source="user_id" reference="users" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
)

export const PayoutMethodList = props => (
  <List
    title="Payout Methods"
    {...props}
    filters={<PayoutMethodFilter />}
    bulkActionButtons={false}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid>
      <ReferenceField source="user_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="payout_method_type" />
      <TextField source="account_id" label="External ID" />
      <TextField source="status" />
      <TextField source="supported_currencies" />
      <BooleanField source="default" />
      <DateField showTime source="created_at" />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowPayoutMethod = props => (
  <Show title="Payout method" {...props}>
    <SimpleForm>
      <ReferenceField source="user_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="payout_method_type" />
      <TextField source="account_id" label="External ID" />
      <TextField source="status" />
      <TextField source="supported_currencies" />
      <BooleanField source="default" />
      <DateField showTime source="created_at" />

    </SimpleForm>
  </Show>
)
