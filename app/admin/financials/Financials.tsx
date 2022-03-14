import React from 'react'
import { ListItem, ListItemText, List, Switch } from '@material-ui/core'
import {
  NumberField, Filter, DateInput, List as RAList, BooleanInput,
} from 'react-admin'
import { Field } from 'react-final-form'
import { isUndefined } from 'lodash'

const Value = ({ data, name }) => (
  !isUndefined(data?.financials?.[name]?.amount) ? (
    <NumberField record={data.financials} source={`${name}.amount`} locales="en-US" emptyText="N/A" options={{ style: 'currency', currency: 'USD' }} />
  ) : (
    <React.Fragment>...</React.Fragment>
  )
)

const Header = ({ children }) => <h4>{children}</h4>
const Description = ({ children }) => <h6>{children}</h6>

const ItemView = ({ name, children = null, description = null }) => (
  <ListItem>
    <ListItemText
      primary={<React.Fragment><strong>{name}:</strong> {children || 'N/A'}</React.Fragment>}
      secondary={description}
    />
  </ListItem>
)

const Item = ({ data, id }) => (
  <ItemView
    name={data?.financials?.[id]?.name || 'Loading...'}
    description={data?.financials?.[id]?.description || '...'}
  >
    <Value data={data} name={id} />
  </ItemView>
)

const FinancialsGrid = ({ ids, data }) => {
  if (ids) {
    return (
      <div style={{ margin: 16 }}>
        <Header>Financials</Header>
        <List dense>
          <Item data={data} id="revenue" />
          <Item data={data} id="costs" />
          <Item data={data} id="operational_costs" />
          <Item data={data} id="average_monthly_additional_operational_costs" />
          <Item data={data} id="gross_profit" />
          <Item data={data} id="profit" />
        </List>

        <Header>Cashflow</Header>
        <Description>Note: this section is not affected by the filters</Description>
        <List dense>
          <Item data={data} id="receivable_current" />
          <Item data={data} id="receivable_overdue" />
          <Item data={data} id="receivable_total" />
          <Item data={data} id="payable" />
        </List>

        <Header>Payouts Status</Header>
        <Description>Note: this section is not affected by the filters</Description>
        <List dense>
          <Item data={data} id="payoneer_amount" />
          <Item data={data} id="payoneer_balance" />
          <Item data={data} id="stripe_connect_amount" />
          <Item data={data} id="stripe_balance" />
        </List>
      </div>
    )
  }
  return null
}

FinancialsGrid.defaultProps = {
  data: {},
  ids: [],
}

const CashBasedInput = ({ source }: any) => (
  <span>
    Accrual Based
    <Field render={input => <Switch onChange={input.onChange} value={input.value} />} name={source} />
    Cash Based
  </span>
)

const FilterInput = props => (
  <Filter {...props}>
    <DateInput source="from" alwaysOn />
    <DateInput source="to" alwaysOn />
    <BooleanInput source="cash_based" alwaysOn />
  </Filter>
)

export const Financials = props => (
  <RAList title="Financials" {...props} filters={<FilterInput />} bulkActionButtons={false}>
    <FinancialsGrid />
  </RAList>
)
