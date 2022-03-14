import React from 'react'
import ReactMarkdown from 'react-markdown'
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'
import { TextArea, ResponsiveDialog } from 'components'
import styles from './MarkdownTextArea.module.css'
import { Help, Visibility } from '@material-ui/icons'

export default class MarkdownTextArea extends React.PureComponent {
  constructor(props, ctx) {
    super(props, ctx)

    this.state = {
      isPreviewDialogOpen: false,
      isHelpDialogOpen: false,
    }
  }

  render() {
    const { ...restProps } = this.props

    return (
      <div className={styles.container}>
        {this.renderHelpDialog()}
        {this.renderPreviewDialog()}

        <div className={styles['textarea-container']}>
          <TextArea {...restProps} />
        </div>

        <div className={styles['toolbar-container']}>
          <Tooltip title="Formatting help">
            <IconButton onClick={this.handleHelpDialogOpen}>
              <Help />
            </IconButton>
          </Tooltip>

          {this.renderPreviewButton()}
        </div>
      </div>
    )
  }

  renderPreviewButton() {
    const { input = {} } = this.props

    if (input.value) {
      return (
        <Tooltip title="Preview">
          <IconButton onClick={this.handlePreviewDialogOpen} className={styles['preview-button']}>
            <Visibility />
          </IconButton>
        </Tooltip>
      )
    }
  }

  renderHelpDialog() {
    if (this.state.isHelpDialogOpen) {
      return (
        <ResponsiveDialog open onClose={this.handleHelpDialogClose} fullWidth>
          <DialogTitle>
            Formatting help
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              This field supports Markdown formatting.
            </DialogContentText>

            <div className={styles['markdown-examples-container']}>
              {this.renderExample(
                'Paragraphs and headings',
                'Use hash to form a heading, separate paragraphs by an empty line:',
                '# Header\n\nFirst paragraph text.\n\nSecond paragraph text.',
              )}

              {this.renderExample(
                'Lists',
                'Form lists by using dash:',
                'Here is an example of a list:\n\n - First list item\n - Second list item',
              )}

              {this.renderExample(
                'Dividers',
                'Use 5 dashes to form a divider:',
                'First paragraph text.\n\n-----\n\nSecond paragraph text.',
              )}
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleHelpDialogClose}>
              Close
            </Button>
          </DialogActions>
        </ResponsiveDialog>
      )
    }
  }

  renderExample(title, text, example) {
    return (
      <Accordion>
        <AccordionSummary>
          {title}
        </AccordionSummary>

        <ExpansionPanelDetails>
          <div style={{ width: '100%' }}>
            <div className={styles['markdown-example-text']}>
              {text}
            </div>

            <TextArea
              disabled
              input={{ value: example }}
            />
          </div>
        </ExpansionPanelDetails>
      </Accordion>
    )
  }

  renderPreviewDialog() {
    const { input = {}, label } = this.props

    if (this.state.isPreviewDialogOpen) {
      return (
        <ResponsiveDialog open onClose={this.handlePreviewDialogClose} fullWidth>
          <DialogTitle>
            Preview ({label})
          </DialogTitle>

          <DialogContent>
            <div className={styles['preview-container']}>
              <ReactMarkdown source={input.value} />
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handlePreviewDialogClose}>
              Close
            </Button>
          </DialogActions>
        </ResponsiveDialog>
      )
    }
  }

  handleHelpDialogOpen = () => {
    this.setState({
      isHelpDialogOpen: true,
    })
  }

  handleHelpDialogClose = () => {
    this.setState({
      isHelpDialogOpen: false,
    })
  }

  handlePreviewDialogOpen = () => {
    this.setState({
      isPreviewDialogOpen: true,
    })
  }

  handlePreviewDialogClose = () => {
    this.setState({
      isPreviewDialogOpen: false,
    })
  }
}
