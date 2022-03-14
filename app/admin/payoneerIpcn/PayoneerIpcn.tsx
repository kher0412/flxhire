import React from 'react'
import {
  List, Datagrid, DateField,
  TextField, ReferenceField,
} from 'react-admin'

export const PayoneerIpcnList = props => (
  <List
    title="Payoneer Ipcns"
    {...props}
    bulkActionButtons={false}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid>
      <ReferenceField source="payout_method_id" reference="payout_methods" link="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="User" source="user_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="apuid" label="Account ID" />
      <TextField source="session_id" label="Session ID" />
      <TextField source="ipcn_type" />
      <TextField source="payment_id" label="Payment ID" />
      <TextField source="int_payment_id" label="Int Payment ID" />
      <TextField source="payoneer_payment_id" label="Payoneer Payment ID" />
      <DateField showTime source="created_at" />
    </Datagrid>
  </List>
)
