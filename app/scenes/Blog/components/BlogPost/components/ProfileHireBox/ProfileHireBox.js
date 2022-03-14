import React from 'react'
import Link from 'components/Link'
import MediaQuery from 'components/MediaQuery'

import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { UserAvatar, Video } from 'components'
import { Button } from 'components/themed'
import styles from './ProfileHireBox.module.css'

const renderFreelancerAvatar = (blogPost) => {
  return <UserAvatar url={blogPost.author_avatar_url} name={blogPost.author_name} />
}

const renderCard = (blogPost) => {
  return (
    <Card raised style={{ width: 290, margin: '0 auto' }}>
      <Link
        href="/[...slugs]"
        as={`/${blogPost.author_slug}`}
        style={{ textDecoration: 'none' }}
      >
        <CardHeader
          title={blogPost.author_name}
          subheader={`${blogPost.author_freelancer_type} Expert`}
          avatar={renderFreelancerAvatar(blogPost)}
        />
      </Link>

      <CardContent style={{ padding: 0 }}>
        <div>
          {(blogPost.video || blogPost.author_video) && (
            <Video video={blogPost.video || blogPost.author_video} compact />
          )}
        </div>
      </CardContent>

      <CardActions style={{ justifyContent: 'center' }}>
        <Button
          muiComponent={Link}
          href="/[...slugs]"
          as={`/${blogPost.author_slug}`}
          color="secondary"
          style={{ backgroundColor: '#0033cc', textDecoration: 'none', paddingBottom: 4 }}
          fullWidth
        >
          From the author
        </Button>
      </CardActions>
    </Card>
  )
}

const Freelancer = ({ blogPost = {} }) => {
  return (
    <div>
      <MediaQuery maxWidth={1600}>
        <Divider />

        <div style={{ padding: 48 }}>
          {renderCard(blogPost)}
        </div>
      </MediaQuery>

      <MediaQuery minWidth={1601}>
        <div className={styles['side-container']}>
          <div className={styles['side-content']}>
            {renderCard(blogPost)}
          </div>
        </div>
      </MediaQuery>
    </div>
  )
}

export default Freelancer
