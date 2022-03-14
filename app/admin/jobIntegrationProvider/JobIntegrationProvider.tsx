import React from 'react'
import {
  List, Datagrid, TextField, ArrayField, SingleFieldList, ChipField, BooleanField, NumberField,
} from 'react-admin'

export const JobIntegrationProviderList = props => (
  <List
    title="Job Integration Providers"
    bulkActionButtons={false}
    {...props}
  >
    <Datagrid>
      <TextField source="name" />
      <ArrayField source="supported_actions">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ArrayField>
      <BooleanField source="advertising" />
      <NumberField source="daily_fee_usd" />
    </Datagrid>
  </List>
)
