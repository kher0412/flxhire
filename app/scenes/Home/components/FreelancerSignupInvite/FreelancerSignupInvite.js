import React from 'react'
import { Button } from 'components/themed'
import Link from 'components/Link'
import styles from './FreelancerSignupInvite.module.css'

const image = require('assets/images/home/background3.png?url')

const FreelancerSignupInvite = () => (
  <div className={styles['signup-container']} style={{ background: `url('${image}') center 0px no-repeat`, backgroundSize: 'cover' }}>
    <div className={styles.content}>
      <div className={styles.title}>Freelancers - apply to be viewed by top global tech companies</div>
      <Link href="/signup/[user_type]" as="/signup/member" style={{ textDecoration: 'none' }}>
        <Button
          className={styles['apply-button']}
        >
          APPLY NOW
        </Button>
      </Link>
    </div>
  </div>
)

export default FreelancerSignupInvite
