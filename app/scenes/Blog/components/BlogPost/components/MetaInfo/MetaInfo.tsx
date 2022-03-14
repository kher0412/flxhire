import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { Grid, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core'
import { browserHistory } from 'services/router'
import { MoreButtonDialog, ShareWidget, UserAvatar } from 'components'
import { formatAsDate } from 'services/formatting'
import { IBlogPost } from 'types'
import { Share } from '@material-ui/icons'
import styles from './MetaInfo.module.css'

export default class MetaInfo extends React.Component<{ blogPost: IBlogPost }> {
  render() {
    const { blogPost } = this.props

    return (
      <div className={styles.container}>
        <MediaQuery maxWidth={900}>
          <List>
            <ListItem button onClick={this.handleAuthorClick}>
              <ListItemAvatar>
                {this.renderAvatar(blogPost?.author_avatar_url, blogPost?.author_name)}
              </ListItemAvatar>

              <ListItemText
                primary={this.getPostedByTitle()}
                secondary={`on ${formatAsDate(blogPost?.post_date)}`}
              />

              <ListItemSecondaryAction>
                <MoreButtonDialog icon={<Share />} dialogTitle="Share Article...">
                  <ShareWidget />
                </MoreButtonDialog>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </MediaQuery>

        <MediaQuery minWidth={901}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem button onClick={this.handleAuthorClick}>
                  <ListItemAvatar>
                    {this.renderAvatar(blogPost?.author_avatar_url, blogPost?.author_name)}
                  </ListItemAvatar>

                  <ListItemText
                    primary={this.getPostedByTitle()}
                    secondary={`on ${formatAsDate(blogPost?.post_date)}`}
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className={styles.share}>
                <div className={styles.shareWrapper}>
                  <ShareWidget />
                </div>
              </div>
            </Grid>
          </Grid>
        </MediaQuery>
      </div>
    )
  }

  getPostedByTitle() {
    const { blogPost } = this.props

    if (blogPost?.status === 'approved' || blogPost?.status === 'published') {
      return `Posted by ${blogPost?.author_name}`
    }
    return `Draft by ${blogPost?.author_name}`
  }

  renderAvatar(url, name) {
    return <UserAvatar url={url} name={name} />
  }

  handleAuthorClick = (e) => {
    const { blogPost } = this.props

    e.preventDefault()
    browserHistory.push('/[...slugs]', `/${blogPost.author_slug}`)
  }
}
