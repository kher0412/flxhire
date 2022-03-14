import React, { useMemo } from 'react'
import { FreelancerCardInfoItem, MoreButtonCard, UserSkillsCollection } from 'components'
import { Divider } from '@material-ui/core'
import { graphql, useFragment } from 'react-relay'
import { FreelancerCardSkillsInfo_Freelancer$key } from '__generated__/FreelancerCardSkillsInfo_Freelancer.graphql'
import { FiberManualRecord } from '@material-ui/icons'
import styles from './FreelancerCardSkillsInfo.module.css'

export interface IFreelancerCardSkillsInfoProps {
  freelancer: FreelancerCardSkillsInfo_Freelancer$key
  highlightedSkillIds?: number[]
}

const FreelancerCardSkillsInfo = ({ freelancer: freelancerProp, highlightedSkillIds = [] }: IFreelancerCardSkillsInfoProps) => {
  const freelancer = useFragment(graphql`
      fragment FreelancerCardSkillsInfo_Freelancer on User {
        profile {
          freelancerSubtypes {
            rawId
            name
          }
        }
        userSkills {
          experience
          skill {
            rawId
            name
          }
        }
      }
    `, freelancerProp)

  const primaryText = useMemo(() => {
    const userSkills = freelancer?.userSkills

    if (!userSkills) return null

    const userSkillIdsSet = new Set(freelancer?.userSkills?.map(skill => skill?.skill?.rawId))
    const numMatchingSkills = highlightedSkillIds.filter(skillId => userSkillIdsSet.has(skillId)).length

    if (numMatchingSkills === 1 && highlightedSkillIds.length === 1) {
      return '1/1 matching skill'
    }

    if (numMatchingSkills > 1) {
      return `${numMatchingSkills}/${highlightedSkillIds.length} matching skills`
    }

    if (userSkills.length === 1) {
      return '1 skill'
    }

    if (userSkills.length > 1) {
      return `${userSkills.length} skills`
    }

    return null
  }, [freelancer?.userSkills, highlightedSkillIds])

  if (!freelancer) {
    return null
  }

  const userSkills = (freelancer?.userSkills || []).map(u => ({
    id: u.skill?.rawId,
    name: u.skill?.name,
    experience: u.experience,
  }))
  const freelancerSubtypes = (freelancer?.profile?.freelancerSubtypes || []).map(s => ({
    name: s.name,
    id: s.rawId,
  }))

  if (userSkills.length === 0 && freelancerSubtypes.length === 0) return null

  return (
    <MoreButtonCard
      component={props => (
        <FreelancerCardInfoItem
          {...props}
          button
          icon={<FiberManualRecord />}
          primary={primaryText}
          secondary="Skills"
          data-cy="freelancer-skills-button"
        />
      )}
    >
      <div style={{ maxWidth: 800 }} data-cy="freelancer-skills">
        <div className={styles.skillsSubtitle}>
          Specializations ({freelancerSubtypes?.length || 0})
        </div>

        <UserSkillsCollection freelancerSubtypes={freelancerSubtypes} alwaysOpen />

        <Divider style={{ margin: '24px -24px' }} />

        <div className={styles.skillsSubtitle}>
          Skills ({userSkills?.length || 0})
        </div>

        <UserSkillsCollection userSkills={userSkills} alwaysOpen highlightedSkillIds={highlightedSkillIds} />
      </div>
    </MoreButtonCard>
  )
}

export default FreelancerCardSkillsInfo
