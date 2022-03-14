import React from 'react'
import { Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core'
import { ICandidateToNotify } from 'types'
import {
  FreelancerCard,
  FreelancerCardHeader,
  FreelancerCardInfoItems,
  FreelancerCardIndustryInfo,
  FreelancerCardLocationInfo,
  FreelancerCardSkillsInfo,
  FreelancerRates,
  FreelancerCardSlider,
  FreelancerCardActions,
} from 'components'
import { graphql, useFragment, useLazyLoadQuery } from 'react-relay'
import { SourcingCandidate_FreelancerSourcingQuery } from '__generated__/SourcingCandidate_FreelancerSourcingQuery.graphql'
import { SourcingCandidate_Candidate$key } from '__generated__/SourcingCandidate_Candidate.graphql'
import { Star } from '@material-ui/icons'
import styles from './SourcingCandidate.module.css'

export interface ISourcingCandidateProps {
  candidate: SourcingCandidate_Candidate$key
  jobSlug: string
  checked: boolean
  automaticallyNotify: boolean
  onChange: (freelancer: ICandidateToNotify, checked: boolean) => void
}

const missingReasonsStringMap = {
  subtypes: 'specialization',
  job_types: 'job type',
  skills: 'skill',
}

const SourcingCandidate = (props: ISourcingCandidateProps) => {
  const { candidate: candidateProp, checked, onChange, automaticallyNotify, jobSlug } = props

  const candidate = useFragment(graphql`
    fragment SourcingCandidate_Candidate on Candidate {
      jobIncompatibilityReasons
      freelancer {
        rawId
        firstName
        invitedToJob(jobSlug: $jobSlug)
        ...FreelancerCardHeader_Freelancer
        ...FreelancerCardIndustryInfo_Freelancer
        ...FreelancerCardChatButton_Freelancer
        ...FreelancerComment_Freelancer
        ...FreelancerCardLocationInfo_Freelancer
        ...FreelancerRates_Freelancer
        ...FreelancerInterviewTimes_Freelancer
        ...FreelancerCardSkillsInfo_Freelancer
        ...FreelancerCardSlider_Freelancer
        ...FreelancerActions_Freelancer
      }
    }
  `, candidateProp)

  const freelancer = candidate?.freelancer

  // TODO: this should be a fragment too
  const data = useLazyLoadQuery<SourcingCandidate_FreelancerSourcingQuery>(graphql`
    query SourcingCandidate_FreelancerSourcingQuery($jobSlug: String!) {
      job(slug: $jobSlug) {
        jobSkills {
          skill {
            rawId
          }
        }
      }
    }
  `,
  {
    jobSlug: jobSlug,
  }, {
    fetchPolicy: 'store-and-network',
  })

  const job = data?.job

  if (!freelancer) return null

  const perfectMatch = !candidate?.jobIncompatibilityReasons?.length
  const highlightedSkillIds = job?.jobSkills?.map(s => s.skill.rawId) || []

  return (
    <div className={styles.container} style={perfectMatch ? undefined : { opacity: 0.84 }}>
      <FreelancerCard flat>
        <FreelancerCardHeader
          freelancer={freelancer}
          showStatus={false}
        />

        <FreelancerCardInfoItems>
          <Grid container>
            <Grid item xs={6}>
              <FreelancerCardIndustryInfo freelancer={freelancer} />
              <FreelancerCardLocationInfo freelancer={freelancer} />
              <FreelancerCardSkillsInfo freelancer={freelancer} highlightedSkillIds={highlightedSkillIds} />
            </Grid>

            <Grid item xs={6}>
              <FreelancerRates freelancer={freelancer} />
            </Grid>
          </Grid>
        </FreelancerCardInfoItems>

        <FreelancerCardSlider freelancer={freelancer} />

        <FreelancerCardActions>
          {perfectMatch && (
            <Typography style={{ display: 'flex', marginLeft: 6 }}>
              <Star style={{ marginRight: 6, color: 'rgb(39, 175, 110)' }} />
              Flexhire recommended
            </Typography>
          )}

          {!perfectMatch && (
            <div className={styles.mismatch}>
              Missing: {candidate?.jobIncompatibilityReasons?.map(s => missingReasonsStringMap[s] || s)?.join(', ')}
            </div>
          )}

          <FormControlLabel
            style={{ marginLeft: 'auto', marginRight: 0 }}
            control={(
              <Checkbox
                disabled={automaticallyNotify || freelancer?.invitedToJob}
                checked={(automaticallyNotify ? perfectMatch : checked) || freelancer?.invitedToJob}
                color="primary"
                data-cy="checkbox-candidate"
                data-cy-candidate-id={freelancer?.rawId}
              />
            )}
            label={freelancer?.invitedToJob ? 'Already notified' : `Notify ${freelancer?.firstName} about this job`}
            labelPlacement="start"
            onChange={() => onChange({ id: freelancer.rawId }, !checked)}
          />
        </FreelancerCardActions>
      </FreelancerCard>
    </div>
  )
}

export default SourcingCandidate
