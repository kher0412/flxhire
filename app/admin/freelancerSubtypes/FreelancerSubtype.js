import React from 'react'
import { List, Datagrid, TextField,
  ReferenceArrayInput, AutocompleteArrayInput, SimpleForm,
  EditButton, Edit, Filter, AutocompleteInput, BooleanField,
  TextInput, ReferenceInput, SelectInput, Create, BooleanInput,
  SingleFieldList, ChipField, ReferenceField, ReferenceArrayField,
} from 'react-admin'
import FileURLInput from 'admin/components/FileURLInput'

const FreelancerSubtypeFilter = props => (
  <Filter {...props}>
    <TextInput source="q" label="Search" alwaysOn />
    <ReferenceInput label="Freelancer Type" source="freelancer_type_id" reference="freelancer_types" allowEmpty alwaysOn>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  </Filter>
)

export const FreelancerSubtypeList = props => (
  <List title="Freelancer Subtypes" filters={<FreelancerSubtypeFilter />} {...props} bulkActionButtons={false}>
    <Datagrid>
      <TextField source="name" />
      <FileURLInput disabled source="icon_url" label="Icon" />
      <TextField source="linkedin_codes" />
      <ReferenceField label="Freelancer Type" source="freelancer_type_id" reference="freelancer_types" allowEmpty>
        <TextField source="name" />
      </ReferenceField>
      <BooleanField source="screening_requires_project" />
      <ReferenceArrayField label="Screening Questions" source="screening_questions_ids" reference="questions" allowEmpty sortable={false}>
        <SingleFieldList><ChipField source="title" /></SingleFieldList>
      </ReferenceArrayField>
      <EditButton />
    </Datagrid>
  </List>
)

export const EditFreelancerSubtype = (props) => {
  return (
    <Edit title="Freelancer Subtype" {...props} undoable={false}>
      <SimpleForm>
        <TextInput source="name" />
        <FileURLInput source="icon_url" label="Icon" />
        <TextInput source="linkedin_codes" />
        <BooleanInput source="screening_requires_project" />
        <ReferenceInput label="Freelancer Type" source="freelancer_type_id" reference="freelancer_types" allowEmpty>
          <SelectInput source="name" />
        </ReferenceInput>
        <ReferenceArrayInput label="Screening Questions" source="screening_questions_ids" reference="questions" allowEmpty sortable={false}>
          <AutocompleteArrayInput optionText="title" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  )
}

export const CreateFreelancerSubtype = (props) => {
  return (
    <Create title="Freelancer Subtype" {...props}>
      <SimpleForm redirect="list">
        <TextInput source="name" />
        <TextInput source="linkedin_codes" />
        <BooleanInput source="screening_requires_project" />
        <ReferenceInput label="Freelancer Type" source="freelancer_type_id" reference="freelancer_types" allowEmpty>
          <SelectInput source="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}
