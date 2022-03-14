import React from 'react'
import { IconButton, Tooltip, DialogTitle, DialogContent, DialogActions, Button, Divider, Typography } from '@material-ui/core'
import { UserSkillsCollection, FocusFadeGroup, ResponsiveDialog } from 'components'
import { RequiredExperienceSlider, AutoCompleteChipInput } from 'components/themed'
import { FormValue, IJobSkill, ISkill } from 'types'
import SkillsGroupField from 'components/JobEditFormFields/JobDetailsFields/components/SkillsGroupsField'
import { Create, Error } from '@material-ui/icons'
import FormErrorHint from '../../FormErrorHint'
import SkillSuggestionsButton from './components/SkillSuggestionsButton'
import styles from './JobSkillsFields.module.css'

interface IJobSkillsFieldsProps {
  job_skills: FormValue<IJobSkill[]>
  freelancer_type_id: FormValue<number>
  editable?: boolean
  skills: Pick<ISkill, 'freelancer_type_ids' | 'id' | 'name'>[]
  requiredSkills?: boolean
  showError?: boolean
  label: string
}

export default class JobSkillsFields extends React.PureComponent<IJobSkillsFieldsProps, { isEditorOpen: boolean }> {
  state = {
    isEditorOpen: false,
  }

  container: HTMLDivElement

  render() {
    // eslint-disable-next-line camelcase
    const { job_skills, freelancer_type_id, editable, skills, requiredSkills = false, showError = true, label } = this.props
    const { isEditorOpen } = this.state

    let selectedFreelancerType = freelancer_type_id.input.value
    let skillsFiltered = skills && skills.length > 0 && selectedFreelancerType ? skills.filter(s => s.freelancer_type_ids.indexOf(selectedFreelancerType) >= 0) : []
    let selectedSkills = (job_skills.input.value || []).filter(skill => !!skill.required === requiredSkills) || []

    if (editable) {
      return (
        <div
          ref={div => this.container = div}
          className={styles.container}
          style={isEditorOpen ? { marginTop: 12 } : undefined}
        >
          {this.renderEditDialog()}

          {skillsFiltered.length > 0 && (
            <FocusFadeGroup focused={isEditorOpen}>
              <div>
                {selectedSkills.length === 0 && (
                  <span className={styles.placeholder}>
                    No {requiredSkills ? 'must have-skills selected (choose a max of three)' : 'nice-to-have skills selected'}
                  </span>
                )}

                <div style={{ display: 'inline-block', maxWidth: 'calc(100% - 72px)' }}>
                  <UserSkillsCollection
                    icon={requiredSkills ? <Error /> : undefined}
                    userSkills={selectedSkills}
                    animated={false}
                    hideExperience
                    requiredSkills={requiredSkills ? selectedSkills : []}
                  />
                </div>

                <Tooltip
                  title={requiredSkills ? 'Edit must have skills' : 'Edit nice to have skills'}
                  placement="right"
                >
                  <IconButton onClick={this.handleEditorOpen} className={styles['icon-button']} data-cy="job-job_skills-open">
                    <Create />
                  </IconButton>
                </Tooltip>

                <FormErrorHint message={showError && job_skills.meta.touched && job_skills.meta.error} />
              </div>

              {(label && selectedSkills.length > 0) && (
                <Typography variant="subtitle2" style={{ marginTop: -9, marginBottom: 3 }}>
                  {label}
                </Typography>
              )}
            </FocusFadeGroup>
          )}
        </div>
      )
    }

    // Non-editable version:

    if (selectedSkills.length === 0) {
      return null
    }

    return (
      <div ref={div => this.container = div}>
        <div>
          <UserSkillsCollection
            icon={requiredSkills ? <Error /> : undefined}
            userSkills={selectedSkills}
            requiredSkills={requiredSkills ? selectedSkills : []}
            style={{ display: 'inline-block' }}
          />

          {(label && selectedSkills.length > 0) && (
            <Typography variant="subtitle2" style={{ marginTop: -9, marginBottom: 3 }}>
              {label}
            </Typography>
          )}
        </div>
      </div>
    )
  }

