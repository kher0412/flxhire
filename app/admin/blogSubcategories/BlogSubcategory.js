import React from 'react'
import {
  List, Datagrid, TextField,
  ShowButton, Show, SimpleForm,
  EditButton, Edit, SelectInput, ReferenceInput,
  TextInput, Create
} from 'react-admin'

export const BlogSubcategoryList = (props) => (
  <List title='Blog Subcategories' {...props} bulkActionButtons={false}>
    <Datagrid>
      <TextField label='Name' source='name' />
      <TextField label='Category' source='blog_category_name' />

      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowBlogSubcategory = (props) => {
  return (
    <div>
      <Show title='Blog Subcategory' {...props} >
        <SimpleForm>
          <TextField label='Name' source='name' />
          <TextField label='Category' source='blog_category_name' />
          <TextField label="Slug" source="slug" />
          <TextField label='Description' source='description' />
        </SimpleForm>
      </Show>
    </div>
  )
}

const BlogSubcategoryForm = () => {
  return (
    <SimpleForm>
      <TextInput label='Name' source='name' />

      <ReferenceInput label='Blog Category' source='blog_category_id' reference='blog_categories'>
        <SelectInput source='name' />
      </ReferenceInput>

      <TextInput multiline label='Description' source='description' />
    </SimpleForm>
  )
}

export const EditBlogSubcategory = (props) => {
  return (
    <Edit title='Blog Subcategory' {...props} undoable={false}>
      {BlogSubcategoryForm()}
    </Edit>
  )
}

export const CreateBlogSubcategory = (props) => {
  return (
    <Create title='Blog Subcategory' {...props}>
      {BlogSubcategoryForm()}
    </Create>
  )
}
