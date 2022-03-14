import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Divider, Popover } from '@material-ui/core'
import { ExternalLink, MediaQuery } from 'components'
import { classList } from 'services/styles'
import TextArea, { ITextAreaProps } from '../TextArea/TextArea'
import styles from './MarkdownTextArea.module.css'

export interface IMarkdownTextAreaProps extends ITextAreaProps {
  markdownRenderer?: (source: string) => React.ReactNode
  markdownPreviewHeader?: React.ReactNode
}

export interface IMarkdownTextAreaState {
  isFocused: boolean
}

const MARKDOWN_HINT_URL = 'https://en.wikipedia.org/wiki/Markdown#Example'

export default class MarkdownTextArea extends React.PureComponent<IMarkdownTextAreaProps, IMarkdownTextAreaState> {
  containerElement: HTMLDivElement

  constructor(props: IMarkdownTextAreaProps) {
    super(props)

    this.state = {
      isFocused: false,
    }
  }

  render() {
    const { input, ...restProps } = this.props

    return (
      <div className={styles.container} ref={div => this.containerElement = div}>
        <div>
          <TextArea
            input={{
              ...input,
              onBlur: this.handleBlur,
            }}
            helperText={(
              <React.Fragment>
                You can use <ExternalLink href={MARKDOWN_HINT_URL} label="Markdown" showExternalIcon mouseDown /> to format contents.
              </React.Fragment>
            )}
            {...restProps as any}
            onFocus={this.handleFocus}
          />
        </div>

        <MediaQuery minWidth={1000}>
          {this.renderPreview()}
        </MediaQuery>
      </div>
    )
  }

  renderPreview() {
    const { input, markdownPreviewHeader } = this.props
    const { isFocused } = this.state

    if (isFocused && this.containerElement) {
      const inputValue = input?.value || ''
      const bounds = this.containerElement.getBoundingClientRect()

      if (inputValue) {
        return (
          <Popover
            open
            anchorEl={this.containerElement}
            disableAutoFocus
            disableEnforceFocus
            disableRestoreFocus
            disableScrollLock
            hideBackdrop
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              style: {
                transform: 'translateX(-12px)',
                pointerEvents: 'all',
              },
            }}
            style={{
              pointerEvents: 'none',
            }}
            BackdropProps={{
              style: {
                display: 'none',
                pointerEvents: 'none',
              },
            }}
          >
            <div style={{ maxWidth: bounds.left - 36 }}>
              <div className={classList(styles.previewCardContent, styles.previewCardHint)}>
                {markdownPreviewHeader || 'Markdown Preview'}
              </div>

              <Divider />

              <div className={styles.previewCardContent}>
                {this.renderMarkdown(inputValue)}
              </div>
            </div>
          </Popover>
        )
      }
    }

    return null
  }

  renderMarkdown(content: string) {
    const { markdownRenderer } = this.props

    if (markdownRenderer) {
      return markdownRenderer(content)
    }

    return (
      <ReactMarkdown source={content} />
    )
  }

  handleFocus = (e: React.FocusEvent<any>) => {
    this.setState({
      isFocused: true,
    })

    if (typeof this.props.onFocus === 'function') this.props.onFocus(e)
  }

  handleBlur = () => {
    this.setState({
      isFocused: false,
    })

    if (typeof this.props.input?.onBlur === 'function') this.props.input.onBlur()
  }
}
