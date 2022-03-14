import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { omit } from 'lodash'
import { Card } from '@material-ui/core'
import { Suspense, SuspensePlaceholder } from 'components'
import {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderBreadcrumbs,
  PageBody,
  PageSidebar,
  PageContent,
  PageTabs,
  PageTab,
} from 'components/Layouts/V3'
import { extractQueryParams, buildQueryParams } from 'services/router'
import { useRouter } from 'next/router'
import { useCurrentUser, useFilters, useSaveFilters, loadFilters } from 'hooks'
import { useLazyLoadQuery, graphql, useQueryLoader, PreloadFetchPolicy } from 'react-relay'
import { Hire_Query } from '__generated__/Hire_Query.graphql'
import { CandidatesFilters } from '__generated__/Candidates_candidates.graphql'
import { JobsFilters } from '__generated__/HireJobsPaginationQuery.graphql'
import { isCypress } from 'services/browserAgent'
import { canAccessHireAdminTools } from 'services/user'
import { JobsContainer_Query } from '__generated__/JobsContainer_Query.graphql'
import { CandidatesContainer_Query } from '__generated__/CandidatesContainer_Query.graphql'
import { ApplicationsContainer_Query } from '__generated__/ApplicationsContainer_Query.graphql'
import { ScreeningContainer_Query } from '__generated__/ScreeningContainer_Query.graphql'
import { InterviewsContainer_Query } from '__generated__/InterviewsContainer_Query.graphql'
import { OffersContainer_Query } from '__generated__/OffersContainer_Query.graphql'
import { StarBorder, FilterList, CheckCircle, Work, Mic, People, ContactMail, LibraryBooks, VerifiedUser, Assignment } from '@material-ui/icons'
import { Box } from 'components/themed'
import { useJobDefaultFilters } from './HireHooks'

import FocusedFreelancer from './components/FocusedFreelancer'
import JobSelector from './components/JobSelector'
import Sidebar from './components/Sidebar'
import JobsIcon from './components/Tabs/components/JobsIcon'
import CandidatesIcon from './components/Tabs/components/CandidatesIcon'
import ApplicationsIcon from './components/Tabs/components/ApplicationsIcon'
import ScreeningIcon from './components/Tabs/components/ScreeningIcon'
import InterviewsIcon from './components/Tabs/components/InterviewsIcon'
import OffersIcon from './components/Tabs/components/OffersIcon'
import HireBottomNavigation from './components/HireBottomNavigation'
import Jobs, { JobsQuery } from './components/Jobs'
import Candidates, { CandidatesQuery } from './components/Candidates'
import Applications, { ApplicationsQuery } from './components/Applications'
import Screening, { ScreeningQuery } from './components/Screening'
import Interviews, { InterviewsQuery } from './components/Interviews'
import Offers, { OffersQuery } from './components/Offers'
import JobsPanel from './components/JobsPanel/JobsPanel'
import FirmSelector from './components/FirmSelector'
import styles from './Hire.module.css'

export function isContractStatusFilterValid(contractStatus: HireMembersFilters['contractStatus'], tab: IHireTab) {
  if (contractStatus === 'rejected') return true
  if (tab === 'applicants' && contractStatus === 'job_application_sent') return true
  if (tab === 'screening' && ['screening_started', 'screening_requested', 'screening_completed', 'screening_rejected'].indexOf(contractStatus) >= 0) return true
  return false
}

export const prepareMembersFilters = (filters: HireMembersFilters, userId: number) => {
  return {
    ...omit(filters, ['skills', 'freelancerSubtypes', 'bookmarked']),
    managedTeamSizes: (filters.managedTeamSizes || []).length === 0 ? undefined : filters.managedTeamSizes,
    skills: (filters.skills || []).length === 0 ? undefined : filters.skills.map(s => ({ id: s.id, requiredYears: s.requiredYears || 0, groupIndex: s.groupIndex || 0 })),
    freelancerSubtypes: (filters.freelancerSubtypes || []).length === 0 ? undefined : filters.freelancerSubtypes.map(s => ({ id: s.id, groupIndex: s.groupIndex || 0 })),
    positionTypes: filters.positionTypes === 'both' ? undefined : filters.positionTypes,
    bookmarkedByUserId: filters.bookmarked ? userId : undefined,
  }
}

