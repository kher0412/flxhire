import React from 'react'
import moment from 'moment'
import {
  List, Datagrid, TextField,
  ShowButton,
  Show,
  SimpleForm,
  TabbedForm,
  FormTab,
  EditButton,
  Edit,
  Create,
  SelectInput,
  TextInput,
  BooleanInput,
  Filter,
  DateField,
  ReferenceField,
  BooleanField,
  ListButton,
  NumberInput,
  DateInput,
  DateTimeInput,
  TopToolbar,
} from 'react-admin';
import { AddToCalendar } from 'components';

const statusChoices = [
  { id: 'available', name: 'Available' },
  { id: 'booked', name: 'Booked' },
  { id: 'postponed', name: 'Postponed' },
  { id: 'failed', name: 'Failed' },
  { id: 'passed', name: 'Passed' },
  { id: 'deleted', name: 'Deleted' },
]

const ScreeningInterviewFilter = props => (
  <Filter {...props}>
    <SelectInput label="Status" source="status" choices={statusChoices} />
    <TextInput label="User" source="q" />
    <DateInput label="After Date" source="after" />
    <DateInput label="Before Date" source="before" />
  </Filter>
)

export const ScreeningInterviewList = props => (
  <List
    title="Screening Interview Slots"
    filters={<ScreeningInterviewFilter />}
    sort={{ field: 'datetime', order: 'ASC' }}
    {...props}
  >
    <Datagrid>
      <DateField label="Datetime" source="datetime" showTime />
      <BooleanField label="Bookable" source="bookable?" sortable={false} />
      <TextField label="Status" source="status" />
      <TextField label="Reason" source="reason" />
      <TextField label="Internal Reason" source="internal_reason" />
      <ReferenceField label="User" source="user_id" reference="users" allowEmpty sortable={false}>
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
)

const AddToCalendarField = ({ record = {} }) => {
  if (!record.datetime) return null
  const startTime = moment(record.datetime).format()
  const endTime = moment(record.datetime).add(1, 'hour').format()
  const title = `Flexhire Screening Interview with ${record.name}`
  const { id } = record
  const description = `more information at ${process.env.ROOT_URL}/admin#screening_interviews/${id}/show`
  return (
    <AddToCalendar
      variant="contained"
      color="primary"
      startTime={startTime}
      endTime={endTime}
      title={title}
      description={description}
    />
  )
}

export const ShowScreeningInterview = props => (
  <div>
    <Show title="Screening Interview Slot" {...props}>
      <SimpleForm>
        <DateField label="Datetime" source="datetime" showTime />
        <BooleanField label="Bookable" source="bookable?" />
        <TextField label="Status" source="status" />
        <TextField label="Reason" source="reason" />
        <TextField label="Internal Reason" source="internal_reason" />
        <ReferenceField label="User" source="user_id" reference="users" allowEmpty sortable={false}>
          <TextField source="name" />
        </ReferenceField>
        <AddToCalendarField />
      </SimpleForm>
    </Show>
  </div>
)

const EditActions = ({ basePath, data }) => (
  <TopToolbar>
    <ShowButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} />
  </TopToolbar>
)

const defaultEditScreeningInterview = {
  update_freelancer_status: true,
}

export const EditScreeningInterview = props => (
  <Edit title="Edit Screening Interview Slot" {...props} actions={<EditActions />} undoable={false}>
    <SimpleForm initialValues={defaultEditScreeningInterview}>
      <DateTimeInput label="Interview Start" source="datetime" />
      <SelectInput label="Status" source="status" choices={statusChoices} />
      <BooleanInput label="Automatically Accept/Reject Member" source="update_freelancer_status" />
      <TextInput label="Reason" source="reason" />
      <TextInput label="Internal Reason" source="internal_reason" />
      <ReferenceField label="User" source="user_id" reference="users" allowEmpty sortable={false}>
        <TextField source="name" />
      </ReferenceField>
      <AddToCalendarField />
    </SimpleForm>
  </Edit>
)

const defaultNewScreeningInterview = () => {
  const datetime = moment().add(3, 'days').hours(9).minutes(0)
    .seconds(0)
  return {
    datetime: datetime.format(),
    status: 'available',
    // Bulk
    bulk: false,
    start_date: datetime.format('YYYY-MM-DD'),
    end_date: datetime.format('YYYY-MM-DD'),
    start_hour: 9,
    end_hour: 18,
    timezone_adjust: moment().format('Z'),
    hours_between_slots: 1,
    overlap: 1,
  }
}

export const CreateScreeningInterview = props => (
  <Create title="Create Screening Interview Slot" {...props}>
    <TabbedForm initialValues={defaultNewScreeningInterview()}>
      <FormTab label="Single Slot">
        <DateTimeInput label="Interview Start" source="datetime" />
        <TextInput disabled label="Your Timezone" source="timezone_adjust" />
        <SelectInput label="Status" source="status" choices={statusChoices} />
      </FormTab>
      <FormTab label="Bulk Create">
        <SelectInput label="Status" source="status" choices={statusChoices} />
        <DateInput label="Start Date" source="start_date" />
        <DateInput label="End Date" source="end_date" />
        <TextInput disabled label="Your Timezone" source="timezone_adjust" />
        <NumberInput label="Start Hour" source="start_hour" />
        <NumberInput label="End Hour" source="end_hour" />
        <NumberInput label="Hours Between Slots" source="hours_between_slots" />
        <TextInput disabled label="Concurrent Slots" source="overlap" />
        <BooleanInput label="Enable Bulk Create" source="bulk" />
      </FormTab>
    </TabbedForm>
  </Create>
)
