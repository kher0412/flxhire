import React from 'react'
import { Card, Grid } from '@material-ui/core'
import { formatAsDate } from 'services/formatting'
import { isJobApplication, getFilteredOutReason } from 'services/contract'
import {
  FreelancerCard,
  FreelancerCardHeader,
  FreelancerCardSlider,
  FreelancerAvailableOn,
  FreelancerRates,
  FreelancerComment,
  FreelancerInterviewTimes,
  FreelancerCardInfoItems,
  FreelancerCardInfoItem,
  FreelancerCardContact,
  FreelancerCardActions,
  FreelancerCardJob,
  ShareLinkButton,
  MediaQuery,
  Suspense,
} from 'components'
import { IContractForClient } from 'types'
import FreelancerSource from 'components/FreelancerSource'
import FreelancerCardLocationInfo from 'components/FreelancerCardLocationInfo'
import FreelancerCardIndustryInfo from 'components/FreelancerCardIndustryInfo'
import FreelancerCardSkillsInfo from 'components/FreelancerCardSkillsInfo'
import { graphql, useFragment } from 'react-relay'
import { Freelancer_Freelancer$key } from '__generated__/Freelancer_Freelancer.graphql'
import { Freelancer_Contract$key } from '__generated__/Freelancer_Contract.graphql'
import { Freelancer_Job$key } from '__generated__/Freelancer_Job.graphql'
import { Assignment, Check, Clear, Today } from '@material-ui/icons'
import CodeTestSubmission from './components/CodeTestSubmission'
import HireManager from './components/HireManager'
import FreelancerActions from '../FreelancerActions'
import FeedbackButton from './components/FeedbackButton'
import FreelancerCardChatButton from './components/FreelancerCardChatButton/FreelancerCardChatButton'
import BookmarkButton from './components/BookmarkButton'
import { HireMembersFilters } from '../../Hire'

interface IFreelancerProps {
  freelancer: Freelancer_Freelancer$key
  contract?: Freelancer_Contract$key
  job?: Freelancer_Job$key
  adminMode?: boolean
  hideJob?: boolean
  showFirm?: boolean
  filteredOut?: boolean
  filterParams?: HireMembersFilters
  flat?: boolean
  noActions?: boolean
  autoOpenAction?: string
  connectionId?: string
}

