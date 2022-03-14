import React from 'react'
import { Link, Tags, Tag, Video } from 'components'
import styles from './Freelancer.module.css'

export default class Freelancer extends React.PureComponent {
  render() {
    const { freelancer } = this.props
    const { first_name, video = {}, slug } = freelancer // eslint-disable-line camelcase

    return (
      <div>
        <div className={styles.container}>
          <Video video={video} className={styles.video} />
        </div>

        <div className={styles.name}>
          <Tags>
            <Tag>
              {first_name}
            </Tag>

            <Tag>
              <Link href="/[...slugs]" as={`/${slug}`} style={{ textDecoration: 'none', color: '#33CC83' }}>
                View Profile
              </Link>
            </Tag>
          </Tags>
        </div>
      </div>
    )
  }
}
