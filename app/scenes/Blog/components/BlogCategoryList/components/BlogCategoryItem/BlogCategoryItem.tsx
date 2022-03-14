import React from 'react'
import Link from 'components/Link'
import PropTypes from 'prop-types'
import { Card } from '@material-ui/core'
import { IBlogCategory } from 'types/models/blogCategory'
import { Button } from 'components/themed'
import { ChevronRight } from '@material-ui/icons'
import styles from './BlogCategoryItem.module.css'

export interface IBlogCategoryItemProps {
  blogCategory: IBlogCategory
}

export interface IBlogCategoryItemState {
}

export default class BlogCategoryItem extends React.Component<IBlogCategoryItemProps, IBlogCategoryItemState> {
  static propTypes = {
    blogCategory: PropTypes.object.isRequired,
  }

  render() {
    const { blogCategory = {} as IBlogCategory } = this.props

    return (
      <Card raised className={styles.container}>
        <div className={styles.content}>
          <div className={styles.name}>
            {blogCategory.name}
          </div>

          {blogCategory.description && (
            <div className={styles.description}>
              {blogCategory.description}
            </div>
          )}

          <div className={styles.actions}>
            <Link href="/blog/[category]" as={`/blog/${blogCategory.slug}`} style={{ textDecoration: 'none' }}>
              <Button color="secondary" style={{ marginLeft: 'auto' }}>
                Read {blogCategory.name} articles <ChevronRight style={{ marginLeft: 12 }} />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    )
  }
}
