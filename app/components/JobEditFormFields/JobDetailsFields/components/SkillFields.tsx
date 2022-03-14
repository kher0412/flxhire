import { Collapse, Grid } from '@material-ui/core'
import { FirmList } from 'admin/firm/Firm'
import SkillsInput from 'components/SkillsInput'
import { useCurrentUser } from 'hooks'
import React from 'react'
import { Field } from 'redux-form'
import { FormValueInput, ICurrentUser, ISkill } from 'types'
import SkillsGroupsField from './SkillsGroupsField'

export interface ISkillFieldsProps {
  input: FormValueInput<number>
  skills: ISkill & { firm: { rawId: number }, freelancer_type_ids: number[] }[]
}

function SkillFields(props: ISkillFieldsProps) {
  const { skills = [], input: { value: freelancerTypeId } } = props
  const expand = (freelancerTypeId > 0)
  const [user] = useCurrentUser()

  if (freelancerTypeId) {
    return (
      <React.Fragment>
        <Grid item xs={12} md={12} style={{ display: expand ? 'block' : 'none' }}>
          <Collapse in={expand}>
            <Field
              name="job_skills"
              component={SkillsGroupsField}
              disabled={freelancerTypeId <= 0}
              suggestions={skills.filter(skill => skill.freelancer_type_ids.includes(freelancerTypeId))}
              label="Must-have skills set"
              requiredSkills
              fullWidth
              placeholder="Start typing must have skills..."
              hintText="Up to 3 required skills per skills set. Click the info button to see how it works. Applicants must match ALL skills in at least ONE must-have skills set to apply to the job"
            />
          </Collapse>
        </Grid>

        <Grid item xs={12} md={12} style={{ display: expand ? 'block' : 'none' }}>
          <Collapse in={expand}>
            <Field
              name="job_skills"
              component={SkillsInput}
              disabled={freelancerTypeId <= 0}
              suggestions={skills.filter(skill => skill.freelancer_type_ids.includes(freelancerTypeId))}
              label="Nice-to-have skills"
              requiredSkills={false}
              hintText="Add as many nice to have skills as you want. None of these are required to apply to the job but the more a candidate has the higher they will be ranked"
              fullWidth
              placeholder="Start typing skills..."
            />
          </Collapse>
        </Grid>
      </React.Fragment>
    )
  }

  return (
    <div />
  )
}

export default React.memo(SkillFields) as React.FunctionComponent<ISkillFieldsProps>
