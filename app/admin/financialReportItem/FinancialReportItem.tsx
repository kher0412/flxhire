import React from 'react'
import {
  List, Datagrid,
  SimpleForm,
  Filter,
  NumberInput, TextInput,
  TextField, NumberField, BooleanField, BooleanInput,
  Edit, Create, EditButton, SelectInput, ShowButton, ReferenceInput, ReferenceField,
} from 'react-admin'

const FinancialReportItemFilter = props => (
  <Filter {...props}>
    <ReferenceInput source="financial_report_id" reference="financial_reports" allowEmpty alwaysOn>
      <SelectInput optionText="title" />
    </ReferenceInput>
  </Filter>
)

export const FinancialReportItemList = props => (
  <List
    title="Financial Report Items"
    filters={<FinancialReportItemFilter />}
    bulkActionButtons={false}
    {...props}
  >
    <Datagrid>
      <ReferenceField source="financial_report_id" reference="financial_reports">
        <TextField source="title" />
      </ReferenceField>
      <TextField source="name" />
      <TextField source="description" />
      <NumberField source="amount" />
      <NumberField source="ord" label="Order" />
      <BooleanField source="editable" label="Prevent Overwrite" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowFinancialReportItem = props => (
  <Edit title="Show Financial Report Item" {...props}>
    <SimpleForm>
      <ReferenceField source="financial_report_id" reference="financial_reports">
        <TextField source="title" />
      </ReferenceField>
      <TextField source="name" />
      <TextField source="description" />
      <NumberField source="amount" />
      <NumberField source="ord" label="Order" />
      <BooleanField source="editable" label="Prevent Overwrite" />
    </SimpleForm>
  </Edit>
)

export const EditFinancialReportItem = props => (
  <Edit title="Edit Financial Report Item" {...props} undoable={false}>
    <SimpleForm>
      <ReferenceInput source="financial_report_id" reference="financial_reports">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <TextInput source="name" />
      <TextInput source="description" />
      <NumberInput source="amount" />
      <NumberInput source="ord" label="Order" />
      <BooleanInput source="editable" label="Prevent Overwrite" />
    </SimpleForm>
  </Edit>
)

export const CreateFinancialReportItem = props => (
  <Create title="Create Financial Report Item" {...props}>
    <SimpleForm>
      <ReferenceInput source="financial_report_id" reference="financial_reports">
        <SelectInput optionText="title" />
      </ReferenceInput>
      <TextInput source="name" />
      <TextInput source="description" />
      <NumberInput source="amount" />
      <NumberInput source="ord" label="Order" />
      <BooleanInput source="editable" label="Prevent Overwrite" />
    </SimpleForm>
  </Create>
)
