import React from 'react'
import ReactMarkdown from 'react-markdown'
import { List, ListItem, ListItemText, ListItemIcon, IconButton } from '@material-ui/core'
import { Create, Done } from '@material-ui/icons'
import styles from './JobDescriptionMarkdownRenderer.module.css'

export default class JobDescriptionMarkdownRenderer extends React.PureComponent {
  render() {
    const { text } = this.props

    if (!text) {
      return null
    } if (typeof text === 'string' && !text.replace(' ', '')) {
      return null
    }

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

    if (typeof text === 'string') {
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
                  <Done />
                </ListItemIcon>

                <ListItemText primary={<span className={styles['content-list-item-text']}>{props.children}</span>} />
              </ListItem>
            ),
          }}
        />
      )
    }
    return text
  }

  renderTitle() {
    const { title, editable } = this.props

    if (title) {
      return (
        <h3 className={styles.title}>
          {title}

          {editable && (
            <IconButton onClick={this.handleDialogOpen} style={{ marginLeft: 12 }}>
              <Create />
            </IconButton>
          )}
        </h3>
      )
    }

    return null
  }
}
