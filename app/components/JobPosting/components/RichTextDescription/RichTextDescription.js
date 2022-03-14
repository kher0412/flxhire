import React from 'react'
import ReactMarkdown from 'react-markdown'
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import styles from './RichTextDescription.module.css'

export default class RichTextDescription extends React.PureComponent {
  render() {
    const { text, title, contentStyle, ...restProps } = this.props

    if (!text) {
      return null
    } if (typeof text === 'string' && !text.replace(' ', '')) {
      return null
    }

    return (
      <div className={styles['text-description']} {...restProps}>
        {this.renderTitle()}

        <div className={styles.content} style={contentStyle}>
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
                  <DoneIcon />
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
