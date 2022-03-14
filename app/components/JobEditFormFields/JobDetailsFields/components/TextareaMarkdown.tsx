import React from 'react'
import { Divider } from '@material-ui/core'
import { Button } from 'components/themed'
import RichTextDescription from 'components/JobPosting/components/RichTextDescription'
import { Visibility } from '@material-ui/icons'

const TextareaMarkdown = ({ content, handlePreviewOpen }: { content: string, handlePreviewOpen: () => void}) => {
  return (
    <React.Fragment>
      <RichTextDescription text={content} style={{ padding: 0, margin: 0 }} />

      <Divider style={{ margin: '24px -24px' }} />

      <div>
        <Button color="secondary" onMouseDown={handlePreviewOpen} style={{ marginLeft: 'auto' }}>
          <Visibility /> Preview in full
        </Button>
      </div>
    </React.Fragment>
  )
}

export default TextareaMarkdown
