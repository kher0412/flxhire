import React, { useMemo } from 'react'
import { Grid, Typography, Collapse, MenuItem } from '@material-ui/core'
import { RadioButtons } from 'components'
import { SelectField } from 'components/themed'
import { graphql, useFragment } from 'react-relay'
import { JobHiringManagerFields_Job$key } from '__generated__/JobHiringManagerFields_Job.graphql'
import { FormValue } from 'types'
import { formatAsCurrency } from 'services/formatting'

interface IJobHiringManagerFields {
  job: JobHiringManagerFields_Job$key
  hiring_manager_id: FormValue<number>
  hiring_manager_type: FormValue<string>
  user_id: FormValue<number>
}

const JobHiringManagerFields = ({ job: jobProp, hiring_manager_id, user_id, hiring_manager_type }: IJobHiringManagerFields) => {
  const job = useFragment(graphql`
    fragment JobHiringManagerFields_Job on Job {
      user {
        firm {
          billingPlan {
            allowFlexhireRecruiters
            dailyFlexhireRecruiterPerJobFeeUsd
          }
          users {
            id
            rawId
            name
          }
        }
      }
      recruiters {
        id
        rawId
        name
      }
    }
  `, jobProp)

  const managers = job?.user?.firm?.users || []
  const recruiters = job?.recruiters || []
  const showHiringManager = hiring_manager_type.input.value !== 'job_owner'
  const showFlexhireRecruiters = hiring_manager_type.input.value === 'flexhire_recruiter' || (job?.user?.firm?.billingPlan?.allowFlexhireRecruiters && recruiters?.length > 0)
  const flexhireRecruiterCost = job?.user?.firm?.billingPlan?.dailyFlexhireRecruiterPerJobFeeUsd

  const options = useMemo(() => {
    const list = [
      { label: 'Same as job owner', value: 'job_owner' },
      { label: 'Your team', value: 'team' },
    ]

    if (showFlexhireRecruiters) {
      const feeText = flexhireRecruiterCost ? ` (additional ${formatAsCurrency(flexhireRecruiterCost, { currency: 'USD' })} per job per day)` : ''
      list.push({ label: `Flexhire recruiter${feeText}`, value: 'flexhire_recruiter' })
    }

    return list
  }, [showFlexhireRecruiters, flexhireRecruiterCost])

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">
            Who manages this job
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            <b>Job owner</b> is the person who a successful candidate will report to
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <SelectField
            input={user_id.input}
            meta={user_id.meta}
            fullWidth
            label="Job Owner"
          >
            {managers.map(m => (
              <MenuItem key={m.id} value={m.rawId}>{m.name}</MenuItem>
            ))}
          </SelectField>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            <b>Hiring manager</b> is responsible for communication with candidates and scheduling interviews
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <RadioButtons
            input={{
              ...hiring_manager_type.input,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                hiring_manager_type.input.onChange(e)
                hiring_manager_id.input.onChange(null)
              },
            }}
            meta={hiring_manager_type.meta}
            options={options}
          />
        </Grid>

        <Grid item xs={12}>
          <Collapse in={showHiringManager}>
            <SelectField
              input={hiring_manager_id.input}
              meta={hiring_manager_id.meta}
              fullWidth
              label="Hiring Manager"
            >
              {hiring_manager_type.input.value !== 'flexhire_recruiter' && managers.map(m => (
                <MenuItem key={m.id} value={m.rawId}>{m.name}</MenuItem>
              ))}
              {hiring_manager_type.input.value === 'flexhire_recruiter' && recruiters.map(m => (
                <MenuItem key={m.id} value={m.rawId}>{m.name}</MenuItem>
              ))}
            </SelectField>
          </Collapse>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Note: these two settings will not be displayed on your job posting
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default JobHiringManagerFields
