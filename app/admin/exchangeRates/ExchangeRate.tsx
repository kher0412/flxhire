import React from 'react'
import {
  List, Create, Datagrid, TextField,
  ShowButton, SimpleForm,
  EditButton, Edit, Show,
  Filter, DateInput,
  NumberField, ReferenceInput, AutocompleteInput, ReferenceField,
  DateField, NumberInput, TopToolbar, CreateButton,
} from 'react-admin'
import RefreshExchangeRates from './RefreshExchangeRates'

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
    <RefreshExchangeRates />
  </TopToolbar>
)

const ExchangeRateFilter = props => (
  <Filter {...props}>
    <ReferenceInput source="from_currency_id" reference="currencies" allowEmpty alwaysOn>
      <AutocompleteInput optionText="code" />
    </ReferenceInput>
    <ReferenceInput source="to_currency_id" reference="currencies" allowEmpty alwaysOn>
      <AutocompleteInput optionText="code" />
    </ReferenceInput>
    <DateInput source="date" alwaysOn allowEmpty />
  </Filter>
)

export const ExchangeRateList = props => (
  <List
    title="Exchange Rates"
    {...props}
    filters={<ExchangeRateFilter />}
    actions={<ListActions />}
    bulkActionButtons={false}
  >
    <Datagrid>
      <ReferenceField label="From Currency" source="from_currency_id" reference="currencies" link="show" sortable>
        <TextField source="code" />
      </ReferenceField>
      <ReferenceField label="To Currency" source="to_currency_id" reference="currencies" link="show" sortable>
        <TextField source="code" />
      </ReferenceField>
      <NumberField source="value" sortable />
      <DateField source="date" sortable />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowExchangeRate = props => (
  <Show title="Exchange Rates" {...props}>
    <SimpleForm>
      <ReferenceField label="From Currency" source="from_currency_id" reference="currencies" link="show">
        <TextField source="code" />
      </ReferenceField>
      <ReferenceField label="To Currency" source="to_currency_id" reference="currencies" link="show">
        <TextField source="code" />
      </ReferenceField>
      <NumberField source="value" />
      <DateInput source="date" />
    </SimpleForm>
  </Show>
)

export const EditExchangeRate = props => (
  <Edit title="Exchange Rates" {...props}>
    <SimpleForm>
      <ReferenceInput label="From Currency" source="from_currency_id" reference="currencies">
        <AutocompleteInput optionText="code" />
      </ReferenceInput>
      <ReferenceInput label="To Currency" source="to_currency_id" reference="currencies">
        <AutocompleteInput optionText="code" />
      </ReferenceInput>
      <NumberInput source="value" />
      <DateInput source="date" />
    </SimpleForm>
  </Edit>
)

export const CreateExchangeRate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="From Currency" source="from_currency_id" reference="currencies">
        <AutocompleteInput optionText="code" />
      </ReferenceInput>
      <ReferenceInput label="To Currency" source="to_currency_id" reference="currencies">
        <AutocompleteInput optionText="code" />
      </ReferenceInput>
      <NumberInput source="value" />
      <DateInput source="date" />
    </SimpleForm>
  </Create>
)
