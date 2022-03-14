/* eslint-disable global-require */
import React from 'react'
import { Grid } from '@material-ui/core'
import styles from './AboutFounders.module.css'
import FounderItem from './components/FounderItem'

const AboutFounders = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        Our Founders
      </div>

      <div className={styles.slider}>
        <Grid container>
          <Grid item xs={12} xl={6}>
            <FounderItem
              authorName="Brian McSweeney"
              authorPosition="CEO & cofounder"
              authorCompanyLogo={require('assets/images/brian.png')}
              slug="brian"
            >
              Brian is cofounder and CEO of Flexhire.
              He is a computer scientist, entrepreneur and seasoned fortune 500 senior technology executive.
              He was previously the CTO/CIO of Standard Industries, a New York based global manufacturer; Global Head of Digital Innovation for PepsiCo and Senior Vice President of Technology for JCPenney.
              He founded Flexhire to address a major problem he experienced firsthand in all companies throughout his career - hiring and managing the best people.
              Brian holds an MSc in Computer Science, Networks and Distributed Systems from Trinity College Dublin where he was a foundation scholar and gold medalist.
            </FounderItem>
          </Grid>

          <Grid item xs={12} xl={6}>
            <FounderItem
              authorName="Stephen McSweeney"
              authorPosition="Cofounder & COO"
              authorCompanyLogo={require('assets/images/steve.png')}
              slug="stephen-m"
            >
              Stephen is cofounder and COO of Flexhire. He is an experienced technology executive and entrepreneur.
              Stephen brings significant expertise in the technology testing and certification industry to Flexhire where he has created a science based screening approach to talent.
              He has led teams across many aspects of business for startups and fortune 500 companies.
              Stephen is a graduate of of Trinity College Dublin where he received his BA in Management Science and Information Systems and his MSc in Multimedia Systems.
            </FounderItem>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default AboutFounders
