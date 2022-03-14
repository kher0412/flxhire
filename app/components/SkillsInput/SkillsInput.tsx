import React from 'react'
import { DialogTitle, DialogContent, DialogActions, Collapse, List, IconButton } from '@material-ui/core'
import { ResponsiveDialog } from 'components'
import { AutoCompleteChipInput, Button } from 'components/themed'
import { IAutoCompleteChipInputProps } from 'components/themed/AutoCompleteChipInput/AutoCompleteChipInput'
import RequiredExperienceSlider from 'components/themed/RequiredExperienceSlider'
import { LibraryAdd } from '@material-ui/icons'
import SkillSuggestionsButton from './components/SkillSuggestionsButton'
import styles from './SkillsInput.module.css'
import SkillBrowserItem from './components/SkillBrowserItem'

export interface ISkillsInputProps extends IAutoCompleteChipInputProps<{ id: number, name: string, required?: boolean, required_years?: number, group_index?: number }> {
  requiredSkills?: boolean
  freelancerTypeId?: number
  hintText?: React.ReactNode
}

export interface ISkillsInputState {
  isDialogOpen: boolean
  isBrowseMode: boolean
  isBrowseModeLoaded: boolean
}

export default class SkillsInput extends React.PureComponent<ISkillsInputProps, ISkillsInputState> {
  state: ISkillsInputState = {
    isDialogOpen: false,
    isBrowseMode: false,
    isBrowseModeLoaded: false,
  }

  render() {
    const { input, requiredSkills = false, suggestions, hintText, ...restProps } = this.props
    const selectedSkills = input?.value || []

    return (
      <React.Fragment>
        <AutoCompleteChipInput
          suggestionsFormat={{ text: 'name', label: 'label', value: 'id' }}
          input={{
            ...input,
            value: selectedSkills.filter(skill => requiredSkills === (skill.required || false)).map(skill => ({
              ...skill,
              label: `${skill.name} ${skill.required_years ? `(${skill.required_years}+ yrs)` : ''}`,
            })),
            onChange: this.handleChange,
          }}
          helperText={hintText}
          {...restProps}
          suggestions={suggestions}
          endAdornment={(
            <IconButton onClick={this.handleOutsideInputClick} data-cy={`skills-input-${input.name}-browse`} edge="end">
              <LibraryAdd />
            </IconButton>
          )}
        />

        {this.renderDialog()}
      </React.Fragment>
    )
  }

  renderDialog() {
    const { input, requiredSkills, suggestions, hintText, ...restProps } = this.props
    const { isDialogOpen, isBrowseMode, isBrowseModeLoaded } = this.state
    const selectedSkills = input?.value || []

    if (!isDialogOpen) {
      return null
    }

    return (
      <ResponsiveDialog open onClose={this.handleDialogClose} maxWidth="md">
        <div style={{ width: 800 }} />

        <DialogTitle>
          {requiredSkills ? 'Required skills' : 'Nice-to-have skills'}
        </DialogTitle>

        <DialogContent>
          <Collapse in={!isBrowseMode}>
            <div className={styles.requiredSkillsInputContainer} data-cy="required-skills-input">
              <AutoCompleteChipInput
                input={{
                  ...input,
                  value: selectedSkills.filter(skill => skill.required === requiredSkills),
                  onChange: this.handleChange,
                }}
                suggestions={suggestions}
                suggestionsFormat={{ text: 'name', value: 'id' }}
                label="Skills"
                autoFocus
                fullWidth
                helperText={hintText}
                data-cy={`skills-input-${input.name}`}
                {...restProps}
              />
            </div>

            {requiredSkills && (
              <div className={styles.experienceContainer}>
                {selectedSkills.map(skill => skill.required ? (
                  <RequiredExperienceSlider
                    skill={{ id: skill.id, name: skill.name, requiredYears: skill.required_years }}
                    onChange={value => this.handleRequiredYearsChange(skill.id, value)}
                  />
                ) : (<div />))}
              </div>
            )}

            <div>
              <Button onClick={this.handleBrowseModeClick}>
                Browse All Skills
              </Button>
            </div>
          </Collapse>

          <Collapse in={isBrowseMode}>
            {isBrowseModeLoaded && (
              // this is a heavy list, only lazy-render it when browse mode opens for the first time
              <List dense>
                {suggestions.sort((a, b) => a.name.localeCompare(b.name)).map(suggestion => (
                  <SkillBrowserItem
                    key={suggestion.id}
                    skill={suggestion}
                    checked={selectedSkills.some(skill => skill.id === suggestion.id && skill.required === requiredSkills)}
                    onToggle={this.handleBrowseItemClick}
                  />
                ))}
              </List>
            )}
          </Collapse>
        </DialogContent>

        <DialogActions>
          {isBrowseMode && (
            <SkillSuggestionsButton />
          )}

          <Button onClick={this.handleDialogClose} data-cy="skills-dialog-close">
            {isBrowseMode ? 'Done' : 'Ok'}
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  handleOutsideInputClick = () => {
    this.setState({
      isDialogOpen: true,
    })
  }

  handleDialogClose = () => {
    if (this.state.isBrowseMode) {
      this.setState({
        isBrowseMode: false,
      })
    } else {
      this.setState({
        isDialogOpen: false,
        isBrowseModeLoaded: false,
      })
    }
  }

  handleBrowseModeClick = () => {
    this.setState({
      isBrowseMode: true,
      isBrowseModeLoaded: true,
    })
  }

  handleBrowseItemClick = (suggestion: ISkillsInputProps['input']['value'][number]) => {
    const { input, requiredSkills, suggestions } = this.props
    let selectedSkills = (input?.value || []).filter(skill => skill.required === requiredSkills)

    if (selectedSkills.some(skill => skill.id === suggestion.id)) {
      // toggle off
      selectedSkills = selectedSkills.filter(skill => skill.id !== suggestion.id)
    } else {
      // toggle on
      selectedSkills = selectedSkills.concat([suggestions.find(skill => skill.id === suggestion.id)])
    }

    this.handleChange(selectedSkills)
  }

  handleRequiredYearsChange = (skillId: number, value: number) => {
    const { input, requiredSkills } = this.props
    const selectedSkills = (input?.value || []).filter(skill => skill.required === requiredSkills)
    const skillIndex = selectedSkills.findIndex(skill => skill.id === skillId)
    const currentSkill = selectedSkills[skillIndex]

    if (skillIndex !== -1) {
      const newSkills = selectedSkills.slice()

      newSkills.splice(skillIndex, 1, { ...currentSkill, required_years: value })

      this.handleChange(newSkills)
    }
  }

  handleChange = (value: ISkillsInputProps['input']['value']) => {
    const { input, requiredSkills } = this.props

    const selectedSkills = input?.value || []

    input.onChange([
      ...(value.map(skill => ({ ...skill, required: requiredSkills }))),
      ...(selectedSkills.filter(skill => skill.required !== requiredSkills)),
    ])
  }
}
