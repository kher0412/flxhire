import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { reduxForm } from 'redux-form'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import FlexHireTheme from 'FlexHireTheme'
import CompanyForm from './CompanyForm'

describe('<CompanyForm />', () => {
  let handleSubmit; let pristine; let submitting; let serverError; let onSaveResponse; let
    submitForm
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
    })(CompanyForm)

    return shallow(
      <ThemeProvider theme={FlexHireTheme}>
        <Decorated {...props} />
      </ThemeProvider>,
    )
  }
  it('mounts without error', () => {
    buildForm()
  })
})
