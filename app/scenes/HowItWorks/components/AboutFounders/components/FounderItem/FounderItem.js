import React from 'react'
import { Link, Picture } from 'components'
import styles from './FounderItem.module.css'

export default class FounderItem extends React.PureComponent {
  render() {
    const { authorName, authorPosition, authorCompanyLogo, slug, children } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <Link href="/[...slugs]" as={`/${slug}`}>
            <Picture alt="avatar" src={authorCompanyLogo} />
          </Link>
        </div>

        <div className={styles.container}>
          <div className={styles.text}>
            {children}
          </div>

          <div className={styles.meta}>
            <div className={styles.author}>
              {authorName}

              <div>
                <span className={styles.position}>{authorPosition}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
