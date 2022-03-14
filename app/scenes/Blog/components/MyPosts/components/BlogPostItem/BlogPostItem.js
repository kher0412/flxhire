import React from 'react'
import Link from 'components/Link'
import { Button } from 'components/themed'
import { Card } from '@material-ui/core'
import styles from './BlogPostItem.module.css'

const STATUS_TO_DISPLAY_STRING = {
  draft: 'Draft',
  published: 'Published',
  approved: 'Published (Featured)',
}

export default class BlogPostItem extends React.Component {
  render() {
    const { blogPost = {} } = this.props

    return (
      <Card raised className={styles.container}>
        <div className={styles.content}>
          <div className={styles.name}>
            {blogPost.title}
          </div>

          <div className={styles.status}>
            {STATUS_TO_DISPLAY_STRING[blogPost.status] || blogPost.status}
          </div>

          <div className={styles.description}>
            {blogPost.excerpt}
          </div>

          <div className={styles.actions}>
            <Link href="/blog/[category]/[post]" as={`/blog/${blogPost.blog_category_slug}/${blogPost.slug}`} style={{ textDecoration: 'none' }}>
              <Button color="primary" style={{ marginRight: 12 }}>
                View
              </Button>
            </Link>

            <Link href="/blog/[category]/[post]/edit" as={`/blog/${blogPost.blog_category_slug}/${blogPost.slug}/edit`} style={{ textDecoration: 'none' }}>
              <Button color="primary">
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    )
  }
}
