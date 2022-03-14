import React from 'react'
import { browserHistory } from 'services/router'
import { Grid, Card, CardHeader, CardContent, Chip } from '@material-ui/core'
import { ConfirmButton } from 'components'
import { Button } from 'components/themed'
import { isMember } from 'services/user'
import { FormValueInput, IBlogPost } from 'types'
import { Create, Delete, Visibility, VisibilityOff } from '@material-ui/icons'
import AddBlogPosts from './components/AddBlogPosts'
import TabPlaceholder from '../../TabPlaceholder'
import styles from './BlogPostsField.module.css'
import { ContainerProps } from './BlogPostsFieldContainer'

interface IBlogPostsFieldProps extends ContainerProps {
  input: FormValueInput<IBlogPost[]>
  editable?: boolean
}

export default class BlogPostsField extends React.PureComponent<IBlogPostsFieldProps> {
  render() {
    const { input: { value: blogPosts = [] }, editable, user } = this.props
    const isProfileCreationMode = user && isMember(user) && user.status === 'pending'

    return (
      <div className={styles.container}>
        <Grid container spacing={2}>
          {blogPosts.map(blogPost => (
            <Grid key={blogPost.id} item xs={12} md={6}>
              {this.renderBlogPostItem(blogPost)}
            </Grid>
          ))}
        </Grid>

        {blogPosts.length === 0 && (
          <TabPlaceholder
            title="No articles posted yet"
          />
        )}

        {editable && (
          <AddBlogPosts isProfileCreationMode={isProfileCreationMode} />
        )}
      </div>
    )
  }

  renderBlogPostItem(blogPost) {
    const { editable } = this.props
    const isPublished = blogPost.status === 'published' || blogPost.status === 'approved'

    return (
      <Card
        className={styles.card}
        data-cy={`blog-post-${blogPost.id}`}
        style={blogPost.status === 'draft' ? { opacity: 0.9 } : undefined}
      >
        <CardHeader
          style={editable ? { marginTop: -6 } : undefined}
          title={(
            <div className={styles.title} data-cy="title">
              {blogPost.status === 'draft' && (
                <Chip label="Draft" style={{ marginRight: 12 }} />
              )}

              {blogPost.title}
            </div>
          )}
          action={editable && (
            <React.Fragment>
              <ConfirmButton
                icon
                tooltip={isPublished ? 'Post is public - click to revert it to private draft' : 'Post is private draft - click to publish it'}
                dialogTitle="Toggle visibility"
                dialogMessage={isPublished ? 'This will hide your post from the public. Continue?' : 'This will publish your post to the public. Continue?'}
                onClick={() => this.handleVisibilityToggleClick(blogPost, !isPublished)}
                data-cy="toggle-visibility"
              >
                {isPublished ? <Visibility /> : <VisibilityOff />}
              </ConfirmButton>

              <ConfirmButton
                icon
                tooltip="Edit blog post"
                dialogTitle="Edit blog post"
                dialogMessage="You will now be redirected to the blog post editor page. Unsaved changes to the profile will be lost. Continue?"
                onClick={() => this.handleEditClick(blogPost)}
                data-cy="edit-post"
              >
                <Create />
              </ConfirmButton>

              <ConfirmButton
                icon
                tooltip="Delete blog post"
                dialogTitle="Delete blog post"
                dialogMessage="Delete this blog post? This cannot be undone."
                onClick={() => this.handleDeleteClick(blogPost)}
                critical
              >
                <Delete />
              </ConfirmButton>
            </React.Fragment>
          )}
        />

        <CardContent className={styles['card-content']}>
          <div className={styles.description} data-cy="description">
            {this.renderExcerpt(blogPost)}
          </div>

          <Button variant="outlined" color="primary" onClick={() => this.handleItemClick(blogPost)}>
            Read Article
          </Button>
        </CardContent>
      </Card>
    )
  }

  renderExcerpt(blogPost) {
    if (blogPost.excerpt && blogPost.excerpt.length > 100) {
      return `${blogPost.excerpt.substring(0, 100)}...`
    }

    return blogPost.excerpt
  }

  handleVisibilityToggleClick = (blogPost, isPublished) => {
    const { input, onSetBlogPostVisibility } = this.props
    const id = blogPost.id
    const blogPosts = (input.value || [])
    const blogPostIndex = blogPosts.findIndex(_blogPost => _blogPost.id === id)

    const newBlogPosts = blogPosts.slice()
    newBlogPosts.splice(blogPostIndex, 1, { ...blogPost, status: isPublished ? 'published' : 'draft' })

    input.onChange(newBlogPosts)

    onSetBlogPostVisibility(blogPost.id, isPublished)
  }

  handleDeleteClick = (blogPost) => {
    const { input, onDeleteBlogPost } = this.props
    const id = blogPost.id
    const blogPosts = (input.value || [])
    const blogPostIndex = blogPosts.findIndex(_blogPost => _blogPost.id === id)

    const newBlogPosts = blogPosts.slice()
    newBlogPosts.splice(blogPostIndex, 1)

    input.onChange(newBlogPosts)
    onDeleteBlogPost(blogPost.id)
  }

  handleEditClick = (blogPost) => {
    browserHistory.push('/blog/[category]/[post]/edit', `/blog/${blogPost.blog_category_slug}/${blogPost.slug}/edit`)
  }

  handleItemClick = (blogPost) => {
    browserHistory.push('/blog/[category]/[post]', `/blog/${blogPost.blog_category_slug}/${blogPost.slug}`)
  }
}
