import React from 'react'
import { capitalize } from 'lodash'
import { TextField, IconButton, Tooltip } from '@material-ui/core'
import { TutorialBubble, FocusFadeGroup } from 'components'
import { FormValueInput, FormValueMeta, IJob } from 'types'
import { Create } from '@material-ui/icons'
import FormErrorHint from '../../FormErrorHint'
import styles from './JobTitleField.module.css'

interface IJobTitleFieldProps {
  input: FormValueInput<string>
  meta: FormValueMeta
  editable?: boolean
  hideTutorialBubble?: boolean
  status?: IJob['status']
}

export default class JobTitleField extends React.PureComponent<IJobTitleFieldProps, { isEditorOpen: boolean }> {
  state = {
    isEditorOpen: false,
  }

  container: HTMLDivElement

  render() {
    const { input: { value, onChange }, meta: { touched, error }, editable, hideTutorialBubble, status } = this.props
    const { isEditorOpen } = this.state
    const placeholder = editable ? 'Give your job a title' : 'Untitled job'
    const showStatus = status && status !== 'opened'

    return (
      <React.Fragment>
        <FocusFadeGroup focused={isEditorOpen}>
          <div className={styles.container} ref={div => this.container = div} style={isEditorOpen ? { marginBottom: 12 } : undefined}>
            {isEditorOpen && (
              <TextField
                autoFocus
                value={value}
                placeholder={placeholder}
                fullWidth
                multiline
                rowsMax={4}
                onChange={onChange}
                onBlur={this.handleBlur}
                style={{ maxWidth: 'calc(100% - 72px)' }}
                inputProps={{
                  'data-cy': 'job-title-input',
                  style: { fontSize: '32px', lineHeight: '32px' },
                }}
              />
            )}

            {!isEditorOpen && (
              <span style={value ? undefined : { opacity: 0.6 }}>
                {value || placeholder} {showStatus ? `(${capitalize(status)})` : ''}
              </span>
            )}

            {editable && (
              <TutorialBubble
                active={!hideTutorialBubble}
                message="Click the edit button to customize each section."
                style={{ display: 'inline-block' }}
              >
                <Tooltip title="Edit job title" placement="top">
                  <IconButton onClick={this.handleDialogOpen} className={styles['icon-button']} data-cy="job-title-open">
                    <Create />
                  </IconButton>
                </Tooltip>
              </TutorialBubble>
            )}
          </div>

          <FormErrorHint message={touched && error} />
        </FocusFadeGroup>
      </React.Fragment>
    )
  }

  handleBlur = (e) => {
    this.props.input.onBlur(e)

    this.setState({
      isEditorOpen: false,
    })
  }

  handleDialogOpen = () => {
    this.setState({
      isEditorOpen: true,
    })
  }

  handleDialogClose = () => {
    this.setState({
      isEditorOpen: false,
    })
  }
}
