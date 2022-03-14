import React from 'react'
import {
  List,
  Datagrid,
  TextField,
  ShowButton,
  Show,
  SimpleForm,
  EditButton,
  Edit,
  ReferenceInput,
  TextInput,
  Create,
  SelectInput,
  AutocompleteInput,
  ReferenceField,
} from 'react-admin'

export const BlogPostList = props => (
  <List title="Blog Posts" {...props} bulkActionButtons={false}>
    <Datagrid>
      <TextField label="Title" source="title" />
      <TextField label="Status" source="status" />

      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowBlogPost = (props) => {
  return (
    <div>
      <Show title="Blog Post" {...props}>
        <SimpleForm>
          <TextField label="Title" source="title" />
          <ReferenceField label="Author" source="user_id" reference="users">
            <TextField source="name" />
          </ReferenceField>
          <TextField label="Status" source="status" />
          <TextField label="Slug" source="slug" />
          <TextField label="Excerpt" source="excerpt" />
        </SimpleForm>
      </Show>
    </div>
  )
}

const BlogPostForm = () => {
  return (
    <SimpleForm>
      <TextInput label="Title" source="title" />

      <ReferenceInput label="Author" source="user_id" reference="users">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>

      <SelectInput
        source="status"
        choices={[
          { id: 'draft', name: 'Draft' },
          { id: 'published', name: 'Published' },
          { id: 'approved', name: 'Featured' },
        ]}
      />

      <ReferenceInput label="Blog Category" source="blog_category_id" reference="blog_categories">
        <SelectInput source="name" />
      </ReferenceInput>

      <TextInput multiline label="Excerpt" source="excerpt" />
      <TextInput multiline label="Content" source="content" />
    </SimpleForm>
  )
}

export const EditBlogPost = (props) => {
  return (
    <Edit title="Blog Post" {...props} undoable={false}>
      {BlogPostForm()}
    </Edit>
  )
}

export const CreateBlogPost = (props) => {
  return (
    <Create title="Blog Post" {...props}>
      {BlogPostForm()}
    </Create>
  )
}