const Freelancer = (props: IFreelancerProps) => {
  const {
    contract: contractProp,
    freelancer: freelancerProp,
    job: jobProp,
    adminMode,
    hideJob,
    showFirm,
    filterParams,
    flat,
    filteredOut,
    noActions,
    autoOpenAction,
    connectionId,
  } = props

  const freelancer = useFragment(graphql`
    fragment Freelancer_Freelancer on User {
      id
      firstName
      profile {
        availableAt
      }
      ...FreelancerCardHeader_Freelancer
      ...FreelancerCardIndustryInfo_Freelancer
      ...FreelancerCardChatButton_Freelancer
      ...FeedbackButton_Freelancer
      ...FreelancerComment_Freelancer
      ...FreelancerCardLocationInfo_Freelancer
      ...FreelancerRates_Freelancer
      ...ShareLinkButton_Freelancer
      ...FreelancerInterviewTimes_Freelancer
      ...FreelancerCardSkillsInfo_Freelancer
      ...FreelancerActions_Freelancer
      ...FreelancerCardSlider_Freelancer
    }
  `, freelancerProp)

  const contract = useFragment(graphql`
    fragment Freelancer_Contract on Contract {
      id
      rawId
      status
      startDate
      paymentsEnabled
      applicantSource
      client {
        rawId
        name
      }
      projectSubmission {
        description
        url
        screenshotUrl
      }
      ...BookmarkButton_Contract
      ...FreelancerCardHeader_Contract
      ...FreelancerCardChatButton_Contract
      ...FeedbackButton_Contract
      ...FreelancerComment_Contract
      ...FreelancerSource_Contract
      ...FreelancerCardContact_Contract
      ...FreelancerRates_Contract
      ...FreelancerInterviewTimes_Contract
      ...FreelancerCardJob_Contract
      ...FreelancerCardSlider_Contract
      ...FreelancerActions_Contract
      ...HireManager_Contract
      ...contract_FilteredOutReason
    }
  `, contractProp)
  const hasContract = Boolean(contract)

  const job = useFragment(graphql`
    fragment Freelancer_Job on Job {
      id
      ...FreelancerCardJob_Job
      ...ShareLinkButton_Job
      ...FreelancerActions_Job
    }
  `, jobProp)

  const autoOpenFeedback = autoOpenAction === 'feedback'
  const enableBookmark = true

  if (!contract && !freelancer) return null

  return (
    <Card variant="outlined" elevation={0} style={{ overflow: 'visible' }}>
      <FreelancerCard
        disabled={/* contract?.updating */ false}
        flat
        highlight={filteredOut || contract?.status === 'interview_accepted'}
        HighlightIcon={filteredOut ? Clear : Check}
        highlightColor={filteredOut ? '#ccc' : 'rgb(39, 175, 110)'}
      >
        {enableBookmark && (
          <BookmarkButton
            contract={contract}
          />
        )}
        <FreelancerCardHeader
          freelancer={freelancer}
          contract={contract}
          filteredOut={filteredOut}
          filteredOutReason={getFilteredOutReason(contract, filterParams)}
          showStatus={hasContract}
        >
          <ShareLinkButton
            freelancer={freelancer}
            job={job}
          />

          <MediaQuery maxWidth={800}>
            <Suspense>
              <FreelancerCardChatButton
                contract={contract}
                freelancer={freelancer}
              />
            </Suspense>

            <Suspense><FeedbackButton
              contract={contract}
              freelancer={freelancer}
              autoOpen={autoOpenFeedback}
            />
            </Suspense>
          </MediaQuery>
        </FreelancerCardHeader>

        <FreelancerCardInfoItems>
          <Grid container>
            <Grid item xs={6}>
              <Suspense>
                <FreelancerCardIndustryInfo
                  freelancer={freelancer}
                />
              </Suspense>

              <Suspense><FreelancerCardLocationInfo
                freelancer={freelancer}
              />
              </Suspense>

              <Suspense><FreelancerCardSkillsInfo
                freelancer={freelancer}
                highlightedSkillIds={filterParams?.skills?.map(skill => skill.id)}
              />
              </Suspense>

              {contract && !contract.paymentsEnabled && (
                <Suspense><FreelancerCardInfoItem
                  icon={<Assignment />}
                  primary="Work tracking only"
                  secondary="Work tracking only"
                  data-cy="timesheet-tracking-only"
                />
                </Suspense>
              )}

              {contract?.startDate && contract?.status === 'offer_made' && (
                <Suspense><FreelancerCardInfoItem
                  icon={<Today />}
                  primary={formatAsDate(contract.startDate)}
                  secondary="Start date"
                  data-cy="start-date"
                />
                </Suspense>
              )}

              <FreelancerAvailableOn
                contract={{ status: contract?.status as IContractForClient['status'] }}
                freelancer={{ profile: { available_at: freelancer?.profile?.availableAt as string } }}
              />
              <FreelancerSource contract={contract} />
              <Suspense>
                <FreelancerCardContact contract={contract} />
              </Suspense>
            </Grid>

            <Grid item xs={6}>
              <Suspense>
                <FreelancerRates
                  freelancer={freelancer}
                  contract={contract}
                />
              </Suspense>

              {contract?.projectSubmission && (
                <CodeTestSubmission
                  projectSubmission={{
                    url: contract.projectSubmission.url,
                    screenshot_url: contract.projectSubmission.screenshotUrl,
                    description: contract.projectSubmission.description,
                  }}
                  freelancer={{ first_name: freelancer?.firstName }}
                />
              )}

              {contract?.client && !isJobApplication({ status: contract?.status as IContractForClient['status'] }) && (
                <Suspense>
                  <HireManager
                    contract={contract}
                  />
                </Suspense>
              )}

              <Suspense>
                <FreelancerInterviewTimes
                  contract={contract}
                  freelancer={freelancer}
                />
              </Suspense>

              {(!hideJob || showFirm) && (
                // The per-freelancer job is only displayed if there isn't a specific job selected and the selected firm is the current user's firm.
                // In that case, the current job and firm are already known to the user, so no need to display it again.
                // However, in case of viewing multi-job results or viewing them for another firm, we want to display the component for clarity.
                <Suspense>
                  <FreelancerCardJob
                    contract={contract}
                    job={job}
                    showFirm={showFirm}
                  />
                </Suspense>
              )}
            </Grid>
          </Grid>
        </FreelancerCardInfoItems>

        <Suspense>
          <FreelancerCardSlider
            freelancer={freelancer}
            contract={contract}
            allowRequestVideoIntroduction
            connectionId={connectionId}
          />
        </Suspense>

        <Suspense><FreelancerComment contract={contract} freelancer={freelancer} /></Suspense>

        {!noActions && (
          <FreelancerCardActions>
            <MediaQuery minWidth={801}>
              <Suspense>
                <FeedbackButton
                  contract={contract}
                  freelancer={freelancer}
                  autoOpen={autoOpenFeedback}
                />

                <FreelancerCardChatButton
                  contract={contract}
                  freelancer={freelancer}
                />
              </Suspense>
            </MediaQuery>

            <Suspense>
              <FreelancerActions
                freelancer={freelancer}
                contract={contract}
                job={job}
                adminMode={adminMode}
                autoOpenAction={autoOpenAction}
                connectionId={connectionId}
              />
            </Suspense>
          </FreelancerCardActions>
        )}
      </FreelancerCard>
    </Card>
  )
}

export default Freelancer
