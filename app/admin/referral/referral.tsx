import React from 'react'
import {
  List, Datagrid, TextField,
  ShowButton,
  Show,
  SimpleForm,
  EditButton,
  Edit,
  Create,
  TextInput,
  ReferenceField,
  ReferenceInput,
  ListButton,
  AutocompleteInput,
  ReferenceManyField,
  ReferenceArrayField,
  ArrayField,
  NumberField,
  Filter,
  BooleanInput,
  TopToolbar,
} from 'react-admin'
import PayReferralButton from './PayReferral/PayReferralButton'

const ReferralFilter = props => (
  <Filter {...props}>
    <TextInput source="token" />
    <ReferenceInput label="Job" source="job_id" reference="jobs" allowEmpty>
      <AutocompleteInput optionText="title" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput label="Referer" source="referer_id" reference="users" allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <ReferenceInput label="User" source="user_id" reference="users" allowEmpty>
      <AutocompleteInput optionText="name" optionalValue="id" />
    </ReferenceInput>
    <BooleanInput source="has_contracts" />
  </Filter>
)

export const ReferralList = props => (
  <List
    title="Referrals"
    filters={<ReferralFilter />}
    bulkActionButtons={false}
    {...props}
  >
    <Datagrid>
      <TextField label="Token" source="token" />
      <ReferenceField label="Referer" source="referer_id" reference="users" sortable={false}>
        <TextField source="name" />
      </ReferenceField>
      <TextField label="Type" source="type" />
      <ReferenceField label="User" source="user_id" reference="users" sortable={false}>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Job" source="job_id" reference="jobs" sortable={false}>
        <TextField source="full_title" />
      </ReferenceField>
      <NumberField source="contract_count" sortable={false} />
      <TextField source="profit" sortable={false} />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

export const ShowReferral = props => (
  <div>
    <Show title="Referral" {...props}>
      <SimpleForm>
        <TextField label="Type" source="type" />
        <TextField label="Token" source="token" />
        <ReferenceField label="Referer" source="referer_id" reference="users" sortable={false}>
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="User" source="user_id" reference="users" sortable={false} link="show">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="Job" source="job_id" reference="jobs" sortable={false} link="show">
          <TextField source="full_title" />
        </ReferenceField>
        <TextField source="profit" sortable={false} />
        <ReferenceManyField label="Invitations" reference="invitations" target="referral_id">
          <Datagrid>
            <ReferenceField label="Member" source="user_id" reference="users" link="show">
              <TextField source="name" />
            </ReferenceField>
            <TextField source="status" />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceArrayField label="Contracts" reference="contracts" source="contracts_ids">
          <Datagrid>
            <ReferenceField label="Member" source="freelancer_id" reference="users" link="show">
              <TextField source="name" />
            </ReferenceField>
            <TextField source="status" />
            <ShowButton />
          </Datagrid>
        </ReferenceArrayField>
        <ArrayField label="Payments" source="payments">
          <Datagrid>
            <ReferenceField label="Referred User" source="user_id" reference="users" link="show">
              <TextField source="name" />
            </ReferenceField>
            <TextField source="profit" />
            <TextField source="status" />
            <TextField source="created_at" />
          </Datagrid>
        </ArrayField>
      </SimpleForm>
    </Show>
  </div>
)

const EditActions: any = ({ basePath, data }) => (
  <TopToolbar>
    <ShowButton basePath={basePath} record={data} />
    <PayReferralButton record={data} />
    <ListButton basePath={basePath} />
  </TopToolbar>
)

export const EditReferral = props => (
  <Edit title="Edit Referral" {...props} actions={<EditActions />} undoable={false}>
    <SimpleForm>
      <TextInput label="Token" source="token" placeholder="Leave empty to generate" />
      <ReferenceInput label="Referer" source="referer_id" reference="users" allowEmpty>
        <AutocompleteInput optionText="name" optionalValue="id" />
      </ReferenceInput>
      <ReferenceInput label="User" source="user_id" reference="users" allowEmpty>
        <AutocompleteInput optionText="name" optionalValue="id" />
      </ReferenceInput>
      <ReferenceInput label="Job" source="job_id" reference="jobs" allowEmpty>
        <AutocompleteInput optionText="full_title" optionalValue="id" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
)

export const CreateReferral = props => (
  <Create title="Create Referral" {...props}>
    <SimpleForm>
      <TextInput label="Token" source="token" placeholder="Leave empty to generate" />
      <ReferenceInput label="Referer" source="referer_id" reference="users" filter={{ role: 'member' }} allowEmpty>
        <AutocompleteInput optionText="name" optionalValue="id" />
      </ReferenceInput>
      <ReferenceInput label="User" source="user_id" reference="users" filter={{ role: 'member' }} allowEmpty>
        <AutocompleteInput optionText="name" optionalValue="id" />
      </ReferenceInput>
      <ReferenceInput label="Job" source="job_id" reference="jobs" allowEmpty>
        <AutocompleteInput optionText="full_title" optionalValue="id" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
)
