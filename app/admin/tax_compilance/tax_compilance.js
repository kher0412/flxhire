import React from 'react'
import moment from 'moment'
import {
  TextInput,
  DateInput,
  BooleanField,
  List,
  Datagrid,
  TextField,
  Filter,
  TopToolbar,
} from 'react-admin'
import SendEmails from './SendEmails'

const FreelancerFilter = props => (
  <Filter {...props}>
    <DateInput source="from" alwaysOn />
    <DateInput source="to" alwaysOn />
    <TextInput label="Minimum Amount" source="min_amount" alwaysOn />
  </Filter>
)

const filterDefaults = {
  min_amount: 600,
  from: moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
  to: moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD'),
}

const ListActions = ({
  displayedFilters,
  filters,
  filterValues,
  resource,
  showFilter,
}) => (
  <TopToolbar>
    {filters && React.cloneElement(filters, {
      resource,
      showFilter,
      displayedFilters,
      filterValues,
      context: 'button',
    }) }
    <SendEmails filters={filterValues} />
  </TopToolbar>
)

const BulkActions = ({ selectedIds }) => (
  <SendEmails selectedIds={selectedIds} />
)

const ListTaxCompilanceForm = props => (
  <List
    title="Tax Compliance: Freelancers"
    filters={<FreelancerFilter />}
    filterDefaultValues={filterDefaults}
    actions={<ListActions />}
    bulkActionButtons={<BulkActions />}
    {...props}
  >
    <Datagrid>
      <TextField source="name" sortable={false} />
      <TextField label="Vanity URL" source="profile.slug" sortable={false} />
      <TextField label="Email" source="email" sortable={false} />
      <TextField label={`Amount Earned in ${moment().subtract(1, 'year').year()}`} source="income_paid_last_year" sortable={false} />
      <BooleanField label="US Citizen" source="profile.us_citizen" sortable={false} />
    </Datagrid>
  </List>
)

export default ListTaxCompilanceForm
