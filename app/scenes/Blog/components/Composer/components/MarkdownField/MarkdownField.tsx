import React from 'react'
import ReactMDE from 'react-mde'
import { FormValueInput, FormValueMeta } from 'types'
import { advancedImageCommand } from './utils/advancedImageCommand'
import styles from './MarkdownField.module.css'

// TODO: restore command list
/*
  commands.headerCommand,
  commands.boldCommand,
  commands.italicCommand,
  commands.strikeThroughCommand,
  advancedImageCommand,
  commands.linkCommand,
  commands.quoteCommand,
  commands.codeCommand,
  commands.unorderedListCommand,
  commands.orderedListCommand,
  commands.checkedListCommand,
  */

interface IMarkdownFieldProps {
  input: FormValueInput<string>
  meta: FormValueMeta
  onPreviewOpen?: () => void
}

export default class MarkdownField extends React.Component<IMarkdownFieldProps> {
  render() {
    let {
      input: { onChange, value } = {},
      meta: { touched, error } = {},
    } = this.props

    return (
      <div>
        <div className={styles['editor-container']} style={(touched && error) ? { borderColor: '#f44336' } : undefined}>
          <ReactMDE
            value={value}
            commands={{ image: advancedImageCommand }}
            selectedTab="write"
            onChange={onChange}
            generateMarkdownPreview={null}
            onTabChange={this.handleTabSwitch}
            minEditorHeight={window.innerHeight * 0.5}
            maxEditorHeight={window.innerHeight * 0.9}
          />
        </div>

        {touched && error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
      </div>
    )
  }

  handleTabSwitch = (tab) => {
    const { onPreviewOpen } = this.props

    if (tab === 'preview' && onPreviewOpen) {
      onPreviewOpen()
    }
  }
}
