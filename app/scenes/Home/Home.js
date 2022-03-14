import React from 'react'
import { OurCustomers, TopFreelancers } from 'components'
import styles from './Home.module.css'
import {
  SignupCTA,
  SampleSkills,
  HowItWorks,
} from './components'
import VideoIntro from './components/VideoIntro'
import NewsletterSignup from './components/NewsletterSignup'
import HowToHire from './components/HowToHire'
import ToolsToManage from './components/ToolsToManage'
import SampleQuestions from './components/SampleQuestions'
import FeaturesSlider from './components/FeaturesSlider'

const Home = ({ skills, freelancers, categories }) => {
  return (
    <div className={styles['home-container']}>
      <SignupCTA />
      {/* <VideoIntro /> */}

      <div
        // TODO: this wrapper with marginTop can be removed when video is re-added
        // Also, in SignupCTA, remove the negative bottom margin, see SignupCTA.module.css
        style={{ marginTop: 144 }}
      >
        <TopFreelancers
          freelancers={freelancers}
          title="Virtually meet talent before you hire"
          subtitle="HIRE THE BEST PEOPLE FOR PERMANENT OR FREELANCE ROLES"
        />
      </div>

      <HowToHire />
      <HowItWorks />
      <ToolsToManage />
      <FeaturesSlider />
      <OurCustomers />
      <SampleSkills skills={skills} />
      <SampleQuestions categories={categories} />
      {/* <NewsletterSignup /> */}
    </div>
  )
}

export default Home
