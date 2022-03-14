import React from 'react'
import { Button } from '@material-ui/core'
import { PageHeader, PageHeaderTitle, Link } from 'components'
import { Create } from '@material-ui/icons'
import styles from './Header.module.css'

export default class Header extends React.PureComponent {
  render() {
    const { blogPost } = this.props

    return (
      <PageHeader>
        <PageHeaderTitle variant="centered">
          {blogPost.title || 'Untitled post'}

          {blogPost.is_own_post && (
            <Link href="/blog/[category]/[post]/edit" as={`/blog/${blogPost.blog_category_slug}/${blogPost.slug}/edit`} style={{ textDecoration: 'none' }}>
              <Button color="primary" variant="outlined" className={styles.edit}>
                <Create className={styles.icon} /> Edit
              </Button>
            </Link>
          )}
        </PageHeaderTitle>

        <div className={styles.categories}>
          <Link href="/blog/[category]" as={`/blog/${blogPost.blog_category_slug}`} style={{ textDecoration: 'none' }}>
            <div className={styles['header-subtitle']}>
              {blogPost.blog_category_name}
            </div>
          </Link>
        </div>
      </PageHeader>
    )
  }
}