export type IHireTab = 'jobs' | 'potential' | 'applicants' | 'screening' | 'interviews' | 'offers'

export type ManagedTeamSize = '1-4' | '5-10' | '10-x'

export type IContractScreeningStatus = 'screening_started' | 'screening_requested' | 'screening_completed' | 'screening_rejected'

// We get these from graphql :)
export type HireJobsFilters = JobsFilters
export type HireMembersFilters = Partial<CandidatesFilters>

type IHireTabs = {
  [name in IHireTab]: {
    label: string
    icon: any
    mobileIcon?: any
    mobileLabel?: string
    disabled?: boolean,
  }
}

const TabTitlesMap: { [key in IHireTab]: string } = {
  jobs: 'Jobs',
  potential: 'Candidates',
  applicants: 'Applications',
  screening: 'Screening',
  interviews: 'Interviews',
  offers: 'Offers',
}

const TabDescriptionsMap: { [key in IHireTab]: string } = {
  jobs: 'From here you can create and edit your jobs',
  potential: 'Candidates are existing members of Flexhire who may be a fit for your jobs. From here you can invite them to apply.',
  applicants: 'Review applicants to your jobs. From here you can invite them to complete your prescreening or invite them directly to interview',
  screening: 'Review applicants that are completing or have completed your jobs\' prescreening. From here you can invite them to interview',
  interviews: 'View your requested and scheduled interviews. From here you can make offers',
  offers: 'From here you can view your extended job offers',
}

export const HIRE_TABS: IHireTabs = {
  jobs: {
    label: 'Jobs',
    icon: JobsIcon,
    mobileIcon: Work,
  },
  potential: {
    label: 'Candidates',
    mobileLabel: 'Candidates',
    icon: CandidatesIcon,
    mobileIcon: VerifiedUser,
  },
  applicants: {
    label: 'Applications',
    icon: ApplicationsIcon,
    mobileIcon: Assignment,
  },
  screening: {
    label: 'Screening',
    icon: ScreeningIcon,
    mobileIcon: FilterList,
  },
  interviews: {
    label: 'Interviews',
    icon: InterviewsIcon,
    mobileIcon: Mic,
  },
  offers: {
    label: 'Offers',
    icon: OffersIcon,
    mobileIcon: CheckCircle,
  },
}
// IMPORTANT: Increase this if something has changed in the format of the filterParams.
const FILTER_FORMAT_VERSION = 1
const FILTER_STORAGE_NAME = 'client_hire_filter_params'

const HireQuery = graphql`
  query Hire_Query($jobSlug: String, $firmSlug: String, $hasJob: Boolean!) {
    allJobs: jobs(first: 1, firmSlug: $firmSlug) {
      totalCount
      edges {
        node {
          slug
        }
      }
    }
    firm(slug: $firmSlug) {
      job(slug: $jobSlug) @include(if: $hasJob) {
        id
        slug
        rawId
        ...HireHooks_JobDefaultFilters
        ...Sidebar_Job
        ...Candidates_Job
        ...Applications_Job
      }

      ...Header_Firm
      ...JobsPanel_Firm
      ...Sidebar_Firm
      ...JobSelector_Firm
    }
    ...FirmSelector_Query
  }
`

