import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Link'
import { Grid, Button } from '@material-ui/core'
import { LoadingPage, PageContainer, PageWrapper, PagePlaceholder } from 'components'
import BlogPostItem from './components/BlogPostItem'
import Placeholder from './components/Placeholder'
import Header from '../Header'
import styles from './BlogPostList.module.css'

export default class BlogPostList extends React.Component {
  static propTypes = {
    category: PropTypes.object,
    blogPosts: PropTypes.arrayOf(PropTypes.object),
  }

  componentDidMount() {
    const { router, getBlogCategory, getPostsForCategory } = this.props

    getBlogCategory(router.query.category)
    getPostsForCategory(router.query.category)
  }

  render() {
    const {
      blogPosts = [],
      blogPostsReceived = false,
      category = {},
      categoryReceived = false,
      canCreatePost = false,
    } = this.props

    if (!process.env.FLEXHIRE_ENABLE_BLOG) {
      return (
        <Header>
          <PagePlaceholder
            raised
            title="Not found"
          />
        </Header>
      )
    }

    if (!blogPostsReceived || !categoryReceived) {
      return (
        <div>
          <Header>
            <h1>Welcome to the Flexhire blog</h1>

            <div style={{ marginBottom: 24 }}>
              Where Flexhire and our members from all around the world share their expertise on technology, recruitment and more.
            </div>

            {canCreatePost && (
              <div>
                <div className={styles.actions}>
                  <Link href="/blog/create-post" style={{ textDecoration: 'none' }}>
                    <Button variant="contained">
                      Create New Post
                    </Button>
                  </Link>
                </div>

                <div className={styles['my-posts']}>
                  <Link href="/blog/my-posts">
                    My posts
                  </Link>
                </div>
              </div>
            )}
          </Header>

          <LoadingPage />
        </div>
      )
    }

    return (
      <div>
        <Header>
          <h1>Flexhire blog hub /{category.name}</h1>

          <div style={{ marginBottom: 24 }}>
            {category.description}
          </div>

          {canCreatePost && (
            <div>
              <div className={styles.actions}>
                <Link href="/blog/create-post" style={{ textDecoration: 'none' }}>
                  <Button variant="contained">
                    Create New Post
                  </Button>
                </Link>
              </div>

              <div className={styles['my-posts']}>
                <Link href="/blog/my-posts">
                  My posts
                </Link>
              </div>
            </div>
          )}
        </Header>

        <PageContainer style={{ position: 'relative', zIndex: 4 }}>
          <div className={styles['clear-area']} />

          <PageWrapper withoutCard noAnim>
            <Grid container spacing={3}>
              {blogPosts.length === 0 && blogPostsReceived && (
                <Grid item xs={12} md={12} lg={12}>
                  <Placeholder />
                </Grid>
              )}

              {blogPosts.map(blogPost => (
                <Grid key={blogPost.id} item xs={12} md={6} lg={6}>
                  <BlogPostItem blogPost={blogPost} />
                </Grid>
              ))}
            </Grid>
          </PageWrapper>
        </PageContainer>
      </div>
    )
  }
}
