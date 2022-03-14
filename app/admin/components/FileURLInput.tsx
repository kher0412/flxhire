import { Component } from 'react'
import { Field } from 'react-final-form'
import { pickAndStore } from 'services/filestack'
import { Avatar } from '@material-ui/core'
import { IFreelancerType } from 'types'

export interface IFileURLInputProps {
  source: string
  label: string
  creatable?: boolean
  disabled?: boolean
  record?: IFreelancerType
}

export interface IFileURLInputState {
}

export default class FileURLInput extends Component<IFileURLInputProps, IFileURLInputState> {
  render() {
    const { label, source, record, disabled } = this.props

    if (disabled) {
      return (
        <Avatar src={record?.icon_url} />
      )
    }

    return (
      <div>
        <Field
          label={label}
          name={source}
          component={({ input }) => (
            <div
              style={{ cursor: 'pointer', display: 'inline-block' }}
              role="button"
              onClick={() => pickAndStore(null, file => input.onChange(file.url))}
            >
              <Avatar src={input.value} />
            </div>
          )}
        />
      </div>
    )
  }
}
