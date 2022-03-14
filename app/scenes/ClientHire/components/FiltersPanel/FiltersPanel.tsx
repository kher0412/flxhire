import { Fragment, useState } from 'react'
import {
  Accordion,
  AccordionSummary,
  ExpansionPanelDetails,
  Typography,
  Badge,
  Grid,
} from '@material-ui/core'
import { Suspense } from 'components'
import { InfoMessage, TextField, Box } from 'components/themed'
import { useCurrentUser, useDebouncedEffect } from 'hooks'
import { graphql, useFragment } from 'react-relay'
import { FiltersPanel_Firm$key } from '__generated__/FiltersPanel_Firm.graphql'
import { FiltersPanel_Job$key } from '__generated__/FiltersPanel_Job.graphql'
import { Assignment, ExpandMore, FiberManualRecord, LocationSearching, MonetizationOn, Person, School, Search, Work } from '@material-ui/icons'
import styles from './FiltersPanel.module.css'
import { IHireTab, HireMembersFilters, isContractStatusFilterValid } from '../../Hire'
import ScreeningFields from './components/ScreeningFields'
import BudgetFields from './components/BudgetFields'
import ProfileFields from './components/ProfileFields'
import SkillsFields from './components/SkillsFields'
import LocationFields from './components/LocationFields'
import ExperienceFields from './components/ExperienceFields'
import EducationFields from './components/EducationFields'
import NotificationFields from './components/NotificationFields'

function getBadgeValue(...args: any[]): number {
  // This just counts the number of truthy arguments
  return args.filter(x => !!x).length
}

const IconWithBadge = ({ badgeValue = 0, Icon }) => {
  if (badgeValue > 0) {
    return (
      <Fragment>
        <Badge badgeContent={badgeValue} color="primary" style={{ marginRight: 12 }}>
          <Icon />
        </Badge>
      </Fragment>
    )
  }

  return (
    <Icon style={{ marginRight: 12 }} />
  )
}
export function getFiltersCount(filterParams: HireMembersFilters, tab: IHireTab) {
  const showBoth = !filterParams.positionTypes
  const showFreelancer = filterParams.positionTypes === 'freelancer' || showBoth
  const showPermanent = filterParams.positionTypes === 'permanent' || showBoth
  return {
    screening: (tab === 'screening' || tab === 'applicants') ? getBadgeValue(
      isContractStatusFilterValid(filterParams.contractStatus, tab),
      Boolean(filterParams.rating),
      // If the following pairs are different, it means one of the two categories
      // gets filtered out. We count this as an additional filter.
      // NOTE: conversion to boolean is important, because the values can also be undefined
      tab === 'screening' && Boolean(filterParams.missingAnswers) !== Boolean(filterParams.hasAnswers),
      tab === 'screening' && Boolean(filterParams.missingProjectSubmission) !== Boolean(filterParams.hasProjectSubmission),
    ) : 0,
    budget: getBadgeValue(
      !showBoth,
      filterParams.maxClientRate && showFreelancer,
      filterParams.maxAnnualCompensation && showPermanent,
    ),
    profile: getBadgeValue(
      tab === 'applicants' && Boolean(filterParams.hasVideoIntroduction) !== Boolean(filterParams.missingVideoIntroduction),
      filterParams.canWorkInTheUs,
      tab === 'applicants' && filterParams.verifiedOnly,
      filterParams.bookmarked,
    ),
    skills: Math.min(1, filterParams.skills?.length || 0) + Math.min(1, filterParams.freelancerSubtypes?.length || 0),
    notified: tab === 'potential' && filterParams.showNotNotified !== filterParams.showNotified ? 1 : 0,
    location: filterParams.locationType && filterParams.locationType !== 'anywhere' ? 1 : 0,
    education: (filterParams.maxUniversityRank > 0 ? 1 : 0) + (filterParams.university ? 1 : 0),
    experience: getBadgeValue(filterParams.managedTeams, filterParams.experience),
  }
}

