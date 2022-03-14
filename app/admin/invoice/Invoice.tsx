import React from 'react'
import {
  List, Datagrid, TextField,
  DateField, NumberField,
  Edit, ShowButton, Show, EditButton,
  SimpleForm,
  SelectInput, AutocompleteInput,
  Create, BooleanField, TopToolbar,
  DateInput, NumberInput, ReferenceInput, Filter,
  BooleanInput, TextInput, ReferenceField,
  ReferenceManyField, DateTimeInput,
  FileField, ListButton, CreateButton,
  SelectField, FunctionField, ArrayField,
  NullableBooleanInput,
} from 'react-admin'

import DownloadIcon from '@material-ui/icons/CloudDownload'
import LinkField from '../components/LinkField'
import DateTimeInputWithNow from '../components/DateTimeInputWithNow'
import PayInvoiceButton from './PayInvoiceButton'
import GeneratePdfButton from './GeneratePdfButton'
import SendInvoiceButton from './SendInvoiceButton'
import VoidInvoiceButton from './VoidInvoiceButton'
import StatCard from '../components/StatCard'
import AutoPayout from './AutoPayoutButton'
import EmailInvoices from './EmailInvoicesButton'
import PrepareSalariesButton from './PrepareSalariesButton'
import RenderMoney from '../components/RenderMoney'

const statusChoices = [
  { id: 'draft', name: 'Draft' },
  { id: 'active', name: 'Active' },
  { id: 'void', name: 'Void' },
]

const pdfStatusChoices = [
  { id: 'generated', name: 'Generated' },
  { id: 'generating', name: 'Generating' },
  { id: 'generation_queued', name: 'Generation Queued' },
  { id: 'generation_failed', name: 'Generation Failed' },
]

const InvoiceFilter = props => (
  <Filter {...props}>
    <SelectInput source="status" choices={statusChoices} />
    <SelectInput label="PDF Status" source="pdf_status" choices={pdfStatusChoices} />
    <BooleanInput label="Payout due?" source="payout_due" />
    <BooleanInput label="Scheduled for auto payout or retry?" source="auto_payout_scheduled" />
    <BooleanInput label="Ready for auto payout or retry?" source="auto_payout_ready" />
    <BooleanInput label="Ready for email?" source="ready_for_email" />
    <BooleanInput label="Ready for overdue warning email?" source="ready_for_overdue_warning_email" />
    <BooleanInput label="Ready for overdue email?" source="ready_for_overdue_email" />
    <BooleanInput label="With enabled overdue notices?" source="with_enabled_overdue_notices" />
    <BooleanInput label="Unpaid by client?" source="unpaid_by_client" />
    <BooleanInput label="Client payment due in past?" source="client_payment_due_in_past" />
    <NullableBooleanInput label="Payment processing?" source="payment_processing" />
    <BooleanInput label="Has payout failures?" source="has_payout_failures" />
    <NullableBooleanInput label="Payouts skip waiting for client payment" source="skip_waiting_for_invoice_payment" />
    <ReferenceInput source="firm_id" reference="firms" allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="user_id" label="Client" reference="users" filter={{ role: 'client' }} allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="freelancer_id" reference="users" filter={{ role: 'member' }} allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <TextInput source="purchase_order_number" />
  </Filter>
)

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
    <PrepareSalariesButton />
    <EmailInvoices />
    <AutoPayout />
  </TopToolbar>
)

export const InvoiceList = props => (
  <List
    title="Invoices"
    {...props}
    filters={<InvoiceFilter />}
    actions={<ListActions />}
    bulkActionButtons={false}
    sort={{ field: 'invoice_date', order: 'DESC' }}
  >
    <Datagrid>
      <ReferenceField source="firm_id" reference="firms" link="show">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="user_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="invoice_num" />
      <TextField source="status" />
      <TextField source="client_status" sortable={false} />
      <TextField source="freelancer_status" sortable={false} />
      <DateField source="invoice_date" />
      <DateField source="client_paid_at" />
      <DateField source="payout_due_date" />
      <FunctionField source="total_to_pay_client" render={RenderMoney} />
      <FunctionField source="total_to_pay_freelancer" render={RenderMoney} />
      <ShowButton />
      <EditButton label="Edit" />
      <FileField source="csv_url" title="CSV" target="_blank" />
      <LinkField label="PDF" source="pdf_url" text={<DownloadIcon />} />
    </Datagrid>
  </List>
)

