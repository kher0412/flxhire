import React from 'react'
import { IconButton, Tooltip, TextField } from '@material-ui/core'
import { ExternalLink, FocusFadeGroup } from 'components'
import { Create } from '@material-ui/icons'
import FormErrorHint from '../../FormErrorHint'
import styles from './CompanyWebsiteField.module.css'

export default class CompanyWebsiteField extends React.PureComponent {
  static defaultProps = {
    input: {},
    meta: {},
  }

  state = {
    isEditorOpen: false,
  }

  componentDidMount() {
    this.forceUpdate()
  }

  render() {
    const { input, meta, editable, label } = this.props
    const { isEditorOpen } = this.state

    if (!input.value && !editable) {
      return null
    }

    return (
      <FocusFadeGroup focused={isEditorOpen}>
        <div className={styles.container} ref={div => this.container = div}>
          {!isEditorOpen && (
            <div ref={div => this.previewWrapper = div}>
              <div style={{ marginRight: 12, display: 'inline-block' }}>
                {input.value && (
                  <ExternalLink href={input.value} label={input.value} />
                )}

                {!input.value && (
                  <span style={{ opacity: 0.5 }}>Company website</span>
                )}
              </div>

              {editable && (
                <Tooltip title="Edit this section" placement="right">
                  <IconButton onClick={this.handleDialogOpenToggle} className={styles['icon-button']} data-cy={`job-${input.name}-open`}>
                    <Create />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          )}

          {isEditorOpen && (
            <div>
              <TextField
                autoFocus
                value={input.value}
                onChange={input.onChange}
                onBlur={this.handleTextAreaBlur}
                label={label}
                placeholder="Company website"
                className={styles.input}
                data-cy={`job-${input.name}-input`}
              />
            </div>
          )}

          {(!isEditorOpen) && (
            <FormErrorHint message={meta.touched && meta.error} />
          )}
        </div>
      </FocusFadeGroup>
    )
  }

  handleTextAreaBlur = (e) => {
    this.props.input.onBlur(e)
    this.closeEditor()
  }

  handleDialogOpenToggle = () => {
    if (this.state.isEditorOpen) {
      this.closeEditor()
    } else {
      if (this.previewWrapper) {
        this.previewWrapperHeight = this.previewWrapper.clientHeight
      }

      this.setState({
        isEditorOpen: true,
      })
    }
  }

  closeEditor() {
    this.setState({
      isEditorOpen: false,
    })
  }
}
