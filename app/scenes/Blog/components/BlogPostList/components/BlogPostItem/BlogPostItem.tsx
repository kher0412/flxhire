import React from 'react'
import Link from 'components/Link'
import { Card } from '@material-ui/core'
import { IBlogPost } from 'types/models/blogPost'
import { Button } from 'components/themed'
import { ChevronRight } from '@material-ui/icons'
import styles from './BlogPostItem.module.css'

export interface IBlogPostItemProps {
  blogPost: IBlogPost
  showCategory?: boolean
}

export interface IBlogPostItemState {
}

export default class BlogPostItem extends React.Component<IBlogPostItemProps, IBlogPostItemState> {
  render() {
    const { blogPost = {} as IBlogPost, showCategory = false } = this.props

    return (
      <Card raised className={styles.container}>
        <div className={styles.content}>
          <div className={styles.name}>
            {blogPost.title}
          </div>

          {showCategory && (
            <div className={styles.category}>
              {blogPost.blog_category_name}
            </div>
          )}

          <div className={styles.description}>
            {blogPost.excerpt}
          </div>

          <div className={styles.actions}>
            <Link href="/blog/[category]/[post]" as={`/blog/${blogPost.blog_category_slug}/${blogPost.slug}`} style={{ textDecoration: 'none' }}>
              <Button color="primary">
                <ChevronRight /> Read article
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    )
  }
}
