import React from 'react'
import PropTypes from 'prop-types'
import MediaQuery from 'components/MediaQuery'
import Slider from 'react-slick'
import { isPrerendering } from 'services/prerender'
import Grid from '@material-ui/core/Grid'
import { AnimBox } from 'components'
import { PrevArrowFactory, NextArrowFactory } from 'components/ReactSlickUtils'
import LoadingIndicator from './components/LoadingIndicator'
import Freelancer from './components/Freelancer'
import styles from './TopFreelancers.module.css'

const arrowsStyle = { display: 'none' }
const PrevArrow = PrevArrowFactory(arrowsStyle)
const NextArrow = NextArrowFactory(arrowsStyle)

const SLIDER_SETTINGS = {
  dots: true,
  infinite: true,
  arrows: !(!isPrerendering() && window.innerWidth <= 800),
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  autoplay: true,
  autoplaySpeed: 4000,
}

class TopFreelancers extends React.PureComponent {
  static propTypes = {
    title: PropTypes.node.isRequired,
    subtitle: PropTypes.node,
    description: PropTypes.node,
  }

  render() {
    let { freelancers = [], title, subtitle, description } = this.props

    if (freelancers.length > 4) {
      freelancers = freelancers.slice(0, 4)
    }

    return (
      <AnimBox offset={-200}>
        <div className={styles.container}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <div className={styles.heading}>
                <AnimBox delay={0} offset={-10000} heavySlide>
                  {title}
                </AnimBox>
              </div>

              {subtitle && (
                <div className={styles.punchline}>
                  <AnimBox delay={400} offset={-10000} heavySlideRight>
                    {subtitle}
                  </AnimBox>
                </div>
              )}

              {description && (
                <div className={styles.subheading}>
                  <AnimBox delay={600} offset={-10000} heavySlideRight style={{ maxWidth: 1200, margin: '0 auto' }}>
                    {description}
                  </AnimBox>
                </div>
              )}
            </Grid>

            {freelancers.length === 0 && (
              <Grid item sm={12} md={12}>
                <div className={styles.placeholder}>
                  <LoadingIndicator style={{ color: '#0033cc' }} />
                </div>
              </Grid>
            )}

            <Grid item xs={12}>
              <MediaQuery minWidth={1500}>
                {this.renderSlider(4)}
              </MediaQuery>

              <MediaQuery minWidth={1000} maxWidth={1499}>
                {this.renderSlider(3)}
              </MediaQuery>

              <MediaQuery minWidth={700} maxWidth={999}>
                {this.renderSlider(2)}
              </MediaQuery>

              <MediaQuery maxWidth={699}>
                {this.renderSlider(1)}
              </MediaQuery>
            </Grid>
          </Grid>
        </div>
      </AnimBox>
    )
  }

  renderSlider(numSlidesToShow) {
    const { freelancers = [] } = this.props

    const settings = {
      ...SLIDER_SETTINGS,
      slidesToShow: numSlidesToShow,
    }

    return (
      <Slider {...settings}>
        {freelancers.map((freelancer, key) => (
          <div key={key}>
            <div className={styles.item}>
              <AnimBox offset={-10000} delay={800 + key * 200}>
                <Freelancer freelancer={freelancer} />
              </AnimBox>
            </div>
          </div>
        ))}
      </Slider>
    )
  }
}

export default TopFreelancers
