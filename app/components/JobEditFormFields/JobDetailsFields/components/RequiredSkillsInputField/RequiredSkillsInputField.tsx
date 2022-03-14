import React from 'react'
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import { IJobSkill } from 'types'
import { ResponsiveDialog } from 'components'
import { AutoCompleteChipInput, Button } from 'components/themed'
import { IAutoCompleteChipInputProps } from 'components/themed/AutoCompleteChipInput/AutoCompleteChipInput'
import RequiredExperienceSlider from 'components/themed/RequiredExperienceSlider'

export interface IRequiredSkillsInputFieldProps extends IAutoCompleteChipInputProps<IJobSkill> {
  requiredSkills: boolean
}

export interface IRequiredSkillsInputFieldState {
  isDialogOpen: boolean
}

export default class RequiredSkillsInputField extends React.Component<IRequiredSkillsInputFieldProps, IRequiredSkillsInputFieldState> {
  state: IRequiredSkillsInputFieldState = {
    isDialogOpen: false,
  }

  render() {
    const { input, suggestions, ...restProps } = this.props
    const selectedSkills = input?.value || []

    return (
      <React.Fragment>
        <AutoCompleteChipInput
          suggestionsFormat={{ text: 'displayName', value: 'id' }}
          input={{
            ...input,
            value: selectedSkills.filter(skill => skill.required === true).map(skill => ({
              ...skill,
              displayName: `${skill.name} ${skill.required_years ? `(${skill.required_years}+ yrs)` : ''}`,
            })),
            onChange: this.handleChange,
          }}
          {...restProps}
          suggestions={suggestions.map(skill => ({ ...skill, displayName: skill.name }))}
          onFocus={this.handleOutsideInputFocus}
        />

        {this.renderDialog()}
      </React.Fragment>
    )
  }

  renderDialog() {
    const { input, ...restProps } = this.props
    const { isDialogOpen } = this.state
    const selectedSkills = input?.value || []

    if (!isDialogOpen) {
      return null
    }

    return (
      <ResponsiveDialog open onClose={this.handleDialogClose} maxWidth="md">
        <div style={{ width: 800 }} />

        <DialogTitle>
          Required Skills
        </DialogTitle>

        <DialogContent>
          <div data-cy="required-skills-input">
            <AutoCompleteChipInput
              input={{
                ...input,
                value: selectedSkills.filter(skill => skill.required === true),
                onChange: this.handleChange,
              }}
              label="Skills"
              autoFocus
              fullWidth
              suggestionsFormat={{ text: 'name', value: 'id' }}
              {...restProps}
            />
          </div>

          <div style={{ margin: '24px 0' }}>
            {selectedSkills.map(skill => skill.required ? (
              <RequiredExperienceSlider
                key={skill.id}
                skill={{ id: skill.id, name: skill.name, requiredYears: skill.required_years }}
                onChange={value => this.handleRequiredYearsChange(skill.id, value)}
              />
            ) : (<div />))}
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleDialogClose} data-cy="skills-dialog-close">
            OK
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  /**
   * @param {Event} e
   */
  handleOutsideInputFocus = (e) => {
    this.setState({
      isDialogOpen: true,
    })
  }

  handleDialogClose = () => {
    this.setState({
      isDialogOpen: false,
    })
  }

  handleRequiredYearsChange = (skillId, value) => {
    const { input } = this.props
    const selectedSkills = (input?.value || []).filter(skill => skill.required)
    const skillIndex = selectedSkills.findIndex(skill => skill.id === skillId)
    const currentSkill = selectedSkills[skillIndex]

    if (skillIndex !== -1) {
      const newSkills = selectedSkills.slice()

      newSkills.splice(skillIndex, 1, { ...currentSkill, required_years: value })

      this.handleChange(newSkills)
    }
  }

  handleChange = (value: IRequiredSkillsInputFieldProps['input']['value']) => {
    const { input } = this.props
    const selectedSkills = input?.value || []

    input.onChange([
      ...(value.map(skill => ({ ...skill, required: true }))),
      ...(selectedSkills.filter(skill => !!skill.required === false)),
    ])
  }
}
