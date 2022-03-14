/* eslint-disable global-require */
import React from 'react'
import MediaQuery from 'components/MediaQuery'
import Slider from 'react-slick'
import { PrevArrowFactory, NextArrowFactory } from 'components/ReactSlickUtils'
import { isPrerendering } from 'services/prerender'
import styles from './CustomersSaying.module.css'
import CustomerReviewItem from './components/CustomerReviewItem'

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
  autoplaySpeed: 5550,
}

export default class CustomersSaying extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.heading}>
          Our Customers
        </div>

        <div className={styles.subheading}>
          Hear directly from our customers from both Fortune 500 companies and venture backed startups.
        </div>

        <div className={styles.slider}>
          <MediaQuery minWidth={1500}>
            {this.renderSlider(3)}
          </MediaQuery>

          <MediaQuery minWidth={1000} maxWidth={1499}>
            {this.renderSlider(2)}
          </MediaQuery>

          <MediaQuery maxWidth={999}>
            {this.renderSlider(1)}
          </MediaQuery>
        </div>
      </div>
    )
  }

  renderSlider(numSlidesToShow) {
    const settings = {
      ...SLIDER_SETTINGS,
      slidesToShow: numSlidesToShow,
    }

    return (
      <Slider {...settings}>
        <CustomerReviewItem
          authorName="Matt Hanagan"
          authorPosition="Marketing Director"
          authorCompany="PepsiCo"
          authorCompanyLogo={require('assets/images/customer_logos/Pepsico_logo.png')}
        >
          In our search for software engineering and digital design talent, we discovered Flexhire.
          They connected us quickly and easily to exceptional developers and designers and we’ve never looked back.
          We continue to use their service and I recommend them to anyone.
        </CustomerReviewItem>

        <CustomerReviewItem
          authorName="Joshua Chaitin-Pollak"
          authorPosition="CTO"
          authorCompany="Assured Labor"
          authorCompanyLogo={require('assets/images/customer_logos/assuredlabor.png')}
        >
          Flexhire found us an experienced developer in a very short time.
          He was integrated into our team and productive on his first day, and has been a valuable member of the team ever since.
          I’m looking forward to working with Flexhire to expand our team even further.
        </CustomerReviewItem>

        <CustomerReviewItem
          authorName="Oisin Kim"
          authorPosition="CEO"
          authorCompany="Webdoctor"
          authorCompanyLogo={require('assets/images/customer_logos/wd_logo.png')}
        >
          Martin has been a great asset to our team, and is a really strong Java engineer.
          The guys at Flexhire get it, and have a huge bench of strong, experienced engineers.
          I recommend them without hesitation.
        </CustomerReviewItem>

        <CustomerReviewItem
          authorName="Dr. Ray Cunningham"
          authorPosition="CTO"
          authorCompany="Fieldaware"
          authorCompanyLogo={require('assets/images/customer_logos/logo-fa.png')}
        >
          It’s tough to find experienced Android engineers at a reasonable rate.
          Flexhire solved that for us and I would not hesitate to recommend them.
        </CustomerReviewItem>

        <CustomerReviewItem
          authorName="Ronan Percival"
          authorPosition="CEO"
          authorCompany="Phorest"
          authorCompanyLogo={require('assets/images/customer_logos/phorest-type-mark.png')}
        >
          Flexhire is a new breed of technology recruitment agency.
          They helped us cut through the confusion and complexity of hiring the right developer for our needs, and have accelerated the growth of our business significantly.
        </CustomerReviewItem>

        <CustomerReviewItem
          authorName="Jan Koelble"
          authorPosition="Co Founder & COO"
          authorCompany="Clade"
          authorCompanyLogo={require('assets/images/customer_logos/clade_logo.png')}
        >
          Flexhire found us an amazing CTO as well as a full technology team at an incredibly competitive price.
          We highly recommend their service to anyone trying to quickly establish an experienced world class technology team with the least amount of hassle.
        </CustomerReviewItem>
      </Slider>
    )
  }
}
