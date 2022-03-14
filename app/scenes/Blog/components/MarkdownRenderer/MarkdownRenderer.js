import React from 'react'
import ReactMarkdown from 'react-markdown'
import ReactSyntaxHighlighter from 'react-syntax-highlighter'
// Note: for the syntax highlighter styles, we use cjs not esm modules
// See https://github.com/conorhastings/react-syntax-highlighter/issues/230 for why
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'
import styles from './MarkdownRenderer.module.css'

export default class MarkdownRenderer extends React.PureComponent {
  render() {
    return (
      <div className={styles['text-description']}>
        {this.renderTitle()}

        <div className={styles.content}>
          {this.renderText()}
        </div>
      </div>
    )
  }

  renderText() {
    const { text } = this.props

    if (!text || !text.replace(' ', '')) {
      return (
        <div className={styles.placeholder}>
          Post content is empty.
        </div>
      )
    }

    if (typeof text === 'string' && text) {
      return (
        <ReactMarkdown
          source={text}
          renderers={{
            list: props => (
              <List style={{ marginBottom: 24 }}>
                {props.children}
              </List>
            ),
            listItem: props => (
              <ListItem style={{ paddingLeft: 12 }}>
                <ListItemIcon className={styles['content-list-item-icon']}>
                  <ChevronRight />
                </ListItemIcon>

                <ListItemText primary={<span className={styles['content-list-item-text']}>{props.children}</span>} />
              </ListItem>
            ),
            code: props => (
              <ReactSyntaxHighlighter
                customStyle={{ background: 'none', backgroundColor: 'transparent' }}
                style={vs}
              >
                {props.value}
              </ReactSyntaxHighlighter>
            ),
          }}
        />
      )
    }

    return text
  }

  renderTitle() {
    const { title } = this.props

    if (title) {
      return (
        <h3 className={styles.title}>
          {title}
        </h3>
      )
    }

    return null
  }
}