const InvoiceEditActions: any = ({ basePath, data }) => (
  <TopToolbar>
    <ShowButton basePath={basePath} record={data} />
    <SendInvoiceButton record={data} />
    <VoidInvoiceButton record={data} />
    <PayInvoiceButton record={data} />
    <GeneratePdfButton record={data} />
    <ListButton basePath={basePath} />
  </TopToolbar>
)

const InvoiceTitle: any = ({ record }) => (
  <span>
    Invoice
    {' '}
    {record ? `"${record.invoice_num}"` : ''}
  </span>
)

export const InvoiceEdit = props => (
  <Edit {...props} actions={<InvoiceEditActions />} title={<InvoiceTitle />} undoable={false}>
    <SimpleForm>
      <NumberInput source="invoice_num" />
      <TextInput multiline style={{ width: '25%' }} source="title" />
      <TextInput multiline style={{ width: '25%' }} source="description" />
      <ReferenceInput label="Client" source="user_id" reference="users" filter={{ role: 'client' }} allowEmpty>
        <AutocompleteInput optionText="name" optionalValue="id" />
      </ReferenceInput>
      <SelectInput source="status" choices={statusChoices} />
      <SelectInput label="PDF Status" source="pdf_status" choices={pdfStatusChoices} />
      <TextField source="client_status" label="Client Status" />
      <TextField source="freelancer_status" label="Member Status" />
      <DateInput source="invoice_date" />
      <DateInput source="due_date" />
      <DateInput source="payout_due_date" />
      <TextInput source="purchase_order_number" />
      <DateTimeInputWithNow source="client_paid_at" />
      <DateTimeInputWithNow source="block_payouts_until" />
      <DateTimeInput source="emailed_at" />
      <DateTimeInput source="last_emailed_at" />
      <TextInput disabled source="emailed_to" />
      <TextInput source="currency" />
    </SimpleForm>
  </Edit>
)

export const CreateInvoice = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="Client" source="user_id" reference="users" filter={{ role: 'client' }} allowEmpty>
        <AutocompleteInput optionText="name" optionalValue="id" />
      </ReferenceInput>
      <SelectInput source="status" choices={statusChoices} />
      <TextInput multiline style={{ width: '25%' }} source="title" />
      <TextInput multiline style={{ width: '25%' }} source="description" />
      <DateInput source="invoice_date" />
      <DateInput source="due_date" />
      <TextInput source="purchase_order_number" />
      <DateTimeInputWithNow source="client_paid_at" />
      <DateTimeInputWithNow source="block_payouts_until" />
      <TextInput source="currency" />
    </SimpleForm>
  </Create>
)

