import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { reduxForm } from 'redux-form'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { allReducers } from 'reducers'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import TimesheetForm from './TimesheetForm'
import FlexHireTheme from 'FlexHireTheme'

describe('<TimesheetForm />', () => {
  let handleSubmit, pristine, submitting, serverError, onSaveResponse, submitForm, store

  beforeEach(() => {
    store = createStore(combineReducers(allReducers))
    submitting = false
    pristine = true
    handleSubmit = fn => fn
    serverError = fn => fn
    onSaveResponse = Promise.resolve()
  })

  const buildForm = () => {
    submitForm = sinon.stub().returns(onSaveResponse)
    const props = {
      pristine: pristine,
      submitting: submitting,
      handleSubmit,
      serverError,
      submitForm: submitForm,
      contracts: [],
      totalHours: 10,
      start_time: '',
      timesheet: {
        timesheet_entries: {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
      },
      getContracts: f => f,
      getTimesheet: f => f,
      getTimesheets: f => f,
      fetchPayoneerStatus: f => f,
      setupPayoneer: f => f,
      match: {
        params: {
          id: 10,
        },
      },
    }

    const Decorated = reduxForm({
      form: 'testTimesheetForm',
    })(TimesheetForm)

    return shallow(
      <Provider store={store}>
        <ThemeProvider theme={FlexHireTheme}>
          <Decorated {...props} />
        </ThemeProvider>
      </Provider>
    )
  }

  it('mounts without error', () => {
    buildForm()
  })
})
