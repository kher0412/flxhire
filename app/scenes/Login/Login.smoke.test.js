import Login from './Login'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('<Login />', () => {
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
      router: {
        asPath: '/login',
      }
    }

    return shallow(
      <Login {...props} />
    )
  }

  it('mounts without error', () => {
    buildForm()
  })
})
