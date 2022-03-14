import React from 'react'
import { uniqBy } from 'lodash'
import { Grid } from '@material-ui/core'
import { HireMembersFilters } from 'scenes/ClientHire/Hire'
import { graphql, useFragment } from 'react-relay'
import { SkillsFields_Job$key } from '__generated__/SkillsFields_Job.graphql'
import { SkillsFields_Firm$key } from '__generated__/SkillsFields_Firm.graphql'
import SkillsGroupsField from 'components/JobEditFormFields/JobDetailsFields/components/SkillsGroupsField'
import SubtypesGroupsField from 'components/JobEditFormFields/JobDetailsFields/components/SubtypesGroupsField'

export interface ISkillsFieldsProps {
  filterParams: HireMembersFilters
  setFilterParam: (key: keyof HireMembersFilters, value: any) => void
  job: SkillsFields_Job$key
  firm: SkillsFields_Firm$key
  disabled?: boolean
}

const SkillsFields = (props: ISkillsFieldsProps) => {
  const { filterParams = {}, setFilterParam, job: jobProp, firm: firmProp, disabled } = props

  const firm = useFragment(graphql`
    fragment SkillsFields_Firm on Firm {
      skills {
        rawId
        name
      }
      freelancerSubtypes {
        rawId
        name
      }
    }
  `, firmProp)

  const job = useFragment(graphql`
    fragment SkillsFields_Job on Job {
      jobSkills {
        requiredYears
        skill {
          rawId
          name
        }
      }
      jobSubtypes {
        freelancerSubtype {
          rawId
          name
        }
      }
    }
  `, jobProp)

  const jobSubtypes = job?.jobSubtypes?.map(j => j.freelancerSubtype)
  const subtypeList = uniqBy(jobSubtypes?.length > 0 ? jobSubtypes : firm?.freelancerSubtypes || [], 'rawId')
  const freelancerSubtypes = subtypeList.map(s => ({ id: s.rawId, name: s.name }))
  const jobSkills = uniqBy(job?.jobSkills?.map(js => ({ id: js.skill.rawId, name: js.skill.name, requiredYears: js.requiredYears })), 'id')
  const firmSkills = firm?.skills?.map(js => ({ id: js.rawId, name: js.name }))
  const skills = jobSkills?.length > 0 ? jobSkills : firmSkills || []

  const selectedSkills = (filterParams.skills || []).map(s => ({ id: s.id, name: s.name, required: true, required_years: s.requiredYears, group_index: s.groupIndex || 0 }))
  const selectedFreelancerSubtypes = (filterParams.freelancerSubtypes || []).map(s => ({ id: s.id, name: s.name, group_index: s.groupIndex || 0 }))

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <SubtypesGroupsField
          input={{
            name: 'freelancerSubtypes',
            value: selectedFreelancerSubtypes,
            onChange: values => setFilterParam('freelancerSubtypes', values.map(v => ({ id: v.id, name: v.name, groupIndex: v.group_index || 0 }))),
          }}
          suggestions={freelancerSubtypes}
          disabled={disabled}
          label="Specializations"
          fullWidth
          placeholder="Start typing specializations..."
        />
      </Grid>

      <Grid item xs={12} md={12}>
        <SkillsGroupsField
          input={{
            name: 'skills',
            value: selectedSkills,
            onChange: values => setFilterParam('skills', values.map(v => ({ id: v.id, name: v.name, requiredYears: v.required_years || 0, groupIndex: v.group_index || 0 }))),
          }}
          name="skills"
          suggestions={skills}
          requiredSkills
          label="Skills"
          disabled={disabled}
          fullWidth
          placeholder="Start typing skills..."
        />
      </Grid>
    </Grid>
  )
}

export default SkillsFields
