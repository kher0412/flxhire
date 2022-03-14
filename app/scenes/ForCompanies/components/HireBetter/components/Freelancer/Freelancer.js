import React from 'react'
import { Link, UserAvatar } from 'components'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { Button } from 'components/themed'
import styles from './Freelancer.module.css'

const renderFreelancerAvatar = (freelancer) => {
  return <UserAvatar url={freelancer.avatar_url} name={freelancer.first_name} />
}

const Freelancer = ({ freelancer }) => {
  const { freelancer_type, first_name, video, slug } = freelancer

  return (
    <Card raised style={{ width: 290, margin: '0 auto' }}>
      <CardHeader
        title={first_name}
        subheader={freelancer_type}
        avatar={renderFreelancerAvatar(freelancer)}
        style={{ textAlign: 'left' }}
      />

      <CardContent style={{ padding: 0 }}>
        {video && video.url && (
          <video controls className={styles.video} preload="metadata">
            <source src={`${video.url}#t=0.5`} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        )}
      </CardContent>

      <CardActions style={{ justifyContent: 'center' }}>
        <Link href="/[...slugs]" as={`/${slug}`} style={{ textDecoration: 'none', paddingBottom: 4 }}>
          <Button
            color="primary"
            style={{ backgroundColor: '#0033cc' }}
            fullWidth
          >
            View Full Profile
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default Freelancer
