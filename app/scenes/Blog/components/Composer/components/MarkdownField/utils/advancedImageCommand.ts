import { pickAndStore } from 'services/filestack'
import { selectWord } from 'react-mde/lib/js/util/MarkdownUtil'
import { ExecuteOptions } from 'react-mde'

const ALT_TEXT_PLACEHOLDER = 'alt text'

export const advancedImageCommand = {
  name: 'image',
  buttonProps: { 'aria-label': 'Add image' },
  execute: async (options: ExecuteOptions) => {
    const api = options.textApi
    const state = options.textApi.getState()
    const newSelectionRange = selectWord({ text: state.text, selection: state.selection })
    const state1 = api.setSelectionRange(newSelectionRange)

    let imageUrl

    // Convert current selection to image (if any), or open image through filestack.
    if (state1.selectedText) {
      imageUrl = state1.selectedText
    } else {
      imageUrl = await new Promise(resolve => pickAndStore(null, file => resolve(file.url)))
    }

    api.replaceSelection(`![${ALT_TEXT_PLACEHOLDER}](${imageUrl})`)

    // Select alt-text portion.
    api.setSelectionRange({
      start: state1.selection.start + 2,
      end: state1.selection.start + 2 + ALT_TEXT_PLACEHOLDER.length,
    })
  },
  keyCommand: 'image',
}
