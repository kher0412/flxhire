import React from 'react'

import { Button } from 'components/themed'
import { Link, Picture } from 'components'
import Grid from '@material-ui/core/Grid'
import Slider from 'react-slick'
import Freelancer from './components/Freelancer'
import styles from './HireBetter.module.css'

class HireBetter extends React.PureComponent {
  componentDidMount() {
    this.props.getFreelancers()
  }

  render() {
    const { freelancers = [] } = this.props

    const settings = {
      dots: true,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 555000,
    }

    return (
      <div className={styles['hire-better']}><a name="hire_better" />
        <div className={styles.title}>
          Hire Better and Faster with Flexhire
        </div>

        <div>
          <div style={{ paddingTop: 50 }}>
            <Grid container spacing={2} direction="row" justify="center" alignItems="center">
              <Grid item xs={12} md={6}>
                <div className={styles.item}>
                  <div className={styles['item-wrapper-left']}>
                    <div className={styles['item-title-left']}>
                      A scientific approach to successful hiring
                    </div>
                    <div className={styles['item-text']}>
                      Our approach to hiring is based on 25 years of academic research into the best predictors of successful hiring: verified relevant experience, cognitive ability and structured interview questions
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                <Picture
                  src={require('assets/images/graphics/target.png?webp')}
                  srcFallback={require('assets/images/graphics/target.png')}
                  style={{ width: 200 }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} direction="row-reverse" justify="center" alignItems="center">
              <Grid item xs={12} md={6}>
                <div className={styles.item}>
                  <div className={styles['item-wrapper-right']}>
                    <div className={styles['item-title-right']}>
                      Triple screened global talent pool
                    </div>
                    <div className={styles['item-text']}>
                      Flexhire is a global marketplace, giving you the ability to hire the right talent for your team locally or from anywhere in the world. Our system instantly matches you with triple-screened, highly qualified professionals, ensuring that you only see the best. Every candidate has their communication skills, references and technical abilities verified before they are approved.
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                <Picture
                  src={require('assets/images/graphics/verified.png?webp')}
                  srcFallback={require('assets/images/graphics/verified.png')}
                  style={{ width: 200 }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} direction="row" justify="center" alignItems="center">
              <Grid item xs={12} md={6}>
                <div className={styles.item}>
                  <div className={styles['item-wrapper-left']}>
                    <div className={styles['item-title-left']}>
                      Supercharge your hiring process. Virtually meet talent pre interview
                    </div>
                    <div className={styles['item-text']}>
                      Our verified member video profiles are richer than any resume, saving you hiring time by rapidly checking qualities like communication skills, experience, cultural and personality fit. Flexhire job posts allow you to write custom structured interview questions that applicants can respond to by video, enabling you to find the perfect, motivated talent before you reach the interview stage and exponentially increasing the speed and effectiveness of your hiring process.
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                <Slider {...settings}>
                  {freelancers.map(freelancer => (
                    <div key={freelancer.id} className={styles.content}>
                      <Freelancer freelancer={freelancer} />
                    </div>
                  ))}
                </Slider>
              </Grid>
            </Grid>

            <Grid container spacing={2} direction="row-reverse" justify="center" alignItems="center">
              <Grid item xs={12} md={6}>
                <div className={styles.item}>
                  <div className={styles['item-wrapper-right']}>
                    <div className={styles['item-title-right']}>
                      Powerful suite of tools
                    </div>
                    <div className={styles['item-text']}>
                      Flexhire has powerful tools that allow you to hire however you want. Filter according to budget, position type (contract or permanent) or job location (search within a given distance of your office, or set a timezone range). If you want to hire remote and freelance, we also provides the tools to make that simple. Contract management, work report tracking and approval, automated invoicing, tax compliance tools, global payment processing, reporting tools, etc. are all part of the platform at no extra cost.
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                <Picture
                  src={require('assets/images/graphics/tools.png?webp')}
                  srcFallback={require('assets/images/graphics/tools.png')}
                  style={{ width: 200 }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} direction="row" justify="center" alignItems="center">
              <Grid item xs={12} md={6}>
                <div className={styles.item}>
                  <div className={styles['item-wrapper-left']}>
                    <div className={styles['item-title-left']}>
                      All completely free until you make a hire
                    </div>
                    <div className={styles['item-text']}>
                      Our entire system is free until you make a hire. Once you’ve found someone you like, our fees are built into the hourly rates you see, so there are no surprise costs to you or your talent.
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
                <Picture
                  src={require('assets/images/graphics/free.png?webp')}
                  srcFallback={require('assets/images/graphics/free.png')}
                  style={{ width: 200 }}
                />
              </Grid>
            </Grid>
          </div>
        </div>

        <div className={styles.bottom}>
          <Link href="/signup/client?mode=job" style={{ textDecoration: 'none' }}>
            <Button color="primary" variant="contained" className={styles.cta}>
              Post a job now
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default HireBetter
