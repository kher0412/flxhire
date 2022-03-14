import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import { TextArea, ExternalLink, FocusFadeGroup } from 'components'
import { Create } from '@material-ui/icons'
import RichTextDescription from '../../RichTextDescription'
import FormErrorHint from '../../FormErrorHint'
import styles from './CompanyDescriptionField.module.css'

export default class CompanyDescriptionField extends React.PureComponent {
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
    const { input, meta, editable } = this.props
    const { isEditorOpen } = this.state

    if (!input.value && !editable) {
      return null
    }

    return (
      <FocusFadeGroup focused={isEditorOpen}>
        <div className={styles.container}>
          {!isEditorOpen && (
            <div ref={div => this.previewWrapper = div}>
              <RichTextDescription
                style={{ marginTop: 24, display: 'inline-block', maxWidth: 'calc(100% - 72px)', boxSizing: 'border-box' }}
                text={input.value || 'About the company...'}
                contentStyle={input.value ? undefined : { opacity: 0.6 }}
              />

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
            <div className={styles['editor-wrapper']}>
              <TextArea
                autoFocus
                input={{ ...input, onBlur: this.handleTextAreaBlur }}
                meta={meta}
                label="About the company"
                placeholder="About the company..."
                style={{
                  width: 9999,
                  maxWidth: '100%',
                  minHeight: 180,
                  height: this.previewWrapperHeight - 31 || 'auto',
                }}
                data-cy={`job-${input.name}-input`}
              />

              <div className={styles['markdown-hint']}>
                You can use <ExternalLink href="https://en.wikipedia.org/wiki/Markdown#Example" label="markdown" showExternalIcon mouseDown /> to format contents.
              </div>
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

    // to make the "markdown" helper link clickable, the hide-on-blur mechanism has to be put on the end of the event loop
    window.setTimeout(() => {
      this.closeEditor()
    }, 0)
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