export const ShowInvoice = props => (
  <Show {...props} title={<InvoiceTitle />}>
    <SimpleForm>
      <StatCard label="Revenue" source="stats.revenue" />
      <StatCard label="Costs" source="stats.costs" />
      <StatCard label="Profit" source="stats.profit" />

      <TextField source="id" />
      <TextField source="invoice_num" />
      <TextField source="title" />
      <TextField source="description" />
      <ReferenceField label="Client" source="user_id" reference="users" link="show">
        <TextField source="name" label="Client" />
      </ReferenceField>
      <SelectField source="status" choices={statusChoices} />
      <SelectField label="PDF Status" source="pdf_status" choices={pdfStatusChoices} />
      <TextField source="client_status" label="Client Status" />
      <TextField source="freelancer_status" label="Member Status" />
      <DateField source="invoice_date" />
      <DateField source="due_date" />
      <DateField source="payout_due_date" />
      <TextField source="purchase_order_number" />
      <BooleanField source="skip_waiting_for_invoice_payment?" label="Payout: Skip Waiting for Customer Payment" />
      <DateField showTime source="client_paid_at" />
      <DateField showTime source="block_payouts_until" />
      <DateField showTime source="freelancers_paid_out_at" />
      <DateField showTime source="last_freelancers_payout_failure_at" />
      <DateField showTime source="emailed_at" />
      <DateField showTime source="last_emailed_at" />
      <TextField source="emailed_to" />
      <FunctionField source="total_to_pay_for_hours_client" render={RenderMoney} />
      <FunctionField source="expenses_amount" label="Expenses total" render={RenderMoney} />
      <FunctionField source="invoice_items_amount" label="Invoice items total" render={RenderMoney} />
      <FunctionField source="invoice_items_no_timesheets_subtotal" label="Invoice items no timesheets subtotal" render={RenderMoney} />
      <FunctionField source="total_to_pay_freelancer" render={RenderMoney} />
      <FunctionField source="total_to_pay_client" render={RenderMoney} />
      <TextField source="currency" />
      <ReferenceManyField perPage={100} label="Paychecks" reference="paychecks" target="invoice_id">
        <Datagrid>
          <TextField source="title" />
          <TextField source="status" />
          <FunctionField source="total_to_pay_freelancer" render={RenderMoney} />
          <ShowButton />
        </Datagrid>
      </ReferenceManyField>
      <ReferenceManyField perPage={100} label="Timesheets" reference="timesheets" target="invoice_id">
        <Datagrid>
          <ReferenceField label="Member" source="freelancer_id" reference="users" link="show">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField label="Client" source="client_id" reference="users" link="show">
            <TextField source="name" />
          </ReferenceField>
          <DateField source="start_date" />
          <DateField source="end_date" />
          <DateField source="submitted_at" />
          <TextField source="status" />
          <FunctionField source="freelancer_rate" render={RenderMoney} />
          <FunctionField source="client_rate" render={RenderMoney} />
          <FunctionField source="total_to_pay_client" render={RenderMoney} />
          <FunctionField source="total_to_pay_freelancer" render={RenderMoney} />
          <ShowButton />
        </Datagrid>
      </ReferenceManyField>
      <ReferenceManyField label="Invoice Items" perPage={100} reference="invoice_items" target="invoice_id">
        <Datagrid>
          <TextField source="description" />
          <NumberField source="num_units" />
          <FunctionField source="amount_per_unit" render={RenderMoney} />
          <FunctionField source="total_amount" render={RenderMoney} />
          <TextField source="payout_status" />
          <ShowButton />
        </Datagrid>
      </ReferenceManyField>
      <ReferenceManyField label="Payouts" perPage={100} reference="payouts" target="invoice_id">
        <Datagrid>
          <ReferenceField label="Invoice" source="invoice_id" reference="invoices" link="show">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField label="Member" source="freelancer_id" reference="users" link="show">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="created_at" />
          <TextField source="status" />
          <TextField source="description" />
          <FunctionField source="amount" render={RenderMoney} />
          <ShowButton />
        </Datagrid>
      </ReferenceManyField>
      <ReferenceManyField reference="financials" target="invoice_id" label="Financials">
        <Datagrid>
          <TextField source="financial_type" />
          <TextField source="automatic_description" />
          <ReferenceField source="paycheck_id" reference="paychecks" link="show">
            <TextField source="title" />
          </ReferenceField>
          <FunctionField source="accrual_amount" render={RenderMoney} />
          <FunctionField source="cash_amount" render={RenderMoney} />
          <BooleanField source="accrued" />
          <BooleanField source="cashed" />
          <DateField showTime source="accrual_timestamp" sortable />
          <DateField showTime source="cash_timestamp" sortable />
          <ShowButton />
        </Datagrid>
      </ReferenceManyField>
      <ArrayField source="total_to_pay_freelancer_by_method">
        <Datagrid>
          <TextField source="payout_method_type" />
          <FunctionField source="total_to_pay_freelancer" render={RenderMoney} />
        </Datagrid>
      </ArrayField>
    </SimpleForm>
  </Show>
)
