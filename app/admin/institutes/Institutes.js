import React from 'react';
import {
    List, Create, Datagrid, TextField,
    ShowButton, Show, SimpleForm,
    EditButton, Edit, SelectInput,
    DateField, TextInput, BooleanInput,
    NumberInput, DateInput
  } from 'react-admin';

  export const InstitutesList = props => (
    <List title="Institutes" {...props} bulkActionButtons={false} sort={{ field: 'world_rank', order: 'ASC' }}>
      <Datagrid>
        <TextField source="name" sortable={true} />
        <TextField source="world_rank" />
        <TextField source="national_rank" />
        <TextField source="ranking_year" />
        <TextField source="country" />
        <TextField source="continent" />
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  );

  export const EditInstitute = props => (
    <Edit title="Institute" {...props} >
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="world_rank" />
        <TextInput source="national_rank" />
        <TextInput source="ranking_year" />
        <TextInput source="country" />
        <TextInput source="continent" />
      </SimpleForm>
    </Edit>
  )

  export const CreateInstitute = props => (
    <Create {...props}>
      <SimpleForm >
        <TextInput source="name" />
        <TextInput source="world_rank" />
        <TextInput source="national_rank" />
        <TextInput source="ranking_year" />
        <TextInput source="country" />
        <TextInput source="continent" />
      </SimpleForm>
    </Create>
  );