const Hire = () => {
  const router = useRouter()
  const query = useMemo(() => extractQueryParams(router?.asPath), [router?.asPath])
  const [tab, setTabRaw] = useState((query.tab || 'jobs') as IHireTab) // TODO: fallback to default if tab is invalid
  const [selectedJobSlug, setSelectedJobRaw] = useState(query.job as string)
  const [user] = useCurrentUser()
  const [showAdminTools, setShowAdminTools] = useState(isCypress() ? false : canAccessHireAdminTools(user))
  const [selectedFirmSlug, setSelectedFirmSlugRaw] = useState((query?.company || user?.firm?.slug) as string | null | false)
  const hasFirm = Boolean(selectedFirmSlug)
  const canSelectFirm = canAccessHireAdminTools(user)

  const toggleAdminTools = useCallback(() => setShowAdminTools(!showAdminTools), [showAdminTools, setShowAdminTools])

  const data = useLazyLoadQuery<Hire_Query>(
    HireQuery,
    {
      jobSlug: selectedJobSlug,
      firmSlug: selectedFirmSlug === false ? null : selectedFirmSlug,
      hasJob: Boolean(selectedJobSlug),
    },
    {
      fetchPolicy: 'store-and-network',
    },
  )

  const [jobsQuery, loadJobs] = useQueryLoader<JobsContainer_Query>(JobsQuery)
  const [candidatesQuery, loadCandidates] = useQueryLoader<CandidatesContainer_Query>(CandidatesQuery)
  const [applicationsQuery, loadApplications] = useQueryLoader<ApplicationsContainer_Query>(ApplicationsQuery)
  const [screeningQuery, loadScreening] = useQueryLoader<ScreeningContainer_Query>(ScreeningQuery)
  const [interviewsQuery, loadInterviews] = useQueryLoader<InterviewsContainer_Query>(InterviewsQuery)
  const [offersQuery, loadOffers] = useQueryLoader<OffersContainer_Query>(OffersQuery)

  // API Data
  const firm = data?.firm
  const showFilters = hasFirm && ['potential', 'applicants', 'screening'].includes(tab)
  const selectedJob = firm?.job

  // When selected firm changes, load tab contents
  useEffect(() => {
    const params = { slug: selectedFirmSlug || null }
    const options = { fetchPolicy: 'store-or-network' as PreloadFetchPolicy }
    if (tab === 'jobs') loadJobs(params, options)
    if (tab === 'potential') loadCandidates(params, options)
    if (tab === 'applicants') loadApplications(params, options)
    if (tab === 'screening') loadScreening(params, options)
    if (tab === 'interviews') loadInterviews(params, options)
    if (tab === 'offers') loadOffers(params, options)
  }, [selectedFirmSlug, tab])

  // Filters handling
  const jobsFilters = useFilters<HireJobsFilters>()
  const defaultFilters = useJobDefaultFilters(selectedJob, tab)
  const membersFilters = useFilters<HireMembersFilters>(defaultFilters)
  const preparedMembersFilters = useMemo(() => ({
    ...membersFilters.filters,
    jobsIds: selectedJob?.rawId ? [selectedJob?.rawId] : undefined,
  }), [membersFilters.filters, selectedJob?.rawId])

  const filterOptions = {
    user,
    additionalParameters: {
      jobId: selectedJob?.rawId,
    },
    version: FILTER_FORMAT_VERSION,
    storageName: FILTER_STORAGE_NAME,
  }

  // When selected job is changed, load its default filters
  useEffect(() => {
    if (selectedJob?.rawId) {
      const loadedFilters = loadFilters(filterOptions)

      if (loadedFilters) {
        membersFilters.replaceFilters(loadedFilters)
      } else {
        membersFilters.replaceFilters(defaultFilters)
      }
    } else {
      membersFilters.replaceFilters(defaultFilters)
    }
  }, [selectedJob?.rawId])

  // Keep filter changes saved to local storage
  useSaveFilters<HireMembersFilters>(membersFilters.filters, filterOptions)

  // One-way binding from router to state. Tab/job selection is handled by changing the route
  useEffect(() => {
    if (tab !== query.tab) {
      setTabRaw((query.tab || 'jobs') as IHireTab) // TODO: if tab is invalid, then redirect?
    }

    if (selectedJobSlug !== query.job) {
      setSelectedJobRaw(query.job)
    }

    if (selectedFirmSlug !== query.company && query.company && canSelectFirm) {
      setSelectedFirmSlugRaw(query.company)
    } else if (!canSelectFirm && selectedFirmSlug !== user?.firm?.slug) {
      setSelectedFirmSlugRaw(user?.firm?.slug)
    }
  }, [query, selectedJobSlug, selectedFirmSlug, tab, canSelectFirm])

  const updateRoute = useCallback((newTab, newJob, newFirm) => {
    const newParams = { ...query, job: newJob, tab: newTab, company: null as string }

    if (newFirm) {
      if (newFirm === user?.firm?.slug) {
        setSelectedFirmSlugRaw(newFirm)
      } else {
        newParams.company = newFirm
      }
    } else if (canSelectFirm) {
      setSelectedFirmSlugRaw(null)
    }
    router.push('/client/hire', `/client/hire?${buildQueryParams(newParams)}`, { shallow: true })
  }, [query, tab, selectedJobSlug, canSelectFirm])

  const setTab = useCallback((newTab: IHireTab) => {
    if (newTab !== tab) {
      // If we move to the jobs tab, we want to clear the job filter
      updateRoute(newTab, newTab === 'jobs' ? null : selectedJobSlug, selectedFirmSlug)
    }
  }, [setTabRaw, updateRoute, selectedJobSlug, selectedFirmSlug])

  const setSelectedJob = useCallback((slug: string) => {
    if (slug !== selectedJobSlug) {
      updateRoute(tab, slug, selectedFirmSlug)
    }
  }, [setTabRaw, updateRoute, tab, selectedFirmSlug])

  const setSelectedFirmSlug = useCallback((slug: string) => {
    if (slug !== selectedFirmSlug) {
      updateRoute(tab, selectedJobSlug, slug)
    }
  }, [setTabRaw, updateRoute, tab, selectedJobSlug])

  // Automatically select job if there is only one
  const jobsTotalCount = data?.allJobs?.totalCount

  useEffect(() => {
    const slug = data?.allJobs?.edges[0]?.node?.slug

    if (jobsTotalCount === 1 && slug !== selectedJobSlug) setSelectedJob(slug)
  }, [jobsTotalCount])

  const breadcrumbsProps = [
    { id: 1, name: 'Recruitment', href: '/client/dashboard' },
    { id: 2, name: TabTitlesMap[tab], href: '/client/hire', as: `/client/hire?tab=${tab}` },
  ]

  const iconStyle = { verticalAlign: 'middle', marginBottom: 2, marginRight: 6, fontSize: 18 }

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle>{TabTitlesMap[tab]}</PageHeaderTitle>
        <PageHeaderDescription>{TabDescriptionsMap[tab]}</PageHeaderDescription>
        <PageHeaderBreadcrumbs breadcrumbs={breadcrumbsProps} />
      </PageHeader>

      <PageTabs
        value={tab}
        onChange={(e, newTab) => setTab(newTab as IHireTab)}
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="on"
      >
        <PageTab
          label={(
            <div className={styles.iconTab}>
              <Work style={iconStyle} />
              Jobs
            </div>
          )}
          dataCy="hire-navigation-jobs"
          value="jobs"
          href="/client/hire"
          as="/client/hire?tab=jobs"
        />
        <PageTab
          label={(
            <div className={styles.iconTab}>
              <People style={iconStyle} />
              Candidates
            </div>
          )}
          dataCy="hire-navigation-potential"
          value="potential"
          href="/client/hire"
          as="/client/hire?tab=potential"
        />
        <PageTab
          label={(
            <div className={styles.iconTab}>
              <LibraryBooks style={iconStyle} />
              Applications
            </div>
          )}
          dataCy="hire-navigation-applicants"
          value="applicants"
          href="/client/hire"
          as="/client/hire?tab=applicants"
        />
        <PageTab
          label={(
            <div className={styles.iconTab}>
              <StarBorder style={iconStyle} />
              Screening
            </div>
          )}
          dataCy="hire-navigation-screening"
          value="screening"
          href="/client/hire"
          as="/client/hire?tab=screening"
        />
        <PageTab
          label={(
            <div className={styles.iconTab}>
              <Mic style={iconStyle} />
              Interviews
            </div>
          )}
          dataCy="hire-navigation-interviews"
          value="interviews"
          href="/client/hire"
          as="/client/hire?tab=interviews"
        />
        <PageTab
          label={(
            <div className={styles.iconTab}>
              <ContactMail style={iconStyle} />
              Offers
            </div>
          )}
          dataCy="hire-navigation-offers"
          value="offers"
          href="/client/hire"
          as="/client/hire?tab=offers"
        />
      </PageTabs>

      <Page data-cy="page-hire">
        <PageBody>
          {showFilters && (
            <PageSidebar sticky>
              <Sidebar
                onClose={undefined}
                firm={firm}
                job={selectedJob}
                hideFilters={!showFilters}
                tab={tab}
                filterParams={preparedMembersFilters}
                setFilterParam={membersFilters.setFilter}
                clearFilterParams={membersFilters.clearFilters}
                resetFilterParams={membersFilters.resetDefaults}
              />
            </PageSidebar>
          )}

          <PageContent maxWidth="xl">
            {hasFirm && (
              <React.Fragment>
                <Suspense>
                  <FocusedFreelancer
                    showAdminTools={showAdminTools}
                  />
                </Suspense>

                {hasFirm && (
                  <Card variant="outlined" elevation={0} style={{ marginBottom: 24 }}>
                    <Box variant="compact">
                      {tab !== 'jobs' && (
                        <Suspense>
                          <div style={{ marginLeft: 6 }}>
                            <JobSelector
                              firm={firm}
                              title={HIRE_TABS[tab]?.label}
                              showAdminTools={showAdminTools}
                              selectedJobSlug={selectedJobSlug}
                              setSelectedFirmSlug={setSelectedFirmSlug}
                              setSelectedJob={setSelectedJob}
                              toggleAdminTools={toggleAdminTools}
                            />
                          </div>
                        </Suspense>
                      )}

                      {tab === 'jobs' && (
                        <JobsPanel
                          firm={firm}
                          jobsFilters={jobsFilters}
                        />
                      )}
                    </Box>
                  </Card>
                )}

                {tab === 'jobs' && jobsQuery && (
                  <Jobs
                    preloadedQuery={jobsQuery}
                    filters={jobsFilters.filters}
                    setSelectedJob={setSelectedJob}
                    setTab={setTab}
                  />
                )}

                {tab === 'potential' && candidatesQuery && (
                  <Candidates
                    preloadedQuery={candidatesQuery}
                    selectedJob={selectedJob}
                    filters={preparedMembersFilters}
                    adminMode={showAdminTools}
                  />
                )}

                {tab === 'applicants' && applicationsQuery && (
                  <Applications
                    preloadedQuery={applicationsQuery}
                    selectedJob={selectedJob}
                    filters={preparedMembersFilters}
                    clearFilters={membersFilters.clearFilters}
                    adminMode={showAdminTools}
                  />
                )}

                {tab === 'screening' && screeningQuery && (
                  <Screening
                    preloadedQuery={screeningQuery}
                    filters={preparedMembersFilters}
                    clearFilters={membersFilters.clearFilters}
                    selectedJob={selectedJob}
                    adminMode={showAdminTools}
                  />
                )}

                {tab === 'interviews' && interviewsQuery && (
                  <Interviews
                    preloadedQuery={interviewsQuery}
                    selectedJob={selectedJob}
                    adminMode={showAdminTools}
                  />
                )}

                {tab === 'offers' && offersQuery && (
                  <Offers
                    preloadedQuery={offersQuery}
                    selectedJob={selectedJob}
                    adminMode={showAdminTools}
                  />
                )}
              </React.Fragment>
            )}

            {!hasFirm && canSelectFirm && (
              <Suspense fallback={<SuspensePlaceholder />} ErrorFallbackComponent={props => <SuspensePlaceholder {...props} />}>
                <FirmSelector
                  data={data}
                  onSelectFirm={setSelectedFirmSlug}
                />
              </Suspense>
            )}
          </PageContent>
        </PageBody>

        {hasFirm && (
          <HireBottomNavigation
            tab={tab}
            setTab={setTab}
          />
        )}
      </Page>
    </React.Fragment>
  )
}

export default Hire
