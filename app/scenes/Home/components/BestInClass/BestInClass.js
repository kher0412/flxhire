import React from 'react'
import styles from './BestInClass.module.css'
import Grid from '@material-ui/core/Grid'
import Picture from 'components/Picture'

const BestInClass = () => {
  return (
    <div className={styles['best-in-class-container']}>
      <div className={styles.content}>
        <Grid className={styles.logos} container spacing={2}>
          <Grid className={styles.logo} item xs={6} sm={4} md={2}>
            <Picture
              src={require('assets/images/logos/google.png?webp')}
              srcFallback={require('assets/images/logos/google.png')}
            />
          </Grid>
          <Grid className={styles.logo} item xs={6} sm={4} md={2}>
            <Picture
              src={require('assets/images/logos/yahoo.png?webp')}
              srcFallback={require('assets/images/logos/yahoo.png')}
            />
          </Grid>
          <Grid className={styles.logo} item xs={6} sm={4} md={2}>
            <Picture
              src={require('assets/images/logos/microsoft.png?webp')}
              srcFallback={require('assets/images/logos/microsoft.png')}
            />
          </Grid>
          <Grid className={styles.logo} item xs={6} sm={6} md={2}>
            <Picture
              src={require('assets/images/logos/youtube.png?webp')}
              srcFallback={require('assets/images/logos/youtube.png')}
            />
          </Grid>
          <Grid className={styles.logo} item xs={12} sm={6} md={2}>
            <Picture
              src={require('assets/images/logos/airbnb.png?webp')}
              srcFallback={require('assets/images/logos/airbnb.png')}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default BestInClass
