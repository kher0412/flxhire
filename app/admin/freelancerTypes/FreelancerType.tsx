import React from 'react'
import { List, Datagrid, TextField, BooleanField,
  ShowButton, Show, SimpleForm, ReferenceArrayInput,
  EditButton, Edit, ReferenceArrayField, ChipField, SingleFieldList,
  TextInput, Create, BooleanInput, AutocompleteArrayInput, TopToolbar,
} from 'react-admin'
import FileURLInput from 'admin/components/FileURLInput'
import MergeButton from './MergeButton'

export const FreelancerTypeList = props => (
  <List title="Freelancer Types" {...props} bulkActionButtons={false}>
    <Datagrid>
      <TextField label="name" source="name" />
      <TextField source="slug" />
      <FileURLInput disabled source="icon_url" label="Icon" />
      <BooleanField source="jobs_have_code_tests" />
      <TextField source="linkedin_codes" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

const FreelancerTypeActions: any = ({ basePath, data, resource }) => (
  <TopToolbar>
    <MergeButton record={data} />
  </TopToolbar>
)

export const ShowFreelancerType = (props) => {
  return (
    <Show title="Freelancer type" actions={<FreelancerTypeActions />} {...props}>
      <SimpleForm>
        <TextField source="name" />
        <TextField source="slug" />
        <FileURLInput disabled source="icon_url" label="Icon" />
        <ReferenceArrayField source="freelancer_subtypes_ids" reference="freelancer_subtypes">
          <SingleFieldList><ChipField source="name" /></SingleFieldList>
        </ReferenceArrayField>
        <ReferenceArrayField label="Skills" source="skills_ids" reference="skills">
          <SingleFieldList><ChipField source="name" /></SingleFieldList>
        </ReferenceArrayField>

        <ReferenceArrayField source="featured_skills_ids" reference="skills">
          <SingleFieldList><ChipField source="name" /></SingleFieldList>
        </ReferenceArrayField>

        <ReferenceArrayField source="screening_questions_ids" reference="questions" sortable={false}>
          <SingleFieldList><ChipField source="title" /></SingleFieldList>
        </ReferenceArrayField>
        <BooleanField source="jobs_have_code_tests" />
        <TextField source="linkedin_codes" />
      </SimpleForm>
    </Show>
  )
}

export const EditFreelancerType = (props) => {
  return (
    <Edit title="Freelancer type" actions={<FreelancerTypeActions />} {...props} undoable={false}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="slug" />

        <FileURLInput source="icon_url" label="Icon" />

        <TextInput multiline label="Message error" source="message" />

        <ReferenceArrayInput source="skills_ids" reference="skills" allowEmpty>
          <AutocompleteArrayInput optionText="name" />
        </ReferenceArrayInput>

        <ReferenceArrayInput source="featured_skills_ids" reference="skills" allowEmpty>
          <AutocompleteArrayInput optionText="name" />
        </ReferenceArrayInput>

        <ReferenceArrayInput source="screening_questions_ids" reference="questions" allowEmpty sortable={false}>
          <AutocompleteArrayInput optionText="title" />
        </ReferenceArrayInput>

        <BooleanInput source="jobs_have_code_tests" />
        <TextInput source="linkedin_codes" />
      </SimpleForm>
    </Edit>
  )
}

export const CreateFreelancerType = (props) => {
  return (
    <Create title="Freelancer type" {...props}>
      <SimpleForm redirect="list">
        <TextInput source="name" />
        <TextInput multiline label="Message error" source="message" />
        <ReferenceArrayInput label="Skills" source="skills_ids" reference="skills" allowEmpty>
          <AutocompleteArrayInput optionText="name" />
        </ReferenceArrayInput>
        <BooleanInput source="jobs_have_code_tests" />
        <TextInput source="linkedin_codes" />
      </SimpleForm>
    </Create>
  )
}
