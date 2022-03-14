import React from 'react'
import {
  List, Datagrid, TextField,
  ShowButton, Show, SimpleForm, SingleFieldList,
  EditButton, Edit, SelectInput, ReferenceArrayField,
  TextInput, Create, ReferenceInput, ChipField,
  ReferenceArrayInput, AutocompleteArrayInput, Filter, BooleanField, BooleanInput, ReferenceField, AutocompleteInput,
} from 'react-admin'

const SkillFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="Freelancer Type" source="freelancer_type_id" reference="freelancer_types">
      <SelectInput />
    </ReferenceInput>
    <ReferenceInput label="Created By" source="custom_user_id" reference="users">
      <SelectInput />
    </ReferenceInput>
  </Filter>
)

export const SkillList = props => (
  <List title="Skills" {...props} filters={<SkillFilter />} bulkActionButtons={false}>
    <Datagrid>
      <TextField source="name" />
      <ReferenceArrayField source="freelancer_type_ids" reference="freelancer_types">
        <SingleFieldList><ChipField source="name" /></SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField label="Featured In" source="featured_freelancer_type_ids" reference="freelancer_types" sortable={false}>
        <SingleFieldList><ChipField source="name" /></SingleFieldList>
      </ReferenceArrayField>
      <BooleanField source="custom" />
      <ReferenceField label="Created By:" source="custom_user_id" reference="users">
        <TextField source="name" />
      </ReferenceField>

      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowSkill = (props) => {
  return (
    <div>
      <Show title="Skill" {...props}>
        <SimpleForm>
          <TextField source="name" />
          <TextField source="match_keyword" />
          <BooleanField source="custom" />
          <ReferenceArrayField label="Created By:" source="custom_user_id" reference="users">
            <SingleFieldList><ChipField source="custom_user_id" /></SingleFieldList>
          </ReferenceArrayField>
          <ReferenceArrayField source="freelancer_type_ids" reference="freelancer_types">
            <SingleFieldList><ChipField source="name" /></SingleFieldList>
          </ReferenceArrayField>

          <ReferenceArrayField label="Featured In" source="featured_freelancer_type_ids" reference="freelancer_types">
            <SingleFieldList><ChipField source="name" /></SingleFieldList>
          </ReferenceArrayField>
        </SimpleForm>
      </Show>
    </div>
  )
}

export const EditSkill = (props) => {
  return (
    <Edit title="Skill" {...props} undoable={false}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="match_keyword" />

        <ReferenceArrayInput source="freelancer_type_ids" reference="freelancer_types" allowEmpty sortable={false}>
          <AutocompleteArrayInput optionText="name" />
        </ReferenceArrayInput>

        <ReferenceArrayInput label="Featured In" source="featured_freelancer_type_ids" reference="freelancer_types" allowEmpty sortable={false}>
          <AutocompleteArrayInput optionText="name" />
        </ReferenceArrayInput>
        <BooleanInput source="custom" />
        <ReferenceInput label="Created By:" source="custom_user_id" reference="users" allowEmpty sortable={false}>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  )
}

export const CreateSkill = (props) => {
  return (
    <Create title="Skill" {...props}>
      <SimpleForm>
        <TextInput label="name" source="name" />

        <ReferenceArrayInput label="Freelancer Types" source="freelancer_type_ids" reference="freelancer_types" allowEmpty sortable={false}>
          <AutocompleteArrayInput optionText="name" />
        </ReferenceArrayInput>

        <ReferenceArrayInput label="Featured In" source="featured_freelancer_type_ids" reference="freelancer_types" allowEmpty sortable={false}>
          <AutocompleteArrayInput optionText="name" />
        </ReferenceArrayInput>
        <BooleanInput source="custom" />
        <ReferenceInput label="Created By:" source="custom_user_id" reference="users" allowEmpty sortable={false}>
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}
