import React from 'react'
import {
  List, Create, Datagrid, TextField,
  ShowButton, SimpleForm,
  EditButton, Edit, SelectInput,
  DateField, TextInput, BooleanInput,
  NumberInput, DateInput,
} from 'react-admin'

const typeDiscountChoices = [
  { id: 'percentage', name: 'Percentage' },
  { id: 'fixed_amount_discount', name: 'Fixed Amount Discount' },
]

const typeUseChoices = [
  { id: 'single', name: 'Single' },
  { id: 'multiple', name: 'Multiple' },
]

export const DiscountList = props => (
  <List title="discounts" {...props} bulkActionButtons={false}>
    <Datagrid>
      <TextField label="Code" source="code" sortable />
      <DateField source="created_at" />
      <DateField source="expiry_date" />
      <TextField label="Times Applied" source="times_applied" sortable />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

export const EditDiscount = props => (
  <Edit title="Discount" {...props}>
    <SimpleForm>
      <TextInput source="code" />
      <SelectInput label="Type Discount" source="type_discount" choices={typeDiscountChoices} />
      <NumberInput source="amount" />
      <BooleanInput source="enabled" />
      <SelectInput label="Type Use" source="type_use" choices={typeUseChoices} />
      <DateInput source="expiry_date" />
    </SimpleForm>
  </Edit>
)

const defaultDiscount = {
  enabled: true,
}

export const CreateDiscount = props => (
  <Create {...props}>
    <SimpleForm initialValues={defaultDiscount}>
      <TextInput source="code" />
      <SelectInput label="Type Discount" source="type_discount" choices={typeDiscountChoices} />
      <NumberInput source="amount" />
      <BooleanInput source="enabled" />
      <SelectInput label="Type Use" source="type_use" choices={typeUseChoices} />
      <DateInput source="expiry_date" />
    </SimpleForm>
  </Create>
)
