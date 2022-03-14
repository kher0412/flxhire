import React from 'react'
import dynamic from 'services/dynamic'
import MediaQuery from 'components/MediaQuery'
import { Field, Fields } from 'redux-form'
import { CardHeader, Grid, Divider } from '@material-ui/core'
import { JobShare } from 'components'
import { IJob, ISkill, IClient, IFreelancerType, IFreelancerSubtype } from 'types'
import MoreButtonCard from 'components/MoreButtonCard'
import { Share } from '@material-ui/icons'
import JobTitleField from '../Fields/JobTitleField'
import JobRatesFields from '../Fields/JobRatesFields'
import JobTypeFields from '../Fields/JobTypeFields'
import JobLocationFields from '../Fields/JobLocationFields'
import JobDescriptionField from '../Fields/JobDescriptionField'
import JobSkillsFields from '../Fields/JobSkillsFields'
import ProjectLengthFields from '../Fields/ProjectLengthFields'
import JobNumberOfHiresField from '../Fields/JobNumberOfHiresField'
import styles from './JobPostingContent.module.css'
import JobSubtypesFields from '../Fields/JobSubtypesFields'
import CompanyNameFields from '../Fields/CompanyNameFields'
import CompanyDescriptionField from '../Fields/CompanyDescriptionField'
import CompanyWebsiteField from '../Fields/CompanyWebsiteField'
import JobManagerField from '../Fields/JobManagerField'

// Mapbox does not work on the server side
const JobLocationMap = dynamic(() => import(/* webpackChunkName: "JobLocationMap" */'../JobLocationMap'), { ssr: false }) as any

export interface IJobPostingContentProps {
  job?: IJob
  editable?: boolean
  noCompany?: boolean
  freelancerTypes: Pick<IFreelancerType, 'id' | 'name'>[]
  freelancerSubtypes: Pick<IFreelancerSubtype, 'id' | 'freelancer_type_id' | 'name'>[]
  skills: Pick<ISkill, 'freelancer_type_ids' | 'id' | 'name'>[]
  managers?: Pick<IClient, 'id' | 'name'>[]
  hideTutorialBubble?: boolean
}

const JobPostingContent = (props: IJobPostingContentProps) => {
  const {
    editable,
    job,
    freelancerTypes,
    freelancerSubtypes,
    skills,
    managers = [],
    hideTutorialBubble,
    noCompany,
  } = props

  return (
    <div className={styles['main-area-wrapper']}>
      <div className={styles.box} style={{ paddingBottom: 12 }}>
        <CardHeader
          className={styles.subheader}
          title={(
            <Field
              name="title"
              component={JobTitleField}
              editable={editable}
              hideTutorialBubble={hideTutorialBubble}
              status={job?.status}
            />
            )}
          subheader={(
            <Fields
              editable={editable}
              component={JobRatesFields}
              job={job}
              names={[
                'position_types',
                'client_rate',
                'min_client_rate',
                'freelancer_rate',
                'min_freelancer_rate',
                'rate_mode',
              ]}
            />
            )}
          action={!editable && (
          <React.Fragment>
            <MediaQuery minWidth={801}>
              <JobShare job={job} />
            </MediaQuery>

            <MediaQuery maxWidth={800}>
              <MoreButtonCard icon={<Share />}>
                <JobShare job={job} />
              </MoreButtonCard>
            </MediaQuery>
          </React.Fragment>
          )}
          data-cy="job-card-header"
        />

        <div className={styles['info-tiles']} data-cy="job-info-tiles">
          <Grid container>
            <Fields
              names={['freelancer_type_id', 'job_skills', 'freelancer_subtypes', 'required_experience_years']}
              component={JobTypeFields}
              editable={editable}
              freelancerTypes={freelancerTypes}
            />

            <Fields
              editable={editable}
              component={JobLocationFields}
              names={[
                'location_type',
                'job_countries',
                'job_timezone',
                'timezone_value',
                'timezone_range',
                'full_address',
                'country',
                'region',
                'city',
                'location_latitude',
                'location_longitude',
                'default_distance',
              ]}
            />

            <Fields
              editable={editable}
              component={ProjectLengthFields}
              names={[
                'project_length_in_months',
                'position_types',
              ]}
            />
          </Grid>
        </div>

        <div className={styles.skills} data-cy="job-skills">
          <Fields
            names={['freelancer_type_id', 'freelancer_subtypes']}
            component={JobSubtypesFields}
            editable={editable}
            freelancerSubtypes={freelancerSubtypes}
            label="Specializations"
          />

          <Fields
            names={['job_skills', 'freelancer_type_id']}
            component={JobSkillsFields}
            editable={editable}
            skills={skills}
            requiredSkills
            showError={false} // The JobSkillsFields is re-used twice, only the second one will display errors.
            label="Required skills"
          />

          <Fields
            names={['job_skills', 'freelancer_type_id']}
            component={JobSkillsFields}
            editable={editable}
            skills={skills}
            label="Nice-to-have skills"
          />
        </div>
      </div>

      <Divider style={{ marginTop: 0 }} />

      <div className={styles.box} style={{ paddingTop: 0 }} data-cy="job-text-description">
        {!noCompany && (
          <div data-cy="job-company-description">
            <div>
              <div>
                <Fields
                  names={['company_name', 'company_website']}
                  editable={editable}
                  component={CompanyNameFields}
                />
              </div>

              <div>
                <Field
                  name="company_website"
                  editable={editable}
                  component={CompanyWebsiteField}
                />
              </div>
            </div>

            <Field
              name="company_description"
              editable={editable}
              component={CompanyDescriptionField}
            />
          </div>
        )}

        <Field
          name="description"
          editable={editable}
          component={JobDescriptionField}
          label="About the role"
          defaultValue="Describe the role in a few lines"
        />

        <Field
          name="description_responsibilities"
          editable={editable}
          component={JobDescriptionField}
          label="Key responsibilities"
          defaultValue="What are the key responsibilities of the role"
        />

        <Field
          name="description_experience"
          editable={editable}
          component={JobDescriptionField}
          label="Ideal experience"
          defaultValue="What is the ideal experience for a candidate in this role"
        />
      </div>

      {editable && (
      <div className={styles.internals}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Field
              name="number_of_hires"
              editable={editable}
              component={JobNumberOfHiresField}
            />
          </Grid>

          {managers.length > 0 && (
          <Grid item xs={12} md={6}>
            <Field
              name="user_id"
              editable={editable}
              editableManagers={managers}
              component={JobManagerField}
            />
          </Grid>
          )}
        </Grid>
      </div>
      )}

      {job?.location_latitude && job?.location_longitude && (
        <MediaQuery minWidth={1200}>
          <div style={{ margin: '0 0 48px 0', borderTop: '1px solid rgba(0, 0, 0, 0.1)', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
            <JobLocationMap latitude={job.location_latitude} longitude={job.location_longitude} />
          </div>
        </MediaQuery>
      )}
      {(!job?.location_latitude || !job?.location_longitude) && <Divider />}
    </div>
  )
}

export default JobPostingContent
