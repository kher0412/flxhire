import React from 'react'
import { Button } from 'components/themed'
import { getShortName } from 'services/form'
import { pickAndStore } from 'services/filestack'
import { FormValueInput, FormValueMeta, IJob } from 'types'
import { Assignment, AssignmentTurnedIn } from '@material-ui/icons'

interface IResumeUploadFieldState {
  input: FormValueInput<string>
  meta: FormValueMeta
}

export default class ResumeUploadField extends React.PureComponent<IResumeUploadFieldState> {
  openDialog = () => {
    const { input: { onChange } } = this.props

    pickAndStore(
      {
        accept: ['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      },
      file => onChange(file.url),
    )
  }

  render() {
    const { input: { value, name }, meta } = this.props

    const shortName = getShortName(name)

    return (
      <React.Fragment>
        <Button onClick={this.openDialog} data-cy={`document-upload-button-${shortName}`}>
          {value ? <AssignmentTurnedIn /> : <Assignment />}
          {value ? 'Resume/CV Selected' : 'Upload Resume/CV (Optional)'}
        </Button>
        {meta.touched && meta.error && <span style={{ color: 'red' }}>{meta.error}</span>}
      </React.Fragment>
    )
  }
}
