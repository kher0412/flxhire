import React from 'react'
import { DialogActions, Divider, Grid, MenuItem, ListItem, ListItemIcon, ListItemText, Typography, Card } from '@material-ui/core'
import { FormErrorSummary, MoreButtonMenu, ResponsiveDialog } from 'components'
import JobPosting from 'components/JobPosting'
import { TextField, SelectField, Button, Box } from 'components/themed'
import { Field, Fields } from 'redux-form'
import MarkdownTextArea from 'components/themed/MarkdownTextArea'
import { useCurrentUser } from 'hooks'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { JobDetailsFields_Query } from '__generated__/JobDetailsFields_Query.graphql'
import { ChevronRight, ZoomIn } from '@material-ui/icons'
import PositionTypeSelectField from './components/PositionTypeSelectField'
import LocationFields from './components/LocationFields'
import RateFields from './components/RateFields'
import styles from './JobDetailsFields.module.css'
import SkillFields from './components/SkillFields'
import TextareaMarkdown from './components/TextareaMarkdown'
import SubtypeField from './components/SubtypeField'
import ProjectDurationField from './components/ProjectDurationField'

interface IJobDetailsFieldsProps {
  submitFailed: boolean
  secondaryAction?: React.ReactNode
  additionalActions?: React.ReactNode
}

const ERROR_SUMMARY_STYLE: React.CSSProperties = {
  margin: '0 0 12px 0',
}

