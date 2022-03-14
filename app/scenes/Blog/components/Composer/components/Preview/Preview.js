import React from 'react'
import { DialogContent, DialogTitle, DialogActions } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { Button } from 'components/themed'
import MarkdownRenderer from '../../../MarkdownRenderer/MarkdownRenderer'

class Preview extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { isOpen } = this.props

    // Only update when opening, closing, or remaining open.
    return (isOpen || nextProps.isOpen)
  }

  render() {
    return (
      <div>
        {this.renderDialog()}
      </div>
    )
  }

  renderDialog() {
    const { isOpen, title = '', content = '' } = this.props

    if (isOpen) {
      return (
        <ResponsiveDialog
          open
          onClose={this.handleClose}
          scroll="paper"
          maxWidth="md"
        >
          <DialogTitle>
            {title || 'No title'} (preview)
          </DialogTitle>

          <DialogContent>
            <MarkdownRenderer text={content} />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleClose}>
              Close
            </Button>

            <Button color="primary" onClick={this.handlePublishClick}>
              Publish
            </Button>
          </DialogActions>
        </ResponsiveDialog>
      )
    }

    return null
  }

  handlePublishClick = () => {
    const { onPublish, onClose } = this.props

    if (onPublish) {
      onPublish()
    }

    if (onClose) {
      onClose()
    }
  }

  handleClose = () => {
    const { onClose } = this.props

    if (onClose) {
      onClose()
    }
  }
}

export default Preview
