import React from 'react'
import {
  List, Datagrid, TextField,
  ShowButton, Show, SimpleForm,
  EditButton, Edit,
  TextInput, Create
} from 'react-admin'

export const BlogCategoryList = (props) => (
  <List title='Blog Categories' {...props} bulkActionButtons={false}>
    <Datagrid>
      <TextField label='Name' source='name' />

      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowBlogCategory = (props) => {
  return (
    <div>
      <Show title='Blog Category' {...props} >
        <SimpleForm>
          <TextField label='Name' source='name' />
          <TextField label='Description' source='description' />
          <TextField label="Slug" source="slug" />
        </SimpleForm>
      </Show>
    </div>
  )
}

const BlogCategoryForm = () => {
  return (
    <SimpleForm>
      <TextInput label='Name' source='name' />
      <TextInput multiline label='Description' source='description' />
    </SimpleForm>
  )
}

export const EditBlogCategory = (props) => {
  return (
    <Edit title='Blog Category' {...props} undoable={false}>
      {BlogCategoryForm()}
    </Edit>
  )
}

export const CreateBlogCategory = (props) => {
  return (
    <Create title='Blog Category' {...props}>
      {BlogCategoryForm()}
    </Create>
  )
}
