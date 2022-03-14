import React from 'react'
import MediaQuery from 'components/MediaQuery'
import Link from 'components/Link'
import { Grid, Divider } from '@material-ui/core'
import { LoadingPage, PageContainer, PageWrapper, PagePlaceholder, PageHeaderTitle, PageHeaderSubtitle } from 'components'
import { Button } from 'components/themed'
import BlogCategoryItem from './components/BlogCategoryItem'
import BlogPostItem from '../BlogPostList/components/BlogPostItem'
import Header from '../Header'
import styles from './BlogCategoryList.module.css'

export default class BlogCategoryList extends React.Component {
  componentDidMount() {
    this.props.getBlogCategories()
    this.props.getRecentBlogPosts()
  }

  render() {
    const { canCreatePost = false } = this.props

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

    return (
      <div>
        <Header>
          <PageHeaderTitle>
            Welcome to the Flexhire blog
          </PageHeaderTitle>

          <PageHeaderSubtitle>
            Where Flexhire and our members from all around the world share their expertise on technology, recruitment and more.
          </PageHeaderSubtitle>

          {canCreatePost && (
            <div>
              <div className={styles.actions}>
                <Link href="/blog/create-post" style={{ textDecoration: 'none' }}>
                  <Button color="primary">
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

        {this.renderCategories()}
        {this.renderRecentPosts()}
      </div>
    )
  }

  renderCategories() {
    const { blogCategoriesReceived = false, blogCategories = [] } = this.props

    if (process.env.SHOW_BLOG_CATEGORIES !== 'true' && process.env.SHOW_BLOG_CATEGORIES !== true) {
      return null
    }

    if (!blogCategoriesReceived) {
      return (
        <LoadingPage />
      )
    }
    return (
      <div>
        <PageContainer style={{ position: 'relative', zIndex: 4, paddingBottom: 96 }}>
          <div className={styles['clear-area']} />

          <PageWrapper noAnim withoutCard>
            <Grid container spacing={5}>
              {blogCategories.map(this.renderBlogCategory)}
            </Grid>
          </PageWrapper>
        </PageContainer>

        <MediaQuery minWidth={1000}>
          <Divider style={{ marginBottom: 96 }} />
        </MediaQuery>

        <PageContainer style={{ position: 'relative', zIndex: 4, paddingBottom: 0 }}>
          <PageWrapper noAnim withoutCard>
            <h2>
                Recent articles
            </h2>
          </PageWrapper>
        </PageContainer>
      </div>
    )
  }

  renderRecentPosts() {
    const { recentBlogPostsReceived = false, recentBlogPosts = [] } = this.props

    if (!recentBlogPostsReceived) {
      return (
        <LoadingPage />
      )
    }
    return (
      <PageContainer style={{ position: 'relative', zIndex: 4 }}>
        <div className={styles['clear-area']} />

        <PageWrapper noAnim withoutCard>
          <Grid container spacing={5}>
            {recentBlogPosts.map(this.renderBlogPost)}
          </Grid>
        </PageWrapper>
      </PageContainer>
    )
  }

  renderBlogCategory = (blogCategory) => {
    return (
      <Grid key={blogCategory.id} item xs={12} md={6}>
        <BlogCategoryItem blogCategory={blogCategory} />
      </Grid>
    )
  }

  renderBlogPost = (blogPost) => {
    return (
      <Grid key={blogPost.id} item xs={12} md={6}>
        <BlogPostItem blogPost={blogPost} showCategory />
      </Grid>
    )
  }
}
