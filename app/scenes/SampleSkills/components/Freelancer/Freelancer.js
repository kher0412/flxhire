import React from 'react'
import Link from 'components/Link'
import { Button } from 'components/themed'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import styles from './Freelancer.module.css'

const renderFreelancerAvatar = (freelancer) => {
  if (freelancer.avatar_url) {
    return (
      <Avatar src={freelancer.avatar_url} />
    )
  } if (freelancer.first_name) {
    return (
      <Avatar style={{ color: '#fff', backgroundColor: '#0033cc' }}>
        {freelancer.first_name.charAt(0)}
      </Avatar>
    )
  }
}

const Freelancer = ({ freelancer }) => {
  const { freelancer_type, first_name, video, slug } = freelancer
  return (
    <Card raised style={{ width: 290 }} data-cy="top-freelancer">
      <CardHeader
        title={first_name}
        subheader={freelancer_type}
        avatar={renderFreelancerAvatar(freelancer)}
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
        <Link href="/[...slugs]" as={`/${slug}`} style={{ textDecoration: 'none' }}>
          <Button
            color="primary"
            style={{ color: '#0033cc' }}
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
