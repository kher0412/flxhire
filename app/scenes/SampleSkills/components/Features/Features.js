import React from 'react'
import Link from 'components/Link'
import { Button } from 'components/themed'
import styles from './Features.module.css'

class Features extends React.Component {
  render() {
    const { skill, skillReceived } = this.props

    return (
      <div className={styles.features} style={skillReceived ? undefined : { opacity: 0 }}>
        <div className={styles.title}>
          Find more {skill?.name || ''} talent on FlexHire
        </div>

        <div className={styles.subtitle}>
          What you see here is only the tip of the iceberg.<br />
          Post your job and start seeing more candidates to get your projects going.
        </div>

        <div className={styles.action}>
          <Link href="/signup/client?mode=job" style={{ textDecoration: 'none' }}>
            <Button className={styles.button}>
              Post a Job and start hiring
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Features
