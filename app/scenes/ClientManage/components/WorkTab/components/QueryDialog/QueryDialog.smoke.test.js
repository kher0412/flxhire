import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { reduxForm } from 'redux-form'
import { shallow } from 'enzyme'
import { createStore, combineReducers } from 'redux'
import { allReducers } from 'reducers'
import { Provider } from 'react-redux'
import sinon from 'sinon'
import FlexHireTheme from 'FlexHireTheme'
import QueryDialog from './QueryDialog'

describe('<QueryDialog />', () => {
  let handleSubmit; let pristine; let submitting; let serverError; let onSaveResponse; let
    submitForm
  beforeEach(() => {
    submitting = false
    pristine = true
    handleSubmit = fn => fn
    serverError = fn => fn
    onSaveResponse = Promise.resolve()
  })
  const store = createStore(combineReducers(allReducers))

  const buildForm = () => {
    submitForm = sinon.stub().returns(onSaveResponse)
    const props = {
      pristine: pristine,
      submitting: submitting,
      handleSubmit,
      serverError,
      submitForm: submitForm,
      open: false,
      closeDialog: f => f,
      timesheet: { freelancer_name: 'freelancer name' },
    }
    const Decorated = reduxForm({
      form: 'testQueryDialog',
    })(QueryDialog)

    return shallow(
      <Provider store={store}>
        <ThemeProvider theme={FlexHireTheme}>
          <Decorated {...props} />
        </ThemeProvider>
      </Provider>,
    )
  }
  it('mounts without error', () => {
    buildForm()
  })
})
