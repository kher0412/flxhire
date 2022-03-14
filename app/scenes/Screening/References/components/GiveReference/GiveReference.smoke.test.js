import ThemeProvider from '@material-ui/styles/ThemeProvider'
import React from 'react'
import { shallow } from 'enzyme'

import sinon from 'sinon'
import GiveReference from './GiveReference'
import FlexHireTheme from 'FlexHireTheme'

describe('<GiveReference />', () => {
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
      formAction: fn => fn,
      user: { name: 'test name user' },
      getUser: fn => fn,
      router: {
        asPath: '/complete_reference?user_id=10&complete_reference_token=test',
      },
    }

    return shallow(
      <ThemeProvider theme={FlexHireTheme}>
        <GiveReference {...props} />
      </ThemeProvider>,
    )
  }
  it('mounts without error', () => {
    const form = buildForm()
    form.find('GiveReference').shallow()
  })
})
