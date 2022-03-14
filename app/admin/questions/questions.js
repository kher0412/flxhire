import React from 'react'
import {
  List, Datagrid, TextField,
  SimpleForm,
  EditButton,
  Edit,
  Create,
  TextInput,
  AutocompleteArrayInput,
  Filter,
  NullableBooleanInput,
  ReferenceField,
  ReferenceArrayInput,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  NumberField,
  SelectInput,
  NumberInput,
  SelectField,
} from 'react-admin'

const statusChoices = [
  { id: 'private', name: 'Private' },
  { id: 'submitted', name: 'Submitted' },
  { id: 'public', name: 'Public' },
]

const QuestionFilter = props => (
  <Filter {...props}>
    <SelectInput source="status" choices={statusChoices} alwaysOn />
    <TextInput source="q" label="Search" alwaysOn />
    <ReferenceArrayInput label="Freelancer Types" source="freelancer_type_ids" reference="freelancer_types" allowEmpty sortable={false}>
      <AutocompleteArrayInput optionText="name" />
    </ReferenceArrayInput>
    <ReferenceArrayInput label="Freelancer Subtypes" source="freelancer_subtype_ids" reference="freelancer_subtypes" allowEmpty sortable={false}>
      <AutocompleteArrayInput optionText="name" />
    </ReferenceArrayInput>
    <ReferenceArrayInput label="Skills" source="skill_ids" reference="skills" allowEmpty sortable={false}>
      <AutocompleteArrayInput optionText="name" />
    </ReferenceArrayInput>
    <ReferenceArrayInput label="Tags" source="tag_ids" reference="tags" allowEmpty sortable={false}>
      <AutocompleteArrayInput optionText="name" />
    </ReferenceArrayInput>
    <NullableBooleanInput source="featured_per_category" label="Featured" />
  </Filter>
)

export const QuestionList = props => (
  <List
    title="Job Questions"
    filters={<QuestionFilter />}
    bulkActionButtons={false}
    {...props}
  >
    <Datagrid>
      <TextField source="title" />
      <ReferenceField source="user_id" reference="users" link="show">
        <TextField source="name" />
      </ReferenceField>
      <SelectField source="status" choices={statusChoices} />
      <ReferenceArrayField source="freelancer_type_ids" label="Freelancer Types" reference="freelancer_types" allowEmpty sortable={false}>
        <SingleFieldList><ChipField source="name" /></SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField source="freelancer_subtype_ids" label="Freelancer Subtypes" reference="freelancer_subtypes" allowEmpty sortable={false}>
        <SingleFieldList><ChipField source="name" /></SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField source="skill_ids" label="Skills" reference="skills" allowEmpty sortable={false}>
        <SingleFieldList><ChipField source="name" /></SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField source="tag_ids" label="Tags" reference="tags" allowEmpty sortable={false}>
        <SingleFieldList><ChipField source="name" /></SingleFieldList>
      </ReferenceArrayField>
      <NumberField source="answers_count" label="Answers" />
      <NumberField source="featured_in_count" label="Featured In" />
      <NumberField source="max_duration" label="Max Duration" />
      <EditButton />
    </Datagrid>
  </List>
)

export const EditQuestion = props => (
  <Edit title="Edit Question" {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput multiline source="description" />
      <SelectInput source="status" choices={statusChoices} />
      <NumberInput source="max_duration" />
      <ReferenceArrayInput label="Freelancer Types" source="freelancer_type_ids" reference="freelancer_types" allowEmpty sortable={false}>
        <AutocompleteArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput label="Freelancer Subtypes" source="freelancer_subtype_ids" reference="freelancer_subtypes" perPage={100} allowEmpty sortable={false}>
        <AutocompleteArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput label="Skills" source="skill_ids" reference="skills" allowEmpty sortable={false}>
        <AutocompleteArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput label="Tags" source="tag_ids" reference="tags" allowEmpty sortable={false}>
        <AutocompleteArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput label="Featured in F. Types" source="featured_freelancer_type_ids" reference="freelancer_types" allowEmpty sortable={false}>
        <AutocompleteArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput label="Featured in F. Subtypes" source="featured_freelancer_subtype_ids" reference="freelancer_subtypes" perPage={100} allowEmpty sortable={false}>
        <AutocompleteArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput label="Featured in Skills" source="featured_skill_ids" reference="skills" allowEmpty sortable={false}>
        <AutocompleteArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput label="Featured in Tags" source="featured_tag_ids" reference="tags" allowEmpty sortable={false}>
        <AutocompleteArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
)

export const CreateQuestion = props => (
  <Create title="Create Question" {...props}>
    <SimpleForm redirect="edit">
      <TextInput source="title" />
      <TextInput multiline source="description" />
      <SelectInput source="status" choices={statusChoices} />
    </SimpleForm>
  </Create>
)