export function getTotalFiltersCount(filterParams: HireMembersFilters, tab: IHireTab) {
  if (tab === 'potential' || tab === 'applicants' || tab === 'screening') {
    return Object.values(getFiltersCount(filterParams, tab)).reduce((a, b) => (a || 0) + (b || 0), 0)
  }
  return 0
}

// Improve performance
const unmountExpansionPanelOnExit = true

export interface IFiltersPanelProps {
  onClose?: () => void
  job?: FiltersPanel_Job$key
  firm: FiltersPanel_Firm$key
  tab: IHireTab
  disabled?: boolean
  filterParams: HireMembersFilters
  setFilterParam: (name: keyof HireMembersFilters, value: any) => void
}

const FiltersPanel = (props: IFiltersPanelProps) => {
  let { filterParams = {}, setFilterParam, tab, job: jobProp, firm: firmProp, disabled } = props
  const [user] = useCurrentUser()

  const job = useFragment(graphql`
    fragment FiltersPanel_Job on Job {
      ...SkillsFields_Job
      ...LocationFields_Job
    }
  `, jobProp)
  const firm = useFragment(graphql`
    fragment FiltersPanel_Firm on Firm {
      ...SkillsFields_Firm
    }
  `, firmProp)

  if (disabled) filterParams = {}

  const {
    screening: screeningFilterCount,
    budget: budgetFilterCount,
    profile: profileFilterCount,
    notified: notifiedFilterCount,
    location: locationFilterCount,
    skills: skillsFilterCount,
    education: educationFilterCount,
    experience: experienceFilterCount,
  } = getFiltersCount(filterParams, tab)

  const [name, setName] = useState(filterParams.name || '')
  useDebouncedEffect(() => { setFilterParam('name', name) }, 400, [name])

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Filter by:
          </Typography>
        </Grid>

        {disabled && (
          <Grid item xs={12}>
            <InfoMessage>
              Filtering is in preview mode.
              Please create an account or log in to configure filters.
            </InfoMessage>
          </Grid>
        )}

        <Grid item xs={12}>
          <TextField
            placeholder="Search by name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            startAdornment={<Search style={{ color: 'rgba(0, 0, 0, 0.54)' }} />}
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12}>
          {(tab === 'screening' || tab === 'applicants') && (
            <Accordion TransitionProps={{ unmountOnExit: unmountExpansionPanelOnExit }}>
              <AccordionSummary expandIcon={<ExpandMore />} IconButtonProps={{ 'data-cy': 'open-filters-screening' } as any}>
                <IconWithBadge badgeValue={screeningFilterCount} Icon={Assignment} />
                <Typography>Screening</Typography>
              </AccordionSummary>

              <ExpansionPanelDetails style={{ flexDirection: 'column' }} className={disabled && styles.disabled}>
                <ScreeningFields tab={tab} filterParams={filterParams} setFilterParam={setFilterParam} />
              </ExpansionPanelDetails>
            </Accordion>
          )}

          <Accordion TransitionProps={{ unmountOnExit: unmountExpansionPanelOnExit }}>
            <AccordionSummary expandIcon={<ExpandMore />} IconButtonProps={{ 'data-cy': 'open-filters-budget' } as any}>
              <IconWithBadge badgeValue={budgetFilterCount} Icon={MonetizationOn} />
              <Typography>Budget</Typography>
            </AccordionSummary>

            <ExpansionPanelDetails style={{ flexDirection: 'column' }} className={disabled && styles.disabled}>
              <BudgetFields filterParams={filterParams} setFilterParam={setFilterParam} disabled={disabled} />
            </ExpansionPanelDetails>
          </Accordion>

          <Accordion TransitionProps={{ unmountOnExit: unmountExpansionPanelOnExit }}>
            <AccordionSummary expandIcon={<ExpandMore />} IconButtonProps={{ 'data-cy': 'open-filters-profile' } as any}>
              <IconWithBadge badgeValue={profileFilterCount} Icon={Person} />
              <Typography>Profile</Typography>
            </AccordionSummary>

            <ExpansionPanelDetails style={{ flexDirection: 'column' }} className={disabled && styles.disabled}>
              <ProfileFields filterParams={filterParams} setFilterParam={setFilterParam} user={user} tab={tab} />
            </ExpansionPanelDetails>
          </Accordion>

          <Accordion TransitionProps={{ unmountOnExit: unmountExpansionPanelOnExit }}>
            <AccordionSummary expandIcon={<ExpandMore />} IconButtonProps={{ 'data-cy': 'open-filters-skills' } as any}>
              <IconWithBadge badgeValue={skillsFilterCount} Icon={FiberManualRecord} />
              <Typography>Skills</Typography>
            </AccordionSummary>

            <ExpansionPanelDetails style={{ flexDirection: 'column' }} className={disabled && styles.disabled}>
              <Suspense>
                <SkillsFields filterParams={filterParams} setFilterParam={setFilterParam} job={job} firm={firm} disabled={disabled} />
              </Suspense>
            </ExpansionPanelDetails>
          </Accordion>

          <Accordion TransitionProps={{ unmountOnExit: unmountExpansionPanelOnExit }}>
            <AccordionSummary expandIcon={<ExpandMore />} IconButtonProps={{ 'data-cy': 'open-filters-location' } as any}>
              <IconWithBadge badgeValue={locationFilterCount} Icon={LocationSearching} />
              <Typography>Location</Typography>
            </AccordionSummary>

            <ExpansionPanelDetails style={{ flexDirection: 'column' }} className={disabled && styles.disabled}>
              <LocationFields job={job} filterParams={filterParams} setFilterParam={setFilterParam} />
            </ExpansionPanelDetails>
          </Accordion>

          <Accordion TransitionProps={{ unmountOnExit: unmountExpansionPanelOnExit }}>
            <AccordionSummary expandIcon={<ExpandMore />} IconButtonProps={{ 'data-cy': 'open-filters-experience' } as any}>
              <IconWithBadge badgeValue={experienceFilterCount} Icon={Work} />
              <Typography>Experience</Typography>
            </AccordionSummary>

            <ExpansionPanelDetails style={{ flexDirection: 'column' }} className={disabled && styles.disabled}>
              <ExperienceFields filterParams={filterParams} setFilterParam={setFilterParam} />
            </ExpansionPanelDetails>
          </Accordion>

          <Accordion TransitionProps={{ unmountOnExit: unmountExpansionPanelOnExit }}>
            <AccordionSummary expandIcon={<ExpandMore />} IconButtonProps={{ 'data-cy': 'open-filters-education' } as any}>
              <IconWithBadge badgeValue={educationFilterCount} Icon={School} />
              <Typography>Education</Typography>
            </AccordionSummary>

            <ExpansionPanelDetails style={{ flexDirection: 'column' }} className={disabled && styles.disabled}>
              <EducationFields filterParams={filterParams} setFilterParam={setFilterParam} />
            </ExpansionPanelDetails>
          </Accordion>

          {tab === 'potential' && !disabled && (
            <Accordion TransitionProps={{ unmountOnExit: unmountExpansionPanelOnExit }}>
              <AccordionSummary expandIcon={<ExpandMore />} IconButtonProps={{ 'data-cy': 'open-filters-notified' } as any}>
                <IconWithBadge badgeValue={notifiedFilterCount} Icon={Person} />
                <Typography>Notification Status</Typography>
              </AccordionSummary>

              <ExpansionPanelDetails style={{ flexDirection: 'column' }} className={disabled && styles.disabled}>
                <NotificationFields filterParams={filterParams} setFilterParam={setFilterParam} />
              </ExpansionPanelDetails>
            </Accordion>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default FiltersPanel
