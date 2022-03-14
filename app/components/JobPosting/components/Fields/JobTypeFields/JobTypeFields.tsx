import React from 'react'
import { snakeCase } from 'lodash'
import { Grid, List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary } from '@material-ui/core'
import { MoreButtonDialog, FocusFadeGroup } from 'components'
import { FormValue, IFreelancerType, IJobSkill } from 'types'
import { Create, Work } from '@material-ui/icons'
import FormErrorHint from '../../FormErrorHint'
import styles from './JobTypeFields.module.css'

interface IJobTypeFieldsProps {
  freelancer_type_id: FormValue<number>
  freelancer_subtypes: FormValue<any[]> // we just need to clear this field, we don't care what's in it
  job_skills: FormValue<IJobSkill[]>
  editable?: boolean
  freelancerTypes: Pick<IFreelancerType, 'id' | 'name'>[]
  required_experience_years: FormValue<number>
}

export default class JobTypeFields extends React.PureComponent<IJobTypeFieldsProps> {
  render() {
    // eslint-disable-next-line camelcase
    const { editable, freelancerTypes, freelancer_type_id: { input: { value }, meta: { touched, error } }, required_experience_years } = this.props
    const selectedFreelancerType = freelancerTypes?.find(freelancerType => freelancerType.id === value)
    const jobTypeLabel = this.renderJobTypeLabel()
    const requiredYears = required_experience_years?.input?.value

    if (!selectedFreelancerType && !editable) {
      return null
    }

    return (
      <Grid item xs={12} md={5}>
        <FocusFadeGroup>
          <List disablePadding>
            <ListItem className={styles.item}>
              <ListItemIcon className={styles.icon}>
                <Work />
              </ListItemIcon>

              <ListItemText
                className={styles['list-item-text']}
                primary={(
                  <div className={styles['primary-text']} title={jobTypeLabel}>
                    {jobTypeLabel || <span style={{ opacity: 0.6 }}>Select industry...</span>}
                    {(jobTypeLabel && requiredYears > 0) && ` (${requiredYears}+ years)`}
                  </div>
                )}
                secondary={(
                  <React.Fragment>
                    Job industry
                    <FormErrorHint message={touched && error} />
                  </React.Fragment>
                )}
              />

              {editable && (
                <ListItemIcon className={styles['edit-button']}>
                  <MoreButtonDialog
                    maxWidth="md"
                    tooltip="Select job industry"
                    icon={<Create />}
                    dialogTitle="Select job industry"
                    data-cy="job-freelancer_type-select"
                    CloseButtonProps={{
                      'data-cy': 'job-freelancer_type-close',
                    }}
                  >
                    <div style={{ width: 800 }} />

                    {freelancerTypes.map(freelancerType => (
                      <Accordion
                        expanded={value === freelancerType.id}
                        onClick={() => this.handleFreelancerTypeChange(freelancerType.id)}
                        data-cy={`job-freelancer_type-select-${snakeCase(freelancerType.name)}`}
                      >
                        <AccordionSummary>
                          {freelancerType.name}
                        </AccordionSummary>

                        {/*
                        <ExpansionPanelDetails>
                          <RequiredExperienceSlider
                            value={required_experience_years.input?.value}
                            onChange={required_experience_years.input?.onChange}
                          />
                        </ExpansionPanelDetails>
                        */}
                      </Accordion>
                    ))}
                  </MoreButtonDialog>
                </ListItemIcon>
              )}
            </ListItem>
          </List>
        </FocusFadeGroup>
      </Grid>
    )
  }

  renderJobTypeLabel() {
    const { freelancer_type_id: { input: { value } }, freelancerTypes } = this.props
    const selectedFreelancerType = freelancerTypes.find(freelancerType => freelancerType.id === value)

    if (selectedFreelancerType) {
      return selectedFreelancerType.name
    }

    return null
  }

  handleFreelancerTypeChange = (freelancerTypeId) => {
    // eslint-disable-next-line camelcase
    const { freelancer_type_id: { input: { onChange, value } }, freelancer_subtypes, job_skills } = this.props

    if (value !== freelancerTypeId) {
      onChange(freelancerTypeId)
      job_skills.input.onChange([])
      freelancer_subtypes.input.onChange([])
    }
  }
}
