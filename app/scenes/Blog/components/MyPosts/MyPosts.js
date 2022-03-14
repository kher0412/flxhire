import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Link'
import { Grid } from '@material-ui/core'
import { LoadingPage, PageContainer, PageWrapper } from 'components'
import { Button } from 'components/themed'
import BlogPostItem from './components/BlogPostItem'
import Placeholder from './components/Placeholder'
import Header from '../Header'
import styles from './MyPosts.module.css'

export default class MyPosts extends React.Component {
  static propTypes = {
    blogPosts: PropTypes.arrayOf(PropTypes.object),
  }

  componentDidMount() {
    this.props.getMyBlogPosts()
  }

  render() {
    return (
      <div>
        <Header>
          <h1>Welcome to the Flexhire blog</h1>

          <div style={{ marginBottom: 24 }}>
            Where Flexhire and our members from all around the world share their expertise on technology, recruitment and more.
          </div>

          <div className={styles.actions}>
            <Link href="/blog/create-post" style={{ textDecoration: 'none' }}>
              <Button>
                Create New Post
              </Button>
            </Link>
          </div>
        </Header>

        {this.renderContent()}
      </div>
    )
  }

  renderContent() {
    const { blogPosts = [], blogPostsReceived = false } = this.props

    if (!blogPostsReceived) {
      return (
        <LoadingPage />
      )
    }

    return (
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
                <BlogPostItem blogPost={blogPost} categoryID={this.props.router.query.category} />
              </Grid>
            ))}
          </Grid>
        </PageWrapper>
      </PageContainer>
    )
  }
}