const JobDetailsFields = (props: IJobDetailsFieldsProps) => {
  const {
    submitFailed,
    secondaryAction,
    additionalActions,
  } = props

  const [previewOpen, setPreviewOpen] = React.useState(false)
  const [user] = useCurrentUser()

  // TODO: load interactive preview stuff in its own fragment
  const data = useLazyLoadQuery<JobDetailsFields_Query>(graphql`
    query JobDetailsFields_Query {
      freelancerTypes {
        name
        rawId
        slug
      }
      freelancerSubtypes {
        name
        rawId
        freelancerType {
          rawId
        }
      }
      skills {
        rawId
        name
        freelancerTypes {
          rawId
        }
        customUser{
          firm{
            rawId
          }
        }
      }
      firm {
        users {
          rawId
          name
        }
      }
    }
  `, {}, {
    fetchPolicy: 'store-and-network',
  })
  const freelancerTypes = data?.freelancerTypes?.map(u => ({ id: u.rawId, name: u.name, slug: u.slug })) || []
  const freelancerSubtypes = data?.freelancerSubtypes?.map(u => ({ id: u.rawId, name: u.name, freelancer_type_id: u.freelancerType?.rawId })) || []
  const skills = data?.skills?.map(u => ({ id: u.rawId, name: u.name, freelancer_type_ids: u.freelancerTypes?.map(t => t.rawId), firm: u.customUser?.firm })) || []
  const managers = data?.firm?.users?.map(u => ({ id: u.rawId, name: u.name })) || []

  const isFirmAdmin = user?.is_firm_admin

  const markdownRenderer = (content: string) => <TextareaMarkdown content={content} handlePreviewOpen={() => setPreviewOpen(true)} />

  // TODO: move interactive preview into its own component with fragment
  return (
    <React.Fragment>
      {previewOpen && (
        <ResponsiveDialog
          open
          onClose={() => setPreviewOpen(false)}
          maxWidth="lg"
          scroll="body"
        >
          <div style={{ width: 9999 }} />

          <JobPosting
            editable
            hideTutorialBubble
            freelancerTypes={freelancerTypes}
            freelancerSubtypes={freelancerSubtypes}
            skills={skills}
            managers={managers}
          />

          <DialogActions>
            <Button onClick={() => setPreviewOpen(false)}>
              Close Preview
            </Button>
          </DialogActions>
        </ResponsiveDialog>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h4">
                    Job Details
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2">
                    Define your job to start hiring top talent from all over the world
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Field
                    name="title"
                    component={TextField}
                    label="Job title"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    name="freelancer_type_id"
                    component={SelectField}
                    fullWidth
                    label="Select the industry"
                    data-cy="select-industry"
                  >
                    {freelancerTypes.map(freelancerType => (
                      <MenuItem key={freelancerType.id} value={freelancerType.id} data-cy={`select-industry-${freelancerType.slug}`}>
                        {freelancerType.name}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    name="required_experience_years"
                    component={SelectField}
                    label="Required overall experience"
                    fullWidth
                    data-cy="select-experience"
                  >
                    {(new Array(10).fill(0)).map((_item, i) => (
                      <MenuItem key={i} value={i} data-cy={`select-experience-${i}`}>
                        {i === 0 ? 'Any' : `${i}+ years experience`}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Field
                  name="freelancer_type_id"
                  freelancerSubtypes={freelancerSubtypes}
                  component={SubtypeField}
                />

                <Field
                  name="freelancer_type_id"
                  skills={skills}
                  component={SkillFields}
                />

                <Grid item xs={12} md={6}>
                  <Fields
                    names={['position_types', 'rate_mode']}
                    component={PositionTypeSelectField}
                    label="Type of job"
                    fullWidth
                  />
                </Grid>

                <RateFields />

                <Fields
                  names={[
                    'position_types',
                    'project_length_in_months',
                  ]}
                  component={ProjectDurationField}
                />
              </Grid>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box>
              <Grid container spacing={3}>
                <LocationFields />
              </Grid>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Field
                    name="description"
                    component={MarkdownTextArea}
                    markdownRenderer={markdownRenderer}
                    label="Job Description"
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Field
                    name="description_responsibilities"
                    markdownRenderer={markdownRenderer}
                    label="Key Responsibilities"
                    placeholder={[
                      ' - Key responsibility 1',
                      ' - Key responsibility 2',
                      ' - Key responsibility 3',
                    ].join('\n')}
                    component={MarkdownTextArea}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Field
                    name="description_experience"
                    component={MarkdownTextArea}
                    markdownRenderer={markdownRenderer}
                    label="Ideal Experience"
                    placeholder={[
                      ' - Ideal experience 1',
                      ' - Ideal experience 2',
                      ' - Ideal experience 3',
                    ].join('\n')}
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined" elevation={0}>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Field
                    name="number_of_hires"
                    component={SelectField}
                    label="Hires needed"
                    helperText="This setting is not displayed to users"
                    fullWidth
                  >
                    <MenuItem value={1} data-cy="number-of-hires-1">
                      1 Hire
                    </MenuItem>

                    <MenuItem value={2} data-cy="number-of-hires-2-4">
                      2 - 4 Hires
                    </MenuItem>

                    <MenuItem value={5} data-cy="number-of-hires-5-10">
                      5 - 10 Hires
                    </MenuItem>

                    <MenuItem value={10} data-cy="number-of-hires-10">
                      10+ Hires
                    </MenuItem>

                    <MenuItem value={0} data-cy="number-of-hires-continous">
                      I have an ongoing need to fill this role
                    </MenuItem>
                  </Field>
                </Grid>

                {managers.length >= 2 && (
                  <Grid item xs={12} md={6}>
                    <Field
                      name="user_id"
                      component={SelectField}
                      label="Owner"
                      helperText={isFirmAdmin ? 'This setting is not displayed to users' : 'Only company admins can change this setting.'}
                      fullWidth
                      disabled={!isFirmAdmin}
                    >
                      {managers.map(manager => (
                        <MenuItem key={manager.id} value={manager.id}>
                          {manager.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                )}
              </Grid>
            </Box>

            <Divider />

            <Box>
              <FormErrorSummary show={submitFailed} style={ERROR_SUMMARY_STYLE} />

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <MoreButtonMenu style={{ marginRight: 'auto' }} component={Button} iconOnly data-cy="job-actions">
                  <ListItem button onClick={() => setPreviewOpen(true)}>
                    <ListItemIcon style={{ minWidth: 40 }}>
                      <ZoomIn />
                    </ListItemIcon>

                    <ListItemText primary="Interactive Preview" />
                  </ListItem>

                  <Divider className={styles.menuDivider} />

                  {additionalActions}
                </MoreButtonMenu>

                {secondaryAction}

                <Button
                  color="primary"
                  type="submit"
                  data-cy="job-continue"
                >
                  <ChevronRight /> Next: Sourcing
                </Button>
              </div>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default JobDetailsFields