  renderEditDialog() {
    // eslint-disable-next-line camelcase
    const { job_skills, freelancer_type_id, editable, skills, requiredSkills = false, showError = true } = this.props
    const { isEditorOpen } = this.state

    if (!isEditorOpen || !editable) return null

    let selectedFreelancerType = freelancer_type_id.input.value
    let skillsFiltered = skills && skills.length > 0 && selectedFreelancerType ? skills.filter(s => s.freelancer_type_ids.indexOf(selectedFreelancerType) >= 0) : []
    let selectedSkills = (job_skills.input.value || []).filter(skill => !!skill.required === requiredSkills) || []

    return (
      <ResponsiveDialog open onClose={this.handleEditorClose} maxWidth="md">
        <div style={{ width: 800 }} />

        <DialogTitle>
          {requiredSkills ? 'Edit must-have skills' : 'Edit nice-to-have skills'}
        </DialogTitle>

        <DialogContent>
          <div className={styles['input-wrapper']} style={isEditorOpen ? undefined : { display: 'none' }}>
            <div style={{ marginBottom: 6 }}>
              {requiredSkills && (
                <SkillsGroupField
                  label="Must-have skills"
                  input={{
                    ...job_skills.input,
                    value: selectedSkills,
                    onChange: this.handleChange,
                  }}
                  requiredSkills
                  placeholder="Start typing skills..."
                  suggestions={skillsFiltered}
                  fullWidth
                />
              )}

              {!requiredSkills && (
                <AutoCompleteChipInput
                  label="Nice-to-have skills"
                  input={{
                    ...job_skills.input,
                    value: selectedSkills,
                    onChange: this.handleChange,
                  }}
                  placeholder="Start typing skills..."
                  suggestions={skillsFiltered}
                  suggestionsFormat={{ text: 'name', value: 'id' }}
                  fullWidth
                />
              )}
            </div>

            <SkillSuggestionsButton />
            <FormErrorHint message={showError && job_skills.meta.touched && job_skills.meta.error} />

            {(requiredSkills && selectedSkills.length > 0) && (
              <React.Fragment>
                <Divider style={{ margin: '24px -24px' }} />

                <div className={styles.experience}>
                  {selectedSkills.map(skill => (
                    <div className={styles.slider}>
                      <RequiredExperienceSlider
                        skill={{ id: skill.id, name: skill.name, requiredYears: skill.required_years }}
                        onChange={value => this.handleSliderChange(skill.id, value, skill.group_index)}
                      />
                    </div>
                  ))}
                </div>
              </React.Fragment>
            )}
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleEditorClose} data-cy="job-job_skills-close">
            Close
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  /**
   * @param {number} requiredYears
   */
  handleSliderChange = (skillId, requiredYears, groupIndex = 0) => {
    // eslint-disable-next-line camelcase
    const { job_skills } = this.props
    const currentSkills = job_skills?.input?.value || []
    const skillIndex = currentSkills.findIndex(skill => skill.id === skillId && (skill.group_index || 0) === groupIndex)

    if (skillIndex !== -1) {
      const newSkills = currentSkills.slice()
      newSkills.splice(skillIndex, 1, { ...currentSkills[skillIndex], required_years: requiredYears })
      job_skills.input.onChange(newSkills)
    }
  }

  handleEditorOpen = () => {
    this.setState({
      isEditorOpen: true,
    })
  }

  handleChange = (newSkills) => {
    // eslint-disable-next-line camelcase
    const { requiredSkills, job_skills } = this.props
    let prevValue = job_skills.input.value || []

    if (requiredSkills) {
      newSkills.forEach(skill => skill.required = true)
      job_skills.input.onChange(prevValue.filter(skill => !skill.required).concat(newSkills))
    } else {
      job_skills.input.onChange(prevValue.filter(skill => skill.required).concat(newSkills))
    }
  }

  handleEditorClose = () => {
    this.props.job_skills.input.onBlur()

    this.setState({
      isEditorOpen: false,
    })
  }
}
