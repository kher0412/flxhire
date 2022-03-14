import ReferenceForm from './ReferenceForm'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { reduxForm } from 'redux-form'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import FlexHireTheme from 'FlexHireTheme'

describe('<ReferenceForm />', () => {
  let handleSubmit, pristine, submitting, serverError, onSaveResponse, submitForm
  beforeEach(() => {
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
      timeline_entries: [],
    }
    const Decorated = reduxForm({
      form: 'testEducationForm',
    })(ReferenceForm)

    return shallow(
      <ThemeProvider theme={FlexHireTheme}>
        <Decorated {...props} />
      </ThemeProvider>
    )
  }
  it('mounts without error', () => {
    buildForm()
  })
})
