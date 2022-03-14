import React from 'react'
import { DialogTitle, DialogContent, DialogActions, Chip, Avatar, Collapse, List } from '@material-ui/core'
import { FormValue, ISkill, IUserSkill } from 'types'
import { ResponsiveDialog, UserSkillsCollection, FocusFadeGroup } from 'components'
import { AutoCompleteChipInput, Button } from 'components/themed'
import { Field, FieldArray } from 'redux-form'
import { AddCircle, Create } from '@material-ui/icons'
import styles from './UserSkillsFields.module.css'
import ExperienceSlider from './components/ExperienceSlider'
import SkillBrowserItem from './components/SkillBrowserItem'

export interface IUserSkillsFieldsProps {
  editable: boolean
  user_skills: FormValue<IUserSkill[]>
  freelancer_type_id: FormValue<number>
  editableSkills: ISkill[]
  editableSkillsReceived: boolean
}

export interface IUserSkillsFieldsState {
  isEditMode: boolean
  isBrowseMode: boolean
  isBrowseModeRendered: boolean
}

export default class UserSkillsFields extends React.Component<IUserSkillsFieldsProps, IUserSkillsFieldsState> {
  state = {
    isEditMode: false,
    isBrowseMode: false,
    isBrowseModeRendered: false,
  }

  render() {
    const { editable, user_skills: { meta, input: { value = [] } } } = this.props
    const hasSkills = value.length > 0

    return (
      <FocusFadeGroup focused={false}>
        <div className={styles.skills} data-cy="skills">
          <div className={styles.skillsWrapper}>
            {(value.length > 0 || editable) && (
              <UserSkillsCollection userSkills={value} animated={false} alwaysOpen>
                {editable && (
                  <div style={{ margin: '0 5px 5px', display: 'inline-block' }}>
                    <Chip
                      data-cy="profile-skills-edit"
                      variant="outlined"
                      label={hasSkills ? 'Edit' : 'Add your skills'}
                      onClick={this.handleDialogOpen}
                      avatar={(
                        <Avatar style={{ color: '#666', background: 'none', height: 32, width: 32 }}>
                          {hasSkills ? <Create /> : <AddCircle />}
                        </Avatar>
                      )}
                    />
                  </div>
                )}
              </UserSkillsCollection>
            )}

            {typeof meta?.error === 'string' && meta?.error && (
              <div className={styles.error}>
                {meta.error}
              </div>
            )}
          </div>
        </div>

        {this.renderEditDialog()}
      </FocusFadeGroup>
    )
  }

  renderEditDialog() {
    // eslint-disable-next-line camelcase
    const { editableSkills, user_skills, freelancer_type_id } = this.props
    const { isEditMode, isBrowseMode, isBrowseModeRendered } = this.state
    const selectedFreelancerTypeId = freelancer_type_id.input.value
    const selectedSkills = user_skills.input.value || []
    const selectedSkillsSet = new Set(selectedSkills.map(skill => skill.id)) // for faster lookup of selected skills

    if (!isEditMode) {
      return null
    }

    return (
      <ResponsiveDialog open onClose={this.handleDialogClose} maxWidth="md">
        <DialogTitle>
          Start typing to select your skills
        </DialogTitle>

        <DialogContent>
          <div style={{ width: 99999 }} />

          {!selectedFreelancerTypeId && (
            <div>
              Select your industry to configure skills.
            </div>
          )}

          {selectedFreelancerTypeId && (
            <React.Fragment>
              <Collapse in={!isBrowseMode}>
                <AutoCompleteChipInput
                  suggestions={editableSkills}
                  suggestionsFormat={{ text: 'name', value: 'id' }}
                  input={user_skills.input}
                  fullWidth
                />

                <div className={styles.years}>
                  {selectedSkills.map((skillItem, index) => (
                    <div key={skillItem.id} className={styles['experience-slider']}>
                      <div className={styles['slider-control-wrapper']}>
                        <Field
                          name={`user_skills.${index}`}
                          component={ExperienceSlider}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <Button onClick={this.handleBrowseModeOpen}>
                    Browse All Skills
                  </Button>
                </div>
              </Collapse>

              <Collapse in={isBrowseMode}>
                {isBrowseModeRendered && (
                  // this is a heavy list, only lazy-render it when browse mode opens for the first time
                  <List dense>
                    {editableSkills.sort((a, b) => a.name.localeCompare(b.name)).map(skill => (
                      <SkillBrowserItem
                        key={skill.id}
                        skill={skill}
                        checked={selectedSkillsSet.has(skill.id)}
                        onToggle={this.handleBrowseItemClick}
                      />
                    ))}
                  </List>
                )}
              </Collapse>
            </React.Fragment>
          )}
        </DialogContent>

        <DialogActions>
          {isBrowseMode && (
            <Button onClick={this.handleBrowseModeClose} data-cy="profile-skills-close">
              Done
            </Button>
          )}

          {!isBrowseMode && (
            <Button onClick={this.handleDialogClose} data-cy="profile-skills-close">
              Close
            </Button>
          )}
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleDialogOpen = () => {
    this.setState({
      isEditMode: true,
    })
  }

  handleDialogClose = () => {
    this.setState({
      isEditMode: false,
      isBrowseModeRendered: false,
    })
  }

  handleBrowseModeOpen = () => {
    this.setState({
      isBrowseMode: true,
      isBrowseModeRendered: true,
    })
  }

  handleBrowseModeClose = () => {
    this.setState({
      isBrowseMode: false,
    })
  }

  handleSliderChange = (id, value) => {
    let items = this.props.user_skills.input.value || []
    let skill = items.find(_skill => _skill.id === id)
    let skillIndex = items.indexOf(skill)

    if (skill) {
      let newSkill = {
        ...skill,
        experience: value,
      }

      items = items.slice()
      items[skillIndex] = newSkill
    }

    this.props.user_skills.input.onChange(items)
  }

  handleBrowseItemClick = (skill: ISkill) => {
    const { user_skills: { input } } = this.props
    let selectedSkills = input?.value || []

    if (selectedSkills.some(_skill => _skill.id === skill.id)) {
      // toggle skill off
      selectedSkills = selectedSkills.filter(_skill => _skill.id !== skill.id)
    } else {
      // toggle skill on
      selectedSkills = selectedSkills.concat([{ ...skill, experience: 0 }])
    }

    this.props.user_skills.input.onChange(selectedSkills)
  }
}
