import React from 'react'
import {
  List, Create,
  Datagrid, TextField,
  ShowButton, SimpleForm,
  EditButton, Edit, Show,
  TextInput, DateTimeInput,
  SelectInput, ReferenceField,
  Filter, BooleanInput,
  ReferenceInput, AutocompleteInput,
  NullableBooleanInput, TopToolbar,
  CreateButton, NumberInput, DateInput,
  DateField, FunctionField, BooleanField, SelectField,
} from 'react-admin'
import SyncFinancialsButton from 'admin/financials/syncFinancialsButton'
import RenderMoney from 'admin/components/RenderMoney'

const financialTypes = [
  { id: 'cost', name: 'Cost' },
  { id: 'revenue', name: 'Revenue' },
]
const ListActions: any = ({
  displayedFilters,
  filters,
  filterValues,
  resource,
  showFilter,
  basePath,
}) => (
  <TopToolbar>
    {filters && React.cloneElement(filters, {
      resource,
      showFilter,
      displayedFilters,
      filterValues,
      context: 'button',
    }) }
    <CreateButton basePath={basePath} />
    <SyncFinancialsButton />
  </TopToolbar>
)

const FinancialFilter = props => (
  <Filter {...props}>
    <SelectInput source="financial_type" choices={financialTypes} />
    <DateInput source="from" label="From Date" />
    <DateInput source="to" label="To Date" />
    <BooleanInput label="Cash based" source="cash_based" />
    <BooleanInput label="Cashed" source="cashed" />
    <BooleanInput label="Accrued" source="accrued" />
    <ReferenceInput source="firm_id" reference="firms" allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="user_id" reference="users" filter={{ role: 'client' }} allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="freelancer_id" reference="users" filter={{ role: 'member' }} allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <NullableBooleanInput label="Has description" source="with_description" />
  </Filter>
)

export const FinancialList = props => (
  <List
    title="Financials"
    {...props}
    bulkActionButtons={false}
    filters={<FinancialFilter />}
    actions={<ListActions />}
    sort={{ field: 'accrual_timestamp', order: 'DESC' }}
  >
    <Datagrid>
      <SelectField source="financial_type" choices={financialTypes} />
      <TextField source="automatic_description" />
      <ReferenceField source="invoice_id" reference="invoices" link="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="paycheck_id" reference="paychecks" link="show">
        <TextField source="title" />
      </ReferenceField>
      <FunctionField source="accrual_amount" render={RenderMoney} />
      <FunctionField source="cash_amount" render={RenderMoney} />
      <BooleanField source="accrued" />
      <BooleanField source="cashed" />
      <DateField showTime source="accrual_timestamp" sortable />
      <DateField showTime source="cash_timestamp" sortable />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowFinancial = props => (
  <Show title="Financial" {...props}>
    <SimpleForm>
      <SelectField source="financial_type" choices={financialTypes} />
      <TextField source="automatic_description" />
      <TextField source="description" />
      <ReferenceField source="invoice_id" reference="invoices" link="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="paycheck_id" reference="paychecks" link="show">
        <TextField source="title" />
      </ReferenceField>
      <TextField source="currency" />
      <DateField showTime source="accrual_timestamp" />
      <DateField showTime source="cash_timestamp" />
      <BooleanField source="accrued" />
      <BooleanField source="cashed" />
      <FunctionField source="accrual_amount" render={RenderMoney} />
      <FunctionField source="cash_amount" render={RenderMoney} />
      <DateField showTime source="created_at" />
      <DateField showTime source="updated_at" />
    </SimpleForm>
  </Show>
)

export const EditFinancial = props => (
  <Edit title="Financial" {...props}>
    <SimpleForm>
      <SelectInput source="financial_type" choices={financialTypes} sortable />
      <TextInput source="description" sortable />
      <TextInput source="currency" sortable />
      <NumberInput source="accrual_amount" sortable />
      <NumberInput source="cash_amount" sortable />
      <DateTimeInput source="accrual_timestamp" sortable />
      <DateTimeInput source="cash_timestamp" sortable />
      <BooleanInput source="accrued" />
      <BooleanInput source="cashed" />
      <ReferenceInput reference="invoices" source="invoice_id">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput reference="paychecks" source="paycheck_id">
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const CreateFinancial = props => (
  <Create {...props}>
    <SimpleForm>
      <SelectInput source="financial_type" choices={financialTypes} sortable />
      <TextInput source="description" sortable />
      <TextInput source="currency" sortable />
      <NumberInput source="accrual_amount" sortable />
      <NumberInput source="cash_amount" sortable />
      <DateTimeInput source="accrual_timestamp" sortable />
      <DateTimeInput source="cash_timestamp" sortable />
      <BooleanInput source="accrued" />
      <BooleanInput source="cashed" />
      <ReferenceInput reference="invoices" source="invoice_id">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput reference="paychecks" source="paycheck_id">
        <AutocompleteInput optionText="title" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
