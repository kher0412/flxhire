import React, { useState } from 'react'
import { ResponsiveDialog } from 'components'
import { AutoCompleteChipInput, Button } from 'components/themed'
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import RequiredExperienceSlider from 'components/themed/RequiredExperienceSlider'
import { HireMembersFilters } from 'scenes/ClientHire/Hire'
import styles from './RequiredSkillsInput.module.css'

type Skill = { id: number; name: string; requiredYears?: number }

interface IRequiredSkillsInputProps {
  selectedSkills: Skill[]
  skills: Skill[]
  setFilterParam: (name: keyof HireMembersFilters, value: any) => void
  disabled?: boolean
}

const RequiredSkillsInput = (props: IRequiredSkillsInputProps) => {
  const { selectedSkills: selectedSkillsProp, skills, setFilterParam, disabled } = props
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const selectedSkills = selectedSkillsProp.map(skill => ({
    ...skill,
    // TODO: maybe the "label" should be computed in a better way?
    label: (skill as any).label || (skill.requiredYears ? `${skill.name} (${skill.requiredYears}+ yrs)` : skill.name),
  }))

  const handleOutsideInputFocus = (e) => {
    e.preventDefault()
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    const el = document.activeElement as any
    el?.blur()
    setIsDialogOpen(false)
  }

  const handleRequiredYearsChange = (skillId, value) => {
    const skillIndex = selectedSkills.findIndex(skill => skill.id === skillId)
    const currentSkill = selectedSkills[skillIndex]

    if (skillIndex !== -1) {
      const newSkills = selectedSkills.slice()

      newSkills.splice(skillIndex, 1, { ...currentSkill, requiredYears: value })

      setFilterParam('skills', newSkills)
    }
  }

  return (
    <React.Fragment>
      <AutoCompleteChipInput
        input={{
          value: selectedSkills,
          onChange: values => setFilterParam('skills', values),
          name: 'skills',
        }}
        onFocus={handleOutsideInputFocus}
        label="Skills"
        suggestions={skills as any[]}
        suggestionsFormat={{ text: 'name', value: 'rawId', label: 'label' }}
        disabled={disabled}
        fullWidth
      />

      {isDialogOpen && (
        <ResponsiveDialog
          open
          onClose={handleDialogClose}
          maxWidth="md"
          disableRestoreFocus
        >
          <div style={{ width: 800 }} />

          <DialogTitle>
            Filter by skills
          </DialogTitle>

          <DialogContent>
            <div>
              <AutoCompleteChipInput
                input={{
                  value: selectedSkills,
                  onChange: values => setFilterParam('skills', values),
                  name: 'skills-input',
                }}
                label="Skills"
                suggestions={skills.map(s => ({ id: s.id, name: s.name }))}
                autoFocus
                fullWidth
              />
            </div>

            <div className={styles.experience}>
              {selectedSkills.map(skill => (
                <RequiredExperienceSlider
                  skill={{ id: skill.id, requiredYears: skill.requiredYears, name: skill.name }}
                  onChange={value => handleRequiredYearsChange(skill.id, value)}
                />
              ))}
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleDialogClose}>
              OK
            </Button>
          </DialogActions>
        </ResponsiveDialog>
      )}
    </React.Fragment>
  )
}

export default RequiredSkillsInput
