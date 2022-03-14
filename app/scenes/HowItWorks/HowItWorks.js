import React from 'react'
import { Helmet } from 'react-helmet'
import { Grid } from '@material-ui/core'
import { PageWrapper, PageContainer, PageHeader, PageHeaderTitle, Accordion, AnimBox } from 'components'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Avatar from '@material-ui/core/Avatar'
import styles from './HowItWorks.module.css'
import AboutFounders from './components/AboutFounders'
import ManageTalent from './components/ManageTalent'
import WorkWithBestCompanies from './components/WorkWithBestCompanies'

class HowItWorks extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>How it Works?</title>
          <meta name="description" content="List your position and our technology automatically presents you matching pre-screened candidates. You interview from our members and make an offer to the candidate you want. We support permanent and freelance positions. For freelance hires, our platform ensures project management, taxation handling and billing is simple, automated and totally hassle free." />
          <meta property="og:title" content="How it Works? - Flexhire" />
          <meta property="og:description" content="List your position and our technology automatically presents you matching pre-screened candidates. You interview from our members and make an offer to the candidate you want. We support permanent and freelance positions. For freelance hires, our platform ensures project management, taxation handling and billing is simple, automated and totally hassle free." />
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Flexhire',
              url: 'https://flexhire.com',
              logo: require('assets/images/logos/flexhire-logo-white.png'),
              slogan: 'Connecting Talent & Opportunity',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '7809 Prospector Drive, Cottonwood Heights',
                addressLocality: 'Salt Lake City',
                addressRegion: 'UT',
                postalCode: '84121',
                country: 'USA',
              },
              email: 'info@flexhire.com',
            })}
          </script>
        </Helmet>

        <PageHeader alternative white>
          <PageHeaderTitle variant="center">
            The Flexhire Advantage
          </PageHeaderTitle>
        </PageHeader>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.wrapper}>
            <div className={styles.text}>
              <AnimBox delay={500}>
                Flexhire is a global community of top pre-screened technology talent available for hire.
                Our expert members have worked with some of the biggest technology companies in the world, including Google, Microsoft, Facebook, Apple and many others.
                Our clients include Fortune 500 companies such as PepsiCo and Pearson, as well as famous venture backed startups such as Gwyneth Paltrow's Goop.com.
                Flexhire has significant experience and all the tools necessary to help rapidly scale up distributed teams.
              </AnimBox>
            </div>

            <div className={styles.text}>
              <AnimBox delay={1000}>
                Hiring on Flexhire is easy.
                List your position and our technology automatically presents you matching pre-screened candidates.
                You interview from our members and make an offer to the candidate you want. We support permanent and freelance positions.
                For freelance hires, our platform ensures project management, taxation handling and billing is simple, automated and totally hassle free.
              </AnimBox>
            </div>
          </div>

          <AboutFounders />
          <ManageTalent />
          <WorkWithBestCompanies />
        </div>
      </div>
    )
  }
}

export default HowItWorks
