import { Grid } from '@material-ui/core'
import SkillsInput from 'components/SkillsInput'
import { ISkillsInputProps } from 'components/SkillsInput/SkillsInput'
import { InputGroup, InputGroupHelpButton } from 'components/themed'
import { useMemo } from 'react'
import { getGroupsByIndex, normalizeGroupIndexes } from 'services/job'

const SkillsGroupField = ({ input, requiredSkills = false, ...props }: ISkillsInputProps) => {
  const groups = useMemo(() => {
    let list = getGroupsByIndex(input?.value?.filter(v => requiredSkills === (v.required || false)))
    if (list.length <= 1 || list[list.length - 1]?.items?.length > 0) {
      const index = list.length > 0 ? Math.max(...list.map(g => g.index || 0)) + 1 : 0
      list.push({ index, items: [] })
    }

    return list
  }, [input?.value])

  return (
    <Grid container spacing={2}>
      {groups.map((group) => {
        let label = props.label || 'Skills'
        let hintText = props.hintText

        if (group.index > 0) {
          label = `${label} (Alt. set #${group.index})`
          hintText = `Alternative set #${group.index} of must-have skills`
          if (group.items.length === 0) {
            if (group.index === 1) {
              hintText = 'Optionally add an alternative set of must-have skills'
            } else {
              hintText = 'Optionally add another alternative set of must-have skills'
            }
          }
        }

        return (
          <Grid item xs={12} key={group.index}>
            <InputGroup>
              <SkillsInput
                {...props}
                label={label}
                hintText={hintText}
                requiredSkills={requiredSkills}
                input={{
                  ...input,
                  value: group.items,
                  onChange: (val) => {
                    const others = (input?.value || []).filter(v => (v.group_index || 0) !== group.index)
                    const newVal = normalizeGroupIndexes(others.concat(val.map(v => ({ ...v, group_index: group.index }))))
                    input.onChange(newVal)
                  },
                }}
              />
              <InputGroupHelpButton title="Required skills sets">
                You can add up to 3 required skills in each set. However, you can also add more than one set
                of required skills.
                <br /><br />
                Applicants will be considered a match if they fully cover <em>at least one</em> of your required skill sets.
                Skills <em>within</em> a required skill set are LOGICALLY AND grouped - ie, you need to have all of them to apply.
                Skills <em>between</em> required skill sets are LOGICALLY OR grouped - ie, if you match all skills in ANY skill group you can apply.
                <br /><br />
                This allows you to be flexible with required skills for your job. Thus, for example, if you have a role that requires Java AND Python you can put them in one skill set.
                However if you have a role that requires Java OR Python you should put each one in their own required skill sets.
              </InputGroupHelpButton>
            </InputGroup>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default SkillsGroupField
