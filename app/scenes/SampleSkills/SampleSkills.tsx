import React from 'react'
import { withRouter } from 'next/router'
import { Helmet } from 'react-helmet'
import Link from 'components/Link'
import { PageHeader, PageHeaderTitle } from 'components'
import { Button } from 'components/themed'
import Freelancer from './components/Freelancer'
import Features from './components/Features'
import styles from './SampleSkills.module.css'
import { ContainerProps } from './SampleSkillsContainer'

class SampleSkills extends React.Component<ContainerProps> {
  componentDidMount() {
    const { router, getSkill, getTopFreelancers } = this.props
    getSkill(router.query.slug)
    getTopFreelancers(router.query.slug, router.query.freelancer_type_id)
  }

  render() {
    const { topFreelancers = [], skill, skillReceived, router } = this.props
    const skillName = skill?.name || router.query.slug
    const categoryName = router.query.freelancer_type_id

    return (
      <React.Fragment>
        <Helmet titleTemplate="%s">
          <title>Find verified {skillName} experts on Flexhire</title>
          <meta name="description" content={`Find the top ${categoryName} talent with ${skillName} skills. FlexHire gives you immediate access to expert ${skillName} talent to help build your team.`} />
          <meta property="og:title" content={`Find top ${skillName} talent - Flexhire`} />
          <meta property="og:description" content={`Find the top ${categoryName} talent with ${skillName} skills. FlexHire gives you immediate access to expert ${skillName} talent to help build your team.`} />
        </Helmet>

        <PageHeader className={styles.header}>
          <PageHeaderTitle className={styles.title} style={skillReceived ? undefined : { visibility: 'hidden' }}>
            Find {skillName} talent on FlexHire
          </PageHeaderTitle>

          <div className={styles.subtitle} style={skillReceived ? undefined : { visibility: 'hidden' }}>
            FlexHire gives you immediate access to expert {skillName} talent to help build your team.<br />
            You are 2 minutes away from having your job posted and hiring top pre-vetted talent.
          </div>

          <div className={styles.action}>
            <Link href="/signup/client?mode=job" style={{ textDecoration: 'none' }}>
              <Button className={styles.button}>
                Post a Job and start hiring
              </Button>
            </Link>
          </div>
        </PageHeader>

        <div className={styles.freelancers}>
          {(!topFreelancers || topFreelancers.length === 0) && (
            <div className={styles.placeholder} />
          )}

          {topFreelancers && topFreelancers.map((topFreelancer, i) => (
            <Freelancer key={topFreelancer.id} freelancer={topFreelancer} />
          ))}
        </div>

        <Features skill={skill} skillReceived={skillReceived} />
      </React.Fragment>
    )
  }
}

export default withRouter(SampleSkills)
