import React from 'react'
import {
  List, Datagrid, DateField,
  TextField, ReferenceField, FunctionField, BooleanField, SelectInput,
  Show, SimpleForm, ShowButton, Filter, ReferenceInput,
  AutocompleteInput, NullableBooleanInput, BooleanInput, Edit, Create, TextInput,
  DateInput, NumberInput, EditButton, ReferenceManyField, NumberField,
} from 'react-admin'
import RenderMoney from 'admin/components/RenderMoney'

const itemTypeChoices = [
  { id: 'manual', name: 'Manual' },
  { id: 'automatic', name: 'Automatic' },
]

const BonusFilter = props => (
  <Filter {...props}>
    <ReferenceInput label="Firm" source="firm_id" reference="firms" allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput source="freelancer_id" reference="users" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
    <ReferenceInput source="client_id" reference="users" allowEmpty>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
)

export const BonusesList = props => (
  <List
    title="Bonuses"
    {...props}
    bulkActionButtons={false}
    filters={<BonusFilter />}
    sort={{ field: 'created_at', order: 'DESC' }}
  >
    <Datagrid>
      <ReferenceField source="contract_id" reference="contracts" link="show">
        <TextField source="title" />
      </ReferenceField>
      <TextField source="item_type" label="Type" />
      <FunctionField source="total_to_pay_freelancer" render={RenderMoney} />
      <FunctionField source="total_to_pay_client" render={RenderMoney} />
      <DateField source="start_date" />
      <DateField source="end_date" />
      <DateField showTime source="approved_at" />
      <DateField showTime source="created_at" />
      <DateField showTime source="updated_at" />
      <TextField source="currency" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const ShowBonus = (props) => {
  return (
    <Show title="Bonus" {...props} undoable={false}>
      <SimpleForm>
        <TextField source="title" />
        <ReferenceField source="contract_id" reference="contracts" link="show">
          <TextField source="title" />
        </ReferenceField>
        <TextField source="item_type" />
        <DateField source="start_date" />
        <DateField source="end_date" />
        <DateField showTime source="approved_at" />
        <DateField showTime source="created_at" />
        <DateField showTime source="updated_at" />
        <FunctionField source="total_to_pay_freelancer" render={RenderMoney} />
        <FunctionField source="total_to_pay_client" render={RenderMoney} />
      </SimpleForm>
    </Show>
  )
}

export const EditBonus = (props) => {
  return (
    <Edit title="Bonus" {...props} undoable={false}>
      <SimpleForm>
        <ReferenceInput source="contract_id" reference="contracts" allowEmpty>
          <AutocompleteInput optionText="title" />
        </ReferenceInput>
        <SelectInput source="item_type" choices={itemTypeChoices} allowEmpty />
        <DateInput source="start_date" />
        <DateInput source="end_date" />
        <NumberInput source="total_to_pay_freelancer" />
        <NumberInput source="total_to_pay_client" />
      </SimpleForm>
    </Edit>
  )
}

export const CreateBonus = (props) => {
  return (
    <Create title="Bonus" {...props} undoable={false}>
      <SimpleForm>
        <ReferenceInput source="contract_id" reference="contracts" allowEmpty>
          <AutocompleteInput optionText="title" />
        </ReferenceInput>
        <SelectInput source="item_type" choices={itemTypeChoices} allowEmpty />
        <DateInput source="start_date" />
        <DateInput source="end_date" />
        <NumberInput source="total_to_pay_freelancer" />
        <NumberInput source="total_to_pay_client" />
      </SimpleForm>
    </Create>
  )
}
