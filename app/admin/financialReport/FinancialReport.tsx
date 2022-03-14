import React from 'react'
import {
  List, Datagrid,
  SimpleForm,
  Filter,
  DateField, DateInput,
  SelectField, TextField, NumberField, BooleanField,
  Edit, Create, EditButton, SelectInput, ShowButton, ReferenceManyField,
} from 'react-admin'

const statusChoices = [
  { id: 'unprocessed', name: 'Unprocessed' },
  { id: 'processing_queued', name: 'Processing Queued' },
  { id: 'processing', name: 'Processing Now' },
  { id: 'completed', name: 'Completed' },
  { id: 'processing_failed', name: 'Processing Failed' },
]

const typeChoices = [
  { id: 'accrual_based', name: 'Accrual Based Accounting' },
  { id: 'cash_based', name: 'Cash Based Accounting' },
]

const FinancialReportFilter = props => (
  <Filter {...props}>
    <SelectInput source="status" choices={statusChoices} />
  </Filter>
)

export const FinancialReportList = props => (
  <List
    title="Financial Reports"
    filters={<FinancialReportFilter />}
    bulkActionButtons={false}
    {...props}
  >
    <Datagrid>
      <SelectField source="report_type" choices={typeChoices} sortable={false} />
      <SelectField source="status" choices={statusChoices} />
      <DateField source="start_date" />
      <DateField source="end_date" />
      <DateField showTime source="created_at" />
      <DateField showTime source="updated_at" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowFinancialReport = props => (
  <Edit title="Show Financial Report" {...props}>
    <SimpleForm>
      <TextField source="title" />
      <SelectField source="report_type" choices={typeChoices} sortable={false} />
      <SelectField source="status" choices={statusChoices} />
      <DateField source="start_date" />
      <DateField source="end_date" />
      <DateField showTime source="created_at" />
      <DateField showTime source="updated_at" />
      <ReferenceManyField reference="financial_report_items" target="financial_report_id" label="Report items" sort={{ field: 'ord', order: 'asc' }}>
        <Datagrid>
          <TextField source="name" />
          <TextField source="description" />
          <NumberField source="amount" />
          <BooleanField source="editable" label="Prevent Overwrite" />
          <EditButton />
        </Datagrid>
      </ReferenceManyField>
    </SimpleForm>
  </Edit>
)

export const EditFinancialReport = props => (
  <Edit title="Edit Financial Report" {...props} undoable={false}>
    <SimpleForm>
      <SelectInput source="report_type" choices={typeChoices} sortable={false} />
      <SelectInput source="status" choices={statusChoices} />
      <DateInput source="start_date" />
      <DateInput source="end_date" />
    </SimpleForm>
  </Edit>
)

export const CreateFinancialReport = props => (
  <Create title="Create Financial Report" {...props}>
    <SimpleForm>
      <SelectInput source="report_type" choices={typeChoices} initialValue="accrual_based" />
      <DateInput source="start_date" />
      <DateInput source="end_date" />
    </SimpleForm>
  </Create>
)
