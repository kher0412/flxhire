import React, { useCallback, useRef, useEffect } from 'react'
import { Collapse, FormControlLabel, Grid } from '@material-ui/core'
import { FormValue, ICandidateToNotify, JobStatus } from 'types'
import { CheckboxField, Condition, LoadingPage, Suspense } from 'components'
import { InfoMessage, RelayPagination, Box } from 'components/themed'
import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay'
import { CandidatesField_FirmQuery } from '__generated__/CandidatesField_FirmQuery.graphql'
import { CandidatesField_Job$key } from '__generated__/CandidatesField_Job.graphql'
import { CandidatesField_candidates } from '__generated__/CandidatesField_candidates.graphql'
import SourcingCandidate from './components/SourcingCandidate'
import CandidatesDivider from './components/CandidatesDivider'

export interface ICandidatesFieldProps {
  candidates_to_notify: FormValue<ICandidateToNotify[]>
  automatically_notify_candidates: FormValue<boolean>
  jobSlug: string
  status: JobStatus
}

const CandidatesField = (props: ICandidatesFieldProps) => {
  const {
    candidates_to_notify,
    automatically_notify_candidates,
    status,
    jobSlug,
  } = props

  const firmQuery = useLazyLoadQuery<CandidatesField_FirmQuery>(
    graphql`
      query CandidatesField_FirmQuery($jobSlug: String) {
        job(slug: $jobSlug) {
          ...CandidatesField_Job
        }
      }
    `,
    {
      jobSlug: jobSlug,
    },
    {
      fetchPolicy: 'store-and-network',
    },
  )

  const { data, ...pagination } = usePaginationFragment<CandidatesField_candidates, CandidatesField_Job$key>(graphql`
    fragment CandidatesField_Job on Job
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 },
        cursor: { type: "String" },
      )
      @refetchable(queryName: "CandidatesField_candidates")
      {
        candidates(first: $count, after: $cursor) @connection(key: "CandidatesField_candidates") {
          __id
          totalCount
          edges {
            node { # node is Candidate
              id
              freelancer {
                id
                rawId
              }
              jobIncompatibilityReasons
              ...SourcingCandidate_Candidate
            }
          }
        }
      }
  `, firmQuery?.job)

  const candidates = data?.candidates?.edges?.map(e => e.node) || []
  const allCandidateIds = new Set(candidates.map(c => c.freelancer.rawId))
  const autoScrollAnchor = useRef<HTMLDivElement>()

  useEffect(() => {
    if (candidates.length > 0) {
      if (candidates_to_notify?.input.value?.some(c => !allCandidateIds.has(c.id))) {
        candidates_to_notify.input.onChange(candidates_to_notify.input.value.filter(c => allCandidateIds.has(c.id)))
      }
    }
  }, [candidates, candidates_to_notify?.input?.value, allCandidateIds])

  const handleCheckToggle = useCallback((candidate: ICandidateToNotify, checked: boolean) => {
    const input = candidates_to_notify?.input
    const selectedCandidateIds = new Set(input?.value?.map(_candidate => _candidate.id))

    if (checked) {
      if (!selectedCandidateIds.has(candidate.id)) {
        input?.onChange(input?.value?.concat({ id: candidate.id, status: 'pending' }))
      }
    } else {
      if (selectedCandidateIds.has(candidate.id)) {
        input?.onChange(input?.value?.filter(_candidate => _candidate.id !== candidate.id))
      }
    }
  }, [candidates_to_notify?.input?.onChange, candidates_to_notify?.input?.value])

  let selectedCandidateIds = new Set(candidates_to_notify?.input.value?.map(_candidate => _candidate.id) || [])
  let compatibleCandidates = candidates.filter(c => !c.jobIncompatibilityReasons?.length)
  let incompatibleCandidates = candidates.filter(c => c.jobIncompatibilityReasons?.length > 0)
  let autoNotifyCompatible = automatically_notify_candidates?.input?.value || false

  if (compatibleCandidates.length === 0) {
    // force-disable this, otherwise we may not be able to choose candidates
    autoNotifyCompatible = false
  }

  return (
    <React.Fragment>
      <Collapse in={candidates.length === 0} mountOnEnter>
        <InfoMessage>
          Unfortunately we don't have any matching candidates for your position at this time. Try choosing a different set of skills.
        </InfoMessage>
      </Collapse>

      <Collapse in={candidates.length > 0} mountOnEnter>
        <Suspense fallback={<LoadingPage />}>
          <div ref={autoScrollAnchor} style={{ transform: 'translateY(-48px)' }} />

          <Grid container spacing={3}>
            <Condition condition={compatibleCandidates.length > 0}>
              <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <FormControlLabel
                    control={(
                      <CheckboxField
                        input={automatically_notify_candidates?.input}
                        meta={automatically_notify_candidates?.meta}
                      />
                    )}
                    label="Let Flexhire automatically notify the best matches"
                    labelPlacement="start"
                  />
                </div>
              </Grid>
            </Condition>

            {compatibleCandidates.map(candidate => (
              <Grid item xs={12} key={candidate.id}>
                <Suspense fallback={<Box><LoadingPage /></Box>}>
                  <SourcingCandidate
                    candidate={candidate}
                    jobSlug={jobSlug}
                    checked={selectedCandidateIds.has(candidate.freelancer.rawId)}
                    automaticallyNotify={autoNotifyCompatible}
                    onChange={handleCheckToggle}
                  />
                </Suspense>
              </Grid>
            ))}

            {compatibleCandidates.length === 0 && (
              <Grid item xs={12}>
                <InfoMessage>
                  No members currently match all your requirements.
                  {incompatibleCandidates.length > 0 && ' However, similar matches are available below.'}
                </InfoMessage>
              </Grid>
            )}

            {incompatibleCandidates.length > 0 && (
              <React.Fragment>
                <Grid item xs={12}>
                  <CandidatesDivider />
                </Grid>

                {incompatibleCandidates.map(candidate => (
                  <Grid item xs={12} key={candidate.id}>
                    <Suspense fallback={<Box><LoadingPage /></Box>}>
                      <SourcingCandidate
                        candidate={candidate}
                        jobSlug={jobSlug}
                        checked={selectedCandidateIds.has(candidate.freelancer.rawId)}
                        automaticallyNotify={autoNotifyCompatible}
                        onChange={handleCheckToggle}
                      />
                    </Suspense>
                  </Grid>
                ))}
              </React.Fragment>
            )}
          </Grid>

          <Collapse in={selectedCandidateIds.size > 0}>
            <InfoMessage>
              Selected candidates ({selectedCandidateIds.size})
              {' '}
              will be messaged within a few hours after your job posting has been
              {' '}
              {status === 'opened' ? 'updated' : 'published'}.
            </InfoMessage>
          </Collapse>

          <RelayPagination
            perPage={5}
            currentCount={candidates?.length || 0}
            totalCount={data?.candidates?.totalCount}
            {...pagination}
          />
        </Suspense>
      </Collapse>
    </React.Fragment>
  )
}

export default CandidatesField
